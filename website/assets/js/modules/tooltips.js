import "popper.js/dist/umd/popper";
import "bootstrap/js/dist/tooltip";
import $ from 'jquery';

class Tooltips {

    constructor () {
        this.initTooltips();
    }

    initTooltips() {
        $('[data-toggle="tooltip"]').tooltip();
    }

}

export default Tooltips;