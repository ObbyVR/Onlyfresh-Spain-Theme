if(!customElements.get('sub-collection')){
    class SubCollection extends HTMLElement {
        constructor(){
            super();
        }
        connectedCallback(){
            this.swiper = new Swiper(
                this.querySelector('.swiper'), {
                    slidesPerView: 'auto',
                    spaceBetween: 12,
                    freeMode: true,
                    navigation: {
                        nextEl: this.querySelector(".sub-collection-button-next"),
                        prevEl: this.querySelector(".sub-collection-button-prev"),
                      },
                }
            )
        }
    }
    customElements.define('sub-collection',SubCollection );
}