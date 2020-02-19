/* eslint-disable no-console */
import React, { Component } from 'react';
import { SingleComponentStacked, Preview } from '../../../sharedComponents';
import { createLinkedComponentsNames } from '../../../sharedComponents/utils';

import { layoutSymbolsToComponents } from '../../../../../symbolsComponentsMapping/families/layoutFamily';
import { layoutSymbols } from '../../../../../symbolsComponentsMapping/symbols';

import Table from 'wix-style-react/Table';
import TableActionCell from 'wix-style-react/TableActionCell';
import Card from 'wix-style-react/Card';
import Search from 'wix-style-react/Search';
import Star from 'wix-ui-icons-common/Star';
import Avatar from 'wix-style-react/Avatar';

import {
  TableToolbar,
  ItemGroup,
  Item,
  Title,
} from 'wix-style-react/TableToolbar';

class TablePageExample extends Component {
  state = {
    data: [
      {
        name: 'Red Slippers',
        SKU: '111222',
        price: '$14.00',
        inventory: 'In stock',
      },
      {
        name: 'Blue Slippers',
        SKU: '222333',
        price: '$14.00',
        inventory: 'Out of stock',
      },
      {
        name: 'Grey Slippers',
        SKU: '333444',
        price: '$14.00',
        inventory: 'In stock',
      },
      {
        name: 'Green Slippers',
        SKU: '444555',
        price: '$14.00',
        inventory: 'Out of stock',
      },
    ],
  };

  render() {
    const { data } = this.state;
    return (
      <Table
        data={data}
        columns={[
          {
            title: '',
            width: '10%',
            minWidth: '50px',
            render: () => <Avatar size="size60" />,
          },
          { title: 'Name', render: row => row.name },
          { title: 'SKU', render: row => row.SKU },
          { title: 'Price', render: row => row.price },
          { title: 'Inventory', render: row => row.inventory },
          {
            title: '',
            render: rowData => (
              <TableActionCell
                primaryAction={{
                  onClick: () => console.log('primaryAction'),
                  text: 'Edit',
                  skin: 'standard',
                }}
                secondaryActions={[
                  {
                    text: 'Star',
                    icon: <Star />,
                    onClick: () => window.alert(`Starring ${rowData.name}`),
                  },
                ]}
                numOfVisibleSecondaryActions={0}
                alwaysShowSecondaryActions={false}
              />
            ),
          },
        ]}
        showSelection
      >
        <Table.ToolbarContainer>
          {() => <TableToolbarExample />}
        </Table.ToolbarContainer>
        <Table.Content />
      </Table>
    );
  }
}

const TableToolbarExample = () => (
  <Card>
    <TableToolbar>
      <ItemGroup position="start">
        <Item>
          <Title>Table title</Title>
        </Item>
      </ItemGroup>
      <ItemGroup position="end">
        <Item>
          <Search placeholder="Search..." />
        </Item>
      </ItemGroup>
    </TableToolbar>
  </Card>
);

const TableExamples = () => {
  const symbol = layoutSymbols.tableLayout;
  const components = layoutSymbolsToComponents[symbol];

  const singleComponentProps = {
    name: symbol,
    componentsNames: createLinkedComponentsNames(components),
  };

  return (
    <SingleComponentStacked {...singleComponentProps}>
      <Preview>
        <TablePageExample />
      </Preview>
    </SingleComponentStacked>
  );
};

export default TableExamples;
