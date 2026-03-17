const reveals = document.querySelectorAll(".reveal");
const stats = document.querySelectorAll(".stat");
const hero = document.querySelector(".hero__visual");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.25 }
);

reveals.forEach((el) => observer.observe(el));

const animateCounters = () => {
  stats.forEach((stat) => {
    const target = Number(stat.dataset.counter || 0);
    const valueEl = stat.querySelector(".stat__value");
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 80));

    const tick = () => {
      current += step;
      if (current >= target) {
        current = target;
      } else {
        requestAnimationFrame(tick);
      }
      valueEl.textContent = current;
    };

    tick();
  });
};

let countersStarted = false;
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!countersStarted && entry.isIntersecting) {
        countersStarted = true;
        animateCounters();
      }
    });
  },
  { threshold: 0.4 }
);

stats.forEach((stat) => statsObserver.observe(stat));

const parallax = (event) => {
  if (!hero) return;
  const { innerWidth, innerHeight } = window;
  const x = (event.clientX / innerWidth - 0.5) * 20;
  const y = (event.clientY / innerHeight - 0.5) * 20;
  hero.style.transform = `translate(${x}px, ${y}px)`;
};

window.addEventListener("pointermove", parallax);

const form = document.querySelector(".contact__form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = form.querySelector("button");
    if (button) {
      button.textContent = "Richiesta inviata";
    }
  });
}
