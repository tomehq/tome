---
title: Third-Party Analytics
description: Add Google Analytics, GTM, Amplitude, and other analytics providers to your Tome site using the plugin system.
---

# Third-Party Analytics

Tome includes built-in privacy-first analytics, but you can add any third-party analytics provider using the plugin `headTags` hook. This injects script tags into the `<head>` of every page.

## Setup

Add a plugin to your `tome.config.js` that returns the analytics script tags:

```js
import { defineConfig } from "@tomehq/core/config";

export default defineConfig({
  name: "My Docs",
  tomePlugins: [
    {
      name: "analytics",
      hooks: {
        headTags: () => [
          // Add your analytics scripts here
        ],
      },
    },
  ],
});
```

## Google Analytics 4

```js
headTags: () => [
  `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>`,
  `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');</script>`,
],
```

## Google Tag Manager

```js
headTags: () => [
  `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>`,
],
```

## Plausible (Hosted)

```js
headTags: () => [
  `<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>`,
],
```

## Fathom

```js
headTags: () => [
  `<script src="https://cdn.usefathom.com/script.js" data-site="XXXXXXXX" defer></script>`,
],
```

## Amplitude

```js
headTags: () => [
  `<script src="https://cdn.amplitude.com/libs/amplitude-8.21.4-min.gz.js"></script>`,
  `<script>amplitude.getInstance().init("YOUR_API_KEY");</script>`,
],
```

## Mixpanel

```js
headTags: () => [
  `<script>(function(f,b){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e,f,c){function g(a,d){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,window.mixpanel||[]);mixpanel.init("YOUR_TOKEN");</script>`,
],
```

## Segment

```js
headTags: () => [
  `<script>!function(){var e=window.analytics=window.analytics||[];if(!e.initialize)if(e.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{e.invoked=!0;e.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];e.factory=function(t){return function(){if(window.analytics.initialized)return window.analytics[t].apply(window.analytics,arguments);var n=Array.prototype.slice.call(arguments);n.unshift(t);e.push(n);return e}};for(var t=0;t<e.methods.length;t++){var n=e.methods[t];e[n]=e.factory(n)}e.load=function(e,t){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.segment.com/analytics.js/v1/"+e+"/analytics.min.js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);e._loadOptions=t};e._writeKey="YOUR_WRITE_KEY";e.SNIPPET_VERSION="5.2.0";e.load("YOUR_WRITE_KEY");e.page()}}();</script>`,
],
```

## Hotjar

```js
headTags: () => [
  `<script>(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:YOUR_SITE_ID,hjsv:6};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');</script>`,
],
```

## Microsoft Clarity

```js
headTags: () => [
  `<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","YOUR_PROJECT_ID");</script>`,
],
```

## Heap

```js
headTags: () => [
  `<script>window.heap=window.heap||[],heap.load=function(e,t){window.heap.appid=e,window.heap.config=t=t||{};var r=document.createElement("script");r.type="text/javascript",r.async=!0,r.src="https://cdn.heapanalytics.com/js/heap-"+e+".js";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(r,a);for(var n=function(e){return function(){heap.push([e].concat(Array.prototype.slice.call(arguments,0)))}},p=["addEventProperties","addUserProperties","clearEventProperties","identify","resetIdentity","removeEventProperty","setEventProperties","track","unsetEventProperty"],o=0;o<p.length;o++)heap[p[o]]=n(p[o])};heap.load("YOUR_APP_ID");</script>`,
],
```

## Multiple Providers

You can combine multiple providers in a single plugin:

```js
headTags: () => [
  // Google Analytics
  `<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>`,
  `<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXXXXX');</script>`,
  // Plausible
  `<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>`,
],
```

These scripts work alongside Tome's built-in analytics. The built-in analytics remain privacy-first (no cookies, <1KB) while third-party providers operate independently.
