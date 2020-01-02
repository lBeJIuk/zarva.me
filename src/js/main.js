import styles from "./../css/main.css";

const tabsController = document.querySelectorAll(".tabs .tabs__item");
const tabsContent = document.querySelectorAll(
  ".tabs-content .tabs-content__item"
);

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
};

tabsController.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabChangeHandler(tabsController, tabsContent, index);
  });
});
