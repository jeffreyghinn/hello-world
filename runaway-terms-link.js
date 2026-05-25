/* Grab the link element from the page and store it in a variable for easy access */
const link = document.getElementById("runaway-terms-link");

/* Add click handler to show "Got me" animation */
link.addEventListener("click", (e) => {
  e.preventDefault();
  
  /* Create the "Got me" text element */
  const gotMeText = document.createElement("div");
  gotMeText.textContent = "Got me!";
  gotMeText.className = "got-me-animation";
  
  /* Position it at the link's current location */
  const linkRect = link.getBoundingClientRect();
  gotMeText.style.left = `${linkRect.left}px`;
  gotMeText.style.top = `${linkRect.top}px`;
  
  /* Add it to the page */
  document.body.appendChild(gotMeText);
  
  /* Remove the element after animation completes */
  setTimeout(() => {
    gotMeText.remove();
  }, 600);
});

/*
Listen for mouse movement anywhere on the page.
Every time the mouse moves this function runs again.
*/
document.addEventListener(
  "mousemove", (mousemove) => {
    /* Get the link's size and location */
    const linkRect = link.getBoundingClientRect();

    /* Calculate the link's center point */
    const linkCenterX = linkRect.left + linkRect.width / 2;
    const linkCenterY = linkRect.top + linkRect.height / 2;

    /*
    Calculate the horizontal and vertical delta between the mouse and the center of the link.
    If deltaX is positive, the mouse is to the left of the link.
    If deltaY is positive, the mouse is above the link.
    */
    const deltaX = linkCenterX - mousemove.clientX;
    const deltaY = linkCenterY - mousemove.clientY;

    /*
    Calculate the straight distance between the mouse and the link using Pythagorean theorem.
    sqrt(deltaX² + deltaY²)
    */
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    /* Set a limit for how close the mouse can get to the link */
    const distanceLimit = 150;

    /* Move the link if the mouse is close enough to it */
    if (distance < distanceLimit) {
      /* Set a distance for the link to move when the mouse is too close */
      const moveDistance = 120;

      /* Calculate the angle between the mouse and the link so it can move directly away from the mouse */
      const angle = Math.atan2(deltaY, deltaX);

      /*
      Calculate the new position.
      cos(angle) gives horizontal movement.
      sin(angle) gives vertical movement.
      */
      let newX = linkRect.left + Math.cos(angle) * moveDistance;
      let newY = linkRect.top + Math.sin(angle) * moveDistance;

      /* The following lines prevent the link from leaving the screen */
      /* Math.max stops it from going below 0 */
      /* Math.min stops it from exceeding the viewport */
      newX = Math.max(
        0,
        Math.min(window.innerWidth - linkRect.width, newX)
      );
      newY = Math.max(
        0,
        Math.min(window.innerHeight - linkRect.height, newY)
      );

      /* Allow the link to be positioned anywhere on the page */
      link.style.position = "absolute";
      link.style.display = "inline-block";

      /* Apply the new location to the link */
      link.style.left = `${newX}px`;
      link.style.top = `${newY}px`;
    }
  }
);
