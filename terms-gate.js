(function () {
  const AGREEMENT_KEY = "termsAgreed";

  const path = window.location.pathname;
  const onIndexPage = path.endsWith("index.html") || path === "/";
  const onTermsPage = path.endsWith("terms.html");

  const hasAgreedToTerms = () => localStorage.getItem(AGREEMENT_KEY) === "true";

  if (onIndexPage && !hasAgreedToTerms()) {
    window.location.replace("terms.html");
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

  agreeButton.addEventListener("click", () => {
    if (!reachedBottom) {
      statusText.textContent = "Scroll to the bottom before agreeing.";
      return;
    }

    localStorage.setItem(AGREEMENT_KEY, "true");
    window.location.replace("index.html");
  });
})();
