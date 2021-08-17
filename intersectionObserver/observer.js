const sectionOne = document.querySelector(".section1");
const sectionTwo = document.querySelector(".section2");

const options = {
  treshold: 0, // How much of the item needs to be in the page. If this is 1 it needs to be 100% in the page
  rootMargin: "-150px", // this will pull up the whole intersection up. may be usefull when we want to fire the event before it is in the viewport
};
// IntersectionObserver requires callback that will feed entries and observer itself
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    // Just the act of observing will cause intersection observer to trigger our callback.
    // Callback will fire each time this element eaither intersects or stops intersecting
    console.log(entry);
    /**
        boundingClientRect:
        intersectionRatio
        intersectionRect
        isIntersecting: true
        isVisible: false
        rootBounds:
        target: DOM element that is the target

     */
    if (entry.isIntersecting) {
      entry.target.classList.toggle("highlight");
    } else {
      entry.target.classList.remove("highlight");
    }
  });
}, options);

observer.observe(sectionOne);
observer.observe(sectionTwo);
