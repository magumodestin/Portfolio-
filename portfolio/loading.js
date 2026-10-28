(function () {

  const percentEl = document.getElementById('percent');
  const arc = document.getElementById('arc');
  const hand = document.getElementById('hand');
  const ticksGroup = document.getElementById('ticks');
  const fills = document.querySelectorAll('.name .fill');

  const duration = 5000; // 5 seconds
  const circumference = 314;

  // Page to redirect to after loading
  const redirectTo = 'portfolio.html';


  /*
   * Create timer ticks
   */
  function buildTicks() {

    const svgNS = 'http://www.w3.org/2000/svg';

    for (let i = 0; i < 12; i++) {

      const angle = i * 30;

      const isMajor = i % 3 === 0;

      const r1 = isMajor ? 40 : 43;
      const r2 = 47;

      const line = document.createElementNS(
        svgNS,
        'line'
      );

      const rad =
        (angle - 90) *
        Math.PI /
        180;

      line.setAttribute(
        'x1',
        54 + r1 * Math.cos(rad)
      );

      line.setAttribute(
        'y1',
        54 + r1 * Math.sin(rad)
      );

      line.setAttribute(
        'x2',
        54 + r2 * Math.cos(rad)
      );

      line.setAttribute(
        'y2',
        54 + r2 * Math.sin(rad)
      );

      line.setAttribute(
        'class',
        isMajor
          ? 'tick major'
          : 'tick'
      );

      ticksGroup.appendChild(line);
    }
  }


  /*
   * Update loading progress
   */
  function setProgress(progress) {

    // Countdown from 5 to 0
    let secondsLeft =
      Math.ceil(
        (1 - progress) * 5
      );

    if (secondsLeft < 0) {
      secondsLeft = 0;
    }

    percentEl.textContent =
      secondsLeft;


    /*
     * Update circular progress
     */
    arc.style.strokeDashoffset =
      circumference -
      (progress * circumference);


    /*
     * Rotate timer hand
     */
    hand.style.transform =
      'rotate(' +
      (progress * 360) +
      'deg)';


    /*
     * Fill the name from bottom to top
     */
    fills.forEach(function (element) {

      element.style.backgroundSize =
        '100% ' +
        (progress * 100) +
        '%';

    });

  }


  /*
   * Animation
   */
  let start = null;

  function animate(timestamp) {

    if (!start) {
      start = timestamp;
    }

    const elapsed =
      timestamp - start;

    const progress =
      Math.min(
        elapsed / duration,
        1
      );

    setProgress(progress);


    if (progress < 1) {

      requestAnimationFrame(
        animate
      );

    } else {

      finish();

    }
  }


  /*
   * Finish loading animation
   */
  function finish() {

    percentEl.textContent = '0';

    document.body.classList.add(
      'leaving'
    );

    setTimeout(function () {

      window.location.href =
        redirectTo;

    }, 600);
  }


  // Build timer ticks
  buildTicks();

  // Start animation
  requestAnimationFrame(
    animate
  );

})();
