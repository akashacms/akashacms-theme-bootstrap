
const akasha   = require('akasharender');
const plugin = require('../index');
const { assert } = require('chai');

const config = new akasha.Configuration();
config.rootURL("https://example.akashacms.com");
config.configDir = __dirname;
config.addLayoutsDir('layouts')
      .addPartialsDir('partials')
      .addDocumentsDir('documents');
config.use(plugin);
config.setMahabhutaConfig({
    recognizeSelfClosing: true,
    recognizeCDATA: true,
    decodeEntities: true
});
config.prepare();


describe('build site', function() {
    it('should build site', async function() {
        this.timeout(25000);
        let failed = false;
        let results = await akasha.render(config);
        for (let result of results) {
            if (result.error) {
                failed = true;
                console.error(result.error);
            }
        }
        assert.isFalse(failed);
    });
});

describe('/blockquote.html', function() {
    let html;
    let $;

    it('should have rendered', async function() {
        let results = await akasha.readRenderedFile(config, 'blockquote.html');
        html = results.html;
        $ = results.$;

        assert.exists(html, 'result exists');
        assert.isString(html, 'result isString');
    });

    it('should have added blockquote class', async function() {
        assert.include($('blockquote.blockquote').html(), 'this is in a block quote');
        assert.isTrue($('blockquote#explicit').hasClass('blockquote'));
        assert.include($('blockquote#explicit').html(), 'This is in an explicit blockquote');
    });
});

