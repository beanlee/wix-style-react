/* eslint-disable */

class TablePageExample extends React.Component {
  state = {
    data: this._simulateData(),
    collectionId: 0,
    filterId: 0,
    searchTerm: '',
    inStock: false,
  };

  render() {
    const filteredData = this._getFilteredData();

    return (
      <Page height='600px'>
        <Page.Header title="My Table" />
        <Page.Content>
          <Table
            data={filteredData}
            columns={[
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
            ]}
            onSelectionChange={selectedIds =>
              console.log('Table.onSelectionChange(): selectedIds=', selectedIds)
            }
            showSelection
          >
            <Page.Sticky>
              <Card>
                <Table.ToolbarContainer>
                  {selectionContext =>
                    selectionContext.selectedCount === 0
                      ? this._renderMainToolbar()
                      : this._renderActionsToolbar({ ...selectionContext })
                  }
                </Table.ToolbarContainer>
                {filteredData.length ? <Table.Titlebar /> : this._renderEmptyState()}
              </Card>
            </Page.Sticky>
            <Card>
              <Table.Content titleBarVisible={false} />
            </Card>
          </Table>
        </Page.Content>
      </Page>
    );
  }

  _simulateData() {
    const initBaseData = setIndex => [
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

    // Creates five instances of the base data collection and concatenates them into an array
    return [1, 2, 3, 4, 5].reduce((data, index) => data.concat(initBaseData(index)), []);
  }

  _renderMainToolbar() {
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
                    onSelect={selectedOption => this.setState({ filterId: selectedOption.id })}
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
            <TableToolbar.Item>{this._renderSearch(false)}</TableToolbar.Item>
          </TableToolbar.ItemGroup>
        </TableToolbar>
      </Card>
    );
  }

  _renderActionsToolbar({ selectedCount, getSelectedIds }) {
    return (
      <TableToolbar>
        <TableToolbar.ItemGroup position="start">
          <TableToolbar.Item>
            <TableToolbar.SelectedCount>{`${selectedCount} Selected`}</TableToolbar.SelectedCount>
          </TableToolbar.Item>
        </TableToolbar.ItemGroup>
        <TableToolbar.ItemGroup position="end">
          <TableToolbar.Item layout="button">
            <Button
              skin="light"
              priority="primary"
              prefixIcon={<Icons.Upload />}
              onClick={() => window.alert(`Exporting selectedIds=${getSelectedIds()}`)}
            >
              Export
            </Button>
          </TableToolbar.Item>
          <TableToolbar.Item layout="button">
            <Button
              skin="light"
              priority="primary"
              prefixIcon={<Icons.Duplicate />}
              onClick={() => window.alert(`Duplicating selectedIds=${getSelectedIds()}`)}
            >
              Duplicate
            </Button>
          </TableToolbar.Item>
          <TableToolbar.Item layout="button">
            <Button
              skin="light"
              priority="primary"
              prefixIcon={<Icons.Edit />}
              onClick={() => window.alert(`Editing selectedIds=${getSelectedIds()}`)}
            >
              Edit
            </Button>
          </TableToolbar.Item>
          <TableToolbar.Divider />
          <TableToolbar.Item>{this._renderSearch(true)}</TableToolbar.Item>
        </TableToolbar.ItemGroup>
      </TableToolbar>
    );
  }

  _renderEmptyState = () => (
    <Table.EmptyState
      title="You haven't added any items yet"
      subtitle="Add items to your website so people can buy them"
      image={<Box height={120} width={120} backgroundColor="#dfe5eb" borderRadius="50%" />}
    >
      <TextButton suffixIcon={<Icons.ExternalLink />}>Learn how to add items</TextButton>
    </Table.EmptyState>
  );

  _clearSearch() {
    this.setState({
      collectionId: 0,
      filterId: 0,
      searchTerm: '',
      inStock: false,
    });
  }

  _renderSearch(expandable) {
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

  _getFilteredData() {
    let { data } = this.state;

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
