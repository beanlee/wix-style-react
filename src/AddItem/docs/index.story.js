import React from 'react';

import AddItem from '..';

import {
  header,
  tabs,
  tab,
  description,
  playground,
  api,
  testkit,
  importExample,
  divider,
  example as baseExample,
  title,
} from 'wix-storybook-utils/Sections';
import * as examples from './examples';

import { Layout } from '../../Layout';
import allComponents from '../../../stories/utils/allComponents';

import { storySettings } from './storySettings';

import themes from './themes.md';
import sizes from './sizes.md';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: AddItem,
  componentPath: '..',
  componentProps: {
    children: 'Add Item',
    theme: 'dashes',
    alignItems: 'center',
    dataHook: storySettings.dataHook,
    tooltipProps: { content: 'tooltip content' },
  },

  exampleProps: {
    children: '',
  },

  sections: [
    header({
      component: (
        <Layout gap={0} cols={6}>
          <div style={{ height: '100px' }}>
            <AddItem size="small">Add Item</AddItem>
          </div>
        </Layout>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            'Add Item is a component used to add new items to an existing items list.',
          ),

          importExample("import { AddItem } from 'wix-style-react';"),

          divider(),

          description({
            title: 'Usage',
            text:
              'AddItem accepts its string based content through `children` prop.',
          }),

          divider(),

          title('Examples'),

          example({
            title: 'Plain Example',
            text: 'AddItem plain usage.',
            source: examples.plain,
          }),

          example({
            title: 'Themes',
            text: themes,
            source: examples.themes,
          }),

          example({
            title: 'Theme `plain` Alignment',
            text:
              'Different from the rest of the themes, `plain` theme can be aligned to left, right or center in order to maintain visual consistency with the card content.',
            source: examples.alignItems,
          }),

          example({
            title: 'Sizes',
            text: sizes,
            source: examples.sizes,
          }),

          example({
            title: 'Content',
            text:
              'For sizes `large`, `medium`, `small` users can choose whether to display the textual content or not, but `tiny` size should always be displayed with the textual content.',
            source: examples.content,
          }),

          example({
            title: 'States',
            text: 'AddItem can be disabled.',
            source: examples.states,
          }),

          example({
            title: 'Show Icon',
            text: 'When set to false, icon is removed.',
            source: examples.showIcon,
          }),

          example({
            title: 'Remove Padding',
            text: 'When set to true, padding is removed',
            source: examples.removePadding,
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