describe('/dropdown-menu.html', function() {
    let html;
    let $;

    it('should have rendered', async function() {
        let results = await akasha.readRenderedFile(config, 'dropdown-menu.html');
        html = results.html;
        $ = results.$;

        assert.exists(html, 'result exists');
        assert.isString(html, 'result isString');
    });

    it('should have menu1 classes', async function() {
        assert.isTrue($('#menu1').hasClass('btn'));
        assert.isTrue($('#menu1').hasClass('btn-secondary'));
        assert.isTrue($('#menu1').hasClass('dropdown-toggle'));
    });

    it('should have menu1 attributes', async function() {
        assert.equal($('#menu1').attr('type'), 'button');
        assert.equal($('#menu1').data('toggle'), 'dropdown');
        assert.equal($('#menu1').attr('aria-haspopup'), 'true');
        assert.equal($('#menu1').attr('aria-expanded'), 'false');
    });

    it('should have matching dropdown-menu for menu1', function() {
        assert.isTrue($('div[aria-labelledby="menu1"]').hasClass('dropdown-menu'));
        assert.equal($('div[aria-labelledby="menu1"]').attr('role'), 'menu');
    });

    it('should have correct dropdown-menu-items for menu1', function() {
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu1"] a[href="some/where/1"]').hasClass('dropdown-item'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu1"] a[href="some/where/1"]').hasClass('active'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu1"] a[href="some/where/1"]').hasClass('disabled'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu1"] a[href="some/where/2"]').hasClass('dropdown-item'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu1"] a[href="some/where/2"]').hasClass('active'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu1"] a[href="some/where/2"]').hasClass('disabled'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu1"] a[href="some/where/3"]').hasClass('dropdown-item'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu1"] a[href="some/where/3"]').hasClass('active'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu1"] a[href="some/where/3"]').hasClass('disabled'));
    });

    it('should have menu2 classes', async function() {
        assert.isTrue($('#menu2').hasClass('btn'));
        assert.isTrue($('#menu2').hasClass('hollow'));
        assert.isTrue($('#menu2').hasClass('class1'));
        assert.isTrue($('#menu2').hasClass('class2'));
        assert.isTrue($('#menu2').hasClass('dropdown-toggle'));
    });

    it('should have menu2 attributes', async function() {
        assert.equal($('#menu2').attr('type'), 'button');
        assert.equal($('#menu2').data('toggle'), 'dropdown');
        assert.equal($('#menu2').attr('aria-haspopup'), 'true');
        assert.equal($('#menu2').attr('aria-expanded'), 'false');
    });

    it('should have matching dropdown-menu for menu2', function() {
        assert.isTrue($('div[aria-labelledby="menu2"]').hasClass('dropdown-menu'));
        assert.isTrue($('div[aria-labelledby="menu2"]').hasClass('dropdown-menu-right'));
        assert.equal($('div[aria-labelledby="menu2"]').attr('role'), 'menu');
    });

    it('should have correct dropdown-menu-items for menu2', function() {
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu2"] a[href="some/where/else/1"]').hasClass('dropdown-item'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu2"] a[href="some/where/else/1"]').hasClass('active'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu2"] a[href="some/where/else/1"]').hasClass('disabled'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu2"] a[href="some/where/else/2"]').hasClass('dropdown-item'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu2"] a[href="some/where/else/2"]').hasClass('active'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu2"] a[href="some/where/else/2"]').hasClass('disabled'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu2"] a[href="some/where/else/disabled"]').hasClass('dropdown-item'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu2"] a[href="some/where/else/disabled"]').hasClass('active'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu2"] a[href="some/where/else/disabled"]').hasClass('disabled'));
    });

    it('should have menu3 classes', async function() {
        assert.isTrue($('#menu3').hasClass('btn'));
        assert.isTrue($('#menu3').hasClass('dropdown-toggle'));
    });

    it('should have menu3 attributes', async function() {
        assert.equal($('#menu3').attr('type'), 'button');
        assert.equal($('#menu3').data('toggle'), 'dropdown');
        assert.equal($('#menu3').attr('aria-haspopup'), 'true');
        assert.equal($('#menu3').attr('aria-expanded'), 'false');
    });

    it('should have matching dropdown-menu for menu3', function() {
        assert.isTrue($('div[aria-labelledby="menu3"]').hasClass('dropdown-menu'));
        assert.isFalse($('div[aria-labelledby="menu3"]').hasClass('dropdown-menu-right'));
        assert.equal($('div[aria-labelledby="menu3"]').attr('role'), 'menu');
    });

    it('should have correct dropdown-menu-items for menu3', function() {
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu3"] button[type="button"][href="/some/where/button/1"]').hasClass('dropdown-item'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu3"] button[type="button"][href="/some/where/button/1"]').hasClass('active'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu3"] button[type="button"][href="/some/where/button/1"]').hasClass('disabled'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu3"] button[type="button"][href="/some/where/button/2"]').hasClass('dropdown-item'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu3"] button[type="button"][href="/some/where/button/2"]').hasClass('active'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu3"] button[type="button"][href="/some/where/button/2"]').hasClass('disabled'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu3"] button[type="button"][href="/some/where/button/disabled"]').hasClass('dropdown-item'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu3"] button[type="button"][href="/some/where/button/disabled"]').hasClass('active'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu3"] button[type="button"][href="/some/where/button/disabled"]').hasClass('disabled'));
    });

    it('should have menu4 classes', async function() {
        assert.isTrue($('#menu4').hasClass('btn'));
        assert.isTrue($('#menu4').hasClass('dropdown-toggle'));
    });

    it('should have menu4 attributes', async function() {
        assert.equal($('#menu4').attr('type'), 'button');
        assert.equal($('#menu4').data('toggle'), 'dropdown');
        assert.equal($('#menu4').attr('aria-haspopup'), 'true');
        assert.equal($('#menu4').attr('aria-expanded'), 'false');
    });

    it('should have matching dropdown-menu for menu4', function() {
        assert.isTrue($('div[aria-labelledby="menu4"]').hasClass('dropdown-menu'));
        assert.isFalse($('div[aria-labelledby="menu4"]').hasClass('dropdown-menu-right'));
        assert.equal($('div[aria-labelledby="menu4"]').attr('role'), 'menu');
    });

    it('should have correct dropdown-menu-items for menu4', function() {
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu4"] a[href="some/where/1"]').hasClass('dropdown-item'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu4"] a[href="some/where/1"]').hasClass('active'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu4"] a[href="some/where/1"]').hasClass('disabled'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu4"] button[type="button"][href="/some/where/button/2"]').hasClass('dropdown-item'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu4"] button[type="button"][href="/some/where/button/2"]').hasClass('active'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu4"] button[type="button"][href="/some/where/button/2"]').hasClass('disabled'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu4"] button[type="button"][href="/some/where/button/disabled"]').hasClass('dropdown-item'));
        assert.isFalse($('.dropdown-menu[aria-labelledby="menu4"] button[type="button"][href="/some/where/button/disabled"]').hasClass('active'));
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu4"] button[type="button"][href="/some/where/button/disabled"]').hasClass('disabled'));
    });

    it('should have menu4 dropdown-header', function() {
        assert.isTrue($('.dropdown-menu[aria-labelledby="menu4"] h6').hasClass('dropdown-header'));
    });

    it('should have menu4 dropdown-divider', function() {
        assert.exists($('.dropdown-menu[aria-labelledby="menu4"] .dropdown-divider').get(0));
        assert.notExists($('.dropdown-menu[aria-labelledby="menu4"] .dropdown-divider-does-not-exist').get(0));
    });

    it('should have menu4 freeform text', function() {
        assert.exists($('.dropdown-menu[aria-labelledby="menu4"] p').get(0));
        assert.include($('.dropdown-menu[aria-labelledby="menu4"] p').html(),
            'Now is the time for all good text to appear in the menu');
    });
});

