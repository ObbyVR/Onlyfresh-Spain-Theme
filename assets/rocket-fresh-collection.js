document.addEventListener("DOMContentLoaded", function () {
  new Ajaxinate({
    container: "#product-grid",
    pagination: "#AjaxinatePagination",
    offset: 0,
    method: "click",
    callback: function (e) {
      // Callback function
      window.history.pushState(null,'',  e.URL);
      document.dispatchEvent(
        new CustomEvent("ajaxinate:loaded", { detail: e })
      );
    },
  });
  if (!window.SwymCallbacks) {
    window.SwymCallbacks = [];
  }
  window.SwymCallbacks.push(collectionLoaded);

  function collectionLoaded(swat) {
    document.addEventListener("ajaxinate:loaded", function (e) {
      if (swat) {
        swat.initializeActionButtons("#product-grid");
      }
      restockInit();
    });
  }
  collectionLoaded();

  function checkScroll() {
    const facetsContainer = document.querySelector('.facets-container');
    if (facetsContainer) {
      const offsetTop = facetsContainer.offsetTop;
      if (window.scrollY > offsetTop) {
        facetsContainer.classList.add('active-sticky');
      } else {
        facetsContainer.classList.remove('active-sticky');
      }
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();
});
