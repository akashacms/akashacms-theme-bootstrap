---
layout: plugin-documentation.html.ejs
title: AskashaCMS Bootstrap Theme plugin documentation
---

The Bootstrap framework contains many useful responsive HTML5 goodies that can improve the look of your website.  

It provides some Bootstrap-centric overrides to partial's provided by other plugins.  Hence, you get a "quick win" just by installing the theme.

The next primary usage is to use the Bootstrap CSS grid for page layout in your templates.

# Installation

Add the following to `package.json`

```
"dependencies": {
    ...
    "akashacms-theme-bootstrap": "akashacms/akashacms-theme-bootstrap#akasharender",
    ...
    "bootstrap": "^3.3.7",
    "jquery": "^3.1.1",
    ...
}
```

The AkashaRender version of `akashacms-theme-bootstrap` has not been published to `npm` yet, and therefore must be referenced this way.

The `bootstrap` and `jquery` modules don't provide any Node.js functionality, but are a quick way to access the Bootstrap and jQuery libraries.  Both of them can be retrieved using the corresponding CDN URL's, if you prefer.

Once added to `package.json` run: `npm install`

# Configuration

Add the following to `config.js`

```
config
    .addAssetsDir({
        src: 'node_modules/bootstrap/dist',
        dest: 'vendor/bootstrap'
    })
   .addAssetsDir({
        src: 'node_modules/jquery/dist',
        dest: 'vendor/jquery'
    })
```

This first section mounts the jQuery and Bootstrap distribution into your website.  The files you would have accessed via the corresponding CDN's are available in `/vendor/jquery` and `/vendor/bootstrap` within the rendered site.

```
config
    ...
    .use(require('akashacms-theme-bootstrap'))
    ...
```

This adds the AkashaCMS plugin to your configuration.

```
config
    .addFooterJavaScript({ href: "/vendor/jquery/jquery.min.js" })
    .addFooterJavaScript({ href: "/vendor/bootstrap/js/bootstrap.min.js"  })
    .addStylesheet({       href: "/vendor/bootstrap/css/bootstrap.min.css" })
    .addStylesheet({       href: "/vendor/bootstrap/css/bootstrap-theme.min.css" })
```

This adds the JavaScript and CSS files to every page of your website.  Adding a custom Bootstrap theme is as simple as this:

```
config
    .addStylesheet({       href: "/vendor/bootswatch-readable/bootstrap.min.css" })
    .addStylesheet({       href: "/style.css" });
```

# Custom Tags


TODO - Have not written this yet.  Study the source code for clues.
