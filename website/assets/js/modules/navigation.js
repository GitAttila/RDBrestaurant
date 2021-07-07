/*jshint esversion: 6 */

import Isotope from "isotope-layout";
import Tooltips from './tooltips';
import ScrollingActions from './scrolling_actions';
import "isotope-layout/js/layout-modes/fit-rows";
import "bootstrap/js/dist/modal";
import '../vendors/picker';
import './animatecss';

class Navigation {
    
    constructor() {
        this.scrollActions = new ScrollingActions();
        this.mainGrid = $('#mainGrid');
        this.menuGrid = $('#menuGrid');
        this.sizer = $('#main-sizer');
        this.navGrid = new Isotope( this.mainGrid[0], {
            percentPosition : true,
            itemSelector: '.grid-layout__item',
            stagger:50,
            masonry: {
                columnWidth: '.grid-layout--sizer'
            }
        });

        this.navMenuGrid = new Isotope( this.menuGrid[0], {
            percentPosition : true,
            itemSelector: '.grid-layout__item--menu',
            stagger:50,
            masonry: {
                columnWidth: '.grid-layout--menu-sizer'
            }
        });

        this.events(this.navGrid, this.navMenuGrid);

        this.updateGrid = function() {
            this.navGrid.layout();
        };
        this.updateMenuGrid = function() {
            this.navMenuGrid.layout();
        };
    }

