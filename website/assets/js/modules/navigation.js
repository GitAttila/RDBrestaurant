/*jshint esversion: 6 */
import $ from 'jquery';
import Isotope from "isotope-layout";
import "isotope-layout/js/layout-modes/fit-rows";
import "bootstrap/js/dist/modal";
import '../vendors/picker';
import ScrollingActions from './scrolling_actions';
class Navigation {
    
    constructor() {
        this.scrollActions = new ScrollingActions();
        this.mainGrid = $('#mainGrid');
        this.Grid = new Isotope( this.mainGrid[0], {
            percentPosition : true,
            itemSelector: '.grid-layout__item',
            stagger:30,
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
        self = this;
        grid = grid || this.Grid;
        $("#menuContent [data-filter]").on('click', function(e){
            e.preventDefault();
            let filterValue = $(this).data('filter').toLowerCase().trim();
            let menuSectionCaption = $(this).text().toLowerCase().trim() || "";
            if (filterValue==='home') {menuSectionCaption = filterValue;}
            $("#main-section-title").text(menuSectionCaption);
            $("#menuContent .primary-nav__link").removeClass("primary-nav__link--active");
            $(this).addClass("primary-nav__link--active");
            
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
                    if (filterValue === 'home') {found = true;} 
                    return found;
                }
            });

            grid.once( 'arrangeComplete', function( filteredItems ) {
                console.log( filteredItems );
                var pos = $('#main-section')[0].offsetTop;
                self.scrollActions.scrollTo('html, body',pos);
            });
            
        });

        $('.site-card__expand-icon').on( 'click', function() {
            console.log('expand icon clicked!');
            let $parElem = $(this).parent().parent();
            $(this).toggleClass('site-card__expand-icon--selected');
            $($parElem).toggleClass("grid-layout__item--width-full");
            grid.layout();
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