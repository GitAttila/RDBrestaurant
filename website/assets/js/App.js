/*jshint esversion: 6 */
import './modules/map';
import './vendors/picker';
import './vendors/picker.time';
import './vendors/picker.date';

import MobileMenu from './modules/MobileMenu';
import Carousels from './modules/carousels';
import Navigation from './modules/navigation';
import OpeningHours from './modules/openinghours';

var mobileMenu = new MobileMenu();
var carousels = new Carousels();
var navigation = new Navigation();
var openinghours = new OpeningHours();

setTimeout(()=>{
    navigation.updateGrid();
},1000)


