(function () {
  const AGREEMENT_KEY = "termsAgreed";
  const path = window.location.pathname;
  const onIndexPage = path.endsWith("index.html") || path === "/";
  const onTermsPage = path.endsWith("terms.html");

  const hasAgreedToTerms = () => localStorage.getItem(AGREEMENT_KEY) === "true";

  if (onIndexPage) {
    const postTermsContent = document.getElementById("post-terms-content");
    const homeFooter = document.getElementById("home-footer");
    const runawayTermsLink = document.getElementById("runaway-terms-link");
    const levelIndicator = document.getElementById("level-indicator");

    if (!postTermsContent || !homeFooter || !runawayTermsLink || !levelIndicator) {
      return;
    }

    const playLevelUp = () => {
      levelIndicator.classList.remove("level-indicator--level-up");
      void levelIndicator.offsetWidth;

      window.requestAnimationFrame(() => {
        levelIndicator.classList.add("level-indicator--level-up");
      });
    };

    const updateHomeContent = () => {
      const showAllHomeContent = hasAgreedToTerms();
      postTermsContent.hidden = showAllHomeContent;
      homeFooter.hidden = !showAllHomeContent;
      runawayTermsLink.hidden = showAllHomeContent;
      levelIndicator.hidden = !showAllHomeContent;

      if (showAllHomeContent) {
        playLevelUp();
      }
    };

    updateHomeContent();
    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        updateHomeContent();
      }
    });
    return;
  }

  if (!onTermsPage) {
    return;
  }

  const agreeButton = document.getElementById("agree-terms-button");
  const statusText = document.getElementById("terms-status");
  const backLinks = document.querySelectorAll("[data-gated-back-link]");

  if (!agreeButton || !statusText) {
    return;
  }

  let reachedBottom = false;

  const atPageBottom = () => {
    const viewportBottom = window.scrollY + window.innerHeight;
    return viewportBottom >= document.documentElement.scrollHeight - 4;
  };

  const revealBackLinks = () => {
    backLinks.forEach((link) => {
      link.hidden = false;
    });
  };

  const keepBackLinksHidden = () => {
    backLinks.forEach((link) => {
      link.hidden = true;
    });
  };

  keepBackLinksHidden();

  const blockBackNavigation = (event) => {
    if (hasAgreedToTerms()) {
      return;
    }

    event.preventDefault();
    statusText.textContent = "Please scroll to the bottom and click Agree first.";
  };

  backLinks.forEach((link) => {
    link.addEventListener("click", blockBackNavigation);
  });

  const updateScrollState = () => {
    if (!reachedBottom && atPageBottom()) {
      reachedBottom = true;
      agreeButton.disabled = false;
      statusText.textContent = "You reached the bottom. Click Agree to continue.";
    }
  };

  window.addEventListener("scroll", updateScrollState);
  updateScrollState();

  if (hasAgreedToTerms()) {
    agreeButton.hidden = true;
    revealBackLinks();
    statusText.textContent = "Terms already agreed. You can return to the homepage.";
    return;
  }

  agreeButton.addEventListener("click", () => {
    if (!reachedBottom) {
      statusText.textContent = "Scroll to the bottom before agreeing.";
      return;
    }

    localStorage.setItem(AGREEMENT_KEY, "true");
    agreeButton.hidden = true;
    revealBackLinks();
    statusText.textContent = "Thanks for agreeing. You can now go back to the homepage.";
  });
})();
