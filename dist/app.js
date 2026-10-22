(() => {
  const progress = document.querySelector(".scroll-line span");
  const revealItems = document.querySelectorAll("[data-reveal]");
  const year = document.querySelector("[data-year]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const updateScrollProgress = () => {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = Math.min(100, Math.max(0, percent)) + "%";
  };

  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });

  if ("IntersectionObserver" in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const art = document.querySelector("[data-tilt]");
  const canTilt =
    art &&
    !reducedMotion.matches &&
    window.matchMedia("(pointer: fine)").matches;

  if (canTilt) {
    const reset = () => {
      art.style.transform = "";
    };

    art.addEventListener("pointermove", (event) => {
      const bounds = art.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      art.style.transform =
        "perspective(900px) rotateX(" +
        -y * 4 +
        "deg) rotateY(" +
        x * 5 +
        "deg) translateZ(0)";
    });

    art.addEventListener("pointerleave", reset);
  }
})();
