(() => {
  const root = document.documentElement;
  const storageKey = "portfolio-theme-v3";
  let theme = "dark";
  try {
    if (localStorage.getItem(storageKey) === "light") theme = "light";
  } catch { /* Theme persistence is optional. */ }
  root.dataset.theme = theme;

  document.addEventListener("DOMContentLoaded", () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const toggle = document.querySelector(".theme-toggle");
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const updateTheme = () => {
      const dark = root.dataset.theme === "dark";
      toggle.setAttribute("aria-pressed", String(dark));
      toggle.setAttribute("aria-label", `Switch to ${dark ? "light" : "dark"} theme`);
      themeColor.setAttribute("content", dark ? "#202528" : "#f5f8f7");
    };
    toggle.hidden = false;
    updateTheme();
    toggle.addEventListener("click", () => {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      try { localStorage.setItem(storageKey, root.dataset.theme); } catch { /* Optional persistence. */ }
      updateTheme();
    });
    document.querySelector("[data-year]").textContent = String(new Date().getFullYear());

    // Keep replacement images optional, including the navbar photo and backdrop.
    document.querySelectorAll(".project-cover > img").forEach(img => {
      const showFallback = () => {
        const fallback = document.createElement("span");
        fallback.className = "image-fallback";
        fallback.textContent = img.closest(".project-card").querySelector("h3 a").textContent.replace("↗", "").trim();
        fallback.setAttribute("aria-hidden", "true");
        img.replaceWith(fallback);
      };
      if (img.complete && img.naturalWidth === 0) showFallback();
      else img.addEventListener("error", showFallback, { once: true });
    });
    document.querySelectorAll(".nav-photo, .workspace-background").forEach(img => {
      const hideMissingImage = () => { img.hidden = true; };
      if (img.complete && img.naturalWidth === 0) hideMissingImage();
      else img.addEventListener("error", hideMissingImage, { once: true });
    });

    const links = [...document.querySelectorAll(".section-nav a")];
    const sections = links.map(link => document.querySelector(link.hash));
    const header = document.querySelector(".site-header");
    const hero = document.querySelector(".hero");
    const backdrop = document.querySelector(".page-backdrop");
    const workspace = document.querySelector(".workspace-stage");
    let scheduled = false;

    // Scroll effects share one animation frame and only change transforms.
    const updateScroll = () => {
      let active = 0;
      const threshold = header.getBoundingClientRect().height + 80;
      sections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= threshold) active = index;
      });
      links.forEach((link, index) => {
        if (index === active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });

      if (!reducedMotion.matches) {
        const scrollable = Math.max(1, root.scrollHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
        backdrop.style.setProperty("--backdrop-y", `${(progress * 100 - 50).toFixed(1)}px`);
        backdrop.style.setProperty("--backdrop-x", `${(Math.sin(progress * Math.PI) * 22).toFixed(1)}px`);
        const bounds = workspace.getBoundingClientRect();
        if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
          const offset = Math.max(-30, Math.min(30, (window.innerHeight / 2 - bounds.top - bounds.height / 2) * .12));
          workspace.style.setProperty("--workspace-offset", `${offset.toFixed(1)}px`);
        }
      }
      scheduled = false;
    };
    const scheduleScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", scheduleScroll, { passive: true });
    window.addEventListener("resize", scheduleScroll);

    // Same-origin SVG documents keep editable graphics in img/ while allowing
    // their timelines to pause off-screen, on demand, or for reduced motion.
    const diagrams = [...document.querySelectorAll(".flow-diagram")].map(object => ({
      object,
      button: object.closest(".project-card").querySelector(".diagram-toggle"),
      title: object.closest(".project-card").querySelector("h3 a").textContent.replace("↗", "").trim(),
      svg: null,
      visible: false,
      paused: false
    }));
    const syncDiagrams = () => {
      diagrams.forEach(diagram => {
        diagram.button.hidden = !diagram.svg || reducedMotion.matches;
        if (!diagram.svg) return;
        const playing = diagram.visible && !diagram.paused && !reducedMotion.matches && !document.hidden;
        if (playing) diagram.svg.unpauseAnimations();
        else diagram.svg.pauseAnimations();
        diagram.svg.dataset.motionState = playing ? "playing" : "paused";
        diagram.button.setAttribute("aria-pressed", String(diagram.paused));
        diagram.button.setAttribute("aria-label", `${diagram.paused ? "Play" : "Pause"} ${diagram.title} diagram`);
        diagram.button.querySelector(".diagram-toggle-label").textContent = diagram.paused ? "Play" : "Pause";
        diagram.button.querySelector(".diagram-toggle-icon").textContent = diagram.paused ? "▷" : "Ⅱ";
      });
    };
    diagrams.forEach(diagram => {
      const connectDiagram = () => {
        let svg;
        try { svg = diagram.object.contentDocument?.documentElement; } catch { return; }
        if (svg?.localName !== "svg" || typeof svg.pauseAnimations !== "function" || diagram.svg === svg) return;
        diagram.svg = svg;
        svg.pauseAnimations();
        svg.setCurrentTime(0);
        svg.classList.add("motion-ready");
        syncDiagrams();
      };
      diagram.object.addEventListener("load", connectDiagram);
      diagram.button.addEventListener("click", () => {
        diagram.paused = !diagram.paused;
        syncDiagrams();
      });
      connectDiagram();
    });
    if ("IntersectionObserver" in window) {
      const diagramObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          const diagram = diagrams.find(item => item.object === entry.target);
          diagram.visible = entry.isIntersecting;
        });
        syncDiagrams();
      }, { threshold: .08 });
      diagrams.forEach(diagram => diagramObserver.observe(diagram.object));
    } else {
      diagrams.forEach(diagram => { diagram.visible = true; });
      syncDiagrams();
    }
    document.addEventListener("visibilitychange", syncDiagrams);
    window.addEventListener("pagehide", () => diagrams.forEach(diagram => diagram.svg?.pauseAnimations()));
    window.addEventListener("pageshow", syncDiagrams);

    let revealObserver;
    const revealItems = new Set();
    const revealItem = item => {
      item.classList.add("is-visible");
      revealObserver?.unobserve(item);
    };
    const setupReveals = () => {
      if (revealObserver || !("IntersectionObserver" in window)) return;
      revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => { if (entry.isIntersecting) revealItem(entry.target); });
      }, { threshold: .08, rootMargin: "0px 0px -24px 0px" });
      const groups = [
        ".hero-copy > *", ".hero-image", ".about-notes > div",
        ".section-heading", ".employer", ".timeline-item", ".project-card",
        ".other-projects", ".skill-group", ".background-grid > div",
        ".recognition", ".contact > div"
      ];
      groups.forEach(selector => {
        document.querySelectorAll(selector).forEach((item, index) => {
          if (revealItems.has(item)) return;
          revealItems.add(item);
          item.style.setProperty("--reveal-delay", `${Math.min(index * 70, 210)}ms`);
          item.classList.add("reveal-ready");
          revealObserver.observe(item);
        });
      });
    };
    // Tabbing to a link reveals its module immediately, even before scrolling.
    document.addEventListener("focusin", event => {
      const item = event.target.closest(".reveal-ready");
      if (item) revealItem(item);
    });

    const rotatingText = document.querySelector("[data-rotating-text]");
    const rotationToggle = document.querySelector(".rotation-toggle");
    const topics = ["Java & Spring Boot", "Reactive services", "Kafka & MongoDB", "Local AI experiments"];
    let topicIndex = 0;
    let paused = false;
    let heroVisible = true;
    let rotationTimer;
    let rotationSwap;
    const stopRotation = () => {
      clearInterval(rotationTimer);
      clearTimeout(rotationSwap);
      rotationTimer = undefined;
      rotatingText.classList.remove("is-changing");
    };
    const syncRotation = () => {
      stopRotation();
      rotationToggle.hidden = reducedMotion.matches;
      rotationToggle.setAttribute("aria-pressed", String(paused));
      rotationToggle.setAttribute("aria-label", `${paused ? "Resume" : "Pause"} changing text`);
      if (paused || reducedMotion.matches || document.hidden || !heroVisible) return;
      rotationTimer = setInterval(() => {
        rotatingText.classList.add("is-changing");
        rotationSwap = setTimeout(() => {
          topicIndex = (topicIndex + 1) % topics.length;
          rotatingText.textContent = topics[topicIndex];
          rotatingText.classList.remove("is-changing");
        }, 200);
      }, 3400);
    };
    rotationToggle.addEventListener("click", () => { paused = !paused; syncRotation(); });
    document.addEventListener("visibilitychange", syncRotation);
    window.addEventListener("pagehide", stopRotation);
    window.addEventListener("pageshow", syncRotation);
    if ("IntersectionObserver" in window) {
      const heroObserver = new IntersectionObserver(([entry]) => {
        heroVisible = entry.isIntersecting;
        syncRotation();
      });
      heroObserver.observe(hero);
    }

    const configureMotion = () => {
      root.classList.toggle("motion-enabled", !reducedMotion.matches);
      if (reducedMotion.matches) {
        revealObserver?.disconnect();
        revealItems.forEach(revealItem);
        backdrop.style.setProperty("--backdrop-x", "0px");
        backdrop.style.setProperty("--backdrop-y", "0px");
        workspace.style.setProperty("--workspace-offset", "0px");
      } else {
        setupReveals();
      }
      syncRotation();
      syncDiagrams();
      scheduleScroll();
    };
    reducedMotion.addEventListener("change", configureMotion);
    configureMotion();
  });
})();
