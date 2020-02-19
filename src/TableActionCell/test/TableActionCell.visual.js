import { storiesOf } from '@storybook/react';
import React from 'react';
import Download from 'wix-ui-icons-common/Download';
import Star from 'wix-ui-icons-common/Star';
import { uniTestkitFactoryCreator } from 'wix-ui-test-utils/vanilla';
import Box from '../../Box';
import TableActionCell from '../TableActionCell';
import { TableActionCellPrivateDriverFactory } from './TableActionCell.private.uni.driver';

const interactiveDataHook = 'interactive-tableactioncell';

const tableActionCellUniTestkitFactory = uniTestkitFactoryCreator(
  TableActionCellPrivateDriverFactory,
);

const createDriver = dataHook =>
  tableActionCellUniTestkitFactory({
    wrapper: document.body,
    dataHook,
  });

class InteractiveEyeTest extends React.Component {
  async componentDidMount() {
    this.props.componentDidMount();
  }

  render() {
    const { componentDidMount, ...restProps } = this.props;

    return (
      <Box padding={20}>
        <TableActionCell dataHook={interactiveDataHook} {...restProps} />
      </Box>
    );
  }
}

const interactiveTests = [
  {
    describe: 'Secondary Actions',
    its: [
      {
        it: 'Should display a divider',
        props: {
          secondaryActions: [
            {
              text: 'Star',
              icon: <Star />,
            },
            { divider: true },
            {
              text: 'Download',
              icon: <Download />,
            },
          ],
          numOfVisibleSecondaryActions: 0,
        },
        componentDidMount: async () => {
          const driver = createDriver(interactiveDataHook);
          await driver.clickSecondaryActions();
        },
      },
    ],
  },
];

interactiveTests.forEach(({ describe, its }) => {
  its.forEach(({ it, props, componentDidMount }) => {
    storiesOf(
      `TableActionCell${describe ? '/' + describe : ''}`,
      module,
    ).add(it, () => (
      <InteractiveEyeTest {...props} componentDidMount={componentDidMount} />
    ));
  });
});
