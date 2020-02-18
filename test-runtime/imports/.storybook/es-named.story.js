import React from 'react';
import { storiesOf } from '@storybook/react';
import componentsMeta from '../../../.wuf/components.json';
import DEFINITIONS from './component-definitions';
import { Layout, Cell } from '../../../';
import { Box } from '../../../';
import * as wsr from '../../../';

const components = Object.keys(componentsMeta);

const ignoreList = [
  'WarningIndicator',
  'Layout',
  'Box',
  'Grid',
  'Selector',
  'ContactItemBuilder',
  'BadgeSelectItemBuilder',
];

components.forEach(name => {
  if (ignoreList.includes(name)) {
    return;
  }

  const props = DEFINITIONS[name] && DEFINITIONS[name].props;

  const Component = wsr[name];

  storiesOf(`es-named modules`, module).add(`${name}`, () => (
    <Layout>
      <Cell span={6}>
        <Box height="500px" width="500px">
          <Component {...props} />
        </Box>
      </Cell>
    </Layout>
  ));
});
