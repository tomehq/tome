import ts from "typescript";
import { writeFileSync, mkdirSync } from "fs";
import { join, resolve } from "path";

// ── TYPES ───────────────────────────────────────────────

export interface TypeDocConfig {
  /** Entry point files to document */
  entryPoints: string[];
  /** Output directory for generated .md files (default: "pages/api") */
  outputDir?: string;
  /** tsconfig.json path (default: "tsconfig.json") */
  tsconfig?: string;
}

export interface DocEntry {
  name: string;
  kind: "function" | "interface" | "type" | "class" | "enum" | "variable" | "constant";
  description?: string;
  signature?: string;
  members?: DocMember[];
  parameters?: DocParam[];
  returnType?: string;
  exported: boolean;
}

export interface DocMember {
  name: string;
  type: string;
  optional: boolean;
  description?: string;
}

export interface DocParam {
  name: string;
  type: string;
  optional: boolean;
  description?: string;
}

// ── HELPERS ─────────────────────────────────────────────

function getJsDocComment(node: ts.Node, sourceFile: ts.SourceFile): string | undefined {
  const fullText = sourceFile.getFullText();
  const ranges = ts.getLeadingCommentRanges(fullText, node.getFullStart());
  if (!ranges) return undefined;

  for (const range of ranges) {
    const comment = fullText.slice(range.pos, range.end);
    if (comment.startsWith("/**")) {
      // Strip comment markers and clean up
      return comment
        .replace(/^\/\*\*\s*/, "")
        .replace(/\s*\*\/$/, "")
        .split("\n")
        .map((line) => line.replace(/^\s*\*\s?/, ""))
        .filter((line) => !line.startsWith("@"))
        .join("\n")
        .trim();
    }
  }
  return undefined;
}

function getJsDocParamDescriptions(node: ts.Node, sourceFile: ts.SourceFile): Map<string, string> {
  const map = new Map<string, string>();
  const fullText = sourceFile.getFullText();
  const ranges = ts.getLeadingCommentRanges(fullText, node.getFullStart());
  if (!ranges) return map;

  for (const range of ranges) {
    const comment = fullText.slice(range.pos, range.end);
    if (comment.startsWith("/**")) {
      const lines = comment.split("\n");
      for (const line of lines) {
        const match = line.match(/@param\s+(\w+)\s+(.*)/);
        if (match) {
          map.set(match[1], match[2].replace(/\*\/$/, "").trim());
        }
      }
      // Also check @returns
      for (const line of lines) {
        const match = line.match(/@returns?\s+(.*)/);
        if (match) {
          map.set("@returns", match[1].replace(/\*\/$/, "").trim());
        }
      }
    }
  }
  return map;
}

function getJsDocMemberDescription(node: ts.Node, sourceFile: ts.SourceFile): string | undefined {
  const fullText = sourceFile.getFullText();
  const ranges = ts.getLeadingCommentRanges(fullText, node.getFullStart());
  if (!ranges) return undefined;

  for (const range of ranges) {
    const comment = fullText.slice(range.pos, range.end);
    if (comment.startsWith("/**")) {
      return comment
        .replace(/^\/\*\*\s*/, "")
        .replace(/\s*\*\/$/, "")
        .split("\n")
        .map((line) => line.replace(/^\s*\*\s?/, ""))
        .join(" ")
        .trim();
    }
  }
  return undefined;
}

function isExported(node: ts.Node): boolean {
  if (ts.canHaveModifiers(node)) {
    const modifiers = ts.getModifiers(node);
    if (modifiers) {
      return modifiers.some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
    }
  }
  return false;
}

// ── EXTRACTION ──────────────────────────────────────────

