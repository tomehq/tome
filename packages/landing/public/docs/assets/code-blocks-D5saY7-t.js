const s={frontmatter:{title:"Code Blocks",description:"Advanced code block features — syntax highlighting, line numbers, titles, line highlighting, and TypeScript hover types with Twoslash.",icon:"code",hidden:!1,toc:!0,draft:!1},html:`<p>Tome uses <a href="https://shiki.style">Shiki</a> for syntax highlighting. All standard fenced code blocks work out of the box with no configuration. This guide covers the additional features available on top of basic highlighting.</p>
<h2 id="syntax-highlighting"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#syntax-highlighting"><span class="icon icon-link"></span></a>Syntax highlighting</h2>
<p>Use a language identifier after the opening fence:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> greeting</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "hello"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">console.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">log</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(greeting);</span></span></code></pre>
<p>Shiki supports <a href="https://shiki.style/languages">200+ languages</a>. Common identifiers: <code>javascript</code>, <code>typescript</code>, <code>python</code>, <code>go</code>, <code>rust</code>, <code>bash</code>, <code>json</code>, <code>yaml</code>, <code>sql</code>, <code>graphql</code>, <code>html</code>, <code>css</code>.</p>
<h2 id="code-block-titles"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#code-block-titles"><span class="icon icon-link"></span></a>Code block titles</h2>
<p>Add a <code>title</code> attribute to show a filename or label above the code block:</p>
<div class="tome-code-block-wrapper"><div class="tome-code-title">tome.config.js</div><pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> default</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre></div>
<p>The title renders as a label bar above the code, styled to match your theme.</p>
<h2 id="line-highlighting"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#line-highlighting"><span class="icon icon-link"></span></a>Line highlighting</h2>
<p>Highlight specific lines using curly braces after the language:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> a</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> 1</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line tome-line-highlight"><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> b</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> 2</span><span style="color:#24292E;--shiki-dark:#E1E4E8">; </span><span style="color:#6A737D;--shiki-dark:#6A737D">// highlighted</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> c</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> 3</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line tome-line-highlight"><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> d</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> 4</span><span style="color:#24292E;--shiki-dark:#E1E4E8">; </span><span style="color:#6A737D;--shiki-dark:#6A737D">// highlighted</span></span></code></pre>
<p>Use ranges for consecutive lines:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line tome-line-highlight"><span style="color:#D73A49;--shiki-dark:#F97583">import</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> { config } </span><span style="color:#D73A49;--shiki-dark:#F97583">from</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> "./config"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;  </span><span style="color:#6A737D;--shiki-dark:#6A737D">// highlighted</span></span>
<span class="line"></span>
<span class="line tome-line-highlight"><span style="color:#D73A49;--shiki-dark:#F97583">export</span><span style="color:#D73A49;--shiki-dark:#F97583"> function</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> init</span><span style="color:#24292E;--shiki-dark:#E1E4E8">() {   </span><span style="color:#6A737D;--shiki-dark:#6A737D">// highlighted</span></span>
<span class="line tome-line-highlight"><span style="color:#24292E;--shiki-dark:#E1E4E8">  config.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">load</span><span style="color:#24292E;--shiki-dark:#E1E4E8">();            </span><span style="color:#6A737D;--shiki-dark:#6A737D">// highlighted</span></span>
<span class="line tome-line-highlight"><span style="color:#24292E;--shiki-dark:#E1E4E8">  config.</span><span style="color:#6F42C1;--shiki-dark:#B392F0">validate</span><span style="color:#24292E;--shiki-dark:#E1E4E8">();        </span><span style="color:#6A737D;--shiki-dark:#6A737D">// highlighted</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>Highlighted lines receive a subtle background color that works in both light and dark mode.</p>
<h2 id="line-numbers"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#line-numbers"><span class="icon icon-link"></span></a>Line numbers</h2>
<p>Show line numbers in the gutter with <code>showLineNumbers</code>:</p>
<pre data-line-numbers="" class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">interface</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> User</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">  id</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">  name</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">  email</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>You can also use <code>lineNumbers</code> as an alias.</p>
<h2 id="combining-features"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#combining-features"><span class="icon icon-link"></span></a>Combining features</h2>
<p>All meta attributes can be combined on a single code fence:</p>
<div class="tome-code-block-wrapper"><div class="tome-code-title">types.ts</div><pre data-line-numbers="" class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">interface</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Config</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">  name</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line tome-line-highlight"><span style="color:#E36209;--shiki-dark:#FFAB70">  theme</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> ThemeOptions</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;   </span><span style="color:#6A737D;--shiki-dark:#6A737D">// highlighted</span></span>
<span class="line tome-line-highlight"><span style="color:#E36209;--shiki-dark:#FFAB70">  plugins</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> Plugin</span><span style="color:#24292E;--shiki-dark:#E1E4E8">[];     </span><span style="color:#6A737D;--shiki-dark:#6A737D">// highlighted</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre></div>
<h2 id="twoslash-typescript-hover-types"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#twoslash-typescript-hover-types"><span class="icon icon-link"></span></a>Twoslash (TypeScript hover types)</h2>
<p>Twoslash renders TypeScript type information inline — the same hover popups you see in VS Code, but rendered statically in your docs. This is powerful for documenting TypeScript APIs where seeing inferred types matters.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">\`\`\`ts twoslash</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> user</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Alice"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  age: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">30</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">user.name;</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">//   ^?</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">\`\`\`</span></span></code></pre>
<p>The <code>^?</code> marker tells Twoslash to show the inferred type at that position. In the rendered output, hovering over <code>user.name</code> displays <code>(property) name: string</code>.</p>
<h3 id="setup"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#setup"><span class="icon icon-link"></span></a>Setup</h3>
<p>Twoslash requires an optional peer dependency:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">npm</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> install</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> @shikijs/twoslash</span></span></code></pre>
<p>If the package is not installed, Tome logs a warning and renders the code block without type annotations — your build won't break.</p>
<h3 id="twoslash-features"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#twoslash-features"><span class="icon icon-link"></span></a>Twoslash features</h3>
<table>
<thead>
<tr>
<th>Syntax</th>
<th>Effect</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>//  ^?</code></td>
<td>Show type at cursor position</td>
</tr>
<tr>
<td><code>// @errors: 2304</code></td>
<td>Expect and display a TypeScript error</td>
</tr>
<tr>
<td><code>// @noErrors</code></td>
<td>Suppress all TypeScript errors</td>
</tr>
<tr>
<td><code>// ---cut---</code></td>
<td>Hide code above this line (setup code)</td>
</tr>
</tbody>
</table>
<p>Example with hidden setup code:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">\`\`\`ts twoslash</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">interface</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> User</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">  id</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">  name</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> string</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">// ---cut---</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">function</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> greet</span><span style="color:#24292E;--shiki-dark:#E1E4E8">(</span><span style="color:#E36209;--shiki-dark:#FFAB70">user</span><span style="color:#D73A49;--shiki-dark:#F97583">:</span><span style="color:#6F42C1;--shiki-dark:#B392F0"> User</span><span style="color:#24292E;--shiki-dark:#E1E4E8">) {</span></span>
<span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">  return</span><span style="color:#032F62;--shiki-dark:#9ECBFF"> \`Hello, \${</span><span style="color:#24292E;--shiki-dark:#E1E4E8">user</span><span style="color:#032F62;--shiki-dark:#9ECBFF">.</span><span style="color:#24292E;--shiki-dark:#E1E4E8">name</span><span style="color:#032F62;--shiki-dark:#9ECBFF">}\`</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">//              ^?</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">\`\`\`</span></span></code></pre>
<p>Only the code below <code>---cut---</code> is shown in the rendered output, but the <code>User</code> type is still available for inference.</p>
<h2 id="copy-button"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#copy-button"><span class="icon icon-link"></span></a>Copy button</h2>
<p>Every code block includes a copy-to-clipboard button in the top-right corner. This is automatic — no configuration or markup needed.</p>
<h2 id="diff-highlighting"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#diff-highlighting"><span class="icon icon-link"></span></a>Diff highlighting</h2>
<p>Show added and removed lines in code blocks using inline markers:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#D73A49;--shiki-dark:#F97583">const</span><span style="color:#005CC5;--shiki-dark:#79B8FF"> config</span><span style="color:#D73A49;--shiki-dark:#F97583"> =</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line tome-line-removed"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"My Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,    </span></span>
<span class="line tome-line-added"><span style="color:#24292E;--shiki-dark:#E1E4E8">  name: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Acme Docs"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,  </span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">};</span></span></code></pre>
<p>Lines marked with <code>// [!code --]</code> are styled with a red background, and <code>// [!code ++]</code> with a green background. The markers are stripped from the rendered output.</p>`,headings:[{depth:2,text:"Syntax highlighting",id:"syntax-highlighting"},{depth:2,text:"Code block titles",id:"code-block-titles"},{depth:2,text:"Line highlighting",id:"line-highlighting"},{depth:2,text:"Line numbers",id:"line-numbers"},{depth:2,text:"Combining features",id:"combining-features"},{depth:2,text:"Twoslash (TypeScript hover types)",id:"twoslash-typescript-hover-types"},{depth:3,text:"Setup",id:"setup"},{depth:3,text:"Twoslash features",id:"twoslash-features"},{depth:2,text:"Copy button",id:"copy-button"},{depth:2,text:"Diff highlighting",id:"diff-highlighting"}],raw:`
Tome uses [Shiki](https://shiki.style) for syntax highlighting. All standard fenced code blocks work out of the box with no configuration. This guide covers the additional features available on top of basic highlighting.

## Syntax highlighting

Use a language identifier after the opening fence:

\`\`\`javascript
const greeting = "hello";
console.log(greeting);
\`\`\`

Shiki supports [200+ languages](https://shiki.style/languages). Common identifiers: \`javascript\`, \`typescript\`, \`python\`, \`go\`, \`rust\`, \`bash\`, \`json\`, \`yaml\`, \`sql\`, \`graphql\`, \`html\`, \`css\`.

## Code block titles

Add a \`title\` attribute to show a filename or label above the code block:

\`\`\`javascript title="tome.config.js"
export default {
  name: "My Docs",
};
\`\`\`

The title renders as a label bar above the code, styled to match your theme.

## Line highlighting

Highlight specific lines using curly braces after the language:

\`\`\`javascript {2,4}
const a = 1;
const b = 2; // highlighted
const c = 3;
const d = 4; // highlighted
\`\`\`

Use ranges for consecutive lines:

\`\`\`javascript {1,3-5}
import { config } from "./config";  // highlighted

export function init() {   // highlighted
  config.load();            // highlighted
  config.validate();        // highlighted
}
\`\`\`

Highlighted lines receive a subtle background color that works in both light and dark mode.

## Line numbers

Show line numbers in the gutter with \`showLineNumbers\`:

\`\`\`typescript showLineNumbers
interface User {
  id: string;
  name: string;
  email: string;
}
\`\`\`

You can also use \`lineNumbers\` as an alias.

## Combining features

All meta attributes can be combined on a single code fence:

\`\`\`typescript title="types.ts" showLineNumbers {3-4}
interface Config {
  name: string;
  theme: ThemeOptions;   // highlighted
  plugins: Plugin[];     // highlighted
}
\`\`\`

## Twoslash (TypeScript hover types)

Twoslash renders TypeScript type information inline — the same hover popups you see in VS Code, but rendered statically in your docs. This is powerful for documenting TypeScript APIs where seeing inferred types matters.

\`\`\`\`markdown
\`\`\`ts twoslash
const user = {
  name: "Alice",
  age: 30,
};

user.name;
//   ^?
\`\`\`
\`\`\`\`

The \`^?\` marker tells Twoslash to show the inferred type at that position. In the rendered output, hovering over \`user.name\` displays \`(property) name: string\`.

### Setup

Twoslash requires an optional peer dependency:

\`\`\`bash
npm install @shikijs/twoslash
\`\`\`

If the package is not installed, Tome logs a warning and renders the code block without type annotations — your build won't break.

### Twoslash features

| Syntax | Effect |
|--------|--------|
| \`//  ^?\` | Show type at cursor position |
| \`// @errors: 2304\` | Expect and display a TypeScript error |
| \`// @noErrors\` | Suppress all TypeScript errors |
| \`// ---cut---\` | Hide code above this line (setup code) |

Example with hidden setup code:

\`\`\`\`markdown
\`\`\`ts twoslash
interface User {
  id: string;
  name: string;
}
// ---cut---
function greet(user: User) {
  return \`Hello, \${user.name}\`;
}
//              ^?
\`\`\`
\`\`\`\`

Only the code below \`---cut---\` is shown in the rendered output, but the \`User\` type is still available for inference.

## Copy button

Every code block includes a copy-to-clipboard button in the top-right corner. This is automatic — no configuration or markup needed.

## Diff highlighting

Show added and removed lines in code blocks using inline markers:

\`\`\`javascript
const config = {
  name: "My Docs",    // [!code --]
  name: "Acme Docs",  // [!code ++]
};
\`\`\`

Lines marked with \`// [!code --]\` are styled with a red background, and \`// [!code ++]\` with a green background. The markers are stripped from the rendered output.
`};export{s as default};
