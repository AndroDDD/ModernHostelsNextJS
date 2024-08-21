export const revertDayElements = (elements: HTMLDivElement[]) => {
  elements.forEach((element) => {
    if (element.classList.contains("selected-start-date")) {
      let priceElements = element.children[1]
        .children as unknown as HTMLDivElement[];

      priceElements[0].style.display = "flex";
      priceElements[1].style.display = "none";

      element.classList.remove("selected-start-date");
    } else if (element.classList.contains("in-between-selected-date")) {
      let priceElements = element.children[1]
        .children as unknown as HTMLDivElement[];

      priceElements[0].style.display = "flex";
      priceElements[1].style.display = "none";

      element.classList.remove("in-between-selected-date");
    } else if (element.classList.contains("selected-end-date")) {
      let priceElements = element.children[1]
        .children as unknown as HTMLDivElement[];

      priceElements[0].style.display = "flex";
      priceElements[1].style.display = "none";

      element.classList.remove("selected-end-date");
    }
  });
};
