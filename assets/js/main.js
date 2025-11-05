(function () {
  "use strict";

  /**
   * Apply .scrolled class to body when page is scrolled
   */
  function toggleScrolled() {
    const body = document.querySelector("body");
    const header = document.querySelector("#header");
    if (!header) return;
    if (
      !header.classList.contains("sticky-top") &&
      !header.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? body.classList.add("scrolled")
      : body.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * ✅ Mobile Navbar Toggle
   */
  const toggleBtn = document.querySelector(".mobile-nav-toggle");
  const navMenu = document.querySelector("#navmenu");

  function toggleMobileNav() {
    document.body.classList.toggle("mobile-nav-active");
    toggleBtn.classList.toggle("bi-list");
    toggleBtn.classList.toggle("bi-x");
  }

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener("click", toggleMobileNav);
  }

  // Close mobile nav when any link is clicked
  document.querySelectorAll("#navmenu a").forEach((link) => {
    link.addEventListener("click", () => {
      if (document.body.classList.contains("mobile-nav-active")) {
        toggleMobileNav();
      }
    });
  });

  /**
   * Dropdowns inside mobile nav (if any)
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((drop) => {
    drop.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => preloader.remove());
  }

  /**
   * Scroll-to-top button
   */
  const scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll (AOS)
   */
  function aosInit() {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Typed.js (Hero typing effect)
   */
  const typedElement = document.querySelector(".typed");
  if (typedElement) {
    const typedStrings = typedElement
      .getAttribute("data-typed-items")
      .split(",");
    new Typed(".typed", {
      strings: typedStrings,
      loop: true,
      typeSpeed: 90,
      backSpeed: 40,
      backDelay: 1500,
    });
  }

  /**
   * Skills animation (progress bars)
   */
  const skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function () {
        const progressBars = item.querySelectorAll(".progress .progress-bar");
        progressBars.forEach((bar) => {
          bar.style.width = bar.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Pure Counter
   */
  new PureCounter();

  /**
   * Swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      const config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );
      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }
  window.addEventListener("load", initSwiper);

  /**
   * Isotope layout filters (portfolio)
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    const layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    const filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    const sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener("click", function () {
          isotopeItem
            .querySelector(".isotope-filters .filter-active")
            .classList.remove("filter-active");
          this.classList.add("filter-active");
          initIsotope.arrange({
            filter: this.getAttribute("data-filter"),
          });
          aosInit();
        });
      });
  });

  /**
   * GLightbox (for portfolio images)
   */
  const glightbox = GLightbox({ selector: ".glightbox" });
})();
