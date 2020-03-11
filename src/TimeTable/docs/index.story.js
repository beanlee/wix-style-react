import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  divider,
  code,
  example as baseExample,
  playground,
  api,
  testkit,
  columns,
} from 'wix-storybook-utils/Sections';
import cloneDeep from 'lodash/cloneDeep';

import { storySettings } from '../test/storySettings';
import TimeTableHeaderExample from './examples/header';
import allComponents from '../../../stories/utils/allComponents';
import structureExample from '!raw-loader!./examples/structure';
import disabledExample from '!raw-loader!./examples/disabled';
import customContentExample from '!raw-loader!./examples/customContent';

import TimeTable from '..';
import Box from '../../Box';
import { defaultColumns } from './playgroundData';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'TimeTable',

  component: TimeTable,
  componentPath: '..',

  componentProps: (setState, getState) => ({
    dataHook: storySettings.dataHook,
    addItemButtonLabel: 'Add',
    columns: defaultColumns,
    insertPosition: 'any',
    onChange: newColumns => setState({ columns: newColumns }),
    onAdd: columnIndex => {
      const newColumns = cloneDeep(getState().columns);
      newColumns[columnIndex].items.push({ content: 'New Item' });
      setState({ columns: newColumns });
    },
  }),

  exampleProps: {
    columns: [{ label: '4 days', value: defaultColumns }],
    onChange: (columns, details) => undefined, // eslint-disable-line
    onAdd: columnIndex => undefined, // eslint-disable-line
  },

  sections: [
    header({
      component: (
        <Box width="60%" minWidth="500px" height="130px">
          <TimeTableHeaderExample />
        </Box>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'TimeTable allows site owner to group and manage items. Items can be sorted and regrouped using drag and drop feature. It can be used to review scheduled tasks or events.',
            }),
          ]),

          importExample("import { TimeTable } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Structure',
            description:
              'Each group has a title and subtitle, it can be set to `active`. Items can be used with plain text or node. "Add Item" button can be renamed or removed.',
            source: structureExample,
          }),

          example({
            title: 'Disabled',
            description:
              "Groups and items can be disabled indepentendly. New items cannot be added to disabled groups. Active items placed in a disabled group can be dragged out, but cannot be put back. It's allowed to set `draggable` on disabled item.",
            source: disabledExample,
          }),

          code({
            autoRender: false,
            title: 'Custom Content',
            description:
              "Item's content can render any content with complex logic. Example below demonstrates how it can be used with a `<Popover/>` or `<Badge/>`.",
            source: customContentExample,
            compact: true,
            components: allComponents,
          }),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
