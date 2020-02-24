import ReactTestUtils from 'react-dom/test-utils';
import values from '../../utils/operators/values';

const arbitraryEmptyElement = () => document.createElement('div');

const dataTableDriverFactory = ({ element }) => {
  // When a React component renders null in React 15, a Comment-Element is rendered to the DOM.
  const isDisplayingNothing =
    !element || element.nodeType === Node.COMMENT_NODE;
  /* Since a Comment-Element has no methods like querySelector(),
   * we replace (if needed) it with an arbitrary Element.
   * This allows simple implementation of methods like getRows().
   */
  const protectedElement = isDisplayingNothing
    ? arbitraryEmptyElement()
    : element;

  const getHeader = () => protectedElement.querySelector('thead');
  const hasHeader = () => !!getHeader();

  const getRows = () =>
    protectedElement.querySelectorAll(
      'tbody tr[data-table-row="dataTableRow"]',
    );
  const getRowsCount = () => getRows().length;
  const getRow = rowIndex => getRows()[rowIndex];
  const getCell = (rowIndex, cellIndex) =>
    getRow(rowIndex).querySelectorAll('td')[cellIndex];
  const getRowDetails = index =>
    protectedElement.querySelector(`tbody tr td[data-hook="${index}_details"]`);
  const getHeaderCell = index => getHeader().querySelectorAll('th')[index];
  const getSortableTitle = index =>
    protectedElement.querySelector(`th [data-hook="${index}_title"]`);
  const getTitleInfoIcon = index =>
    protectedElement.querySelector(`th [data-hook="${index}_info_tooltip"]`);
  const getSortableTitleArrowDesc = index =>
    element.querySelector(
      `th [data-hook="${index}_title"]  [data-hook="sort_arrow_dec"]`,
    );

  return {
    exists: () => !isDisplayingNothing,
    getRow,
    getRowsCount,
    getRowsWithClassCount: className => {
      return isDisplayingNothing
        ? 0
        : values(getRows()).filter(elem => elem.classList.contains(className))
            .length;
    },
    getRowsWithDataHook: dataHookName =>
      protectedElement.querySelectorAll(`[data-hook="${dataHookName}"]`),
    getRowWithDataHook: dataHookName =>
      protectedElement.querySelector(`[data-hook="${dataHookName}"]`),
    /** Returns an array representing the text content of the cells in a given row `index`.  */
    getRowText: index =>
      values(getRows()[index].querySelectorAll('td')).map(td => td.textContent),
    getRowClasses: index => values(getRows()[index].classList),
    /** Get header cell element: (columnIndex) => Element */
    getHeaderCell,
    getHeaderCellStyle: index => getHeaderCell(index).style,
    getHeaderCellWidth: index => getHeaderCell(index).style.width,
    /** Get cell element: (rowIndex, columnIndex) => Element */
    getCell,
    getCellStyle: (rowIndex, colIndex) => getCell(rowIndex, colIndex).style,
    getCellWidth: (rowIndex, colIndex) => getCell(rowIndex, colIndex).width,
    isRowClickable: index =>
      getRows()[index].classList.contains('clickableDataRow'),
    isRowAnimated: index =>
      getRows()[index].classList.contains('animatedDataRow'),
    getTitles: () =>
      values(getHeader().querySelectorAll('th')).map(th => th.textContent),
    isDisplayingNothing: () => isDisplayingNothing,
    isDisplayingHeaderOnly: () => hasHeader() && getRowsCount() === 0,
    isDisplayingHeader: () => hasHeader(),
    hasChildWithId: id => !!protectedElement.querySelector(`#${id}`),
    clickRow: (index, eventData) =>
      ReactTestUtils.Simulate.click(getRow(index), eventData),
    clickColumn: (rowIndex, colIndex, eventData) =>
      ReactTestUtils.Simulate.click(getCell(rowIndex, colIndex), eventData),
    mouseEnterRow: (index, eventData) =>
      ReactTestUtils.Simulate.mouseEnter(getRow(index), eventData),
    mouseLeaveRow: (index, eventData) =>
      ReactTestUtils.Simulate.mouseLeave(getRow(index), eventData),
    hasRowDetails: index => !!getRowDetails(index),
    getRowDetailsText: index => getRowDetails(index).textContent,
    hasSortableTitle: index => !!getSortableTitle(index),
    hasInfoIcon: index => !!getTitleInfoIcon(index),
    hasSortDescending: index => !!getSortableTitleArrowDesc(index),
    clickSort: (index, eventData) =>
      ReactTestUtils.Simulate.click(getHeaderCell(index), eventData),
    getRowDetails: index => getRowDetails(index),
  };
};

export default dataTableDriverFactory;
