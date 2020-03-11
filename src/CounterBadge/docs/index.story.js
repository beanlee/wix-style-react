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
import Star from 'wix-ui-icons-common/Star';
import * as examples from './examples';

import CounterBadge from '..';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'CounterBadge',

  component: CounterBadge,
  componentPath: '..',

  componentProps: {
    children: 1,
    skin: 'general',
  },

  exampleProps: {
    children: [
      { label: 'number', value: 1 },
      { label: 'string', value: 'New!' },
      { label: 'node', value: <Star /> },
    ],
  },

  sections: [
    header({
      component: <CounterBadge>1</CounterBadge>,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              '`CounterBadge` gives you a quick preview to indicate more action is required.',
          }),

          importExample("import { CounterBadge } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Number counter',
            text:
              'The most common use of CounterBadge is with a number value truncated to 99.',
            source: examples.numbers,
          }),

          example({
            title: 'Skins',
            text:
              'Background color can be one of the following: `general`, `danger`, `urgent`, `standard`, `warning` and `success`.',
            source: examples.skins,
          }),

          example({
            title: 'Custom node',
            text: 'CounterBadge can display a custom node, like an icon.',
            source: examples.custom,
          }),

          example({
            title: 'Advanced',
            text: 'An example for a CounterBadge counting items in cart.',
            source: examples.advanced,
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