describe('/collapse.html', function() {
    let html;
    let $;

    it('should have rendered', async function() {
        let results = await akasha.readRenderedFile(config, 'collapse.html');
        html = results.html;
        $ = results.$;

        assert.exists(html, 'result exists');
        assert.isString(html, 'result isString');
    });

    it('should have accordion1', function() {
        assert.equal($('div#accordion1').length, 1);
    });

    it('should have item1 headings', function() {
        assert.equal($('div#accordion1 #heading-collapse-item-1').length, 1);
        assert.isTrue($('div#accordion1 #heading-collapse-item-1').hasClass('card-header'));
        assert.equal($('div#accordion1 #heading-collapse-item-1 h2').length, 1);
        assert.equal($('div#accordion1 #heading-collapse-item-1 h2 button').length, 1);
        assert.isTrue($('div#accordion1 #heading-collapse-item-1 h2 button').hasClass('btn'));
        assert.isTrue($('div#accordion1 #heading-collapse-item-1 h2 button').hasClass('btn-link'));
        assert.equal($('div#accordion1 #heading-collapse-item-1 h2 button').data('toggle'), 'collapse');
        assert.equal($('div#accordion1 #heading-collapse-item-1 h2 button').data('target'), '#collapse-collapse-item-1');
        assert.equal($('div#accordion1 #heading-collapse-item-1 h2 button').attr('aria-expanded'), 'true');
        assert.equal($('div#accordion1 #heading-collapse-item-1 h2 button').attr('aria-controls'), 'collapse-collapse-item-1');
        assert.include($('div#accordion1 #heading-collapse-item-1 h2 button').html(), 'First collapsible item');
    });

    it('should have item2 headings', function() {
        assert.equal($('div#accordion1 #heading-collapse-item-2').length, 1);
        assert.isTrue($('div#accordion1 #heading-collapse-item-2').hasClass('card-header'));
        assert.equal($('div#accordion1 #heading-collapse-item-2 h2').length, 1);
        assert.equal($('div#accordion1 #heading-collapse-item-2 h2 button').length, 1);
        assert.isTrue($('div#accordion1 #heading-collapse-item-2 h2 button').hasClass('btn'));
        assert.isTrue($('div#accordion1 #heading-collapse-item-2 h2 button').hasClass('btn-link'));
        assert.equal($('div#accordion1 #heading-collapse-item-2 h2 button').data('toggle'), 'collapse');
        assert.equal($('div#accordion1 #heading-collapse-item-2 h2 button').data('target'), '#collapse-collapse-item-2');
        assert.equal($('div#accordion1 #heading-collapse-item-2 h2 button').attr('aria-expanded'), 'false');
        assert.equal($('div#accordion1 #heading-collapse-item-2 h2 button').attr('aria-controls'), 'collapse-collapse-item-2');
        assert.include($('div#accordion1 #heading-collapse-item-2 h2 button').html(), 'Second collapsible item');
    });

    it('should have item3 headings', function() {
        assert.equal($('div#accordion1 #heading-collapse-item-3').length, 1);
        assert.isTrue($('div#accordion1 #heading-collapse-item-3').hasClass('card-header'));
        assert.equal($('div#accordion1 #heading-collapse-item-3 h2').length, 1);
        assert.equal($('div#accordion1 #heading-collapse-item-3 h2 button').length, 1);
        assert.isTrue($('div#accordion1 #heading-collapse-item-3 h2 button').hasClass('btn'));
        assert.isTrue($('div#accordion1 #heading-collapse-item-3 h2 button').hasClass('btn-link'));
        assert.equal($('div#accordion1 #heading-collapse-item-3 h2 button').data('toggle'), 'collapse');
        assert.equal($('div#accordion1 #heading-collapse-item-3 h2 button').data('target'), '#collapse-collapse-item-3');
        assert.equal($('div#accordion1 #heading-collapse-item-3 h2 button').attr('aria-expanded'), 'false');
        assert.equal($('div#accordion1 #heading-collapse-item-3 h2 button').attr('aria-controls'), 'collapse-collapse-item-3');
        assert.include($('div#accordion1 #heading-collapse-item-3 h2 button').html(), 'Third collapsible item');
    });

    it('should have item4 headings', function() {
        assert.equal($('div#accordion1 #heading-collapse-item-4').length, 1);
        assert.isTrue($('div#accordion1 #heading-collapse-item-4').hasClass('card-header'));
        assert.equal($('div#accordion1 #heading-collapse-item-4 h2').length, 1);
        assert.equal($('div#accordion1 #heading-collapse-item-4 h2 button').length, 1);
        assert.isTrue($('div#accordion1 #heading-collapse-item-4 h2 button').hasClass('btn'));
        assert.isTrue($('div#accordion1 #heading-collapse-item-4 h2 button').hasClass('btn-link'));
        assert.equal($('div#accordion1 #heading-collapse-item-4 h2 button').data('toggle'), 'collapse');
        assert.equal($('div#accordion1 #heading-collapse-item-4 h2 button').data('target'), '#collapse-collapse-item-4');
        assert.equal($('div#accordion1 #heading-collapse-item-4 h2 button').attr('aria-expanded'), 'false');
        assert.equal($('div#accordion1 #heading-collapse-item-4 h2 button').attr('aria-controls'), 'collapse-collapse-item-4');
        assert.include($('div#accordion1 #heading-collapse-item-4 h2 button').html(), 'Fourth collapsible item');
    });
});

