import $ from 'jquery';

class Menu {

    constructor() {
        this.URL = './assets/data/menu_data.json';
        this.imagePath = './assets/images/allergenes/';
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
        this.menu = this.getMenu(this.URL,()=>{
            let html = this.buildMenu(this.menu,'en');
            console.log(html);
            $('#mainGrid').append(html);
        });
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
        menu = menu || [];
        lang = (lang || '').trim();
        lang !== 'cz' && lang !== 'en' ? lang = 'en' : lang = lang.toLowerCase();
        let html = '';
        for (let i=0; i<menu.length; i++) {
            let categoryName = menu[i][lang + '_category'];
            html += '<div data-menu="menu" class="grid-layout__item grid-layout__item--menu">';
            html += '<div class="site-card site-card__tertiary">';
            html += '<h3 class="site-card__title">' + categoryName + '</h3>';
            for (let x=0; x<menu[i].category.length; x++) {
                html += this.buildMenuItem(menu[i].category[x], lang);
            }
            html +='</div></div>';
        }
        return html;
    }

    buildMenuItem(menuItem,lang) {
        menuItem = menuItem || {cz_itemname:'',en_itemname:'',cz_itemdesc:'',en_itemdesc:'',price:0,allergenes:''};
        let name = menuItem[lang + '_itemname'];
        let description = menuItem[lang + '_itemdesc'];
        let str = '';
        str +='<div class="site-card__menu-item"><div class="row align-items-center">';
        str +='<div class="col-8"><h3 class="site-card__subtitle">' + name + '</h3></div>';
        str +='<div class="col-4"><div class="site-card__price-tag">';
        str +='<h3 class="site-card__subtitle site-card__price">' + menuItem.price + '<sup class="site-card__currency">Kč</sup></h3>';
        str +='</div></div></div>';
        str += this.buildAllergenes(menuItem.allergenes);
        str +='<p class="site-card__text">' + description + '</p>';
        str +='<div class="site-card__menu-item__divider"></div></div>';
        return str;
    }

    buildAllergenes(allergenes){
        typeof allergenes ==='string' ? allergenes = allergenes : allergenes = '';
        let txt = '';
        let temp = new Array();
        temp = allergenes.split(',');
        for (let i in temp) {
            temp[i] = parseInt(temp[i],10)
        }
        txt = '<div class="allergenes__group">';
        for (let a;a<temp.length;a++) {
            txt+= '<div class="allergenes__item">';
            txt+= '<img src="' + this.imagePath + this.allergenesList[a+1].imageFileName + ' alt=' + this.allergenesList[a+1].alt + '>';
            txt+= '</div>';
        }
        txt += '</div>';
        return txt;
    }

}

export default Menu;
