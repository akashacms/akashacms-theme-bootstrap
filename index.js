var path     = require('path');

module.exports.config = function(akasha, config) {
    config.root_partials.push(path.join(__dirname, 'partials'));
    config.root_layouts.push(path.join(__dirname, 'layout'));
    config.root_assets.unshift(path.join(__dirname, 'bootstrap'));
    // config.root_assets.push(path.join(__dirname, 'assets'));
    
    if (config.data.headerScripts) {
        if (!config.data.headerScripts.stylesheets) config.data.headerScripts.stylesheets = [];
        // Bootstrap 2.3.3
        // config.data.headerScripts.stylesheets.unshift({ href: "/bootstrap/css/bootstrap.min.css", media: "screen" });
        // config.data.headerScripts.stylesheets.unshift({ href: "/bootstrap/css/bootstrap-responsive.css", media: "screen" });
        // Bootstrap 3.x
        config.data.headerScripts.stylesheets.unshift({ href: "/bootstrap3/css/bootstrap.min.css" /*, media: "screen" */ });
        config.data.headerScripts.stylesheets.unshift({ href: "/bootstrap3/css/bootstrap-theme.min.css" /*, media: "screen" */ });

        if (!config.data.headerScripts.javaScriptBottom)  config.data.headerScripts.javaScriptBottom = [];
        // Bootstrap 2.3.3
        // config.data.headerScripts.javaScriptBottom.push({ href: "http://code.jquery.com/jquery.js" });
        // config.data.headerScripts.javaScriptBottom.push({ href: "/bootstrap/js/bootstrap.min.js" });
        // Bootstrap 3.x
        config.data.headerScripts.javaScriptBottom.push({ href: "http://code.jquery.com/jquery.js" });
        config.data.headerScripts.javaScriptBottom.push({ href: "/bootstrap3/js/bootstrap.min.js" });
    }
    
    config.funcs.bootstrapBreadcrumbs = function(arg, callback) {   
        var val = akasha.partialSync(config, "bootstrap-breadcrumbs.html.ejs", { breadcrumbTrail: arg.breadcrumbTrail });
        if (callback) callback(undefined, val);
        return val;
    }
    
    config.funcs.bootstrapDropdown = function(arg, callback) {   
        var val = akasha.partialSync(config, "bootstrap-dropdown.html.ejs", {
        	dropdownId: arg.dropdownId
        });
        if (callback) callback(undefined, val);
        return val;
    }
    
    config.funcs.bootstrapPanelHeading = function(arg, callback) {
        var val = akasha.partialSync(config, "bootstrap-panel-heading.html.ejs", {
        	header: arg.header
        });
        if (callback) callback(undefined, val);
        return val;
    }
}

// TBD: HTML filter to change image tags to be responsive http://getbootstrap.com/css/


