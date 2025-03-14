class DetailsDisclosure extends HTMLElement {
  constructor() {
    super();
    this.mainDetailsToggle = this.querySelector("details");
    this.content =
      this.mainDetailsToggle.querySelector("summary").nextElementSibling;

    this.mainDetailsToggle.addEventListener(
      "focusout",
      this.onFocusOut.bind(this),
    );
    this.mainDetailsToggle.addEventListener("toggle", this.onToggle.bind(this));
  }

  onFocusOut() {
    setTimeout(() => {
      if (!this.contains(document.activeElement)) this.close();
    });
  }

  onToggle() {
    if (!this.animations) this.animations = this.content.getAnimations();

    if (this.mainDetailsToggle.hasAttribute("open")) {
      this.animations.forEach((animation) => animation.play());
    } else {
      this.animations.forEach((animation) => animation.cancel());
    }
  }

  open() {
    this.mainDetailsToggle.open = true;
    this.mainDetailsToggle
      .querySelector("summary")
      .setAttribute("aria-expanded", true);
  }

  close() {
    this.mainDetailsToggle.removeAttribute("open");
    this.mainDetailsToggle
      .querySelector("summary")
      .setAttribute("aria-expanded", false);
  }
}

customElements.define("details-disclosure", DetailsDisclosure);

class HeaderMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.header = document.querySelector(".header-wrapper");
  }

  onToggle() {
    if (!this.header) return;
    this.header.preventHide = this.mainDetailsToggle.open;

    if (
      document.documentElement.style.getPropertyValue(
        "--header-bottom-position-desktop",
      ) !== ""
    )
      return;
    document.documentElement.style.setProperty(
      "--header-bottom-position-desktop",
      `${Math.floor(this.header.getBoundingClientRect().bottom)}px`,
    );
  }
}

customElements.define("header-menu", HeaderMenu);

class FooterMenu extends DetailsDisclosure {
  constructor() {
    super();
    this.footer = document.querySelector(".fresh-footer__menu");
    this.mainDetailsToggle.querySelector("summary").onclick = (ev) => {
      if (window.innerWidth > 768) {
        ev.preventDefault();
      }
    };
    const s = this;
    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        if (!s.mainDetailsToggle.hasAttribute("open")) {
          s.open();
        }
      } else {
        if (s.mainDetailsToggle.hasAttribute("open")) {
          s.close();
        }
      }
    });

    if (window.innerWidth > 768) {
      this.mainDetailsToggle.open = true;
    }
  }
}

customElements.define("footer-menu", FooterMenu);
