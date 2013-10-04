var path     = require('path');

module.exports.config = function(akasha, config) {
    // config.root_partials.push(path.join(__dirname, 'partials'));
    config.root_layouts.push(path.join(__dirname, 'layout'));
    config.root_assets.push(path.join(__dirname, 'bootstrap'));
    // config.root_assets.push(path.join(__dirname, 'assets'));
    
    if (config.data.headerScripts) {
        if (!config.data.headerScripts.stylesheets) config.data.headerScripts.stylesheets = [];
        config.data.headerScripts.stylesheets.unshift({ href: "/bootstrap/css/bootstrap.min.css", media: "screen" });
        config.data.headerScripts.stylesheets.unshift({ href: "/bootstrap/css/bootstrap-responsive.css", media: "screen" });
        
        if (!config.data.headerScripts.javaScriptBottom)  config.data.headerScripts.javaScriptBottom = [];
        config.data.headerScripts.javaScriptBottom.push({ href: "http://code.jquery.com/jquery.js" });
        config.data.headerScripts.javaScriptBottom.push({ href: "/bootstrap/js/bootstrap.min.js" });
    }
}


