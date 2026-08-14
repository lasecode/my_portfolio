// ============================================================
// FOOTER YEAR
// ============================================================
document.getElementById("year").textContent = new Date().getFullYear();

// ============================================================
// NAV: Scrolled state
// ============================================================
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
});

// ============================================================
// HAMBURGER / MOBILE NAV
// ============================================================
const hamburger  = document.getElementById("hamburger");
const mobileNav  = document.getElementById("mobile-nav");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open");
  mobileNav.classList.toggle("open");
});

function closeMobile() {
  hamburger.classList.remove("open");
  mobileNav.classList.remove("open");
}

// ============================================================
// SCROLL-REVEAL (IntersectionObserver)
// ============================================================
const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Immediately reveal hero elements (above the fold)
document.querySelectorAll(".hero .reveal").forEach((el) => {
  el.classList.add("visible");
});

// ============================================================
// TYPEWRITER EFFECT
// ============================================================
const phrases = [
  "Full Stack Developer",
  "AI Engineer",
  "Landing Page Designer",
  "Problem Solver",
];
let phraseIndex = 0;
let charIndex   = 0;
let deleting    = false;
const typedEl   = document.getElementById("typed-text");

function typeWriter() {
  const current = phrases[phraseIndex];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIndex);
    if (charIndex === current.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeWriter, deleting ? 55 : 90);
}
typeWriter();

// ============================================================
// CONTACT FORM VALIDATION
// ============================================================
const form    = document.getElementById("contact-form");
const success = document.getElementById("form-success");

function showError(field, message) {
  const el = form.querySelector(`[data-error="${field}"]`);
  if (el) el.textContent = message || "";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = {
    name:    form.name.value.trim(),
    email:   form.email.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim(),
  };

  const errors = {};
  if (!data.name)    errors.name    = "Name is required";
  else if (data.name.length > 100) errors.name = "Name is too long";

  if (!data.email)   errors.email   = "Email is required";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Invalid email address";

  if (!data.subject) errors.subject = "Subject is required";
  else if (data.subject.length > 200) errors.subject = "Subject is too long";

  if (!data.message) errors.message = "Message is required";
  else if (data.message.length > 1000) errors.message = "Message is too long";

  ["name", "email", "subject", "message"].forEach((f) =>
    showError(f, errors[f])
  );

  if (Object.keys(errors).length > 0) {
    success.hidden = true;
    return;
  }

  // No backend yet — log and show success.
  console.log("Contact form submitted:", data);
  form.reset();
  success.hidden = false;
});

// Clear error on input
form.addEventListener("input", function (e) {
  if (e.target.name) showError(e.target.name, "");
});
