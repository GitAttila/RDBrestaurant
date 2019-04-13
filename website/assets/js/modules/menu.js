import $ from 'jquery';

import Navigation from './navigation';
import LangController from './lang';
import ContactForm from './contactform';
import ReservationForm from './reservationform';
import Holidays from './holidays';
class Menu {

    constructor() {
        this.URL = './assets/data/menu_data.json';
        this.imagePath = './assets/images/allergenes/';
        this.menuImagePath = './assets/images/menu/';
        this.allergenesList = [
            {
                imageFileName: '1-wheat.png',
                alt: 'wheat allergenes icon',
                tooltipContent: 'Wheat'
            },
            {
                imageFileName: '2-crustaceans.png',
                alt: 'crustaceans allergenes icon',
                tooltipContent: 'Crustaceans'
            },
            {
                imageFileName: '3-eggs.png',
                alt: 'eggs allergenes icon',
                tooltipContent: 'Eggs'
            },
            {
                imageFileName: '4-fish.png',
                alt: 'fish allergenes icon',
                tooltipContent: 'Fish'
            },
            {
                imageFileName: '5-peanuts.png',
                alt: 'peanuts allergenes icon',
                tooltipContent: 'Peanuts'
            },
            {
                imageFileName: '6-soya.png',
                alt: 'soya allergenes icon',
                tooltipContent: 'Soya'
            },
            {
                imageFileName: '7-milk.png',
                alt: 'milk allergenes icon',
                tooltipContent: 'Milk'
            },
            {
                imageFileName: '8-nuts.png',
                alt: 'nuts allergenes icon',
                tooltipContent: 'Nuts'
            },
            {
                imageFileName: '9-celery.png',
                alt: 'celery allergenes icon',
                tooltipContent: 'Celery'
            },
            {
                imageFileName: '10-mustard.png',
                alt: 'mustard allergenes icon',
                tooltipContent: 'Mustard'
            },
            {
                imageFileName: '11-sesame.png',
                alt: 'sesame allergenes icon',
                tooltipContent: 'Sesame'
            },
            {
                imageFileName: '12-sulphites.png',
                alt: 'sulphites allergenes icon',
                tooltipContent: 'Sulphite'
            },
            {
                imageFileName: '13-lupin.png',
                alt: 'lupin allergenes icon',
                tooltipContent: 'Lupin'
            },
            {
                imageFileName: '14-molluscs.png',
                alt: 'molluscs allergenes icon',
                tooltipContent: 'Molluscs'
            }
        ];
        this.categoryConfig = {
            'starters':
                {
                    filterTags: 'all meals, starters',
                    categoryThemingClass: 'site-card__secondary',
                },
            'soup':
                {
                    filterTags: 'all meals, soup',
                    categoryTheming: ''
                },
            'indian drinks':
                {
                    filterTags: 'all drinks, non-alcoholic drinks',
                    categoryTheming: 'site-card__secondary'
                },
            'veg tandoori specialities':
                {
                    filterTags: 'all meals, tandoor, vegetarian',
                    categoryTheming: 'site-card__tertiary'
                },
            'non veg tandoori specialities':
                {
                    filterTags: 'all meals, tandoor, non-vegetarian',
                    categoryTheming: 'site-card__secondary'
                },
            'main course non-vegetarian':
                {
                    filterTags: 'all meals, non-vegetarian',
                    categoryTheming: 'site-card__secondary'
                },
            'main course vegetarian':
                {
                    filterTags: 'all meals, vegetarian',
                    categoryTheming: 'site-card__tertiary'
                },
            'rice specialities':
                {
                    filterTags: 'all meals, side dish, vegetarian, rice',
                    categoryTheming: ''
                },
            'indian bread':
                {
                    filterTags: 'all meals, side dish, vegetarian, bread',
                    categoryTheming: 'site-card__secondary'
                },
            'salad':
                {
                    filterTags: 'all meals, starters, vegetarian, salad',
                    categoryTheming: 'site-card__tertiary'
                },
            'indian chutneys':
                {
                    filterTags: 'all meals, side dish, vegetarian',
                    categoryTheming: ''
                },
            'desserts':
                {
                    filterTags: ' all meals, desserts',
                    categoryTheming: 'site-card__secondary'
                },
            'hot beverages':
                {
                    filterTags: 'all drinks, hot beverages, non-alcoholic drinks',
                    categoryTheming: 'site-card__secondary'
                },
            'non-alcoholic beverages':
                {
                    filterTags: 'all drinks, non-alcoholic drinks',
                    categoryTheming: 'site-card'
                },
            'beer':
                {
                    filterTags: 'all drinks, alcoholic drinks',
                    categoryTheming: 'site-card__tertiary'
                },
            'imported white wine':
                {
                    filterTags: 'all drinks, alcoholic drinks, wine',
                    categoryTheming: 'site-card__secondary'
                },
            'imported red wine':
                {
                    filterTags: 'all drinks, alcoholic drinks, wine',
                    categoryTheming: 'site-card__secondary'
                },
            'house wine':
                {
                    filterTags: 'all drinks, alcoholic drinks, wine',
                    categoryTheming: 'site-card'
                },
            'champagne':
                {
                    filterTags: 'all drinks, alcoholic drinks, wine',
                    categoryTheming: 'site-card_tertiary'
                },
            'cocktails':
                {
                    filterTags: 'all drinks, alcoholic drinks',
                    categoryTheming: 'site-card'
                },
            'rum':
                {
                    filterTags: 'all drinks, alcoholic drinks',
                    categoryTheming: 'site-card__secondary'
                },
            'liquors':
                {
                    filterTags: 'all drinks, alcoholic drinks',
                    categoryTheming: 'site-card__secondary'
                },
            'whisky':
                {
                    filterTags: 'all drinks, alcoholic drinks',
                    categoryTheming: 'site-card'
                },
            'tequila':
                {
                    filterTags: 'all drinks, alcoholic drinks',
                    categoryTheming: 'site-card__tertiary'
                },
            'brandy':
                {
                    filterTags: 'all drinks, alcoholic drinks',
                    categoryTheming: 'site-card__secondary'
                }
        };

        this.predefinedFilterButtons = [
            {
                txt: 'all',
                class: 'btn-site btn-site--active btn-site--small btn-site--rounded',
                filter: 'menu',
                clickFn: function(){$(this).addClass("btn-site--active").parent().siblings().children().removeClass("btn-site--active");}
            },
            {
                txt: 'all meals',
                class: 'btn-site btn-site--small btn-site--rounded',
                filter: 'all meals',
                clickFn: function(){$(this).addClass("btn-site--active").parent().siblings().children().removeClass("btn-site--active");}
            },
            {
                txt: 'all drinks',
                class: 'btn-site btn-site--small btn-site--rounded',
                filter: 'all drinks',
                clickFn: function(){$(this).addClass("btn-site--active").parent().siblings().children().removeClass("btn-site--active");}
            }
        ];

        this.navigation;

        this.languageController;

        this.contactForm;

        this.reservationForm;

        this.holidays;

        this.menu = this.getMenu(this.URL,()=>{
            let html = this.buildMenu(this.menu,'en');
            $('#mainGrid').append(html);
            this.buildMenuCategories();
            setTimeout(()=>{
                this.navigation = new Navigation();
                this.languageController = new LangController(this.navigation);
                this.contactform = new ContactForm(this.navigation);
                this.contactform.initContactForm();
                this.reservationForm = new ReservationForm(this.navigation);
                this.reservationForm.initReservationForm();
                this.holidays = new Holidays(this.navigation);
                // init filtering to show 'about' grid initially
                this.navigation.Grid.arrange({ filter: '[data-menu*="about"]' });
            },1000)
        });
    }

