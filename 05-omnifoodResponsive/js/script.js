// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();

yearEl.textContent = currentYear;

// Make mobile navigation work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

// Smooth scrolling

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // No longer works with html
    // console.log(link);
    const href = link.getAttribute("href");
    // console.log(href);

    // Back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }

    // Close mobile navigation

    if (link.classList.contains("main-nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

// Sticky navigation
// 1. Store into a variable the new intersection observer - two arguments, the first is the function (what we want to happen) and the second is an object of options.
const observer = new IntersectionObserver(
  function (entries) {
    //4. In this callback, we have access to an array of entries, one entry to each threshold value, in our case just one.

    const entry = entries[0];
    console.log(entry);
    if (!entry.isIntersecting) {
      // document.querySelector("body").classList.add("sticky"); same as:
      document.body.classList.add("sticky");
    }
    // Then we remove it:
    if (entry.isIntersecting) {
      // document.querySelector("body").classList.add("sticky"); same as:
      document.body.classList.remove("sticky");
    }

    // 5. After this we need to fix that jump on the page caused by the removal of the nav from the flow. So, when sticky gets applied, it gets out of the flow (position fixed) and the page moves to the top, occupying that space.
    // This means that we need to add margin top of the hero with the exact value of the height of the original header (DONE IN STYLE)
  },
  {
    //3. Now we go for the options, note that setting the root as null means that we are observing the element as it moves inside of the viewport, however, in the case of observing an element scrolling inside of a box, the root would have to be that box.
    // The threshold value means that the event will fire as soon as 0% of the hero section is inside of the viewport (IMPORTANT TO UNDERSTAND - 0% of the hero being inside of the viewport means that it is completely OUT of the viewport)
    // The root margin is used to fix the problem of overlapping the logos when the nav appears. This overlap means that the event is occurring too late, and we want it to happen 80px before the intersection is zero, which is the height of the header when it becomes sticky.
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

// 2. We need to set the observer to observe. Basically, use the observer that we've created to observe some element in the html, in our case is the hero section because we want to add the class as soon as the hero moves out of the viewport.
const sectionHeroEl = document.querySelector(".section-hero");
observer.observe(sectionHeroEl);

// NEED TO POLYFILL FOR OTHER BROWSERS
