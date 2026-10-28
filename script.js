
/* =========================================
   BIRTHDAY WEBSITE FOR MADHUMITHA
   Animated stars, floating hearts & surprise
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  const starField = document.getElementById("starField");
  const floatingHearts = document.getElementById("floatingHearts");
  const wishButton = document.getElementById("wishButton");
  const surpriseMessage = document.getElementById("surpriseMessage");

  // 1. Create animated galaxy stars
  if (starField) {
    const starCount = window.innerWidth < 600 ? 65 : 120;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("span");

      star.className = "star";
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDelay = `${Math.random() * 4}s`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;

      const size = 1 + Math.random() * 2;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;

      fragment.appendChild(star);
    }

    starField.appendChild(fragment);
  }

  // 2. Reveal sections when they enter the screen
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // 3. Create floating hearts
  function createFloatingHearts(count = 20) {
    if (!floatingHearts) return;

    const symbols = ["♡", "♥", "💕", "✦"];

    for (let i = 0; i < count; i++) {
      const heart = document.createElement("span");

      heart.className = "floating-heart";
      heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${Math.random() * 1.2}s`;
      heart.style.animationDuration = `${3 + Math.random() * 2}s`;
      heart.style.fontSize = `${16 + Math.random() * 22}px`;

      floatingHearts.appendChild(heart);

      heart.addEventListener(
        "animationend",
        () => heart.remove(),
        { once: true }
      );
    }
  }

  // 4. Open the birthday surprise
  if (wishButton && surpriseMessage) {
    wishButton.addEventListener("click", () => {
      if (surpriseMessage.hidden) {
        surpriseMessage.hidden = false;
        wishButton.textContent = "Sending you more love 💗";

        createFloatingHearts(30);

        surpriseMessage.scrollIntoView({
          behavior: window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches
            ? "auto"
            : "smooth",
          block: "center"
        });
      } else {
        createFloatingHearts(12);
      }
    });
  }

  // 5. Small burst of hearts when clicking the birthday message
  document.querySelectorAll(".message-card, .letter-card").forEach((card) => {
    card.addEventListener("click", () => {
      createFloatingHearts(6);
    });
  });

  console.log("Madhumitha's birthday website is ready! 💖");
});
