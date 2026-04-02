import { describe, it, expect } from "vitest";
import {
  buildAuthnRequest,
  buildSamlRedirectUrl,
  parseSamlResponse,
  extractSamlClaims,
  buildSpMetadata,
} from "./saml";

describe("SAML utilities", () => {
  const entityId = "https://tome.example.com/saml/metadata";
  const acsUrl = "https://tome.example.com/saml/acs";
  const idpSsoUrl = "https://idp.example.com/sso";

  describe("buildAuthnRequest", () => {
    it("generates valid XML with required fields", () => {
      const xml = buildAuthnRequest(entityId, acsUrl, idpSsoUrl);

      expect(xml).toContain("samlp:AuthnRequest");
      expect(xml).toContain(`Destination="${idpSsoUrl}"`);
      expect(xml).toContain(`AssertionConsumerServiceURL="${acsUrl}"`);
      expect(xml).toContain(`<saml:Issuer>${entityId}</saml:Issuer>`);
      expect(xml).toContain('Version="2.0"');
    });

    it("includes a unique ID attribute", () => {
      const xml = buildAuthnRequest(entityId, acsUrl, idpSsoUrl);
      const match = xml.match(/ID="(_[a-f0-9]+)"/);
      expect(match).not.toBeNull();
      expect(match![1].length).toBeGreaterThan(10);
    });

    it("includes IssueInstant in ISO format", () => {
      const xml = buildAuthnRequest(entityId, acsUrl, idpSsoUrl);
      const match = xml.match(/IssueInstant="([^"]+)"/);
      expect(match).not.toBeNull();
      // Should parse as a valid date
      expect(new Date(match![1]).getTime()).not.toBeNaN();
    });

    it("generates different IDs on each call", () => {
      const xml1 = buildAuthnRequest(entityId, acsUrl, idpSsoUrl);
      const xml2 = buildAuthnRequest(entityId, acsUrl, idpSsoUrl);
      const id1 = xml1.match(/ID="([^"]+)"/)![1];
      const id2 = xml2.match(/ID="([^"]+)"/)![1];
      expect(id1).not.toBe(id2);
    });
  });

  describe("buildSamlRedirectUrl", () => {
    it("contains SAMLRequest query parameter", () => {
      const request = buildAuthnRequest(entityId, acsUrl, idpSsoUrl);
      const url = buildSamlRedirectUrl(idpSsoUrl, request);

      expect(url).toContain("SAMLRequest=");
      expect(url.startsWith(idpSsoUrl)).toBe(true);
    });

    it("base64 encodes the request", () => {
      const request = "<samlp:AuthnRequest>test</samlp:AuthnRequest>";
      const url = buildSamlRedirectUrl(idpSsoUrl, request);

      const paramValue = new URL(url).searchParams.get("SAMLRequest")!;
      const decoded = atob(paramValue);
      expect(decoded).toBe(request);
    });

    it("appends with & if URL already has query params", () => {
      const urlWithParams = "https://idp.example.com/sso?tenant=abc";
      const url = buildSamlRedirectUrl(urlWithParams, "<request/>");
      expect(url).toContain("?tenant=abc&SAMLRequest=");
    });
  });

  describe("parseSamlResponse", () => {
    const sampleResponse = btoa([
      '<samlp:Response xmlns:samlp="urn:oasis:names:tc:SAML:2.0:protocol" xmlns:saml="urn:oasis:names:tc:SAML:2.0:assertion">',
      '  <saml:Issuer>https://idp.example.com</saml:Issuer>',
      '  <saml:Assertion ID="_assertion1">',
      '    <saml:Issuer>https://idp.example.com</saml:Issuer>',
      '    <saml:Subject>',
      '      <saml:NameID>user@example.com</saml:NameID>',
      '    </saml:Subject>',
      '    <saml:AttributeStatement>',
      '      <saml:Attribute Name="email"><saml:AttributeValue>user@example.com</saml:AttributeValue></saml:Attribute>',
      '      <saml:Attribute Name="displayName"><saml:AttributeValue>Test User</saml:AttributeValue></saml:Attribute>',
      '      <saml:Attribute Name="groups"><saml:AttributeValue>admin,dev</saml:AttributeValue></saml:Attribute>',
      '    </saml:AttributeStatement>',
      '  </saml:Assertion>',
      '</samlp:Response>',
    ].join("\n"));

    it("extracts nameId from response", () => {
      const result = parseSamlResponse(sampleResponse);
      expect(result.nameId).toBe("user@example.com");
    });

    it("extracts issuer from response", () => {
      const result = parseSamlResponse(sampleResponse);
      expect(result.issuer).toBe("https://idp.example.com");
    });

    it("extracts attributes from response", () => {
      const result = parseSamlResponse(sampleResponse);
      expect(result.attributes.email).toBe("user@example.com");
      expect(result.attributes.displayName).toBe("Test User");
      expect(result.attributes.groups).toBe("admin,dev");
    });

    it("extracts assertion XML", () => {
      const result = parseSamlResponse(sampleResponse);
      expect(result.assertion).toContain("saml:Assertion");
      expect(result.assertion).toContain("_assertion1");
    });

    it("throws on invalid base64", () => {
      expect(() => parseSamlResponse("not-valid-base64!!!")).toThrow("Invalid base64");
    });

    it("throws when assertion is missing", () => {
      const noAssertion = btoa('<samlp:Response><saml:Issuer>x</saml:Issuer></samlp:Response>');
      expect(() => parseSamlResponse(noAssertion)).toThrow("No Assertion found");
    });

    it("throws when issuer is missing", () => {
      const noIssuer = btoa('<samlp:Response><saml:Assertion ID="x"><saml:NameID>a@b.c</saml:NameID></saml:Assertion></samlp:Response>');
      expect(() => parseSamlResponse(noIssuer)).toThrow("No Issuer found");
    });
  });

  describe("extractSamlClaims", () => {
    it("extracts email from standard attribute name", () => {
      const claims = extractSamlClaims({ email: "user@example.com" });
      expect(claims.email).toBe("user@example.com");
    });

    it("extracts email from SOAP claim URI", () => {
      const claims = extractSamlClaims({
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": "user@example.com",
      });
      expect(claims.email).toBe("user@example.com");
    });

    it("extracts email from OID format", () => {
      const claims = extractSamlClaims({
        "urn:oid:0.9.2342.19200300.100.1.3": "user@example.com",
      });
      expect(claims.email).toBe("user@example.com");
    });

    it("extracts name when available", () => {
      const claims = extractSamlClaims({
        email: "user@example.com",
        displayName: "Test User",
      });
      expect(claims.name).toBe("Test User");
    });

    it("extracts and splits groups", () => {
      const claims = extractSamlClaims({
        email: "user@example.com",
        groups: "admin, dev, users",
      });
      expect(claims.groups).toEqual(["admin", "dev", "users"]);
    });

    it("returns no name or groups when absent", () => {
      const claims = extractSamlClaims({ email: "user@example.com" });
      expect(claims.name).toBeUndefined();
      expect(claims.groups).toBeUndefined();
    });

    it("throws when no email attribute found", () => {
      expect(() => extractSamlClaims({ displayName: "No Email" })).toThrow("No email attribute");
    });
  });

  describe("buildSpMetadata", () => {
    it("generates valid XML with entity ID", () => {
      const xml = buildSpMetadata(entityId, acsUrl);
      expect(xml).toContain('<?xml version="1.0"');
      expect(xml).toContain(`entityID="${entityId}"`);
    });

    it("includes ACS location", () => {
      const xml = buildSpMetadata(entityId, acsUrl);
      expect(xml).toContain(`Location="${acsUrl}"`);
    });

    it("specifies email NameID format", () => {
      const xml = buildSpMetadata(entityId, acsUrl);
      expect(xml).toContain("nameid-format:emailAddress");
    });

    it("specifies HTTP-POST binding", () => {
      const xml = buildSpMetadata(entityId, acsUrl);
      expect(xml).toContain("bindings:HTTP-POST");
    });

    it("wants assertions signed", () => {
      const xml = buildSpMetadata(entityId, acsUrl);
      expect(xml).toContain('WantAssertionsSigned="true"');
    });
  });
});
