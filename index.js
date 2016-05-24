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

'use strict';

const path  = require('path');
const akasha = require('../akasharender');

const log   = require('debug')('akasha:theme-bootstrap-plugin');
const error = require('debug')('akasha:error-theme-bootstrap-plugin');


module.exports = class ThemeBootstrapPlugin extends akasha.Plugin {
	constructor() {
		super("akashacms-theme-bootstrap");
	}
	
	configure(config) {
        this._config = config;
		config.addPartialsDir(path.join(__dirname, 'partials'));
	}

}

/* -- These are optional addons which work with Bootstrap
 * -- However, the site configurer can configure these easily
 * -- or else this can export a function which can be called from config
 *         config.plugin('akashacms-theme-bootstrap').useHtml5Shiv() ... etc
		if (config.themeBootstrap.useHtml5shiv) {
			config.headerScripts.javaScriptTop.unshift({
				href: config.themeBootstrap.html5shivUrl
					? config.themeBootstrap.html5shivUrl
					: "//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js",
				/* media: "screen" * /
			});
		}
		if (config.themeBootstrap.useRespondJS) {
			config.headerScripts.javaScriptTop.unshift({
				href: config.themeBootstrap.RespondJSUrl
					? config.themeBootstrap.RespondJSUrl
					: "//oss.maxcdn.com/respond/1.4.2/respond.min.js",
				/* media: "screen" * /
			});
		}

*/

// TBD: HTML filter to change image tags to be responsive http://getbootstrap.com/css/


