/*jshint esversion: 6 */
import './modules/map';
import './modules/recaptcha';
import './vendors/picker';
import './vendors/picker.time';
import './vendors/picker.date';

import MobileMenu from './modules/MobileMenu';
import Carousels from './modules/carousels';
import OpeningHours from './modules/openinghours';
import Menu from './modules/menu';

var mobileMenu = new MobileMenu();
var carousels = new Carousels();
var menu = new Menu();
var openinghours = new OpeningHours();
