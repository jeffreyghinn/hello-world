(function () {
  const grid = document.getElementById("project-grid");
  const watchFace = document.querySelector(".watch-face");

  if (!grid || !watchFace) {
    return;
  }

  const apps = Array.from(grid.querySelectorAll(".project-app"));

  const layoutApps = () => {
    const styles = window.getComputedStyle(document.documentElement);
    const gapX = Number.parseFloat(styles.getPropertyValue("--grid-gap-x")) || 88;
    const gapY = Number.parseFloat(styles.getPropertyValue("--grid-gap-y")) || 102;

    apps.forEach((app) => {
      const gridX = Number.parseFloat(app.dataset.gridX || "0");
      const gridY = Number.parseFloat(app.dataset.gridY || "0");
      app.style.setProperty("--app-x", `${gridX * gapX}px`);
      app.style.setProperty("--app-y", `${gridY * gapY}px`);
    });
  };
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let position = { x: 0, y: 0 };
  let velocity = { x: 0, y: 0 };
  let target = { x: 0, y: 0 };
  let lastPointer = { x: 0, y: 0 };
  let dragOrigin = { x: 0, y: 0 };
  let lastMove = { x: 0, y: 0, time: 0 };
  let dragging = false;
  let movedDuringDrag = false;
  let animationFrame = null;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const getBounds = () => {
    const rect = watchFace.getBoundingClientRect();
    return {
      x: rect.width * 0.18,
      y: rect.height * 0.16,
    };
  };

  const rubberBand = (value, limit) => {
    if (Math.abs(value) <= limit) {
      return value;
    }

    const overflow = Math.abs(value) - limit;
    return Math.sign(value) * (limit + (overflow * 0.28));
  };

  const setGridPosition = () => {
    grid.style.setProperty("--pan-x", `${position.x}px`);
    grid.style.setProperty("--pan-y", `${position.y}px`);
  };

  const scaleApps = () => {
    const faceRect = watchFace.getBoundingClientRect();
    const center = {
      x: faceRect.left + (faceRect.width / 2),
      y: faceRect.top + (faceRect.height / 2),
    };
    const maxDistance = Math.hypot(faceRect.width, faceRect.height) * 0.46;

    apps.forEach((app) => {
      const rect = app.getBoundingClientRect();
      const appCenter = {
        x: rect.left + (rect.width / 2),
        y: rect.top + (rect.height / 2),
      };
      const distance = Math.hypot(center.x - appCenter.x, center.y - appCenter.y);
      const scale = clamp(1.16 - (distance / maxDistance) * 0.36, 0.74, 1.18);
      app.style.setProperty("--watch-scale", scale.toFixed(3));
    });
  };

  const tick = () => {
    const bounds = getBounds();

    if (!dragging) {
      const clampedX = clamp(target.x, -bounds.x, bounds.x);
      const clampedY = clamp(target.y, -bounds.y, bounds.y);
      const springX = clampedX - position.x;
      const springY = clampedY - position.y;

      velocity.x += springX * 0.075;
      velocity.y += springY * 0.075;
      velocity.x *= 0.82;
      velocity.y *= 0.82;

      position.x += velocity.x;
      position.y += velocity.y;
      target.x = position.x;
      target.y = position.y;
    }

    setGridPosition();
    scaleApps();

    if (!dragging && Math.abs(velocity.x) < 0.02 && Math.abs(velocity.y) < 0.02) {
      animationFrame = null;
      return;
    }

    animationFrame = window.requestAnimationFrame(tick);
  };

  const startAnimation = () => {
    if (!animationFrame) {
      animationFrame = window.requestAnimationFrame(tick);
    }
  };

  watchFace.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) {
      return;
    }

    dragging = true;
    movedDuringDrag = false;
    grid.classList.add("is-dragging");
    watchFace.setPointerCapture(event.pointerId);
    lastPointer = { x: event.clientX, y: event.clientY };
    dragOrigin = { x: event.clientX, y: event.clientY };
    lastMove = { x: event.clientX, y: event.clientY, time: performance.now() };
    velocity = { x: 0, y: 0 };
    startAnimation();
  });

  watchFace.addEventListener("pointermove", (event) => {
    if (!dragging) {
      return;
    }

    const now = performance.now();
    const bounds = getBounds();
    const dx = event.clientX - lastPointer.x;
    const dy = event.clientY - lastPointer.y;

    if (Math.hypot(event.clientX - dragOrigin.x, event.clientY - dragOrigin.y) > 4) {
      movedDuringDrag = true;
    }

    target.x = rubberBand(target.x + dx, bounds.x);
    target.y = rubberBand(target.y + dy, bounds.y);
    position.x = target.x;
    position.y = target.y;

    const elapsed = Math.max(now - lastMove.time, 16);
    velocity.x = ((event.clientX - lastMove.x) / elapsed) * 16;
    velocity.y = ((event.clientY - lastMove.y) / elapsed) * 16;

    lastPointer = { x: event.clientX, y: event.clientY };
    dragOrigin = { x: event.clientX, y: event.clientY };
    lastMove = { x: event.clientX, y: event.clientY, time: now };
    setGridPosition();
    scaleApps();
  });

  const endDrag = (event) => {
    if (!dragging) {
      return;
    }

    dragging = false;
    grid.classList.remove("is-dragging");

    if (watchFace.hasPointerCapture(event.pointerId)) {
      watchFace.releasePointerCapture(event.pointerId);
    }

    target.x = position.x + (velocity.x * 5.5);
    target.y = position.y + (velocity.y * 5.5);
    startAnimation();
  };

  watchFace.addEventListener("pointerup", endDrag);
  watchFace.addEventListener("pointercancel", endDrag);
  window.addEventListener("resize", () => {
    layoutApps();
    target = { x: 0, y: 0 };
    startAnimation();
  });

  apps.forEach((app) => {
    app.addEventListener("click", (event) => {
      if (movedDuringDrag) {
        event.preventDefault();
        movedDuringDrag = false;
        return;
      }

      if (app.tagName === "BUTTON") {
        app.animate(
          [
            { transform: "translate3d(calc(var(--app-x) - 50%), calc(var(--app-y) - 50%), 0) scale(var(--watch-scale, 1))" },
            { transform: "translate3d(calc(var(--app-x) - 50%), calc(var(--app-y) - 50%), 0) scale(0.84)" },
            { transform: "translate3d(calc(var(--app-x) - 50%), calc(var(--app-y) - 50%), 0) scale(var(--watch-scale, 1))" },
          ],
          { duration: 280, easing: "cubic-bezier(0.2, 1.6, 0.35, 1)" }
        );
      }
    });
  });

  layoutApps();
  setGridPosition();
  scaleApps();

  if (!prefersReducedMotion) {
    startAnimation();
  }
})();
