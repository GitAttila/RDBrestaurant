/*jshint esversion: 6 */
class MobileMenu {
    
    constructor() {
        this.menuIcon = $(".site-header__menu-icon");
        this.menuContent = $("#menuContent");
        this.menuHeader = $("#site-header");
        this.events();
    }

    events() {
        var self = this;
        const menuCon = document.getElementById('menuContent');
        this.menuContent[0].addEventListener('show.bs.collapse', () => {
            self.toggleTheIcon();
            self.toggleTheMenu();
        });
        this.menuContent[0].addEventListener('hide.bs.collapse', () => {
            self.toggleTheIcon();
            self.toggleTheMenu();
        });
    }
    
    toggleTheMenu() {
        this.menuHeader.toggleClass("site-header--is-expanded");
    } 
    toggleTheIcon() {
        this.menuIcon.toggleClass("site-header__menu-icon--close-x");
    } 

}

export default MobileMenu;