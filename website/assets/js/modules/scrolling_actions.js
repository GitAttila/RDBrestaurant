import $ from 'jquery';
import { waypoints } from '../../../../node_modules/waypoints/lib/noframework.waypoints';

class ScrollingActions {

    constructor () {
        this.mainSection = $('#main-section');
        this.createWaypoints();
        this.scrollTo;
    }

    createWaypoints() {
        var elem = this.mainSection[0];
        new Waypoint({
            element: elem,
            handler: function(){
                console.log('navbar waypoint triggered!');
                $("#site-header").toggleClass('site-header--transparent');
            },
            offset: '10%'
        });
    }

    scrollTo(elem,scrollToPos) {
        $(elem).animate(
            {
                scrollTop: scrollToPos
            }, 
            700,
            'swing', 
            function() { 
                console.log("Finished scrolling");
            }
        );
    };

}

export default ScrollingActions;