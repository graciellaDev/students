// eslint-disable-next-line import/prefer-default-export
export function hoverStudentItem(hoverElements, classFirstElement = 'name') {
  hoverElements.forEach((element) => {
    if (!element.classList.contains(classFirstElement)) {
      let previousElement = element.previousElementSibling;
      let classListPrevious = previousElement.classList;
      const arrayPreviousElements = [];
      while (!classListPrevious.contains(classFirstElement)) {
        arrayPreviousElements.push(previousElement);
        previousElement = previousElement.previousElementSibling;
        classListPrevious = previousElement.classList;
      }
      arrayPreviousElements.push(previousElement);
      element.addEventListener('mouseover', () => {
        arrayPreviousElements.forEach((el) => {
          el.classList.add('hover');
        });
      });
      element.addEventListener('mouseout', () => {
        arrayPreviousElements.forEach((el) => {
          el.classList.remove('hover');
        });
      });
    }
  });
}
