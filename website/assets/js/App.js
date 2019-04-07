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
import ContactForm from './modules/contactform';
import ReservationForm from './modules/reservationform';

var mobileMenu = new MobileMenu();
var carousels = new Carousels();
var menu = new Menu();
var contactform = new ContactForm();
var reservationform = new ReservationForm();
var openinghours = new OpeningHours();


contactform.initContactForm();
reservationform.initReservationForm();