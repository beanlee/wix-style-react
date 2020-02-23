/* eslint-disable */
import React from 'react';
import Box from 'wix-style-react/Box';
import Breadcrumbs from 'wix-style-react/Breadcrumbs';
import Button from 'wix-style-react/Button';
import Card from 'wix-style-react/Card';
import Checkbox from 'wix-style-react/Checkbox';
import Dropdown from 'wix-style-react/Dropdown';
import { Container, Row } from 'wix-style-react/Grid';
import Highlighter from 'wix-style-react/Highlighter';
import Page from 'wix-style-react/Page';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import IconButton from 'wix-style-react/IconButton';
import Search from 'wix-style-react/Search';
import Table from 'wix-style-react/Table';
import TableActionCell from 'wix-style-react/TableActionCell';
import TableToolbar from 'wix-style-react/TableToolbar';

class Example extends React.Component {
  render() {
    return (
      <Page upgrade height="372px">
        {renderPageHeader()}
        <Page.Content>
          <Container>
            <Row>
              <Card>
                <Card.Content>Some Content 1</Card.Content>
              </Card>
            </Row>
            <Row>{<ProductTable />}</Row>

            <Row>
              <Card>
                <Card.Content>Some Content 2</Card.Content>
              </Card>
            </Row>
            <Row>{<ProductTable />}</Row>
          </Container>
        </Page.Content>
      </Page>
    );
  }
}

class ProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: allData,
      collectionId: 0,
      filterId: 0,
      searchTerm: '',
      inStock: false,
    };
  }

  render() {
    const tableData = this.getFilteredData();
    return (
      <Table
        withWrapper
        dataHook="story-table-example"
        data={tableData}
        itemsPerPage={20}
        columns={this.getColumns()}
        onSelectionChange={selectedIds =>
          console.log('Table.onSelectionChange(): selectedIds=', selectedIds)
        }
        showSelection
        showLastRowDivider
      >
        <Page.Sticky>
          <Card>
            <Table.ToolbarContainer>
              {() => this.renderMainToolbar()}
            </Table.ToolbarContainer>
            <Table.Titlebar />
          </Card>
        </Page.Sticky>
        <Card>
          <Table.Content titleBarVisible={false} />
        </Card>
      </Table>
    );
  }

  getColumns() {
    return [
      {
        title: 'Name',
        render: row => (
          <Highlighter match={this.state.searchTerm}>{row.name}</Highlighter>
        ),
        width: '30%',
        minWidth: '150px',
      },
      {
        title: 'SKU',
        render: row => row.SKU,
        width: '20%',
        minWidth: '100px',
      },
      {
        title: 'Price',
        render: row => row.price,
        width: '20%',
        minWidth: '100px',
      },
      {
        title: 'Inventory',
        render: row => row.inventory,
        width: '20%',
        minWidth: '100px',
      },
      {
        title: '',
        width: '40%',
        render: rowData => (
          <TableActionCell
            dataHook="action-cell-component-secondary"
            primaryAction={{
              text: 'Edit',
              skin: 'standard',
            }}
            secondaryActions={[
              {
                text: 'Star',
                icon: <Icons.Star />,
                onClick: () => window.alert(`Starring ${rowData.name}`),
              },
              {
                text: 'Download',
                icon: <Icons.Download />,
                onClick: () => window.alert(`Downloading ${rowData.name}`),
              },
              {
                text: 'Duplicate',
                icon: <Icons.Duplicate />,
                onClick: () => window.alert(`Duplicating ${rowData.name}`),
              },
              {
                text: 'Print',
                icon: <Icons.Print />,
                onClick: () => window.alert(`Printing ${rowData.name}`),
              },
            ]}
            numOfVisibleSecondaryActions={2}
            alwaysShowSecondaryActions={false}
          />
        ),
      },
    ];
  }

  clearSearch() {
    this.setState({
      collectionId: 0,
      filterId: 0,
      searchTerm: '',
      inStock: false,
    });
  }

  renderMainToolbar() {
    const collectionOptions = [
      { id: 0, value: 'All' },
      { id: 1, value: 'Towels' },
      { id: 2, value: 'Slippers' },
    ];

    const filterOptions = [
      { id: 0, value: 'All' },
      { id: 1, value: 'Red' },
      { id: 2, value: 'Cyan' },
    ];

    return (
      <Card>
        <TableToolbar>
          <TableToolbar.ItemGroup position="start">
            <TableToolbar.Item>
              <TableToolbar.Label>
                Product
                <span style={{ width: '150px' }}>
                  <Dropdown
                    options={collectionOptions}
                    selectedId={this.state.collectionId}
                    onSelect={selectedOption => {
                      this.setState({ collectionId: selectedOption.id });
                    }}
                    roundInput
                  />
                </span>
              </TableToolbar.Label>
            </TableToolbar.Item>
            <TableToolbar.Item>
              <TableToolbar.Label>
                Color
                <span style={{ width: '86px' }}>
                  <Dropdown
                    options={filterOptions}
                    selectedId={this.state.filterId}
                    onSelect={selectedOption =>
                      this.setState({ filterId: selectedOption.id })
                    }
                    roundInput
                  />
                </span>
              </TableToolbar.Label>
            </TableToolbar.Item>
            <TableToolbar.Item>
              <Checkbox
                checked={this.state.inStock}
                onChange={e => this.setState({ inStock: e.target.checked })}
              >
                In Stock only
              </Checkbox>
            </TableToolbar.Item>
          </TableToolbar.ItemGroup>
          <TableToolbar.ItemGroup position="end">
            <TableToolbar.Item>{this.renderSearch(false)}</TableToolbar.Item>
          </TableToolbar.ItemGroup>
        </TableToolbar>
      </Card>
    );
  }

  renderSearch(expandable) {
    return (
      <Search
        expandable={expandable}
        onChange={e => {
          this.setState({ searchTerm: e.target.value });
        }}
        value={this.state.searchTerm}
      />
    );
  }

  getFilteredData() {
    let data = this.state.data;
    if (this.state.collectionId > 0) {
      data = data.filter(row => row.collectionId === this.state.collectionId);
    }
    if (this.state.filterId > 0) {
      data = data.filter(row => row.filterId === this.state.filterId);
    }
    if (this.state.inStock) {
      data = data.filter(row => row.inventory === 'In stock');
    }
    if (this.state.searchTerm !== '') {
      data = data.filter(row =>
        row.name.toUpperCase().includes(this.state.searchTerm.toUpperCase()),
      );
    }
    return data;
  }
}

