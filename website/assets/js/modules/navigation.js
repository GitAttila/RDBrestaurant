/*jshint esversion: 6 */

import Isotope from "isotope-layout";
import "isotope-layout/js/layout-modes/fit-rows";
import "bootstrap/js/dist/modal";

class Navigation {
    
    constructor() {
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
        });

        $('.site-card__expand-icon').on( 'click', function() {
            console.log('expand icon clicked!');
            let $parElem = $(this).parent().parent();
            $(this).toggleClass('site-card__expand-icon--selected');
            $($parElem).toggleClass("grid-layout__item--width-full");
            grid.layout();
        });

        $('#allergenes-list').on('shown.bs.modal', function () {
            console.log('showing allergenes list...');
            
        });

    }
    

}

export default Navigation;