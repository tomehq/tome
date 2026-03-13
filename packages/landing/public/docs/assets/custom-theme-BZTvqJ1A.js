const e={frontmatter:{title:"Custom Theme",description:"How to customize your Tome site's appearance — presets, accent colors, fonts, dark mode, and CSS variables.",icon:"palette",hidden:!1,toc:!0},html:`<p>Tome ships with two theme presets and extensive customization options. Every visual aspect — colors, fonts, spacing — can be adjusted through configuration or CSS variables.</p>
<h2 id="presets"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#presets"><span class="icon icon-link"></span></a>Presets</h2>
<p>Choose between two built-in presets:</p>
<h3 id="amber-default"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#amber-default"><span class="icon icon-link"></span></a>Amber (default)</h3>
<p>A warm, approachable aesthetic with golden accent tones. Good for developer documentation and technical guides.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  preset</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"amber"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h3 id="editorial"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#editorial"><span class="icon icon-link"></span></a>Editorial</h3>
<p>A refined, high-contrast aesthetic inspired by Swiss poster design and literary magazines. Features serif headings and a more dramatic visual presence.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  preset</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"editorial"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>See <a href="/docs/reference/theme-presets">Theme presets reference</a> for the exact color values.</p>
<h2 id="accent-color"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#accent-color"><span class="icon icon-link"></span></a>Accent color</h2>
<p>Override the preset's accent color with any hex value:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  preset</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"amber"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  accent</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"#2563eb"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,  </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Blue accent instead of amber</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<p>Tome derives tint and dim variants automatically from your accent color.</p>
<h2 id="color-mode"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#color-mode"><span class="icon icon-link"></span></a>Color mode</h2>
<p>Control dark/light mode behavior:</p>
<table>
<thead>
<tr>
<th>Value</th>
<th>Behavior</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>"auto"</code></td>
<td>Follows system preference (default)</td>
</tr>
<tr>
<td><code>"light"</code></td>
<td>Always light mode</td>
</tr>
<tr>
<td><code>"dark"</code></td>
<td>Always dark mode</td>
</tr>
</tbody>
</table>
<p>Users can toggle the mode using the theme switch in the header.</p>
<h2 id="custom-fonts"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#custom-fonts"><span class="icon icon-link"></span></a>Custom fonts</h2>
<p>Override any font family. Make sure to add the appropriate <code>&lt;link&gt;</code> tag to <code>index.html</code> if using custom Google Fonts.</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  fonts</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    heading</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Playfair Display"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    body</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Source Sans Pro"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">    code</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"Fira Code"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">  },</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>
<h2 id="css-variables"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#css-variables"><span class="icon icon-link"></span></a>CSS variables</h2>
<p>For fine-grained control, override CSS variables in a custom stylesheet. The key variables are:</p>
<table>
<thead>
<tr>
<th>Variable</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--ac</code></td>
<td>Accent color</td>
</tr>
<tr>
<td><code>--acD</code></td>
<td>Accent dark variant</td>
</tr>
<tr>
<td><code>--acT</code></td>
<td>Accent tint</td>
</tr>
<tr>
<td><code>--bg</code></td>
<td>Page background</td>
</tr>
<tr>
<td><code>--sf</code></td>
<td>Surface (cards, sidebar)</td>
</tr>
<tr>
<td><code>--sfH</code></td>
<td>Surface hover state</td>
</tr>
<tr>
<td><code>--bd</code></td>
<td>Border color</td>
</tr>
<tr>
<td><code>--tx</code></td>
<td>Primary text</td>
</tr>
<tr>
<td><code>--tx2</code></td>
<td>Secondary text</td>
</tr>
<tr>
<td><code>--txM</code></td>
<td>Muted text</td>
</tr>
</tbody>
</table>
<p>See the <a href="/docs/reference/theme-presets">Theme presets reference</a> for the complete variable list with values per preset.</p>
<h2 id="border-radius"><a class="heading-anchor" aria-hidden="" tabindex="-1" href="#border-radius"><span class="icon icon-link"></span></a>Border radius</h2>
<p>Adjust the global border radius:</p>
<pre class="shiki shiki-themes github-light github-dark" style="background-color:#fff;--shiki-dark-bg:#24292e;color:#24292e;--shiki-dark:#e1e4e8" tabindex="0"><code><span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">theme</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: {</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  radius</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"4px"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,   </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Sharper corners</span></span>
<span class="line"><span style="color:#6F42C1;--shiki-dark:#B392F0">  radius</span><span style="color:#24292E;--shiki-dark:#E1E4E8">: </span><span style="color:#032F62;--shiki-dark:#9ECBFF">"12px"</span><span style="color:#24292E;--shiki-dark:#E1E4E8">,  </span><span style="color:#6A737D;--shiki-dark:#6A737D">// Rounder corners</span></span>
<span class="line"><span style="color:#24292E;--shiki-dark:#E1E4E8">}</span></span></code></pre>`,headings:[{depth:2,text:"Presets",id:"presets"},{depth:3,text:"Amber (default)",id:"amber-default"},{depth:3,text:"Editorial",id:"editorial"},{depth:2,text:"Accent color",id:"accent-color"},{depth:2,text:"Color mode",id:"color-mode"},{depth:2,text:"Custom fonts",id:"custom-fonts"},{depth:2,text:"CSS variables",id:"css-variables"},{depth:2,text:"Border radius",id:"border-radius"}],raw:`
Tome ships with two theme presets and extensive customization options. Every visual aspect — colors, fonts, spacing — can be adjusted through configuration or CSS variables.

## Presets

Choose between two built-in presets:

### Amber (default)

A warm, approachable aesthetic with golden accent tones. Good for developer documentation and technical guides.

\`\`\`javascript
theme: {
  preset: "amber",
}
\`\`\`

### Editorial

A refined, high-contrast aesthetic inspired by Swiss poster design and literary magazines. Features serif headings and a more dramatic visual presence.

\`\`\`javascript
theme: {
  preset: "editorial",
}
\`\`\`

See [Theme presets reference](/docs/reference/theme-presets) for the exact color values.

## Accent color

Override the preset's accent color with any hex value:

\`\`\`javascript
theme: {
  preset: "amber",
  accent: "#2563eb",  // Blue accent instead of amber
}
\`\`\`

Tome derives tint and dim variants automatically from your accent color.

## Color mode

Control dark/light mode behavior:

| Value | Behavior |
|-------|----------|
| \`"auto"\` | Follows system preference (default) |
| \`"light"\` | Always light mode |
| \`"dark"\` | Always dark mode |

Users can toggle the mode using the theme switch in the header.

## Custom fonts

Override any font family. Make sure to add the appropriate \`<link>\` tag to \`index.html\` if using custom Google Fonts.

\`\`\`javascript
theme: {
  fonts: {
    heading: "Playfair Display",
    body: "Source Sans Pro",
    code: "Fira Code",
  },
}
\`\`\`

## CSS variables

For fine-grained control, override CSS variables in a custom stylesheet. The key variables are:

| Variable | Description |
|----------|-------------|
| \`--ac\` | Accent color |
| \`--acD\` | Accent dark variant |
| \`--acT\` | Accent tint |
| \`--bg\` | Page background |
| \`--sf\` | Surface (cards, sidebar) |
| \`--sfH\` | Surface hover state |
| \`--bd\` | Border color |
| \`--tx\` | Primary text |
| \`--tx2\` | Secondary text |
| \`--txM\` | Muted text |

See the [Theme presets reference](/docs/reference/theme-presets) for the complete variable list with values per preset.

## Border radius

Adjust the global border radius:

\`\`\`javascript
theme: {
  radius: "4px",   // Sharper corners
  radius: "12px",  // Rounder corners
}
\`\`\`
`};export{e as default};
