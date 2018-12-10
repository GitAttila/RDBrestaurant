import $ from 'jquery';

import Navigation from './navigation';


class Menu {

    constructor() {
        this.URL = './assets/data/menu_data.json';
        this.imagePath = './assets/images/allergenes/';
        this.menuImagePath = './assets/images/menu/';
        this.allergenesList = [
            {
                imageFileName: '1-wheat.png',
                alt: 'wheat allergenes icon'
            },
            {
                imageFileName: '2-crustaceans.png',
                alt: 'crustaceans allergenes icon'
            },
            {
                imageFileName: '3-eggs.png',
                alt: 'eggs allergenes icon'
            },
            {
                imageFileName: '4-fish.png',
                alt: 'fish allergenes icon'
            },
            {
                imageFileName: '5-peanuts.png',
                alt: 'peanuts allergenes icon'
            },
            {
                imageFileName: '6-soya.png',
                alt: 'soya allergenes icon'
            },
            {
                imageFileName: '7-milk.png',
                alt: 'milk allergenes icon'
            },
            {
                imageFileName: '8-nuts.png',
                alt: 'nuts allergenes icon'
            },
            {
                imageFileName: '9-celery.png',
                alt: 'celery allergenes icon'
            },
            {
                imageFileName: '10-mustard.png',
                alt: 'mustard allergenes icon'
            },
            {
                imageFileName: '11-sesame.png',
                alt: 'sesame allergenes icon'
            },
            {
                imageFileName: '12-sulphites.png',
                alt: 'sulphites allergenes icon'
            },
            {
                imageFileName: '13-lupin.png',
                alt: 'lupin allergenes icon'
            },
            {
                imageFileName: '14-molluscs.png',
                alt: 'molluscs allergenes icon'
            }
        ];
        this.categoryConfig = {
            'starters':
                {
                    filterTags: 'starters, meals',
                    categoryThemingClass: 'site-card__secondary'
                },
            'soup':
                {
                    filterTags: 'soup, meals',
                    categoryTheming: ''
                },
            'indian drinks':
                {
                    filterTags: 'drinks',
                    categoryTheming: 'site-card__tertiary'
                },
            'veg tandoori specialities':
                {
                    filterTags: 'tandoor, meals, vegetarian',
                    categoryTheming: 'site-card__tertiary'
                },
            'non veg tandoori specialities':
                {
                    filterTags: 'tandoor, meals, non-vegetarian',
                    categoryTheming: 'site-card__secondary'
                },
            'main course non-vegetarian':
                {
                    filterTags: 'meals, non-vegetarian',
                    categoryTheming: 'site-card__secondary'
                },
            'main course vegetarian':
                {
                    filterTags: 'meals, vegetarian',
                    categoryTheming: 'site-card__tertiary'
                },
            'rice specialities':
                {
                    filterTags: 'side dish, vegetarian, rice',
                    categoryTheming: ''
                },
            'indian bread':
                {
                    filterTags: 'side dish, vegetarian, bread',
                    categoryTheming: 'site-card__secondary'
                },
            'salad':
                {
                    filterTags: 'starters, vegetarian, salad',
                    categoryTheming: 'site-card__tertiary'
                },
            'indian chutneys':
                {
                    filterTags: 'side dish, vegetarian',
                    categoryTheming: ''
                },
            'desserts':
                {
                    filterTags: 'desserts',
                    categoryTheming: 'site-card__secondary'
                }
        };

        this.menu = this.getMenu(this.URL,()=>{
            let html = this.buildMenu(this.menu,'en');
            // console.log(html);
            $('#mainGrid').append(html);
            setTimeout(()=>{
                let navigation = new Navigation();
                console.log(navigation);
                navigation.updateGrid();
            },1000)
        });
        this.buildFilterBtns(this.categoryConfig);
    }

    buildFilterBtns(catConfig) {
        let bntArr = [];
        let temp = [];
        const keys = Object.keys(catConfig);
        for (const key of keys) {
            temp = (this.categoryConfig[key].filterTags).split(',');
            console.log(temp);
            for (let i=0; i>temp.length; i++) {
                if (btnArr[x]!==temp[i]) {
                    
                }
            }
            //bntArr.push();
        }
    }

    getMenu(url, fallbackFn) {
        var _self = this;
        fallbackFn = fallbackFn || function() {};
        $.getJSON( url, function() {
            })
            .done(function(data) {
                console.log( "menu loaded..." );
                _self.menu = data;
            })
            .fail(function(jqxhr, textStatus, error) {
                var err = textStatus + ": " + error;
                console.log( "Unable to load menu: " + err );
                _self.menu = [];
            })
            .always(function() {
                fallbackFn();
            });
    }

    buildMenu(menu, lang) {
        let styleClass;
        let filTags;
        menu = menu || [];
        lang = (lang || '').trim();
        lang !== 'cz' && lang !== 'en' ? lang = 'en' : lang = lang.toLowerCase();
        let html = '';
        html += '<div class="site-card__menu-item">';
        for (let i=0; i<menu.length; i++) {
            let categoryName = menu[i][lang + '_category'];
            styleClass = this.categoryConfig[menu[i]['en_category'].toLowerCase()]['categoryTheming'];
            filTags = this.categoryConfig[menu[i]['en_category'].toLowerCase()]['filterTags'];
            html += '<div data-menu="menu, ' + filTags + '" class="grid-layout__item grid-layout__item--menu">';
            html += '<div class="site-card ' + styleClass + '">';
            html += '<h3 class="site-card__title">' + categoryName + '</h3>';
            for (let x=0; x<menu[i].category.length; x++) {
                html += this.buildMenuItem(menu[i].category[x], lang);
                if (x<menu[i].category.length-1) {
                    html +='<div class="site-card__menu-item__divider"></div>';
                }
            }
            html +='</div></div>';
        }
        html +='</div>';
        return html;
    }

    buildMenuItem(menuItem,lang) {
        let str = '';
        let imageHtml = '';
        menuItem = menuItem || {image:'', cz_itemname:'',en_itemname:'',cz_itemdesc:'',en_itemdesc:'',price:0,allergenes:''};
        let name = menuItem[lang + '_itemname'];
        let description = menuItem[lang + '_itemdesc'];
        if (menuItem.image.toLowerCase().trim() !== '') {
            imageHtml += '<div class="site-card__image">';
            imageHtml +='<img src="' + this.menuImagePath + menuItem.image.trim() + '" alt="' + name + ' / Rang De Basanti">';
            imageHtml +='</div>';
        }
        str +='<div class="row align-items-center">';
        str += imageHtml;
        str +='<div class="col-8"><h3 class="site-card__subtitle">' + name + '</h3></div>';
        str +='<div class="col-4"><div class="site-card__price-tag">';
        str +='<h3 class="site-card__subtitle site-card__price">' + menuItem.price + '<sup class="site-card__currency">Kč</sup></h3>';
        str +='</div></div></div>';
        str += this.buildAllergenes(menuItem.allergenes);
        str +='<p class="site-card__text">' + description + '</p>';
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
            txt+= '<div class="allergenes__item">';
            txt+= '<img src="' + this.imagePath + this.allergenesList[allergArr[a]-1].imageFileName + '" alt="' + this.allergenesList[allergArr[a]-1].alt + '">';
            txt+= '</div>';
        }
        txt += '</div>';
        return txt;
    }

}

export default Menu;