    events(grid, menuGrid) {  
        let actualMenuCat = '';
        let lastNavMenuClicked='about';
        let tooltips;
        self = this;
        grid = grid || self.navGrid;
        menuGrid = menuGrid || self.navMenuGrid;

        $("#menuContent [data-filter]").on('click', function(e){
            let isNavItemDisabled = $(this).hasClass('primary-nav__link--disabled');
            e.preventDefault();
            let filterValue = $(this).data('filter').toLowerCase().trim();

            if ((lastNavMenuClicked === filterValue) || isNavItemDisabled) {
                return;
            }
            lastNavMenuClicked = filterValue;
            $('#menuContent .primary-nav__link').addClass('primary-nav__link--disabled');
            let menuSectionCaption = $(this).text().toLowerCase().trim() || "";
            let langKey = $(this).data('lang');
            if (filterValue==='home') {menuSectionCaption = filterValue;}
            actualMenuCat = $('#menucategories-filter .btn-site.btn-site--active').text().toLocaleUpperCase();

            if (filterValue==='menu') {
                $('#menuGrid').fadeIn(500,
                    function() {
                        self.updateMenuGrid();
                    }
                );
                $(".menu-categories-wrapper ").slideDown();
                $('#menuContent .primary-nav__link').removeClass('primary-nav__link--disabled');
            }  else {
                $('#menuGrid').hide();
                $(".menu-categories-wrapper ").slideUp();
                
            }
            if (filterValue==='menu' || filterValue==='daily-menu') {
                tooltips = new Tooltips();
                $('#allergenes-icon').show();
            } else {
                $('#allergenes-icon').hide();
            }

            if (filterValue==='daily-menu') {
                const today = new Date(); 
                const day = today.getDay();
                let index = day - 1;
                index === -1 || index === 5 ? index = 0 : index = index;
                const dailyMenuEls = $('#daily-menu .site-card__daily-menu-wrapper');
                if (dailyMenuEls.length && dailyMenuEls[index]) {
                    dailyMenuEls.removeClass('site-card__daily-menu-wrapper--active');
                    dailyMenuEls.eq(index).addClass('site-card__daily-menu-wrapper--active');
                } 
            }

            $("#main-section-title").data("lang", langKey); 
            $("#main-section-title").text(menuSectionCaption);
            $("#main-section-title").animateCss('fadeIn');
            $("#menuContent .primary-nav__link").removeClass("primary-nav__link--active");
            $(this).addClass("primary-nav__link--active");
            
            // collapse the nav menu on mobile after a menu item has been clicked
            if ($("#menuContent").hasClass('show')) {
                $("#menuContent").delay(300).collapse('hide');
            }

            grid.arrange({
                filter: function(item){
                    let found = false;
                    let itemData = $(item).data("menu").toLowerCase().trim();
                    let valuesArr = itemData.split(',');
                    for (let i = 0;i<valuesArr.length; i++) {
                        if (valuesArr[i].trim()===filterValue) {
                            found = true;
                        }
                    }
                    return found;
                }
            });

            grid.once( 'arrangeComplete', function( filteredItems ) {
                let delayed = 300;
                var pos = $('#main-section')[0].offsetTop;
                self.scrollActions.scrollTo('html, body',pos);
                grid.layout();
                $(filteredItems).each(function(key,val){
                    $(val.element).stop().animateCss('pulse', delayed, ()=>{
                        if (key === (filteredItems.length-1)) {
                            $('#menuContent .primary-nav__link').removeClass('primary-nav__link--disabled');
                            $('#menuContent .primary-nav__link').blur();
                        }
                    });
                });
            });

        });

        $('.site-card__expand-icon').on( 'click', function() {
            let $parElem = $(this).parent().parent();
            $(this).toggleClass('site-card__expand-icon--selected');
            $($parElem).toggleClass("grid-layout__item--width-full");
            grid.layout();
        });

        $('#jump-up').on( 'click', function() {
            self.scrollActions.scrollTo('html, body', 0, function(){
            });
        });

        $('#jump-down').on( 'click', function() {
            let pos = $('#main-section')[0].offsetTop;
            self.scrollActions.scrollTo('html, body', pos, function(){
            });
        });

        let today = new Date(); 
        let oneday = 60 * 60 * 24 * 1000;
        let minDate = new Date(today.getTime() + oneday);// do not allow registrations for the same day
        let maxDate = new Date(today.getTime() + (oneday * 180));

        $('#res-date').pickadate({
            min: minDate,
            max: maxDate
        });
        $('#res-time').pickatime({
            min: [11,0],
            max: [21,30]
        });

        $('input.site-form__field, textarea.site-form__field').on('change', function(ev){
            if ($(this).val() !== '' ) {
                $(this).siblings('label').addClass('site-form__label--activated');
            } else {
                $(this).siblings('label').removeClass('site-form__label--activated');
            }
        });

        $('#menucategories-filter a.btn-site'). on('click', (e) => {
            e.preventDefault();
            let filVal = $(e.target).data('filter').toLowerCase().trim();
            $('#menucategories-filter a.btn-site').removeClass('btn-site--active');
            $(e.target).addClass('btn-site--active');
            menuGrid.arrange({
                filter: function(item){
                    let found = false;
                    let itemData = $(item).data("menu").toLowerCase().trim();
                    let valuesArr = itemData.split(',');
                    for (let i = 0;i<valuesArr.length; i++) {               
                        if (valuesArr[i].trim()===filVal) {
                            found = true;
                        }
                    }
                    return found;
                }
            });
            // if only one grid item is present after filtereing, spread it across the screen
            if (menuGrid.filteredItems.length===1) {
                $(menuGrid.filteredItems[0].element).addClass('grid-layout__item--width-full');
            // otherwise take the 100% width class away if there are more than one grid items after filter has been applied
            } else {
                $(menuGrid.filteredItems).each(function(key,val){
                    $(val.element).removeClass('grid-layout__item--width-full');
                });
            }

            menuGrid.once( 'arrangeComplete', function( filteredItems ) {
                let delayed = 300;
                $(filteredItems).each(function(key,val){
                    $(val.element).stop().animateCss('pulse', delayed, ()=>{
                        if (key === (filteredItems.length-1)) {
                            $('#menuContent .primary-nav__link').removeClass('primary-nav__link--disabled');
                            $('#menuContent .primary-nav__link').blur();
                        }
                    });
                });
            });

        });

    }

}

export default Navigation;