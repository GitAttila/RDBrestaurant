import "bootstrap/js/dist/carousel";
import $ from 'jquery';
class Carousels {

    constructor () {
        this.carousels = 
            [
                {
                    selector: '#mainHeroCarousel',
                    interval: 7000,
                    ride: true
                },
                {
                    selector: '#aboutPhotoGallery',
                    interval: 5000,
                    ride: true
                }
            ]
        this.initCarousels(this.carousels);
    }

    initCarousels(carousels) { 
        carousels = carousels || [];
        carousels.forEach(element => {
            $(element.selector).carousel({
                interval: element.interval,
                ride: element.ride
            });
        });
    }

}

export default Carousels;