describe('/carousel.html', function() {
    let html;
    let $;

    it('should have rendered', async function() {
        let results = await akasha.readRenderedFile(config, 'carousel.html');
        html = results.html;
        $ = results.$;

        assert.exists(html, 'result exists');
        assert.isString(html, 'result isString');
    });

    it('should have carousel1', function() {
        assert.equal($('div#carousel1').length, 1);
    });

    it('should have correct number carousel-items', function() {
        assert.equal($('div#carousel1 .carousel-item').length, 5);
    });

    it('should have correct carousel-item 1', function() {
        assert.equal($('div#carousel1 .carousel-item:nth-child(1) img').attr('src'), 'img/APTERA-8360-web.jpg');
        assert.include($('div#carousel1 .carousel-item:nth-child(1) .carousel-caption').html(), 'Aptera');
    });

    it('should have correct carousel-item 2', function() {
        assert.equal($('div#carousel1 .carousel-item:nth-child(2) img').attr('src'), 'img/2009_green_bike.jpg');
        assert.include($('div#carousel1 .carousel-item:nth-child(2) .carousel-caption').html(), 'Vectrix electric maxi-scooter');
    });

    it('should have correct carousel-item 3', function() {
        assert.equal($('div#carousel1 .carousel-item:nth-child(3) img').attr('src'), 'img/loladrayson-3-web.jpg');
        assert.include($('div#carousel1 .carousel-item:nth-child(3) .carousel-caption').html(), 'Drayson Racing electric race car based on Lola chassis');
    });

    it('should have correct carousel-item 4', function() {
        assert.equal($('div#carousel1 .carousel-item:nth-child(4) img').attr('src'), 'img/karma18-web.jpg');
        assert.include($('div#carousel1 .carousel-item:nth-child(4) .carousel-caption').html(), 'Fisker Karma');
    });

    it('should have correct carousel-item 5', function() {
        assert.equal($('div#carousel1 .carousel-item:nth-child(5) img').attr('src'), 'img/PP125.jpg');
        assert.include($('div#carousel1 .carousel-item:nth-child(5) .carousel-caption').html(), 'UQM drive train for electric vehicles');
    });
});


