import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  columns,
  divider,
  example as baseExample,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';

import SidebarSectionItem from '..';
import Box from '../../Box';
import CounterBadge from '../../CounterBadge';

const example = config => baseExample({ components: allComponents, ...config });

const childrenExamples = [
  { label: 'Text', value: 'Some text' },
  {
    label: 'Multiple lines',
    value: 'This is an example of multiple lines',
  },
];

export default {
  category: storySettings.category,
  storyName: 'SidebarSectionItem',

  component: SidebarSectionItem,
  componentPath: '..',

  componentProps: {
    children: childrenExamples[0].value,
  },

  exampleProps: {
    children: childrenExamples,
    prefix: [
      {
        label: 'Green circle',
        value: (
          <Box
            width="8px"
            height="8px"
            borderRadius="50%"
            backgroundColor="G10"
          ></Box>
        ),
      },
    ],
    suffix: [
      {
        label: 'Counter badge',
        value: <CounterBadge skin="standard">5</CounterBadge>,
      },
    ],
  },

  sections: [
    header(),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text: 'An item for the section within the sidebar.',
            }),
          ]),

          importExample(
            "import { SidebarSectionItem } from 'wix-style-react';",
          ),

          divider(),

          title('Examples'),

          example({
            title: 'Plain Example',
            text: 'A simple example for section item',
            source: examples.plain,
          }),

          example({
            title: 'Selected Item',
            text: 'An example that demonstrates a selected item',
            source: examples.selected,
          }),

          example({
            title: 'Disabled Item',
            text: 'An example that demonstrates a disabled item',
            source: examples.disabled,
          }),

          example({
            title: 'Drillable Item',
            text:
              'An example that demonstrates an icon for drilling in when hovering the item',
            source: examples.drillable,
          }),

          example({
            title: 'Drillable Item with always shown Chevron',
            text:
              'An example that demonstrates an icon for drilling even without hovering',
            source: examples.drillableAndAlwaysShowChevron,
          }),

          example({
            title: 'Item with Multiple Lines',
            text: 'An example that demonstrates an item with multiple lines',
            source: examples.multipleLines,
          }),

          example({
            title: 'Item with Prefix',
            text:
              'An example that demonstrates an item with provided prefix element',
            source: examples.prefix,
          }),

          example({
            title: 'Item with Suffix (Counter Badge)',
            text:
              'An example that demonstrates an item with a `<CounterBadge />` used as a suffix element',
            source: examples.counterBadgeSuffix,
          }),

          example({
            title: 'Item with Suffix (Badge)',
            text:
              'An example that demonstrates an item with a `<Badge />` used as a suffix element',
            source: examples.badgeSuffix,
          }),

          example({
            title: 'Light Skin',
            text:
              'This example uses the `<Sidebar/>` to demonstrate the "light" skin design. Notice that when `<SidebarSectionItem/>` is contained inside `<Sidebar/>`, it affected by the `skin` prop accordingly',
            source: examples.lightSkin,
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
