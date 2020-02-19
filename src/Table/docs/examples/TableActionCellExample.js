/* eslint-disable */

class TableActionCellExample extends React.Component {
  state = {
    data: [
      { firstName: 'Meghan', lastName: 'Bishop' },
      { firstName: 'Sara', lastName: 'Porter' },
      { firstName: 'Deborah', lastName: 'Rhodes' },
      { firstName: 'Walter', lastName: 'Jenning' },
    ],
  };

  render() {
    return (
      <Table
        data={this.state.data}
        columns={[
          { title: 'First', render: row => row.firstName },
          { title: 'Last', render: row => row.lastName },
          {
            title: '',
            render: rowData => (
              <TableActionCell
                primaryAction={{
                  text: 'Edit',
                  skin: 'standard',
                  onClick: () => window.alert(`Editing ${rowData.firstName}`),
                }}
                secondaryActions={[
                  {
                    text: 'Star',
                    icon: <Icons.Star />,
                    onClick: () => window.alert(`Starring ${rowData.firstName}`),
                  },
                  {
                    text: 'Download',
                    icon: <Icons.Download />,
                    onClick: () => window.alert(`Downloading ${rowData.firstName}`),
                  },
                  {
                    text: 'Duplicate',
                    icon: <Icons.Duplicate />,
                    onClick: () => window.alert(`Duplicating ${rowData.firstName}`),
                  },
                  {
                    text: 'Print',
                    icon: <Icons.Print />,
                    onClick: () => window.alert(`Printing ${rowData.firstName}`),
                  },
                ]}
                // How many actions are visible, whereas the rest would be shown within a popover menu
                numOfVisibleSecondaryActions={2}
              />
            ),
          },
        ]}
        onRowClick={(rowData, rowNum) => console.log(`Row data is: ${JSON.stringify(rowData)}. Row num is: ${rowNum}`)}
      >
        <Table.Content />
      </Table>
    );
  }
}
export default TableActionCellExample
