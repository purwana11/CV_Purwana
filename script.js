const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("cv-theme");

if (savedTheme === "dark") {
  body.classList.add("dark");
  themeToggle.textContent = "Mode Terang";
}

themeToggle.addEventListener("click", function () {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  themeToggle.textContent = isDark ? "Mode Terang" : "Mode Gelap";
  localStorage.setItem("cv-theme", isDark ? "dark" : "light");
});

const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

revealElements.forEach(function (el) {
  revealObserver.observe(el);
});

const typingName = document.getElementById("typingName");
if (typingName) {
  const fullText = typingName.dataset.text || "";
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 95;
  const deleteSpeed = 60;
  const pauseAfterType = 1200;
  const pauseAfterDelete = 400;

  function typingLoop() {
    typingName.textContent = fullText.slice(0, charIndex);

    if (!isDeleting && charIndex < fullText.length) {
      charIndex += 1;
      setTimeout(typingLoop, typeSpeed);
      return;
    }

    if (!isDeleting && charIndex === fullText.length) {
      isDeleting = true;
      setTimeout(typingLoop, pauseAfterType);
      return;
    }

    if (isDeleting && charIndex > 0) {
      charIndex -= 1;
      setTimeout(typingLoop, deleteSpeed);
      return;
    }

    isDeleting = false;
    setTimeout(typingLoop, pauseAfterDelete);
  }

  typingName.textContent = "";
  setTimeout(typingLoop, 350);
}
