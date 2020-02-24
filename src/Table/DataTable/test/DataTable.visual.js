import React from 'react';
import { storiesOf } from '@storybook/react';

import Example from '../docs/Example';
import ExampleSortable from '../docs/ExampleSortable';
import ExampleSortableOldDesign from '../docs/ExampleSortableOldDesign';
import ExampleWithoutHeader from '../docs/ExampleWithoutHeader';

const tests = [
  {
    describe: 'DataTable',
    its: [
      {
        it: 'Simple',
        story: () => <Example />,
      },
      {
        it: 'SortableDynamicWidth',
        story: () => <ExampleSortable style={{ width: '80%' }} />,
      },
      {
        it: 'Sortable',
        story: () => <ExampleSortable />,
      },
      {
        it: 'SortableOldDesign',
        story: () => <ExampleSortableOldDesign />,
      },
      {
        it: 'WithoutHeader',
        story: () => <ExampleWithoutHeader />,
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, story }) => {
    storiesOf(describe, module).add(it, story);
  });
});
