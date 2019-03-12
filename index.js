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
const akasha = require('akasharender');
const mahabhuta = akasha.mahabhuta;

const pluginName = "akashacms-theme-bootstrap";

module.exports = class ThemeBootstrapPlugin extends akasha.Plugin {
	constructor() {
		super(pluginName);
	}

	configure(config) {
        this._config = config;
		config.addPartialsDir(path.join(__dirname, 'partials'));
		config.addMahabhuta(module.exports.mahabhuta);
	}

};

module.exports.mahabhuta = new mahabhuta.MahafuncArray(pluginName, {});

/* module.exports.mahabhuta.addMahafunc([
    // TODO update to use Munger
	function($, metadata, dirty, done) {
		var elements = [];
		$('.embed-responsive iframe').each((i, elem) => { elements.push(elem); });
		async.eachSeries(elements, (element, next) => {
			$(element).addClass("embed-responsive-item");
			next();
		}, function(err) {
			if (err) done(err);
			else done();
		});
	}
]); */

class EmbedResponsiveIframe extends mahabhuta.Munger {
	get selector() { return '.embed-responsive iframe'; }

	process($, $link, metadata, dirty, done) {
		$link.addClass("embed-responsive-item");
	}
}
module.exports.mahabhuta.addMahafunc(new EmbedResponsiveIframe());

class CollapseContainer extends mahabhuta.CustomElement {
    get elementName() { return "collapse-container"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "collapse-container.html.ejs";
        const id = $element.attr('id');
        dirty();
        return akasha.partial(metadata.config, template, {
			id: id,
			content: $element.html()
		});
    }
}
module.exports.mahabhuta.addMahafunc(new CollapseContainer());

class CollapseItem extends mahabhuta.CustomElement {
    get elementName() { return "collapse-item"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "collapse-item.html.ejs";
        const parentID = $element.attr('parent-id');
        const id = $element.attr('id');
		const title = $element.attr('title');
		const collapsed = $element.attr('collapsed');
		const thumburl = $element.attr('thumb-url');
		dirty();
		const data = {
			parentID, id, title, collapsed, thumburl,
			content: $element.html()
		};
		// console.log(`collapse-item data `, data);
        return akasha.partial(metadata.config, template, data);
    }
}
module.exports.mahabhuta.addMahafunc(new CollapseItem());

class CarouselContainer extends mahabhuta.CustomElement {
    get elementName() { return "carousel-container"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "carousel-container.html.ejs";
		const id = $element.attr('id');
		const optionalclasses = $element.attr('optional-classes')
				? $element.attr('optional-classes') : "";
		const width = $element.attr('width')
				? $element.attr('width') : "100%";
		const style = $element.attr('style')
				? `style="${$element.attr('style')}"` : "";
        return akasha.partial(metadata.config, template, {
			id: id,
			width, style, optionalclasses,
			content: $element.html()
		});
    }
}
module.exports.mahabhuta.addMahafunc(new CarouselContainer());

class CarouselItem extends mahabhuta.CustomElement {
    get elementName() { return "carousel-item"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "carousel-item.html.ejs";
		const href = $element.attr('href');
		if (!href || href === '') {
			throw new Error(`carousel-item requires an href value`);
		}
		const alt = $element.attr('alt')
				? $element.attr('alt') : "";
		const isactive = $element.attr('isactive')
				? "active" : "";
		const captiontitle = $element.attr('captiontitle');
		const captionbody = $element.attr('captionbody');
		const width = $element.attr('width')
				? $element.attr('width') : "100%";
		const style = $element.attr('style')
				? `style="${$element.attr('style')}"` : "";
		const data = {
			href, alt, isactive, captiontitle, captionbody,
			width, style
		};
		// console.log(`carousel-item sending data `, data);
        return akasha.partial(metadata.config, template, data);
    }
}
module.exports.mahabhuta.addMahafunc(new CarouselItem());

class ButtonModal extends mahabhuta.CustomElement {
    get elementName() { return "button-launched-modal"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "button-modal.html.ejs";
		const id = $element.attr('id');
		if (!id || id === '') {
			throw new Error(`button-launched-modal requires an id value`);
		}
		const title = $element.attr('title');
		const modelAdditionalClasses = $element.attr('additional-classes')
				? $element.attr('additional-classes') : "";
		const closeButtonText = $element.attr('close-button-text')
				? $element.attr('close-button-text') : "Close";
		const buttonText = $element.attr('button-text');
		if (!buttonText || buttonText === '') {
			throw new Error(`button-launched-modal requires a button-text value`);
		}
		dirty();
		const data = {
			id, title, modelAdditionalClasses, closeButtonText, buttonText,
			content: $element.html()
		};
		// console.log(`carousel-item sending data `, data);
        return akasha.partial(metadata.config, template, data);
    }
}
module.exports.mahabhuta.addMahafunc(new ButtonModal());


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
