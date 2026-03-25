const s={frontmatter:{title:"Theming",description:"Customize the look of your Tome site — presets, colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1,toc:!0,draft:!1},html:`<p>Tome ships with four theme presets and extensive customization options. Every visual aspect — colors, fonts, spacing — can be adjusted through configuration or CSS variables.</p>
<h2 id="presets"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#presets"><span class="icon icon-link"></span></a>Presets</h2>
<h3 id="amber-default"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#amber-default"><span class="icon icon-link"></span></a>Amber (default)</h3>
<p>A warm, golden aesthetic with serif headings. Clean and approachable.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  preset</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"amber"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h3 id="editorial"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#editorial"><span class="icon icon-link"></span></a>Editorial</h3>
<p>Swiss poster-inspired design with a coral accent, grotesque typography, and deep navy dark mode.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  preset</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"editorial"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h3 id="cipher"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#cipher"><span class="icon icon-link"></span></a>Cipher</h3>
<p>Cyberpunk aesthetic with acid yellow-green text, vibrant blue accents, and high-contrast serif display headings.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  preset</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"cipher"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h3 id="mint"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#mint"><span class="icon icon-link"></span></a>Mint</h3>
<p>Mintlify-inspired design with emerald green accents, Inter typography, and a clean SaaS-docs feel.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  preset</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"mint"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h2 id="custom-accent-color"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#custom-accent-color"><span class="icon icon-link"></span></a>Custom accent color</h2>
<p>Override the default accent color with any hex value:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  preset</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"amber"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  accent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"#2563eb"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,  </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Blue accent</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>Tome derives tint and dim variants automatically from your accent color.</p>
<h2 id="dark-mode"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#dark-mode"><span class="icon icon-link"></span></a>Dark mode</h2>
<p>Control the color scheme:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  mode</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"auto"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,   </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Follows system preference (default)</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">  // mode: "light",  // Always light</span></span>
<span class="line"><span style="color:#6A737D;--shiki-dark:#6A737D">  // mode: "dark",   // Always dark</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>When set to <code>auto</code>, a theme toggle appears in the sidebar. The default fallback is light mode when system preference is unavailable.</p>
<h2 id="custom-fonts"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#custom-fonts"><span class="icon icon-link"></span></a>Custom fonts</h2>
<p>Override any of the three font families:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  fonts</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    heading</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Playfair Display"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    body</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Inter"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    code</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"JetBrains Mono"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>Load your fonts via Google Fonts in <code>index.html</code> or self-host them.</p>
<h2 id="border-radius"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#border-radius"><span class="icon icon-link"></span></a>Border radius</h2>
<p>Control the roundness of UI elements:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  radius</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">8</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,  </span><span style="color:#6A737D;--shiki-dark:#6A737D">// pixels, default varies by preset</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h2 id="css-variables"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#css-variables"><span class="icon icon-link"></span></a>CSS variables</h2>
<p>For fine-grained control, override CSS variables directly. Add a <code>&lt;style&gt;</code> block in your <code>index.html</code>:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">&lt;</span><span style="color:#22863A;--shiki-dark:#85E89D">style</span><span style="color:#24292E;--shiki-dark:#E1E4E8">&gt;</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  :root</span><span style="color:#24292E;--shiki-dark:#E1E4E8"> {</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --ac</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#2563eb</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;      </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Accent */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --acD</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#dbeafe</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;     </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Accent dim */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --acT</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#1e40af</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;     </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Accent hover */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --bg</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#ffffff</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;      </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Background */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --sf</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#f8f8f6</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;      </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Surface */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --sfH</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#f0efe8</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;     </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Surface hover */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --tx</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#1a1a1a</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;      </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Text primary */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --tx2</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#666</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;        </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Text secondary */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --txM</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#999</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;        </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Text muted */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --bd</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#e5e5e0</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;      </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Border */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --cdBg</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#f5f5f0</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;    </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Code background */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --cdTx</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#333</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;       </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Code text */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --sbBg</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#fafaf8</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;    </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Sidebar background */</span></span>
<span class="line"><span style="color:#E36209;--shiki-dark:#FFAB70">    --hdBg</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#005CC5;--shiki-dark:#79B8FF">#ffffff</span><span style="color:#24292E;--shiki-dark:#E1E4E8">;    </span><span style="color:#6A737D;--shiki-dark:#6A737D">/* Header background */</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  }</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">&lt;/</span><span style="color:#22863A;--shiki-dark:#85E89D">style</span><span style="color:#24292E;--shiki-dark:#E1E4E8">&gt;</span></span></code></pre>
<h3 id="variable-reference"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#variable-reference"><span class="icon icon-link"></span></a>Variable reference</h3>
<table>
<thead>
<tr>
<th>Variable</th>
<th>Purpose</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--ac</code></td>
<td>Accent color (links, highlights)</td>
</tr>
<tr>
<td><code>--acD</code></td>
<td>Accent dim (callout backgrounds, subtle tints)</td>
</tr>
<tr>
<td><code>--acT</code></td>
<td>Accent hover (transition state)</td>
</tr>
<tr>
<td><code>--bg</code></td>
<td>Page background</td>
</tr>
<tr>
<td><code>--sf</code> / <code>--sfH</code></td>
<td>Surface and surface hover</td>
</tr>
<tr>
<td><code>--tx</code> / <code>--tx2</code> / <code>--txM</code></td>
<td>Text primary, secondary, muted</td>
</tr>
<tr>
<td><code>--bd</code></td>
<td>Borders</td>
</tr>
<tr>
<td><code>--cdBg</code> / <code>--cdTx</code></td>
<td>Code block background and text</td>
</tr>
<tr>
<td><code>--sbBg</code></td>
<td>Sidebar background</td>
</tr>
<tr>
<td><code>--hdBg</code></td>
<td>Header background</td>
</tr>
<tr>
<td><code>--font-heading</code></td>
<td>Heading font family</td>
</tr>
<tr>
<td><code>--font-body</code></td>
<td>Body font family</td>
</tr>
<tr>
<td><code>--font-code</code></td>
<td>Code font family</td>
</tr>
</tbody>
</table>`,headings:[{depth:2,text:"Presets",id:"presets"},{depth:3,text:"Amber (default)",id:"amber-default"},{depth:3,text:"Editorial",id:"editorial"},{depth:3,text:"Cipher",id:"cipher"},{depth:3,text:"Mint",id:"mint"},{depth:2,text:"Custom accent color",id:"custom-accent-color"},{depth:2,text:"Dark mode",id:"dark-mode"},{depth:2,text:"Custom fonts",id:"custom-fonts"},{depth:2,text:"Border radius",id:"border-radius"},{depth:2,text:"CSS variables",id:"css-variables"},{depth:3,text:"Variable reference",id:"variable-reference"}],raw:`
Tome ships with four theme presets and extensive customization options. Every visual aspect — colors, fonts, spacing — can be adjusted through configuration or CSS variables.

## Presets

### Amber (default)

A warm, golden aesthetic with serif headings. Clean and approachable.

\`\`\`javascript
theme: {
  preset: "amber",
}
\`\`\`

### Editorial

Swiss poster-inspired design with a coral accent, grotesque typography, and deep navy dark mode.

\`\`\`javascript
theme: {
  preset: "editorial",
}
\`\`\`

### Cipher

Cyberpunk aesthetic with acid yellow-green text, vibrant blue accents, and high-contrast serif display headings.

\`\`\`javascript
theme: {
  preset: "cipher",
}
\`\`\`

### Mint

Mintlify-inspired design with emerald green accents, Inter typography, and a clean SaaS-docs feel.

\`\`\`javascript
theme: {
  preset: "mint",
}
\`\`\`

## Custom accent color

Override the default accent color with any hex value:

\`\`\`javascript
theme: {
  preset: "amber",
  accent: "#2563eb",  // Blue accent
}
\`\`\`

Tome derives tint and dim variants automatically from your accent color.

## Dark mode

Control the color scheme:

\`\`\`javascript
theme: {
  mode: "auto",   // Follows system preference (default)
  // mode: "light",  // Always light
  // mode: "dark",   // Always dark
}
\`\`\`

When set to \`auto\`, a theme toggle appears in the sidebar. The default fallback is light mode when system preference is unavailable.

## Custom fonts

Override any of the three font families:

\`\`\`javascript
theme: {
  fonts: {
    heading: "Playfair Display",
    body: "Inter",
    code: "JetBrains Mono",
  },
}
\`\`\`

Load your fonts via Google Fonts in \`index.html\` or self-host them.

## Border radius

Control the roundness of UI elements:

\`\`\`javascript
theme: {
  radius: 8,  // pixels, default varies by preset
}
\`\`\`

## CSS variables

For fine-grained control, override CSS variables directly. Add a \`<style>\` block in your \`index.html\`:

\`\`\`html
<style>
  :root {
    --ac: #2563eb;      /* Accent */
    --acD: #dbeafe;     /* Accent dim */
    --acT: #1e40af;     /* Accent hover */
    --bg: #ffffff;      /* Background */
    --sf: #f8f8f6;      /* Surface */
    --sfH: #f0efe8;     /* Surface hover */
    --tx: #1a1a1a;      /* Text primary */
    --tx2: #666;        /* Text secondary */
    --txM: #999;        /* Text muted */
    --bd: #e5e5e0;      /* Border */
    --cdBg: #f5f5f0;    /* Code background */
    --cdTx: #333;       /* Code text */
    --sbBg: #fafaf8;    /* Sidebar background */
    --hdBg: #ffffff;    /* Header background */
  }
</style>
\`\`\`

### Variable reference

| Variable | Purpose |
|----------|---------|
| \`--ac\` | Accent color (links, highlights) |
| \`--acD\` | Accent dim (callout backgrounds, subtle tints) |
| \`--acT\` | Accent hover (transition state) |
| \`--bg\` | Page background |
| \`--sf\` / \`--sfH\` | Surface and surface hover |
| \`--tx\` / \`--tx2\` / \`--txM\` | Text primary, secondary, muted |
| \`--bd\` | Borders |
| \`--cdBg\` / \`--cdTx\` | Code block background and text |
| \`--sbBg\` | Sidebar background |
| \`--hdBg\` | Header background |
| \`--font-heading\` | Heading font family |
| \`--font-body\` | Body font family |
| \`--font-code\` | Code font family |
`};export{s as default};
