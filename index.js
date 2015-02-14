/**
 *
 * Copyright 2013-2015 David Herron
 * 
 * This file is part of AkashaCMS-tagged-content (http://akashacms.com/).
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var path     = require('path');

module.exports.config = function(akasha, config) {
    config.root_partials.push(path.join(__dirname, 'partials'));
    config.root_layouts.push(path.join(__dirname, 'layout'));
    config.root_assets.unshift(path.join(__dirname, 'bootstrap'));
    // config.root_assets.push(path.join(__dirname, 'assets'));
    
    if (config.headerScripts) {
        if (!config.themeBootstrap) config.themeBootstrap = {};
        if (!config.headerScripts.stylesheets) config.headerScripts.stylesheets = [];
        // Bootstrap 2.3.3
        // config.headerScripts.stylesheets.unshift({ href: "/bootstrap/css/bootstrap.min.css", media: "screen" });
        // config.headerScripts.stylesheets.unshift({ href: "/bootstrap/css/bootstrap-responsive.css", media: "screen" });
        // Bootstrap 3.x
        config.headerScripts.stylesheets.unshift({
			href: config.themeBootstrap.bootstrapCSSurl
                ? config.themeBootstrap.bootstrapCSSurl
                : "/bootstrap3/css/bootstrap.min.css",
			/* media: "screen" */
		});
        config.headerScripts.stylesheets.unshift({
			href: config.themeBootstrap.bootstrapThemeCSSurl
                ? config.themeBootstrap.bootstrapThemeCSSurl
                : "/bootstrap3/css/bootstrap-theme.min.css",
			/* media: "screen" */
		});
		if (config.themeBootstrap.useHtml5shiv) {
			config.headerScripts.javaScriptTop.unshift({
				href: config.themeBootstrap.html5shivUrl
					? config.themeBootstrap.html5shivUrl
					: "//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js",
				/* media: "screen" */
			});
		}
		if (config.themeBootstrap.useRespondJS) {
			config.headerScripts.javaScriptTop.unshift({
				href: config.themeBootstrap.RespondJSUrl
					? config.themeBootstrap.RespondJSUrl
					: "//oss.maxcdn.com/respond/1.4.2/respond.min.js",
				/* media: "screen" */
			});
		}


        if (!config.headerScripts.javaScriptBottom)  config.headerScripts.javaScriptBottom = [];
        // Bootstrap 2.3.3
        // config.headerScripts.javaScriptBottom.push({ href: "http://code.jquery.com/jquery.js" });
        // config.headerScripts.javaScriptBottom.push({ href: "/bootstrap/js/bootstrap.min.js" });
        // Bootstrap 3.x
        config.headerScripts.javaScriptBottom.unshift({
			href: config.themeBootstrap.bootstrapJSurl
                ? config.themeBootstrap.bootstrapJSurl
                : "/bootstrap3/js/bootstrap.min.js"
		});
        config.headerScripts.javaScriptBottom.unshift({
			href: config.themeBootstrap.jQueryUrl
                ? config.themeBootstrap.jQueryUrl
                : "//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"
		});
    }
    
    /* config.funcs.bootstrapDropdown = function(arg, callback) {   
        var val = akasha.partialSync("bootstrap-dropdown.html.ejs", {
        	dropdownId: arg.dropdownId
        });
        if (callback) callback(undefined, val);
        return val;
    } */
    
    /* config.funcs.bootstrapPanelHeading = function(arg, callback) {
        var val = akasha.partialSync("bootstrap-panel-heading.html.ejs", {
        	header: arg.header
        });
        if (callback) callback(undefined, val);
        return val;
    } */
	
	return module.exports;
}

// TBD: HTML filter to change image tags to be responsive http://getbootstrap.com/css/