    buildMenuCategories() {

        let $menuContainers = $('#mainGrid .grid-layout__item--menu');
        let $buttons = $('#menucategories-filter');
		let tagged = {};

		$menuContainers.each(function(){
			var menuContainer=this;
			var tags = $(this).data('menu');

			if (tags) {
				tags.split(",").forEach(function(tagName){
                    tagName = tagName.trim();
                    if (tagName!=='menu') {
                        if (tagged[tagName]==null) {
                            tagged[tagName]=[];
                        }
                    tagged[tagName].push(menuContainer);
                    }
				});
			}
		})

        $buttons.addClass("btn-site__group btn-site__group--list");
        
        $.each(this.predefinedFilterButtons, function(index, val) {
            $("<li/>").appendTo($buttons);
            $("<a/>", {
                text: val.txt,
                class: val.class,
                click: val.clickFn
            }).appendTo($buttons.children().eq(index)).attr('data-filter',val.filter);
        });
        
		$("<li><a class='btn-site--divider'>&#124;</a></li>").appendTo($buttons);

		$.each(tagged, function(tagName) {
            if (tagName.toLowerCase().trim()!=='all meals' && tagName.toLowerCase().trim()!=='all drinks') {
                $("<li/>").appendTo($buttons);
                $("<a/>", {
                    text: tagName,
                    class: "btn-site btn-site--small btn-site--rounded",
                    click: function(){
                        $(this).addClass("btn-site--active").parent().siblings().children().removeClass("btn-site--active");
                    }
                }).appendTo($buttons.children().last()).attr('data-filter',tagName);
            }
        });

    };
    
