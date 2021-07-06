import bootstrap from 'bootstrap/dist/js/bootstrap';

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
            const carouselSelector = element.selector;
            new bootstrap.Carousel(
                carouselSelector,
                {
                    interval: element.interval,
                    ride: element.ride
                }
            );
        });
    }

}

export default Carousels;