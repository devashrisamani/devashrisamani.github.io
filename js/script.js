if (window.__devPortfolioScriptsInitialized) {
  // Prevent duplicate listeners/animations if script is evaluated multiple times.
} else {
  window.__devPortfolioScriptsInitialized = true;

  // Script for the play button in the header section
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

  const playBtn = document.getElementById("play-btn");
  const audio = document.getElementById("bg-music");
  let isPlaying = false;

  if (playBtn && audio) {
    playBtn.addEventListener("click", () => {
      if (isPlaying) {
        audio.pause();
        playBtn.innerHTML = '<i class="ri-play-fill"></i>'; // back to play icon
      } else {
        audio.play();
        playBtn.innerHTML = '<i class="ri-pause-fill"></i>'; // pause icon
      }
      isPlaying = !isPlaying;
    });
  }

  const navLinks = document.getElementById("nav-links");
  const menuBtn = document.getElementById("menu-btn");
  const menuBtnIcon = menuBtn?.querySelector("i");

  if (menuBtn && navLinks && menuBtnIcon) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const isOpen = navLinks.classList.contains("open");
      menuBtnIcon.setAttribute(
        "class",
        isOpen ? "ri-close-line" : "ri-menu-3-line",
      );
    });

    navLinks.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtnIcon.setAttribute("class", "ri-menu-3-line");
    });
  }

  if (window.ScrollReveal && !reducedMotionQuery.matches) {
    const scrollRevealOption = {
      distance: "50px",
      origin: "bottom",
      duration: 900,
      reset: false,
      mobile: true,
      cleanup: true,
    };

    const sr = ScrollReveal(scrollRevealOption);

    // Header: one cohesive reveal so it doesn't feel like multiple reloads.
    sr.reveal(".header__content", {
      delay: 120,
    });

    sr.reveal(".header__image", {
      delay: 220,
      distance: "40px",
    });

    // About container
    sr.reveal(".about__content", {
      delay: 120,
    });

    sr.reveal(".about__media", {
      delay: 220,
      distance: "40px",
    });

    // Service container
    sr.reveal(".service__card", {
      interval: 220,
    });

    // Portfolio container
    sr.reveal(".portfolio__card", {
      interval: 180,
    });
  }

// Button filtering for the work cards
  document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".portfolio__filter-btn");
    const cards = document.querySelectorAll(".portfolio__grid .portfolio__card");

    const applyFilter = (filter) => {
      cards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.style.display = show ? "" : "none";

        // ScrollReveal can leave filtered-in cards visually hidden
        // (opacity/visibility/transform). Force visible when showing.
        if (show) {
          card.style.opacity = "1";
          card.style.visibility = "visible";
          card.style.transform = "none";
        } else {
          card.style.opacity = "";
          card.style.visibility = "";
          card.style.transform = "";
        }
      });
    };

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        applyFilter(btn.dataset.filter);
      });
    });

    // Apply whichever filter is marked active in the HTML on page load.
    const activeBtn = document.querySelector(".portfolio__filter-btn.is-active");
    if (activeBtn) {
      applyFilter(activeBtn.dataset.filter);
    }
  });

// Interactive experience timeline tabs
  document.addEventListener("DOMContentLoaded", () => {
    const timelineTabs = document.querySelectorAll(".timeline__item");
    const timelinePanels = document.querySelectorAll(".timeline__panel");

    if (!timelineTabs.length || !timelinePanels.length) {
      return;
    }

    const mobileLayoutQuery = window.matchMedia("(max-width: 768px)");

    const scrollActivePanelIntoView = (panel) => {
      if (!panel || !mobileLayoutQuery.matches) {
        return;
      }

      const behavior = reducedMotionQuery.matches ? "auto" : "smooth";

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panel.scrollIntoView({ behavior, block: "start" });
        });
      });
    };

    const activateTimelineTab = (tabToActivate, options = {}) => {
      const { scrollOnMobile = false } = options;
      const targetPanelId = tabToActivate.dataset.panel;

      timelineTabs.forEach((tab) => {
        const isActive = tab === tabToActivate;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", String(isActive));
        tab.setAttribute("tabindex", isActive ? "0" : "-1");
      });

      let activePanel = null;

      timelinePanels.forEach((panel) => {
        const shouldShow = panel.id === targetPanelId;
        panel.classList.toggle("is-active", shouldShow);
        panel.hidden = !shouldShow;
        if (shouldShow) {
          activePanel = panel;
        }
      });

      if (scrollOnMobile && activePanel) {
        scrollActivePanelIntoView(activePanel);
      }
    };

    timelineTabs.forEach((tab, index) => {
      tab.addEventListener("click", () =>
        activateTimelineTab(tab, { scrollOnMobile: true }),
      );

      tab.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
          return;
        }

        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        const nextIndex =
          (index + direction + timelineTabs.length) % timelineTabs.length;
        const nextTab = timelineTabs[nextIndex];
        nextTab.focus();
        activateTimelineTab(nextTab, {
          scrollOnMobile: mobileLayoutQuery.matches,
        });
      });
    });
  });
}
