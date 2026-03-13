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
  PLANS,
  getPlan,
  getTrialDays,
  calculateAnnualDiscount,
  formatPrice,
  createCheckoutSession,
  createPortalSession,
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

export {
  slugifyBranch,
  getPreviewUrl,
  getExpiryDate,
  detectBranch,
  detectCommitSha,
  detectPrNumber,
  generatePreviewBanner,
  deployPreview,
  listPreviews,
  deletePreview,
} from "./preview.js";
export type { PreviewConfig, PreviewResult, PreviewDeployment } from "./preview.js";

export { checkLinks, extractInternalLinks, formatLinkCheckResults } from "./link-checker.js";
export type { BrokenLink, LinkCheckResult } from "./link-checker.js";

export { getGitLastUpdated, getGitDatesForFiles, formatRelativeDate } from "./git-dates.js";

export { parseChangelog, getSectionColor, filterEntries } from "./changelog.js";
export type { ChangelogEntry, ChangelogSection, ChangelogSectionType } from "./changelog.js";

export {
  lintPages,
  formatLintResults,
  checkHeadingIncrement,
  checkImageAltText,
  checkParagraphLength,
  checkSingleH1,
  checkEmptyLinks,
  checkBannedWords,
} from "./linter.js";
export type { LintIssue, LintResult, LintRuleConfig } from "./linter.js";

export {
  generateOgSvg,
  buildOgTemplate,
  buildOgConfig,
  generateOgImages,
  generateOgMetaTags,
} from "./og-image.js";
export type { OgImageConfig, OgImageResult } from "./og-image.js";

export {
  formatSlackPayload,
  formatDiscordPayload,
  formatHttpPayload,
  formatEventTitle,
  maskUrl,
  signPayload,
  sendWebhook,
  dispatchWebhooks,
  createDeployPayload,
  createDeployFailedPayload,
  createPreviewPayload,
  createDomainVerifiedPayload,
} from "./webhooks.js";
export type {
  WebhookChannel,
  WebhookEventType,
  WebhookConfig,
  WebhookPayload,
  WebhookResult,
} from "./webhooks.js";

export { migrateFromGitbook, parseSummaryNavigation, convertGitbookContent, parseGitbookConfig } from "./migrate-gitbook.js";
export type { MigrationResult as GitbookMigrationResult } from "./migrate-gitbook.js";

export { migrateFromMintlify, parseMintConfig, convertMintNavigation, convertMintConfig, convertMintlifyContent } from "./migrate-mintlify.js";
export type { MigrationResult as MintlifyMigrationResult } from "./migrate-mintlify.js";

export { generateAnalyticsScript, aggregateEvents, generateSessionId } from "./analytics.js";
export type {
  PageViewEvent,
  SearchEvent,
  AnalyticsEvent,
  AnalyticsSummary,
} from "./analytics.js";
