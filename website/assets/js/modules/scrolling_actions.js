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
                // console.log('semi-transparent triggered!');
                $("#site-header").toggleClass('site-header--semi-transparent');
                $("#site-header").toggleClass('site-header--shadowed');
            },
            offset: '75%'
        });
        new Waypoint({
            element: elem,
            handler: function(){
                // console.log('filled triggered!');
                $("#site-header").toggleClass('site-header--filled');
            },
            offset: '5%'
        });
        new Waypoint({
            element: elem,
            handler: function(){
                console.log('jumpbuttons show/hide trigerred...')
                $('#jump-up').toggle();
                $('#jump-down').toggle();
            },
            offset: '20%'
        });
    }

    scrollTo(elem,scrollToPos, callBackFunc) {
        if (typeof callBackFunc!=='function') {callBackFunc = function(){}}
        $(elem).stop().animate(
            {
                scrollTop: scrollToPos
            }, 
            700,
            'swing', 
            function() { 
                //console.log("Finished scrolling");
                callBackFunc();
            }
        );
    };

}

export default ScrollingActions;