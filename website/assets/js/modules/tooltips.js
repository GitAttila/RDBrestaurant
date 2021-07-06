import bootstrap from 'bootstrap/dist/js/bootstrap';

class Tooltips {

    constructor () {
        this.initTooltips();
    }

    initTooltips() {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
        });
    }

}

export default Tooltips;