export function extractDocEntries(entryPoints: string[], tsconfigPath?: string): DocEntry[] {
  // Load compiler options from tsconfig if available
  let compilerOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    strict: true,
    esModuleInterop: true,
    skipLibCheck: true,
  };

  if (tsconfigPath) {
    const configFile = ts.readConfigFile(tsconfigPath, ts.sys.readFile);
    if (!configFile.error) {
      const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, resolve(tsconfigPath, ".."));
      compilerOptions = parsed.options;
    }
  }

  const program = ts.createProgram(entryPoints, compilerOptions);
  const checker = program.getTypeChecker();
  const entries: DocEntry[] = [];

  for (const sourceFile of program.getSourceFiles()) {
    // Only process our entry point files
    const normalizedPath = resolve(sourceFile.fileName);
    const isEntryPoint = entryPoints.some((ep) => resolve(ep) === normalizedPath);
    if (!isEntryPoint) continue;

    ts.forEachChild(sourceFile, (node) => {
      const entry = visitNode(node, sourceFile, checker);
      if (entry) entries.push(entry);
    });
  }

  return entries;
}

/**
 * Extract doc entries from inline TypeScript source code.
 * Useful for testing without writing files to disk.
 */
export function extractDocEntriesFromSource(source: string, fileName = "input.ts"): DocEntry[] {
  const sourceFile = ts.createSourceFile(fileName, source, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);

  // Create a program with an in-memory host
  const host: ts.CompilerHost = {
    getSourceFile: (name) => (name === fileName ? sourceFile : undefined),
    getDefaultLibFileName: () => "lib.d.ts",
    writeFile: () => {},
    getCurrentDirectory: () => "",
    getCanonicalFileName: (f) => f,
    useCaseSensitiveFileNames: () => true,
    getNewLine: () => "\n",
    fileExists: (f) => f === fileName,
    readFile: (f) => (f === fileName ? source : undefined),
  };

  const program = ts.createProgram([fileName], {
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    strict: true,
  }, host);

  const checker = program.getTypeChecker();
  const entries: DocEntry[] = [];
  const sf = program.getSourceFile(fileName);
  if (!sf) return entries;

  ts.forEachChild(sf, (node) => {
    const entry = visitNode(node, sf, checker);
    if (entry) entries.push(entry);
  });

  return entries;
}

