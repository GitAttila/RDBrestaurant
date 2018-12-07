/*jshint esversion: 6 */
import './modules/map';
import './vendors/picker';
import './vendors/picker.time';
import './vendors/picker.date';

import MobileMenu from './modules/MobileMenu';
import Carousels from './modules/carousels';
import Navigation from './modules/navigation';
import OpeningHours from './modules/openinghours';
import Menu from './modules/menu';

var mobileMenu = new MobileMenu();
var carousels = new Carousels();
var navigation = new Navigation();
var openinghours = new OpeningHours();
var menu = new Menu();

setTimeout(()=>{
    navigation.updateGrid();
},1000)

console.log(menu);