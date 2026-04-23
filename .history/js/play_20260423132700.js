const root = document.documentElement;

if (!window.__devPlayPageInitialized) {
  window.__devPlayPageInitialized = true;

  const markReady = () => root.classList.add("is-ready");

  if (document.readyState === "complete") {
    markReady();
  } else {
    window.addEventListener("load", markReady, { once: true });
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
}