function visitNode(node: ts.Node, sourceFile: ts.SourceFile, checker: ts.TypeChecker): DocEntry | null {
  const exported = isExported(node);

  // Function declaration
  if (ts.isFunctionDeclaration(node) && node.name) {
    const description = getJsDocComment(node, sourceFile);
    const paramDescs = getJsDocParamDescriptions(node, sourceFile);
    const params: DocParam[] = node.parameters.map((p) => ({
      name: p.name.getText(sourceFile),
      type: p.type ? p.type.getText(sourceFile) : "unknown",
      optional: !!p.questionToken || !!p.initializer,
      description: paramDescs.get(p.name.getText(sourceFile)),
    }));
    const returnType = node.type ? node.type.getText(sourceFile) : "void";
    const paramStr = params.map((p) => `${p.name}${p.optional ? "?" : ""}: ${p.type}`).join(", ");
    const signature = `${node.name.text}(${paramStr}): ${returnType}`;

    return {
      name: node.name.text,
      kind: "function",
      description,
      signature,
      parameters: params,
      returnType,
      exported,
    };
  }

  // Interface declaration
  if (ts.isInterfaceDeclaration(node) && node.name) {
    const description = getJsDocComment(node, sourceFile);
    const members: DocMember[] = [];

    for (const member of node.members) {
      if (ts.isPropertySignature(member) && member.name) {
        members.push({
          name: member.name.getText(sourceFile),
          type: member.type ? member.type.getText(sourceFile) : "unknown",
          optional: !!member.questionToken,
          description: getJsDocMemberDescription(member, sourceFile),
        });
      }
      if (ts.isMethodSignature(member) && member.name) {
        const params = member.parameters.map((p) => `${p.name.getText(sourceFile)}: ${p.type ? p.type.getText(sourceFile) : "unknown"}`).join(", ");
        const ret = member.type ? member.type.getText(sourceFile) : "void";
        members.push({
          name: member.name.getText(sourceFile),
          type: `(${params}) => ${ret}`,
          optional: !!member.questionToken,
          description: getJsDocMemberDescription(member, sourceFile),
        });
      }
    }

    return {
      name: node.name.text,
      kind: "interface",
      description,
      members,
      exported,
    };
  }

  // Type alias
  if (ts.isTypeAliasDeclaration(node) && node.name) {
    const description = getJsDocComment(node, sourceFile);
    const typeText = node.type.getText(sourceFile);
    const members: DocMember[] = [];

    // If it's an object type literal, extract members
    if (ts.isTypeLiteralNode(node.type)) {
      for (const member of node.type.members) {
        if (ts.isPropertySignature(member) && member.name) {
          members.push({
            name: member.name.getText(sourceFile),
            type: member.type ? member.type.getText(sourceFile) : "unknown",
            optional: !!member.questionToken,
            description: getJsDocMemberDescription(member, sourceFile),
          });
        }
      }
    }

    return {
      name: node.name.text,
      kind: "type",
      description,
      signature: `type ${node.name.text} = ${typeText}`,
      members: members.length > 0 ? members : undefined,
      exported,
    };
  }

  // Class declaration
  if (ts.isClassDeclaration(node) && node.name) {
    const description = getJsDocComment(node, sourceFile);
    const members: DocMember[] = [];

    for (const member of node.members) {
      if (ts.isPropertyDeclaration(member) && member.name) {
        members.push({
          name: member.name.getText(sourceFile),
          type: member.type ? member.type.getText(sourceFile) : "unknown",
          optional: !!member.questionToken,
          description: getJsDocMemberDescription(member, sourceFile),
        });
      }
      if (ts.isMethodDeclaration(member) && member.name) {
        const params = member.parameters.map((p) => `${p.name.getText(sourceFile)}: ${p.type ? p.type.getText(sourceFile) : "unknown"}`).join(", ");
        const ret = member.type ? member.type.getText(sourceFile) : "void";
        members.push({
          name: member.name.getText(sourceFile),
          type: `(${params}) => ${ret}`,
          optional: false,
          description: getJsDocMemberDescription(member, sourceFile),
        });
      }
    }

    return {
      name: node.name.text,
      kind: "class",
      description,
      members,
      exported,
    };
  }

  // Enum declaration
  if (ts.isEnumDeclaration(node) && node.name) {
    const description = getJsDocComment(node, sourceFile);
    const members: DocMember[] = node.members.map((m) => ({
      name: m.name.getText(sourceFile),
      type: m.initializer ? m.initializer.getText(sourceFile) : "number",
      optional: false,
      description: getJsDocMemberDescription(m, sourceFile),
    }));

    return {
      name: node.name.text,
      kind: "enum",
      description,
      members,
      exported,
    };
  }

  // Variable statement (const/let)
  if (ts.isVariableStatement(node)) {
    const exported = isExported(node);
    const decl = node.declarationList.declarations[0];
    if (decl && ts.isIdentifier(decl.name)) {
      const description = getJsDocComment(node, sourceFile);
      const isConst = (node.declarationList.flags & ts.NodeFlags.Const) !== 0;
      const typeStr = decl.type ? decl.type.getText(sourceFile) : decl.initializer ? decl.initializer.getText(sourceFile) : "unknown";

      return {
        name: decl.name.text,
        kind: isConst ? "constant" : "variable",
        description,
        signature: `${isConst ? "const" : "let"} ${decl.name.text}: ${decl.type ? decl.type.getText(sourceFile) : typeStr}`,
        exported,
      };
    }
  }

  return null;
}

// ── MARKDOWN GENERATION ─────────────────────────────────

