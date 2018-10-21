/*jshint esversion: 6 */
import './modules/animatecss';
import './modules/map';
import MobileMenu from './modules/MobileMenu';
import Navigation from './modules/navigation';
import OpeningHours from './modules/openinghours';


var mobileMenu = new MobileMenu();
var navigation = new Navigation();
var openinghours = new OpeningHours();

navigation.updateGrid();

