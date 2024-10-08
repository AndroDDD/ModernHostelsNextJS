// The debounce function receives our function as a parameter
const cssDebounce = (fn: any) => {
  // This holds the requestAnimationFrame reference, so we can cancel it if we wish
  let frame: number;

  // the debounce function returns a new function that can receive a variable number of arguments
  return (params: Event) => {
    // If the frame variable has been defined, clear it now, and queue for the next frame
    if (frame) {
      cancelAnimationFrame(frame);
    }

    // Queue our function call for the next frame
    frame = requestAnimationFrame(() => {
      // Call our function and pass any params we received
      fn(params);
    });
  };
};

// Read out the scroll position and stores it in the data attribute
// so we can use it in our stylesheets
const storeScroll = () => {
  document.documentElement.dataset.scroll = window.screenY.toString();
};

// Listen for new scroll events, here we debounce our `storeScroll` function
// document.addEventListener('scroll', cssDebounce(storeScroll), { passive: true })