export function generateMarkdown(entry: DocEntry): string {
  const lines: string[] = [];

  // Frontmatter
  lines.push("---");
  lines.push(`title: ${entry.name}`);
  if (entry.description) {
    // Use first line of description for frontmatter
    const firstLine = entry.description.split("\n")[0];
    lines.push(`description: ${firstLine}`);
  }
  lines.push("---");
  lines.push("");

  // Heading with signature or name
  if (entry.kind === "function" && entry.signature) {
    lines.push(`## \`${entry.signature}\``);
  } else if (entry.kind === "type" && entry.signature) {
    lines.push(`## \`${entry.signature}\``);
  } else if (entry.kind === "class") {
    lines.push(`## class \`${entry.name}\``);
  } else if (entry.kind === "interface") {
    lines.push(`## interface \`${entry.name}\``);
  } else if (entry.kind === "enum") {
    lines.push(`## enum \`${entry.name}\``);
  } else if (entry.signature) {
    lines.push(`## \`${entry.signature}\``);
  } else {
    lines.push(`## \`${entry.name}\``);
  }
  lines.push("");

  // Description
  if (entry.description) {
    lines.push(entry.description);
    lines.push("");
  }

  // Parameters table (for functions)
  if (entry.parameters && entry.parameters.length > 0) {
    lines.push("### Parameters");
    lines.push("");
    lines.push("| Name | Type | Required | Description |");
    lines.push("|------|------|----------|-------------|");
    for (const p of entry.parameters) {
      const desc = p.description || "";
      lines.push(`| ${p.name} | \`${p.type}\` | ${p.optional ? "No" : "Yes"} | ${desc} |`);
    }
    lines.push("");
  }

  // Return type (for functions)
  if (entry.kind === "function" && entry.returnType) {
    lines.push("### Returns");
    lines.push("");
    lines.push(`\`${entry.returnType}\``);
    lines.push("");
  }

  // Members table (for interfaces, classes, types, enums)
  if (entry.members && entry.members.length > 0) {
    if (entry.kind === "enum") {
      lines.push("### Values");
    } else {
      lines.push("### Properties");
    }
    lines.push("");
    lines.push("| Name | Type | Required | Description |");
    lines.push("|------|------|----------|-------------|");
    for (const m of entry.members) {
      const desc = m.description || "";
      lines.push(`| ${m.name} | \`${m.type}\` | ${m.optional ? "No" : "Yes"} | ${desc} |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

function generateIndexMarkdown(entries: DocEntry[]): string {
  const lines: string[] = [];

  lines.push("---");
  lines.push("title: API Reference");
  lines.push("description: Auto-generated API documentation");
  lines.push("---");
  lines.push("");
  lines.push("# API Reference");
  lines.push("");

  // Group by kind
  const groups: Record<string, DocEntry[]> = {};
  for (const entry of entries) {
    const group = groups[entry.kind] || [];
    group.push(entry);
    groups[entry.kind] = group;
  }

  const kindLabels: Record<string, string> = {
    function: "Functions",
    interface: "Interfaces",
    type: "Types",
    class: "Classes",
    enum: "Enums",
    variable: "Variables",
    constant: "Constants",
  };

  const kindOrder = ["function", "class", "interface", "type", "enum", "constant", "variable"];

  for (const kind of kindOrder) {
    const group = groups[kind];
    if (!group || group.length === 0) continue;

    lines.push(`## ${kindLabels[kind] || kind}`);
    lines.push("");
    lines.push("| Name | Description |");
    lines.push("|------|-------------|");
    for (const entry of group) {
      const slug = entry.name.toLowerCase();
      const desc = entry.description ? entry.description.split("\n")[0] : "";
      lines.push(`| [\`${entry.name}\`](${slug}) | ${desc} |`);
    }
    lines.push("");
  }

  return lines.join("\n");
}

// ── MAIN GENERATOR ──────────────────────────────────────

export function generateTypeDocs(config: TypeDocConfig): void {
  const outputDir = config.outputDir || "pages/api";
  const tsconfigPath = config.tsconfig || undefined;

  if (config.entryPoints.length === 0) {
    throw new Error("No entry points provided. Pass TypeScript file paths to document.");
  }

  // Resolve entry points to absolute paths
  const resolvedEntryPoints = config.entryPoints.map((ep) => resolve(ep));

  const entries = extractDocEntries(resolvedEntryPoints, tsconfigPath);

  // Filter to exported-only entries
  const exported = entries.filter((e) => e.exported);

  if (exported.length === 0) {
    console.log("  No exported declarations found in the provided entry points.");
    return;
  }

  // Create output directory
  mkdirSync(resolve(outputDir), { recursive: true });

  // Generate individual pages
  for (const entry of exported) {
    const md = generateMarkdown(entry);
    const fileName = `${entry.name.toLowerCase()}.md`;
    writeFileSync(join(resolve(outputDir), fileName), md);
  }

  // Generate index page
  const indexMd = generateIndexMarkdown(exported);
  writeFileSync(join(resolve(outputDir), "index.md"), indexMd);

  console.log(`  Generated ${exported.length} page(s) in ${outputDir}/`);
}
