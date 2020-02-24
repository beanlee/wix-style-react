import { dataTableUniDriverFactory } from './DataTable.uni.driver';

export const dataTablePrivateUniDriverFactory = base => {
  const getRows = () => base.$$('tbody tr[data-table-row="dataTableRow"]');
  const getRow = rowIndex => getRows().get(rowIndex);

  return {
    ...dataTableUniDriverFactory(base),
    getHeaderCell: index =>
      base
        .$('thead')
        .$$('th')
        .get(index),
    getCell: (rowIndex, cellIndex) =>
      getRow(rowIndex)
        .$$('td')
        .get(cellIndex),
  };
};
