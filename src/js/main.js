import styles from "./../css/main.css";

const tabsController = document.querySelectorAll(".tabs .tabs__item");
const tabsContent = document.querySelectorAll(
  ".tabs-content .tabs-content__item"
);
const tabsToolbar = document.querySelector(".tabs-wrapper .tabs");
const tabsOffset =
  tabsToolbar.getBoundingClientRect().top -
  document.body.getBoundingClientRect().top;
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 1.0
};

const tabChangeHandler = (tabsController, tabsContent, index) => {
  // clear state
  tabsController.forEach(item => {
    item.classList.remove("tabs__item--active");
  });
  tabsContent.forEach(item => {
    item.classList.remove("tabs-content__item--active");
  });

  // show new state
  tabsController[index].classList.add("tabs__item--active");
  tabsContent[index].classList.add("tabs-content__item--active");

  if (
    tabsToolbar.classList.contains("tabs--sticky") &&
    window.innerWidth < 1200
  ) {
    window.scrollTo(0, tabsOffset);
  }
};

tabsController.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabChangeHandler(tabsController, tabsContent, index);
  });
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.boundingClientRect.top <= 0) {
      entry.target.classList.add("tabs--sticky");
    } else {
      entry.target.classList.remove("tabs--sticky");
    }
  });
}, options);
observer.observe(tabsToolbar);
