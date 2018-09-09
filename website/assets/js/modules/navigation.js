/*jshint esversion: 6 */
import $ from "jquery";
import Isotope from "isotope-layout";
import "isotope-layout/js/layout-modes/fit-rows";

class Navigation {

    constructor() {
        this.mainGrid = $('#mainGrid');
        this.events();
        this.initGrid();
    }

    events() {
        console.log(this.mainGrid);
    }

    initGrid() {
        // this.mainGrid.isotope({
        //     itemSelector: 'grid-layout__item',
        //     layoutMode: 'fitRows'
        // });
        return new Isotope('#mainGrid',{
            itemSelector: 'grid-layout__item',
            layoutMode: 'masonry'
        });

    }

}

export default Navigation;