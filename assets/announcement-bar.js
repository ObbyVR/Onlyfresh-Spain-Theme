class AnnouncementBar {
  constructor() {
    this.closeButton = document.querySelector('.utility-bar-icon__close');
    this.announcementBar = document.querySelector('.announcement-bar-section');
    
    if (this.closeButton && this.announcementBar) {
      this.closeButton.addEventListener('click', this.closeAnnouncementBar.bind(this));
    }
  }

  closeAnnouncementBar() {
    this.announcementBar.classList.add('closed-announcement-bar');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new AnnouncementBar();
});
