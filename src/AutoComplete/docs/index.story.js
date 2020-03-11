import React from 'react';
import {
  header,
  description,
  columns,
  importExample,
  title,
  code,
  tab,
  api,
  testkit,
  playground,
  tabs,
  divider,
} from 'wix-storybook-utils/Sections';
import AutoComplete from '..';
import { Layout, Cell } from '../../Layout';
import { storySettings } from './storySettings';
import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';

const liveCode = config =>
  code({
    previewProps: {
      style: { backgroundColor: '#f0f4f7' },
    },
    components: allComponents,
    ...config,
  });

const example = props => liveCode(props);

const options = [
  { id: 0, value: 'Option 1' },
  { id: 1, value: 'Option 2' },
  { id: 2, value: 'Option 3' },
  { id: 3, value: 'Option 4' },
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: AutoComplete,
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
            <AutoComplete
              placeholder="Select dominant hand"
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

          importExample("import { AutoComplete } from 'wix-style-react'"),

          divider(),

          title('Examples'),

          ...[
            {
              title: 'Controlled example',
              subtitle: 'Component usage in controlled mode.',
              source: examples.simple,
            },
            {
              title: 'Available states',
              subtitle: 'Component supports disabled and error states.',
              source: examples.states,
            },
            {
              title: 'Handling overflow',
              subtitle: `Some times we want autocomplete to be detached from nearest overflow container. For this we can use popovers feature to set the overflow target to certain element in the DOM. By passing appendTo="window" we say that dropdowns overflow boundary is document.body itself.`,
              source: examples.overflow,
            },
          ].map(example),
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
