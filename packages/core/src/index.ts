export { loadConfig, defineConfig, TomeConfigSchema } from "./config.js";
export type { TomeConfig } from "./config.js";

export { processMarkdown, processMarkdownFile } from "./markdown.js";
export type { PageFrontmatter, ProcessedPage } from "./markdown.js";

export { discoverPages, buildNavigation, getPrevNext } from "./routes.js";
export type { PageRoute, NavigationItem, NavigationGroup, I18nConfig, VersioningConfig } from "./routes.js";

export { default as tomePlugin } from "./vite-plugin.js";
export type { TomePluginOptions } from "./vite-plugin.js";

export { startMcpServer, loadManifest, searchPages, getPage, listPages } from "./mcp-server.js";
export type { McpManifest, McpPage } from "./mcp-server.js";

export { parseOpenApiSpec } from "./openapi.js";
export type {
  ApiEndpoint,
  ApiManifest,
  ApiParameter,
  ApiRequestBody,
  ApiResponse,
} from "./openapi.js";

export { collectBuildFiles, computeFileHashes, deployToCloud, readAuthToken, saveAuthToken } from "./deploy.js";
export type { DeployConfig, DeployResult } from "./deploy.js";

export {
  STRIPE_PRODUCT_IDS,
  STRIPE_PRICE_IDS,
  PLANS,
  getPlan,
  getTrialDays,
  calculateAnnualDiscount,
  formatPrice,
  createCheckoutSession,
  createPortalSession,
  handleWebhookEvent,
} from "./billing.js";
export type { Plan, Subscription, BillingCustomer } from "./billing.js";

export {
  generateDnsRecords,
  validateDomain,
  checkDomainDns,
  addDomain,
  removeDomain,
  listDomains,
} from "./domains.js";
export type { DomainConfig, DomainStatus, DnsRecord } from "./domains.js";

export { generateAnalyticsScript, aggregateEvents, generateSessionId } from "./analytics.js";
export type {
  PageViewEvent,
  SearchEvent,
  AnalyticsEvent,
  AnalyticsSummary,
} from "./analytics.js";
