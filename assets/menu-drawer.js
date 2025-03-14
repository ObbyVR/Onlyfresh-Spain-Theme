(function() {
  /**
   * Class representing a MenuDrawer.
   */
  class MenuDrawer {
    /**
     * Create a MenuDrawer.
     */
    constructor() {
      this.level1Links = document.querySelectorAll('.menu-drawer__navigation-level-1 .list-menu__drawer-item');
      this.level2Links = document.querySelectorAll('.menu-drawer__navigation-level-2 .list-menu__drawer-item');
      this.level2 = document.querySelectorAll('.menu-drawer__navigation-level-2');
      this.level3 = document.querySelectorAll('.menu-drawer__navigation-level-3');
      this.menuButton = document.querySelector('.header__icon--summary.link');
      this.closeButton = document.querySelector('.close-menu-drawer');
      this.overlay = document.querySelector('.menu-overlay');
      this.activeClass = 'active';
      this.bindEvents();
    }

    /**
     * Bind click events to menu links.
     */
    bindEvents() {
      this.level1Links.forEach((link, indexLevel1) => {
        link.addEventListener('click', () => this.handleLevel1Click(link, indexLevel1));
      });

      this.level2Links.forEach(link => {
        link.addEventListener('click', () => this.handleLevel2Click(link));
      });

      // Bind click events for closing the menu
      this.closeButton.addEventListener('click', this.triggerMenuButton.bind(this));
      this.overlay.addEventListener('click', this.triggerMenuButton.bind(this));
    }

    /**
     * Handle click event for level 1 menu links.
     * @param {HTMLElement} link - The clicked link element.
     * @param {number} indexLevel1 - The index of the clicked link in the level 1 links.
     */
    handleLevel1Click(link, indexLevel1) {

      this.level1Links.forEach(otherLink => {
        if (otherLink !== link) {
          otherLink.classList.remove(this.activeClass);
        }
      });
      link.classList.add(this.activeClass);

      this.level2.forEach((subMenu, indexLevel2)=> {
        subMenu.classList.toggle(this.activeClass, indexLevel1 === indexLevel2);
      });
    }

    /**
     * Handle click event for level 2 menu links.
     * @param {HTMLElement} link - The clicked link element.
     */
    handleLevel2Click(link) {
      const currentSubSubMenu = link.nextElementSibling;

      this.level2Links.forEach(otherLink => {
        if (otherLink !== link) {
          otherLink.classList.remove(this.activeClass);
        }
      });
      link.classList.toggle('active');

      this.level3.forEach(subSubMenu => {
        if (subSubMenu !== currentSubSubMenu) {
          subSubMenu.classList.remove(this.activeClass);
        }
      });

      currentSubSubMenu.classList.toggle(this.activeClass);
    }

    triggerMenuButton() {
      this.menuButton.click();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new MenuDrawer();
  });
})();
