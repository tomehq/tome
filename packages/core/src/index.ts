export { loadConfig, defineConfig, TomeConfigSchema } from "./config.js";
export type { TomeConfig, TomePlugin } from "./config.js";

export function definePlugin(plugin: import("./config.js").TomePlugin): import("./config.js").TomePlugin {
  return plugin;
}

export { processMarkdown, processMarkdownFile, parseCodeMeta, enhanceCodeBlock, extractCodeFenceMetas } from "./markdown.js";
export type { PageFrontmatter, ProcessedPage, CodeMeta } from "./markdown.js";

export { discoverPages, buildNavigation, getPrevNext, normalizeBadge } from "./routes.js";
export type { PageRoute, NavigationItem, NavigationGroup, I18nConfig, VersioningConfig, Badge, BadgeVariant } from "./routes.js";

export { default as tomePlugin } from "./vite-plugin.js";
export type { TomePluginOptions } from "./vite-plugin.js";

export { createMcpServer, startMcpServer, loadManifest, searchPages, getPage, listPages } from "./mcp-server.js";
export type { McpManifest, McpPage } from "./mcp-server.js";

export { parseOpenApiSpec, generateCodeSamples } from "./openapi.js";
export type {
  ApiEndpoint,
  ApiManifest,
  ApiParameter,
  ApiRequestBody,
  ApiResponse,
  CodeSample,
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

export { extractDocEntries, extractDocEntriesFromSource, generateMarkdown, generateTypeDocs } from "./typedoc.js";
export type { TypeDocConfig, DocEntry, DocMember, DocParam } from "./typedoc.js";

export { generateAnalyticsScript, aggregateEvents, generateSessionId } from "./analytics.js";
export type {
  PageViewEvent,
  SearchEvent,
  AnalyticsEvent,
  AnalyticsSummary,
} from "./analytics.js";

export {
  defineContentSource,
  githubSource,
  notionSource,
  notionBlocksToMarkdown,
  richTextToMd,
  fetchRemoteContent,
} from "./content-source.js";
export type {
  ContentPage,
  ContentSource,
  GitHubSourceOptions,
  NotionSourceOptions,
} from "./content-source.js";
