---
layout: plugin-documentation.html.ejs
title: AskashaCMS Bootstrap Theme plugin documentation
---

The Bootstrap v4 framework contains many useful responsive HTML5 goodies that can improve the look of your website.  

It provides some Bootstrap-centric overrides to partial's provided by other plugins.  Hence, you get a "quick win" just by installing the theme.

The next primary usage is to use the Bootstrap CSS grid for page layout in your templates.

# Installation

Add the following to `package.json`

```json
"dependencies": {
    ...
    "akashacms-theme-bootstrap": ">=0.6",
    ...
    "jquery": "^3.3.x",
    "bootstrap": "^4.3.x",
    "popper.js": ">=1.14.x",
    ...
}
```

At the moment Bootstrap v4 support is experimental and instead requires this dependency:

```json
"akashacms-theme-bootstrap": "akashacms/akashacms-theme-bootstrap#bootstrapv4",
```

The `bootstrap`, `popper.js` and `jquery` modules don't provide any Node.js functionality, but are a quick way to access the Bootstrap and jQuery libraries.  Both of them can be retrieved using the corresponding CDN URL's, if you prefer.

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
    .addAssetsDir({
         src: 'node_modules/popper.js/dist',
         dest: 'vendor/popper.js'
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
    .addFooterJavaScript({
        href: "/vendor/jquery/jquery.min.js"
    })
    .addFooterJavaScript({
        href: "/vendor/popper.js/umd/popper.min.js"
    })
    .addFooterJavaScript({
        href: "/vendor/bootstrap/js/bootstrap.min.js"
    })
    .addStylesheet({
        href: "/vendor/bootstrap/css/bootstrap.min.css"
    })
```

This adds the JavaScript and CSS files to every page of your website.  Adding a custom Bootstrap theme is as simple as this:

```
config
    .addStylesheet({       href: "/vendor/bootswatch-readable/bootstrap.min.css" })
    .addStylesheet({       href: "/style.css" });
```

# Custom Tags

This plugin provides a few Bootstrap-specific custom elements that surface some of the more useful Bootstrap widgets.  Using these custom tags simplifies using those Bootstrap components.  While you could always dig out the HTML snippets specified by the Bootstrap team, they are rather onerous to use.

## Accordion-style collapsible sections

In Bootstrap, accordion-style collapses use an outer container to control the collapse sections, and then inner elements for each collapsible section.

We modeled this as two distinct custom tags.  The first, `collapse-container`, is used as so:

```html
<collapse-container id="accordion1">
    .. put collapse-item's here
</collapse-container>
```

The second, `collapse-item`, is an individual collapsible section.

```html
<collapse-item parent-id="accordion1" id="any-id-value-you-like" 
    title="---text for the title of the collapse section---">
    .. Put content here
</collapse-item>
```

Put together the code looks like so:

```html
<collapse-container id="accordion1">
    <collapse-item parent-id="accordion1" id="collapse-item-1" 
        title="First collapsible item">
            Text for first collapsible item
    </collapse-item>
    <collapse-item parent-id="accordion1" id="collapse-item-2" 
        title="Second collapsible item">
            Text for second collapsible item
    </collapse-item>
    <collapse-item parent-id="accordion1" id="collapse-item-3" 
        title="Third collapsible item">
            Text for third collapsible item
    </collapse-item>
    <collapse-item parent-id="accordion1" id="collapse-item-4" 
        title="Fourth collapsible item">
            Text for fourth collapsible item
    </collapse-item>
</collapse-container>
```

Which looks like this:

<collapse-container id="accordion1">
    <collapse-item parent-id="accordion1" id="collapse-item-1" 
        title="First collapsible item">
            Text for first collapsible item
    </collapse-item>
    <collapse-item parent-id="accordion1" id="collapse-item-2" 
        title="Second collapsible item">
            Text for second collapsible item
    </collapse-item>
    <collapse-item parent-id="accordion1" id="collapse-item-3" 
        title="Third collapsible item">
            Text for third collapsible item
    </collapse-item>
    <collapse-item parent-id="accordion1" id="collapse-item-4" 
        title="Fourth collapsible item">
            Text for fourth collapsible item
    </collapse-item>
</collapse-container>

## Image carousels

Another useful Bootstrap widget, Carousels, let you organize a few images in a rotating slide show.  The Bootstrap widget has support for captions on each image, and many other things.  Only a part of the Bootstrap functionality is exposed at this time.

Again it is modeled with a container, `carousel-container`, and individual items, `carousel-item`.

A complete example would be:

```html
<carousel-container id="carousel1">
    <carousel-item href="img/APTERA-8360-web.jpg" isactive="true"
        captionbody="Aptera">
    </carousel-item>
    <carousel-item href="img/2009_green_bike.jpg" 
        captionbody="Vectrix electric maxi-scooter">
    </carousel-item>
    <carousel-item href="img/loladrayson-3-web.jpg" 
        captionbody="Drayson Racing electric race car based on Lola chassis">
    </carousel-item>
    <carousel-item href="img/karma18-web.jpg" 
        captionbody="Fisker Karma">
    </carousel-item>
    <carousel-item href="img/PP125.jpg" 
       captionbody="UQM drive train for electric vehicles">
    </carousel-item>
</carousel-container>
```

And it looks like this:

<carousel-container id="carousel1">
    <carousel-item href="img/APTERA-8360-web.jpg" isactive="true"
        captionbody="Aptera">
    </carousel-item>
    <carousel-item href="img/2009_green_bike.jpg" 
        captionbody="Vectrix electric maxi-scooter">
    </carousel-item>
    <carousel-item href="img/loladrayson-3-web.jpg" 
        captionbody="Drayson Racing electric race car based on Lola chassis">
    </carousel-item>
    <carousel-item href="img/karma18-web.jpg" 
        captionbody="Fisker Karma">
    </carousel-item>
    <carousel-item href="img/PP125.jpg" 
       captionbody="UQM drive train for electric vehicles">
    </carousel-item>
</carousel-container>

