/* Grab the link element from the page and store it in a variable for easy access */
const link = document.getElementById("runaway-terms-link");

/* Listen for mouse movement anywhere on the page. Every time the mouse moves this function runs again. */
document.addEventListener(
  "mousemove",
);



/*
************The below code is from ChatGPT.***********


    document.addEventListener("mousemove", (event) => {

      /*
        Get the link's current position and size.

        getBoundingClientRect() returns an object
        containing:
        - left
        - top
        - width
        - height
        - right
        - bottom

        based on its current position in the viewport.
      */
      const rect = link.getBoundingClientRect();



      /*
        Calculate the CENTER point of the link.

        We use the center instead of the top-left corner
        because distance calculations feel much more natural.
      */
      const linkCenterX = rect.left + rect.width / 2;
      const linkCenterY = rect.top + rect.height / 2;



      /*
        Calculate the horizontal and vertical distance
        BETWEEN the mouse and the center of the link.

        Example:
        If dx is positive:
          the link is to the RIGHT of the mouse

        If dx is negative:
          the link is to the LEFT of the mouse
      */
      const dx = linkCenterX - event.clientX;
      const dy = linkCenterY - event.clientY;



      /*
        Calculate the true distance between the mouse
        and the link using the Pythagorean theorem.

        sqrt(dx² + dy²)

        This gives us a real circular distance.
      */
      const distance = Math.sqrt(dx * dx + dy * dy);



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
*/
