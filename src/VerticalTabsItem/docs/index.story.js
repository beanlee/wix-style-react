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
  code as baseCode,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import VerticalTabsItem from '..';
import { storySettings } from './storySettings';
import icons from '../../../stories/utils/icons-for-story';
import allComponents from '../../../stories/utils/allComponents';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: VerticalTabsItem,
  componentPath: '..',

  componentProps: {
    children: 'Playground',
    type: 'tab',
  },

  exampleProps: {
    prefixIcon: icons,
    suffixIcon: icons,
  },

  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/VerticalTabsItem/',
      component: <VerticalTabsItem>VerticalTabsItem</VerticalTabsItem>,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'VerticalTabsItem is internal component which is used to build VerticalTabs tabs. Usually this item should not be used by consumers, though custom options are exposed for usage.',
            }),
          ]),

          columns([
            importExample(
              "import { VerticalTabsItem } from 'wix-style-react';",
            ),
          ]),

          divider(),

          title('Examples'),

          columns([
            description({
              title: 'Vertical Tab Simple Usage',
              text: 'A simple example with compact preview',
            }),

            code({
              compact: true,
              source: '<VerticalTabsItem>Vertical Tab</VerticalTabsItem>',
            }),
          ]),
          columns([
            description({
              title: 'Vertical Tab Action',
              text: 'Vertical tab item action',
            }),

            code({
              compact: true,
              source:
                '<VerticalTabsItem type="action">Action</VerticalTabsItem>',
            }),
          ]),
          columns([
            description({
              title: 'Vertical Tab Title',
              text: 'Vertical tab item title',
            }),
            code({
              compact: true,
              source: '<VerticalTabsItem type="title">Title</VerticalTabsItem>',
            }),
          ]),
          columns([
            description({
              title: 'Vertical Tab With Prefix',
              text: 'Vertical tab item with prefix icon',
            }),

            code({
              compact: true,
              source:
                '<VerticalTabsItem prefixIcon={<Icons.ConfirmSmall />}>Current Item</VerticalTabsItem>',
            }),
          ]),
          columns([
            description({
              title: 'Vertical Tab With Suffix',
              text: 'Vertical tab item with suffix icon',
            }),

            code({
              compact: true,
              source:
                '<VerticalTabsItem suffixIcon={<Icons.ChevronRight />}>More Options</VerticalTabsItem>',
            }),
          ]),
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
