const rowSelector = 'tbody tr';
const rowByIdx = (component, index) => component.$$(rowSelector).get(index);
const scrollIntoView = el => {
  return browser.executeScript(element => {
    element.scrollIntoView();
  }, el.getWebElement());
};

const dataTableDriverFactory = component => ({
  rowsCount: () => component.$$(rowSelector).count(),
  clickRowByIndex: index => rowByIdx(component, index).click(),
  getRowTextByIndex: index => rowByIdx(component, index).getText(),
  scrollToRowByIdx: index => scrollIntoView(rowByIdx(component, index)),
  element: () => component,
});

export default dataTableDriverFactory;
