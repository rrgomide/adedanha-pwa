export function helperCreateElement(tag, textContent = null, ...classNames) {
  const element = document.createElement(tag);
  element.textContent = textContent;

  if (classNames.length > 0) {
    classNames.forEach(className => element.classList.add(className));
  }

  return element;
}

export function helperGetElementFromDom(selector) {
  const element = document.querySelector(selector);

  return element;
}

export function helperClearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
