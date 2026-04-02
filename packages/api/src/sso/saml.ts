/**
 * SAML 2.0 utilities for Tome Cloud SSO.
 * Uses Web Crypto API (Cloudflare Workers compatible, no Node.js crypto).
 */

/**
 * Build a SAML 2.0 AuthnRequest XML string.
 */
export function buildAuthnRequest(
  entityId: string,
  acsUrl: string,
  idpSsoUrl: string,
): string {
  const id = `_${generateId()}`;
  const issueInstant = new Date().toISOString();

  return [
    `<samlp:AuthnRequest`,
    `  xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol"`,
    `  xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion"`,
    `  ID="${id}"`,
    `  Version="2.0"`,
    `  IssueInstant="${issueInstant}"`,
    `  Destination="${idpSsoUrl}"`,
    `  AssertionConsumerServiceURL="${acsUrl}"`,
    `  ProtocolBinding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST">`,
    `  <saml:Issuer>${entityId}</saml:Issuer>`,
    `  <samlp:NameIDPolicy`,
    `    Format="urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress"`,
    `    AllowCreate="true" />`,
    `</samlp:AuthnRequest>`,
  ].join("\n");
}

/**
 * Build the full redirect URL for SAML HTTP-Redirect binding.
 */
export function buildSamlRedirectUrl(
  idpSsoUrl: string,
  authnRequest: string,
): string {
  const encoded = btoa(authnRequest);
  const param = encodeURIComponent(encoded);
  const separator = idpSsoUrl.includes("?") ? "&" : "?";
  return `${idpSsoUrl}${separator}SAMLRequest=${param}`;
}

/**
 * Parse a base64-encoded SAML Response and extract key fields.
 * Uses regex-based XML parsing (no DOMParser in Workers).
 */
export function parseSamlResponse(responseB64: string): {
  rawXml: string;
  assertion: string;
  issuer: string;
  nameId: string;
  attributes: Record<string, string>;
} {
  let xml: string;
  try {
    xml = atob(responseB64);
  } catch {
    throw new Error("Invalid base64 in SAML response");
  }

  const assertion = extractTag(xml, "saml:Assertion") ?? extractTag(xml, "Assertion");
  if (!assertion) throw new Error("No Assertion found in SAML response");

  const issuer = extractTagContent(xml, "saml:Issuer") ?? extractTagContent(xml, "Issuer");
  if (!issuer) throw new Error("No Issuer found in SAML response");

  const nameId = extractTagContent(xml, "saml:NameID") ?? extractTagContent(xml, "NameID");
  if (!nameId) throw new Error("No NameID found in SAML response");

  const attributes = extractAttributes(xml);

  return { rawXml: xml, assertion, issuer, nameId, attributes };
}

/**
 * Validate RSA-SHA256 signature on a SAML XML document using Web Crypto.
 */
export async function validateSamlSignature(
  xml: string,
  certificatePem: string,
): Promise<boolean> {
  const signatureValue = extractTagContent(xml, "ds:SignatureValue")
    ?? extractTagContent(xml, "SignatureValue");
  if (!signatureValue) return false;

  const signedInfo = extractTag(xml, "ds:SignedInfo") ?? extractTag(xml, "SignedInfo");
  if (!signedInfo) return false;

  try {
    const certDer = pemToDer(certificatePem);
    const key = await crypto.subtle.importKey(
      "spki",
      certDer,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["verify"],
    );

    const sigBytes = Uint8Array.from(atob(signatureValue.replace(/\s/g, "")), (c) => c.charCodeAt(0));
    const dataBytes = new TextEncoder().encode(signedInfo);

    return await crypto.subtle.verify(
      { name: "RSASSA-PKCS1-v1_5" },
      key,
      sigBytes,
      dataBytes,
    );
  } catch {
    return false;
  }
}

/**
 * Extract user claims from SAML attribute map.
 */
export function extractSamlClaims(attributes: Record<string, string>): {
  email: string;
  name?: string;
  groups?: string[];
} {
  // Common SAML attribute names for email
  const emailKeys = [
    "email",
    "Email",
    "emailAddress",
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress",
    "urn:oid:0.9.2342.19200300.100.1.3",
    "mail",
  ];

  const nameKeys = [
    "displayName",
    "name",
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name",
    "urn:oid:2.16.840.1.113730.3.1.241",
    "cn",
  ];

  const groupKeys = [
    "groups",
    "memberOf",
    "http://schemas.xmlsoap.org/claims/Group",
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/groups",
  ];

  let email = "";
  for (const key of emailKeys) {
    if (attributes[key]) { email = attributes[key]; break; }
  }
  if (!email) throw new Error("No email attribute found in SAML claims");

  let name: string | undefined;
  for (const key of nameKeys) {
    if (attributes[key]) { name = attributes[key]; break; }
  }

  let groups: string[] | undefined;
  for (const key of groupKeys) {
    if (attributes[key]) {
      groups = attributes[key].split(",").map((g) => g.trim());
      break;
    }
  }

  return { email, ...(name && { name }), ...(groups && { groups }) };
}

/**
 * Generate SP (Service Provider) metadata XML for IdP configuration.
 */
export function buildSpMetadata(entityId: string, acsUrl: string): string {
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<md:EntityDescriptor`,
    `  xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata"`,
    `  entityID="${entityId}">`,
    `  <md:SPSSODescriptor`,
    `    AuthnRequestsSigned="false"`,
    `    WantAssertionsSigned="true"`,
    `    protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">`,
    `    <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress</md:NameIDFormat>`,
    `    <md:AssertionConsumerService`,
    `      Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST"`,
    `      Location="${acsUrl}"`,
    `      index="0"`,
    `      isDefault="true" />`,
    `  </md:SPSSODescriptor>`,
    `</md:EntityDescriptor>`,
  ].join("\n");
}

// ── Internal helpers ──────────────────────────────────────

function generateId(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

function extractTag(xml: string, tagName: string): string | null {
  // Match the full tag including content — handle both self-closing and content tags
  const re = new RegExp(`<${tagName}[\\s>][\\s\\S]*?<\\/${tagName}>`, "i");
  const match = xml.match(re);
  return match ? match[0] : null;
}

function extractTagContent(xml: string, tagName: string): string | null {
  const re = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i");
  const match = xml.match(re);
  return match ? match[1].trim() : null;
}

function extractAttributes(xml: string): Record<string, string> {
  const attrs: Record<string, string> = {};
  const attrRe = /<(?:saml:)?Attribute\s+Name="([^"]+)"[^>]*>\s*<(?:saml:)?AttributeValue[^>]*>([^<]*)<\/(?:saml:)?AttributeValue>/gi;
  let match: RegExpExecArray | null;
  while ((match = attrRe.exec(xml)) !== null) {
    attrs[match[1]] = match[2].trim();
  }
  return attrs;
}

function pemToDer(pem: string): Uint8Array {
  const body = pem
    .replace(/-----BEGIN.*?-----/g, "")
    .replace(/-----END.*?-----/g, "")
    .replace(/\s/g, "");
  return Uint8Array.from(atob(body), (c) => c.charCodeAt(0));
}
