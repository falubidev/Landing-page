const App = {
  init: function () {
    this.loader.init();
    this.menu.init();
    this.headerScroll.init();
    this.statsCounter.init();
  },

  loader: {
    init: function () {
      window.addEventListener("load", this.hideLoader);
    },
    hideLoader: function () {
      const loader = document.getElementById("loader");
      const content = document.getElementById("content");
      setTimeout(() => {
        loader.style.display = "none";
        content.classList.remove("hidden");
      }, 1200);
    },
  },

  menu: {
    init: function () {
      const toggle = document.getElementById("menu-toggle");
      if (toggle) {
        toggle.addEventListener("click", this.toggleMenu);
      }
    },
    toggleMenu: function () {
      const menu = document.getElementById("mobile-menu");
      if (menu) menu.classList.toggle("hidden");
    },
  },

  headerScroll: {
    init: function () {
      window.addEventListener("scroll", this.handleScroll);
    },
    handleScroll: function () {
      const header = document.getElementById("main-header");
      const navLinks = document.querySelectorAll("#menu-links a");
      const scrollY = window.scrollY;

      if (scrollY > 50) {
        header.classList.remove("bg-transparent");
        header.classList.add("bg-[#004d40]", "shadow-md");

        navLinks.forEach((link) => {
          link.classList.remove("text-white");
          link.classList.add("text-white");
        });
      } else {
        header.classList.remove("bg-[#004d40]", "shadow-md");
        header.classList.add("bg-transparent");

        navLinks.forEach((link) => {
          link.classList.remove("text-white");
          link.classList.add("text-white");
        });
      }
    },
  },

  statsCounter: {
    init: function () {
      window.addEventListener("scroll", this.checkVisibility);
    },
    hasAnimated: false,

    checkVisibility: function () {
      const section = document.getElementById("stats");
      if (!section || App.statsCounter.hasAnimated) return;

      const sectionTop = section.offsetTop;
      const scrollY = window.scrollY + window.innerHeight;

      if (scrollY > sectionTop) {
        App.statsCounter.animate();
        App.statsCounter.hasAnimated = true;
        window.removeEventListener("scroll", App.statsCounter.checkVisibility);
      }
    },

    animate: function () {
      const counters = document.querySelectorAll(".counter");
      const speed = 100;

      counters.forEach((counter) => {
        const updateCount = () => {
          const target = +counter.getAttribute("data-target");
          const count = +counter.innerText;
          const inc = Math.ceil(target / speed);

          if (count < target) {
            counter.innerText = count + inc;
            setTimeout(updateCount, 20);
          } else {
            counter.innerText = target.toLocaleString();
          }
        };

        updateCount();
      });
    },
  },
};

document.addEventListener("DOMContentLoaded", () => App.init());
