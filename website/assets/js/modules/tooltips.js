import "popper.js/dist/umd/popper";
import "bootstrap/js/dist/tooltip";

class Tooltips {

    constructor () {
        this.initTooltips();
    }

    initTooltips() {
        $('[data-toggle="tooltip"]').tooltip();
    }

}

export default Tooltips;