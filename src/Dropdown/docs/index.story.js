import React from 'react';
import {
  header,
  description,
  columns,
  importExample,
  title,
  example as baseExample,
  tab,
  api,
  testkit,
  playground,
  tabs,
  divider,
} from 'wix-storybook-utils/Sections';
import Dropdown from '..';
import { Layout, Cell } from '../../Layout';
import { storySettings } from './storySettings';
import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';

const example = config => baseExample({ components: allComponents, ...config });

const options = [
  { id: 0, value: 'Option 1' },
  { id: 1, value: 'Option 2' },
  { id: 2, value: 'Option 3' },
  { id: 3, value: 'Option 4' },
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: Dropdown,
  componentPath: '..',

  componentProps: {
    dataHook: storySettings.dataHook,
    placeholder: 'This is a placeholder',
    options,
  },
  exampleProps: {
    options: [{ label: 'simple', value: options }],
  },

  sections: [
    header({
      component: (
        <Layout gap={10}>
          <Cell span={3}>
            <Dropdown
              placeholder="Select dominant hand"
              popoverProps={{ appendTo: 'window' }}
              options={[
                { id: 0, value: 'Left' },
                { id: 1, value: 'Right' },
                { id: 2, value: 'Ambidextrous' },
              ]}
            />
          </Cell>
        </Layout>
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
                'A Dropdown presents a list of options and allows a user to select one of the options.',
            }),
          ]),

          importExample("import { Dropdown } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Simple',
            text: 'Simple example of usage.',
            source: examples.simple,
          }),

          example({
            title: 'Grouping',
            text: 'Any options list can be grouped to defined categories.',
            source: examples.group,
          }),

          example({
            title: 'Divider',
            text: 'An example where divider is used to split the options.',
            source: examples.divider,
          }),

          example({
            title: 'Sizes',
            text: 'Dropdown supporst three sizes: small, medium and large.',
            source: examples.sizes,
          }),

          example({
            title: 'Input Prefix',
            text: 'An example where input can contain prefix value.',
            source: examples.prefix,
          }),

          example({
            title: 'Input Suffix',
            text: 'An example where input can contain suffix value.',
            source: examples.suffix,
          }),

          example({
            title: 'Footer',
            text:
              'An example where fixed footer is always attached to the bottom of options.',
            source: examples.footer,
          }),

          example({
            title: 'Dropdown states',
            text: 'Two available states: disabled and error.',
            source: examples.states,
          }),

          example({
            title: 'Native support',
            text:
              'For mobile usage the component can switch to native dropdown.',
            source: examples.native,
          }),

          example({
            title: 'Infinite scroll',
            text:
              'An example where loading more options with infinite scroll is presented.',
            source: examples.infinite,
          }),

          example({
            title: 'Handling overflow',
            text: `Some times we want dropdown to be detached from nearest overflow container. For this we can use popovers feature to set the overflow target to certain element in the DOM. By passing appendTo="window" we say that dropdowns overflow boundary is document.body itself.`,
            source: examples.overflow,
          }),

          divider(),

          title('Constraints'),

          example({
            title: 'Width',
            text:
              'By default long options are wrapped and constrained to parent container width. For options that are too long - dropdown list can be detached from parent container width by passing `appendTo="window"` popover prop. Make sure to control the maximum growth of the dropdown list with `maxWidth` popover prop.',
            source: examples.widthConstraints,
          }),

          example({
            title: 'Height',
            text:
              'The maximum allowed height of dropdown list container can be adjusted using `maxHeightPixels` prop.',
            source: examples.heightConstraints,
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
