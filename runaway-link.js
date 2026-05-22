/* Grab the link element from the page and store it in a variable for easy access */
const link = document.getElementById("runaway-terms-link");

/* Listen for mouse movement anywhere on the page. Every time the mouse moves this function runs again. */
document.addEventListener(
  "mousemove", (mouseMove) => {
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
    const deltaX = linkCenterX - mouseMove.clientX;
    const deltaY - linkCenterY - mouseMove.clientY;

    /*
    Calculate the straight distance between the mouse and the link using Pythagorean theorem.
    sqrt(deltaX² + deltaY²)
    */
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
  }
);



/*
************ The below code is a reference from ChatGPT ***********

      /*
        Define how close the mouse must get
        before the link starts escaping.
      */
      const triggerDistance = 150;



      /*
        Only move the link if the mouse
        is close enough.
      */
      if (distance < triggerDistance) {

        /*
          How far the link should jump away
          each time the mouse approaches.
        */
        const moveAmount = 120;



        /*
          Calculate the angle BETWEEN:
          - the mouse
          - the link

          atan2() returns an angle in radians.

          This lets us move directly AWAY
          from the mouse.
        */
        const angle = Math.atan2(dy, dx);



        /*
          Calculate the new position.

          cos(angle) gives horizontal movement
          sin(angle) gives vertical movement

          We multiply by moveAmount to control
          how far the jump is.
        */
        let newX = rect.left + Math.cos(angle) * moveAmount;
        let newY = rect.top + Math.sin(angle) * moveAmount;



        /*
          Prevent the link from leaving the screen.

          Math.max keeps it from going below 0.
          Math.min keeps it from exceeding the viewport.
        */
        newX = Math.max(
          0,
          Math.min(window.innerWidth - rect.width, newX)
        );

        newY = Math.max(
          0,
          Math.min(window.innerHeight - rect.height, newY)
        );



        /*
          Apply the new position to the link.

          left/top must be strings with "px".
        */
        link.style.left = `${newX}px`;
        link.style.top = `${newY}px`;



        /*
          Remove the original centering transform.

          Important:
          Once we start manually positioning the link,
          the translate(-50%, -50%) would interfere
          with positioning calculations.
        */
        link.style.transform = "none";
      }
    });
  </script>

</body>
</html>

************* End of reference code from ChatGPT **************
*/
