const itemsContainer = document.querySelector(".middle-sort-sector-main");
const stickyElement = document.querySelector(".sticky-toggle");

// console.log("working")

function getScrollThreshold() {
  let itemHeight = document.querySelector(".section-card-main").offsetHeight;
  let containerHeight = itemsContainer.offsetHeight;
  return (itemHeight * 5) / containerHeight; // Adjust as needed
}

function throttle(func, limit) {
  let lastFunc;
  let lastRan;
  return function () {
    const context = this;
    const args = arguments;
    if (!lastRan) {
      func.apply(context, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(function () {
        if (Date.now() - lastRan >= limit) {
          func.apply(context, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

const thresholdPercentage = getScrollThreshold();
let lastScrollTop = 0;

function handleScroll() {
  let currentScrollTop = window.scrollY;

  if (currentScrollTop > lastScrollTop) {

    console.log(thresholdPercentage);
    
    // Scrolling down
    if (
      window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight) >
      thresholdPercentage
    ) {
      stickyElement.classList.add("hide-head-sec");
    }
  } else {
    // Scrolling up
    stickyElement.classList.remove("hide-head-sec");
  }

  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling
}

document.addEventListener("scroll", throttle(handleScroll, 100));
