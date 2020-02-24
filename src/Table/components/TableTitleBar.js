import React from 'react';
import PropTypes from 'prop-types';

import { DataTableHeader } from '../DataTable';
import { getDataTableProps, createColumns } from '../Table';
import { TableContext } from '../TableContext';
import { BulkSelectionConsumer } from '../BulkSelection';

/**
 * TitleBar (aka DataTableHeader)
 */
export const TableTitleBar = ({ dataHook }) => {
  return (
    <TableContext.Consumer>
      {tableProps => {
        const dataTableProps = getDataTableProps(tableProps);
        if (tableProps.showSelection) {
          return (
            <BulkSelectionConsumer
              consumerCompName="Table.TitleBar"
              providerCompName="Table"
            >
              {bulkSelectionContext => (
                <div data-hook="table-title-bar">
                  <DataTableHeader
                    {...dataTableProps}
                    columns={createColumns({
                      tableProps,
                      bulkSelectionContext,
                    })}
                    dataHook={dataHook}
                  />
                </div>
              )}
            </BulkSelectionConsumer>
          );
        } else {
          return (
            <div data-hook="table-title-bar">
              <DataTableHeader {...dataTableProps} />
            </div>
          );
        }
      }}
    </TableContext.Consumer>
  );
};
TableTitleBar.displayName = 'Table.TitleBar';
TableTitleBar.propTypes = {
  dataHook: PropTypes.string,
};
