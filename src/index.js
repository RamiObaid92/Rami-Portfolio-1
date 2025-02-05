document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          block: "start",
        });
      }
    });
  });
  
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
  });
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  document.querySelectorAll(".hidden").forEach((section) => {
    observer.observe(section);
  });
  