describe('/modal.html', function() {
    let html;
    let $;

    it('should have rendered', async function() {
        let results = await akasha.readRenderedFile(config, 'modal.html');
        html = results.html;
        $ = results.$;

        assert.exists(html, 'result exists');
        assert.isString(html, 'result isString');
    });

    it('should have example-modal', function() {
        assert.equal($('div#example-modal').length, 1);
        assert.equal($('button[data-target="#example-modal"]').length, 1);
        assert.isTrue($('div#example-modal').hasClass('modal'));
        assert.equal($('div#example-modal').attr('role'), 'dialog');
        assert.equal($('div#example-modal').attr('aria-labelledby'), 'example-modal-title');
    });

    it('should have correct modal header', function() {
        assert.equal($('#example-modal .modal-content .modal-header').length, 1);
        assert.equal($('#example-modal .modal-content .modal-header .modal-title').length, 1);
        assert.equal($('#example-modal .modal-content .modal-header .modal-title').attr('id'), 'example-modal-title');
        assert.equal($('#example-modal .modal-content .modal-header .modal-title').html(), 'Example Button-Launched Modal');
        assert.equal($('#example-modal .modal-content .modal-header button').length, 1);
        assert.isTrue($('#example-modal .modal-content .modal-header button').hasClass('close'));
        assert.equal($('#example-modal .modal-content .modal-header button').data('dismiss'), 'modal');
        assert.equal($('#example-modal .modal-content .modal-header button').attr('aria-label'), 'Close');
    });

    it('should have correct modal body', function() {
        assert.equal($('#example-modal .modal-content .modal-body').length, 1);
        assert.include($('#example-modal .modal-content .modal-body').html(), 'purus sit amet fermentum');
        assert.include($('#example-modal .modal-content .modal-body').html(), ' sagittis lacus vel augue');
        assert.include($('#example-modal .modal-content .modal-body').html(), 'vel scelerisque nisl consectetur');
        assert.include($('#example-modal .modal-content .modal-body').html(), 'nulla non metus auctor');
        assert.include($('#example-modal .modal-content .modal-body').html(), 'porta ac consectetur');
    });


    it('should have correct modal footer', function() {
        assert.equal($('#example-modal .modal-content .modal-footer').length, 1);
        assert.equal($('#example-modal .modal-content .modal-footer button').length, 1);
        assert.equal($('#example-modal .modal-content .modal-footer button').data('dismiss'), 'modal');
        assert.include($('#example-modal .modal-content .modal-footer button').html(), 'Inchide');
    });
});

describe('/cards.html', function() {
    let html;
    let $;

    it('should have rendered', async function() {
        let results = await akasha.readRenderedFile(config, 'cards.html');
        html = results.html;
        $ = results.$;

        assert.exists(html, 'result exists');
        assert.isString(html, 'result isString');
    });

    it('should have correct card1', function() {
        assert.equal($('#card1').length, 1);
        assert.isTrue($('#card1').hasClass('card'));
        assert.equal($('#card1 img[src="img/2009_green_bike.jpg"]').length, 1);
        assert.isTrue($('#card1 img[src="img/2009_green_bike.jpg"]').hasClass('card-img-top'));
        assert.equal($('#card1 img[src="img/2009_green_bike.jpg"]').attr('alt'), "Vectrix electric maxi-scooter");
        assert.equal($('#card1 .card-header').length, 2);
        assert.include($('#card1 .card-header').html(), 'Vectrix electric maxi-scooter');
        assert.equal($('#card1 .card-body').length, 1);
        assert.equal($('#card1 .card-body .card-header').length, 1);
        assert.equal($('#card1 .card-body .card-header .card-title').length, 1);
        assert.include($('#card1 .card-body .card-header .card-title').html(), 'Electric Scooter History');
        assert.include($('#card1 .card-body').html(), 'The Vectrix electric maxi-scooter was a highway-capable electric scooter launched in 2007');
    });

    it('should have correct card2', function() {
        assert.equal($('#card2').length, 1);
        assert.isTrue($('#card2').hasClass('card'));
        assert.equal($('#card2 img[src="img/nikola-tesla.jpg"]').length, 1);
        assert.isTrue($('#card2 img[src="img/nikola-tesla.jpg"]').hasClass('card-img-top'));
        assert.equal($('#card2 img[src="img/nikola-tesla.jpg"]').attr('alt'), 'Nikola Tesla');
        assert.equal($('#card2 .card-header').length, 2);
        assert.include($('#card2 .card-header').html(), 'Cute header text');
        assert.equal($('#card2 .card-body').length, 1);
        assert.equal($('#card2 .card-body .card-header').length, 1);
        assert.include($('#card2 .card-body .card-header').html(), 'Cute subtitle text');
        assert.include($('#card2 .card-body blockquote').html(), 'Every living being is an engine geared to the wheelwork of the universe');
        assert.equal($('#card2 .card-body .card-header').length, 1);
        assert.equal($('#card2 .card-body blockquote footer').length, 1);
        assert.isTrue($('#card2 .card-body blockquote footer').hasClass('blockquote-footer'));
        assert.include($('#card2 .card-body blockquote footer').html(), 'Nikola Tesla in');
    });
});