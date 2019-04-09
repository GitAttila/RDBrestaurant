/*jshint esversion: 6 */
import $ from 'jquery';
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
        this.Grid = new Isotope( this.mainGrid[0], {
            percentPosition : true,
            itemSelector: '.grid-layout__item',
            stagger:50,
            masonry: {
                columnWidth: '.grid-layout--sizer'
            }
        });

        this.events(this.Grid);

        this.updateGrid = function() {
            this.Grid.layout();
        };
    }

    events(grid) {  
        let actualMenuCat;
        let lastNavMenuClicked='about';
        self = this;
        grid = grid || this.Grid;
        $("#menuContent [data-filter]").on('click', function(e){
            let isNavItemDisabled = $(this).hasClass('primary-nav__link--disabled');
            e.preventDefault();
            let filterValue = $(this).data('filter').toLowerCase().trim();
            if ((lastNavMenuClicked === filterValue) || isNavItemDisabled) {
                // console.log('returning from the function...');
                return;
            }
            lastNavMenuClicked = filterValue;
            $('#menuContent .primary-nav__link').addClass('primary-nav__link--disabled');
            let menuSectionCaption = $(this).text().toLowerCase().trim() || "";
            if (filterValue==='home') {menuSectionCaption = filterValue;}
            actualMenuCat = $('#menucategories-filter .btn-site.btn-site--active').text().toLocaleUpperCase();
            // console.log(filterValue);
            if (filterValue==='menu') {
                let tooltips = new Tooltips();
                // tooltips.initTooltips();
                $(".menu-categories-wrapper ").slideDown();
                $('#menucategories-filter .btn-site').removeClass('btn-site--active');
                $('#menucategories-filter .btn-site').eq(0).addClass('btn-site--active');
                $('#allergenes-icon').show();
            }  else {
                $(".menu-categories-wrapper ").slideUp();
                $('#allergenes-icon').hide();
            }

            $("#main-section-title").text(menuSectionCaption);
            $("#main-section-title").animateCss('fadeIn');
            $("#menuContent .primary-nav__link").removeClass("primary-nav__link--active");
            $(this).addClass("primary-nav__link--active");
            
            // collapse the nav menu on mobile after a menu item has been clicked
            if ($("#menuContent").hasClass('show')) {
                $("#menuContent").delay(300).collapse('hide');
            }

            $.get("https://www.googleapis.com/calendar/v3/calendars/en.czech%23holiday%40group.v.calendar.google.com/events?key=AIzaSyC0_YQ9tuOphHXitIFVZAn0ltCgq9zjCOo", function( data ) {
                console.log(data);
            });

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
                            console.log('animation completed...');
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

        let minDate = new Date();
        let sixmonths = 180 * 60 * 60 * 24 * 1000;
        let maxDate = new Date(minDate.getTime() + sixmonths);

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
            grid.arrange({
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
            // if only one gri item is rpesent after filtereing, spread it across the screen
            if (grid.filteredItems.length===1) {
                $(grid.filteredItems[0].element).addClass('grid-layout__item--width-full');
            // otherwise take the 100% width class away if there are more than one grid items after filter has been applied
            } else {
                $(grid.filteredItems).each(function(key,val){
                    $(val.element).removeClass('grid-layout__item--width-full');
                });
            }
            grid.layout();
        });

        var showAllergenes = function(modalEl){
            modalEl = modalEl || '';
            $(modalEl).modal('show');
        };

        $('#allergenes-list').on('shown.bs.modal', function () {

        });

        return {
            showAllergenes:showAllergenes
        };

    }

}

export default Navigation;