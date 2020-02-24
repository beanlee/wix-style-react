import React from 'react';
import DataTable from '..';

const style = {
  width: '966px',
};

const baseData = [
  { firstName: 'Meghan', lastName: 'Bishop' },
  { firstName: 'Sara', lastName: 'Porter' },
  { firstName: 'Deborah', lastName: 'Rhodes' },
  { firstName: 'Walter', lastName: 'Jenning' },
];

class DataTableExampleWithoutHeader extends React.Component {
  render() {
    return (
      <div style={style}>
        <DataTable
          dataHook="story-data-table-without-header"
          hideHeader
          data={baseData}
          columns={[
            {
              title: 'Row Number',
              render: (row, rowNum) => '#' + (rowNum + 1),
              width: '20%',
              minWidth: '75px',
              important: true,
            },
            {
              title: 'First Name',
              render: row => <span>{row.firstName}</span>,
              width: '40%',
              minWidth: '100px',
            },
            {
              title: 'Last Name',
              render: row => <span>{row.lastName}</span>,
              width: '40%',
              minWidth: '100px',
            },
          ]}
        />
      </div>
    );
  }
}

export default DataTableExampleWithoutHeader;
