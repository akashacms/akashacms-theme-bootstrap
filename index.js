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

class DropdownMenu extends mahabhuta.CustomElement {
    get elementName() { return "dropdown-menu"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "bootstrap-dropdown.html.ejs";
        const id = $element.attr('id');
		if (!id || id === '') {
			throw new Error(`dropdown-menu requires an id value`);
		}
        const label = $element.attr('label');
		if (!label || label === '') {
			throw new Error(`dropdown-menu requires an label value`);
		}
        const rightAligned = $element.attr('right-aligned');
        const buttonType = $element.attr('button-type');
        const buttonSize = $element.attr('button-size');
        const additionalClasses = $element.attr('additional-classes');
        dirty();
        return akasha.partial(metadata.config, template, {
            id, dropdownLabel: label,
            buttonType: typeof buttonType !== 'undefined' && buttonType !== ''
                ? buttonType : 'btn-secondary',
            buttonSize: typeof buttonSize !== 'undefined' && buttonSize !== ''
                ? buttonSize : '',
            rightAligned: typeof rightAligned !== 'undefined' && rightAligned !== ''
                    ? true : false,
            additionalClasses: typeof additionalClasses !== 'undefined' && additionalClasses !== ''
                    ? additionalClasses : '',
            content: $element.html()
        });
    }
}
module.exports.mahabhuta.addMahafunc(new DropdownMenu());

class DropdownMenuItem extends mahabhuta.CustomElement {
    get elementName() { return "dropdown-menu-item"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "bootstrap-dropdown-item.html.ejs";
        const href = $element.attr('href');
		if (!href || href === '') {
			throw new Error(`dropdown-menu-item requires an href value`);
		}
        const label = $element.attr('label');
		if (!label || label === '') {
			throw new Error(`dropdown-menu-item requires an label value`);
		}
        const isActive = $element.attr('active');
        const isDisabled = $element.attr('disabled');
        return akasha.partial(metadata.config, template, {
            href, label,
            isActive: typeof isActive !== 'undefined' && isActive !== ''
                ? "active" : "",
            isDisabled: typeof isDisabled !== 'undefined' && isDisabled !== ''
                ? "active" : ""
        });
    }
}
module.exports.mahabhuta.addMahafunc(new DropdownMenuItem());

class DropdownMenuButton extends mahabhuta.CustomElement {
    get elementName() { return "dropdown-menu-button"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "bootstrap-dropdown-button.html.ejs";
        const href = $element.attr('href');
		if (!href || href === '') {
			throw new Error(`dropdown-menu-button requires an href value`);
		}
        const label = $element.attr('label');
		if (!label || label === '') {
			throw new Error(`dropdown-menu-button requires an label value`);
		}
        const isActive = $element.attr('active');
        const isDisabled = $element.attr('disabled');
        return akasha.partial(metadata.config, template, {
            href, dropdownLabel: label,
            isActive: typeof isActive !== 'undefined' && isActive !== ''
                ? "active" : "",
            isDisabled: typeof isDisabled !== 'undefined' && isDisabled !== ''
                ? "active" : ""
        });
    }
}
module.exports.mahabhuta.addMahafunc(new DropdownMenuButton());

class DropdownMenuHeader extends mahabhuta.CustomElement {
    get elementName() { return "dropdown-menu-header"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "bootstrap-dropdown-header.html.ejs";
        const label = $element.attr('label');
		if (!label || label === '') {
			throw new Error(`dropdown-menu-button requires an label value`);
		}
        return akasha.partial(metadata.config, template, {
            label
        });
    }
}
module.exports.mahabhuta.addMahafunc(new DropdownMenuHeader());

class DropdownMenuDivider extends mahabhuta.CustomElement {
    get elementName() { return "dropdown-menu-divider"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "bootstrap-dropdown-divider.html.ejs";
        return akasha.partial(metadata.config, template, {
            
        });
    }
}
module.exports.mahabhuta.addMahafunc(new DropdownMenuDivider());

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

class CardBlock extends mahabhuta.CustomElement {
    get elementName() { return "card-block"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "card.html.ejs";
        const id = $element.attr('id');
        const header = $element.attr('header');
        const style = $element.attr('style');
        const additionalClasses = $element.attr('additional-classes')
                ? $element.attr('additional-classes') : "";
        const bodyHeader = $element.attr('body-header')
                ? $element.attr('body-header') : "";
        const cardImageTop = $element.attr('card-image-top')
                ? $element.attr('card-image-top') : "";
        const cardImageAlt = $element.attr('card-image-alt')
                ? $element.attr('card-image-alt') : "";
        const cardImageStyle = $element.attr('card-image-style')
                ? $element.attr('card-image-style') : "";
        dirty();
        const data = {
            id, header, style, additionalClasses, bodyHeader, 
            cardImageTop, cardImageAlt, cardImageStyle,
            content: $element.html()
        };
        // console.log(`carousel-item sending data `, data);
        return akasha.partial(metadata.config, template, data);
    }
}
module.exports.mahabhuta.addMahafunc(new CardBlock());

class CardQuote extends mahabhuta.CustomElement {
    get elementName() { return "card-quote"; }
    async process($element, metadata, dirty) {
        const template = $element.attr('template') 
                ? $element.attr('template')
                : "card-quote.html.ejs";
        const id = $element.attr('id');
        const header = $element.attr('header');
        const style = $element.attr('style');
        const additionalClasses = $element.attr('additional-classes')
                ? $element.attr('additional-classes') : "";
        const bodyHeader = $element.attr('body-header')
                ? $element.attr('body-header') : "";
        const cardImageTop = $element.attr('card-image-top')
                ? $element.attr('card-image-top') : "";
        const cardImageAlt = $element.attr('card-image-alt')
                ? $element.attr('card-image-alt') : "";
        const cardImageStyle = $element.attr('card-image-style')
                ? $element.attr('card-image-style') : "";
        const quoteSource = $element.attr('quote-source')
                ? $element.attr('quote-source') : "";
        const quoteTitle = $element.attr('quote-title')
                ? $element.attr('quote-title') : "";
        dirty();
        const data = {
            id, header, style, additionalClasses, bodyHeader, 
            cardImageTop, cardImageAlt, cardImageStyle,
            quoteSource, quoteTitle,
            content: $element.html()
        };
        // console.log(`carousel-item sending data `, data);
        return akasha.partial(metadata.config, template, data);
    }
}
module.exports.mahabhuta.addMahafunc(new CardQuote());


// TBD: HTML filter to change image tags to be responsive http://getbootstrap.com/css/