    getMenu(url, callbackFn) {
        var _self = this;
        callbackFn = callbackFn || function() {};
        $.getJSON( url, function() {
            })
            .done(function(data) {
                console.log( "Menu loaded." );
                _self.menu = data;
            })
            .fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ": " + error;
                console.log( "Unable to load menu: " + err );
                _self.menu = [];
            })
            .always(function() {
                callbackFn();
            });
    }

    buildMenu(menu, lang) {
        let styleClass;
        let filTags;
        menu = menu || [];
        lang = (lang || '').trim();
        lang !== 'cz' && lang !== 'en' ? lang = 'en' : lang = lang.toLowerCase();
        let html = '';
        for (let i=0; i<menu.length; i++) {
            
            let categoryName = menu[i][lang + '_category'];
            let categoryNamecz = menu[i]['cz_category'];
            let categoryNameen = menu[i]['en_category'];
            styleClass = this.categoryConfig[menu[i]['en_category'].toLowerCase()]['categoryTheming'];
            filTags = this.categoryConfig[menu[i]['en_category'].toLowerCase()]['filterTags'];
            html += '<div data-menu="menu, ' + filTags + '" class="grid-layout__item grid-layout__item--menu">';
            html += '<div class="site-card ' + styleClass + '">';
            html += '<h3 class="site-card__title" data-lang-cz="' + categoryNamecz + '" data-lang-en="' + categoryNameen + '">' + categoryName + '</h3>';
            for (let x=0; x<menu[i].category.length; x++) {
                html += '<div class="site-card__menu-item">';
                html += this.buildMenuItem(menu[i].category[x], lang);
                if (x<menu[i].category.length-1) {
                    html +='<div class="site-card__menu-item__divider"></div>';
                }
                html +='</div>';
            }
            html +='</div></div>';
            
        }
        
        return html;
    }

    buildMenuItem(menuItem,lang) {
        let str = '';
        let imageHtml = '';
        menuItem = menuItem || {image:'', cz_itemname:'',en_itemname:'',cz_itemdesc:'',en_itemdesc:'',price:0,allergenes:''};
        let name = menuItem[lang + '_itemname'];
        let namecz = menuItem['cz_itemname'];
        let nameen = menuItem['en_itemname'];
        let description = menuItem[lang + '_itemdesc'];
        let descriptioncz = menuItem['cz_itemdesc'];
        let descriptionen = menuItem['en_itemdesc'];
        if (menuItem.image.toLowerCase().trim() !== '') {
            imageHtml += '<div class="site-card__image site-card__image--menu">';
            imageHtml +='<img src="' + this.menuImagePath + menuItem.image.trim() + '" alt="' + name + ' / Rang De Basanti">';
            imageHtml +='</div>';
        }
        str +='<div class="row align-items-center">';
        str += imageHtml;
        str +='<div class="col-8"><h3 class="site-card__subtitle" data-lang-cz="' + namecz + '" data-lang-en="' + nameen + '">' + name + '</h3></div>';
        str +='<div class="col-4"><div class="site-card__price-tag">';
        str +='<h3 class="site-card__subtitle site-card__price">' + menuItem.price + '<sup class="site-card__currency">Kč</sup></h3>';
        str +='</div></div></div>';
        str += this.buildAllergenes(menuItem.allergenes);
        str +='<p class="site-card__text" data-lang-cz="' + descriptioncz + '" data-lang-en="' + descriptionen + '">' + description + '</p>';
        return str;
    }

    buildAllergenes(allergenes){
        let txt = '';
        let allergArr = [];
        if (allergenes.trim() === '') {
            return txt;
        }
        typeof allergenes ==='string' ? allergenes = allergenes : allergenes = '';
        let temp = new Array();
        temp = allergenes.split(',');
        for (let i in temp) {
            if (temp[i] !== '' && temp[i] !== undefined && temp[i] !== NaN ){
                allergArr.push(parseInt(temp[i],10));
            }
        }
        txt = '<div class="allergenes__group">';
        for (let a=0;a<allergArr.length;a++) {
            txt+= '<div class="allergenes__item" data-toggle="tooltip" data-placement="top" title="' + this.allergenesList[allergArr[a]-1].tooltipContent + '">';
            txt+= '<img src="' + this.imagePath + this.allergenesList[allergArr[a]-1].imageFileName + '" alt="' + this.allergenesList[allergArr[a]-1].alt + '">';
            txt+= '</div>';
        }
        txt += '</div>';
        return txt;
    }

}

export default Menu;