const createDataSet = setIndex => [
  {
    id: `${setIndex}-1`,
    name: `Apple Towels ${setIndex}`,
    SKU: '111222',
    price: '$2.00',
    inventory: 'In stock',
    collectionId: 1,
  },
  {
    id: `${setIndex}-2`,
    name: `Cyan Towels ${setIndex}`,
    SKU: '222333',
    price: '$2.00',
    inventory: 'In stock',
    collectionId: 1,
    filterId: 2,
  },
  {
    id: `${setIndex}-3`,
    name: `Marble Slippers ${setIndex}`,
    SKU: '333444',
    price: '$14.00',
    inventory: 'In stock',
    collectionId: 2,
  },
  {
    id: `${setIndex}-4`,
    name: `Red Slippers ${setIndex}`,
    SKU: '444555',
    price: '$14.00',
    inventory: 'Out of stock',
    collectionId: 2,
    filterId: 1,
  },
];

const allData = [1, 2, 3, 4, 5].reduce(
  (accum, index) => accum.concat(createDataSet(index)),
  [],
);

const renderPageHeader = () => {
  const ActionBar = () => {
    return (
      <Box>
        <Box>
          <PopoverMenu
            triggerElement={
              <IconButton skin="inverted">
                <Icons.More />
              </IconButton>
            }
          >
            <PopoverMenu.MenuItem onClick={() => {}} text="Refresh" />
            <PopoverMenu.MenuItem onClick={() => {}} text="Trash" />
          </PopoverMenu>
        </Box>
        <Box marginLeft="small" marginRight="small">
          <Button skin="light">Cancel</Button>
        </Box>
        <Box>
          <Button>Save</Button>
        </Box>
      </Box>
    );
  };

  return (
    <Page.Header
      title="Page Title"
      breadcrumbs={
        <Breadcrumbs
          items={[1, 2, 3].map(i => ({ id: `${i}`, value: `Page ${i}` }))}
          activeId="3"
          size="medium"
          theme="onGrayBackground"
          onClick={() => {}}
        />
      }
      actionsBar={<ActionBar />}
    />
  );
};

render(Example);
