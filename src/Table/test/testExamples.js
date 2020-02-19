import React from 'react';
import ExternalLink from 'wix-ui-icons-common/ExternalLink';
import Star from 'wix-ui-icons-common/Star';
import Download from 'wix-ui-icons-common/Download';
import Duplicate from 'wix-ui-icons-common/Duplicate';
import Print from 'wix-ui-icons-common/Print';

import { Table } from '..';
import { TableToolbar } from '../../TableToolbar';
import Dropdown from '../../Dropdown';
import TableActionCell from '../../TableActionCell';
import Card from '../../Card';
import Search from '../../Search';
import TextButton from '../../TextButton';
import ImagePlaceholder from '../../../stories/utils/ImagePlaceholder';

export const ToolbarExample = () => {
  const collectionOptions = [
    { id: 0, value: 'All Products' },
    { id: 1, value: 'Towels' },
    { id: 2, value: 'Slippers' },
  ];
  const filterOptions = [
    { id: 0, value: 'All' },
    { id: 1, value: 'Red' },
    { id: 2, value: 'Cyan' },
  ];

  return (
    <TableToolbar>
      <TableToolbar.ItemGroup position="start">
        <TableToolbar.Item>
          <TableToolbar.Title>My Table</TableToolbar.Title>
        </TableToolbar.Item>
        <TableToolbar.Item>
          <TableToolbar.Label>
            Collection
            <span style={{ width: '150px' }}>
              <Dropdown options={collectionOptions} selectedId={0} roundInput />
            </span>
          </TableToolbar.Label>
        </TableToolbar.Item>
        <TableToolbar.Item>
          <TableToolbar.Label>
            Filter By
            <span style={{ width: '86px' }}>
              <Dropdown options={filterOptions} selectedId={0} roundInput />
            </span>
          </TableToolbar.Label>
        </TableToolbar.Item>
      </TableToolbar.ItemGroup>
      <TableToolbar.ItemGroup position="end">
        <TableToolbar.Item>
          <Search />
        </TableToolbar.Item>
      </TableToolbar.ItemGroup>
    </TableToolbar>
  );
};

export const ToolbarWithBulSelectionCheckboxExample = () => {
  return (
    <TableToolbar>
      <TableToolbar.ItemGroup position="start">
        <TableToolbar.Item>
          <Table.BulkSelectionCheckbox>Select All</Table.BulkSelectionCheckbox>
        </TableToolbar.Item>
      </TableToolbar.ItemGroup>
    </TableToolbar>
  );
};

export const EmptyStateExample = () => (
  <Table.EmptyState
    title="You haven't added any items yet"
    subtitle="Add items to your website so people can buy them"
    image={<ImagePlaceholder />}
  >
    <TextButton suffixIcon={<ExternalLink />}>
      Learn how to add items
    </TextButton>
  </Table.EmptyState>
);

// TODO: Migrate to visual-grid (currently is being used to E2E)
export class ActionCellExample extends React.Component {
  baseData = [
    {
      name: 'Apple Towels',
      SKU: '111222',
      price: '$2.00',
      inventory: 'In stock',
    },
    {
      name: 'Cyan Towels',
      SKU: '222333',
      price: '$2.00',
      inventory: 'In stock',
    },
    {
      name: 'Marble Slippers',
      SKU: '333444',
      price: '$14.00',
      inventory: 'In stock',
    },
    {
      name: 'Red Slippers',
      SKU: '444555',
      price: '$14.00',
      inventory: 'Out of stock',
    },
  ];

  primaryAction = rowData => window.alert(`Editing ${rowData.name}`);

  render() {
    return (
      <Card>
        <Table
          dataHook="story-action-cell-primary-secondary-example"
          data={this.baseData}
          itemsPerPage={20}
          showSelection
          onRowClick={this.primaryAction}
          columns={[
            {
              title: 'Name',
              render: row => <span>{row.name}</span>,
              width: '20%',
              minWidth: '150px',
            },
            {
              title: 'SKU',
              render: row => <span>{row.SKU}</span>,
              width: '10%',
              minWidth: '100px',
            },
            {
              title: 'Price',
              render: row => <span>{row.price}</span>,
              width: '10%',
              minWidth: '100px',
            },
            {
              title: 'Inventory',
              render: row => <span>{row.inventory}</span>,
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
                      icon: <Star />,
                      onClick: () => window.alert(`Starring ${rowData.name}`),
                    },
                    {
                      text: 'Download',
                      icon: <Download />,
                      onClick: () =>
                        window.alert(`Downloading ${rowData.name}`),
                    },
                    {
                      text: 'Duplicate',
                      icon: <Duplicate />,
                      onClick: () =>
                        window.alert(`Duplicating ${rowData.name}`),
                    },
                    {
                      text: 'Print',
                      icon: <Print />,
                      onClick: () => window.alert(`Printing ${rowData.name}`),
                    },
                  ]}
                  numOfVisibleSecondaryActions={2}
                  alwaysShowSecondaryActions={false}
                />
              ),
            },
          ]}
        >
          <Table.Content />
        </Table>
      </Card>
    );
  }
}
