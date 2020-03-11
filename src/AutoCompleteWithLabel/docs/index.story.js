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
  code,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import AutoCompleteWithLabel from '..';

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
  storyName: 'AutoCompleteWithLabel',

  component: AutoCompleteWithLabel,
  componentPath: '..',

  componentProps: {
    value: '',
    label: 'my label',
  },

  exampleProps: {
    options: [{ label: 'options', value: options }],
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/AutoCompleteWithLabel/',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'AutoComplete component that uses the same design as in InputWithLabel with built in label.',
            }),
          ]),

          columns([
            importExample(
              "import { AutoCompleteWithLabel } from 'wix-style-react';",
            ),
          ]),

          divider(),

          title('Examples'),

          ...[
            {
              title: 'Simple example',
              subtitle: 'Component usage.',
              source: examples.simple,
            },
            {
              title: 'Controlled example',
              subtitle: 'Component usage in controlled mode.',
              source: examples.controlled,
            },
            {
              title: 'Native example',
              subtitle: 'Component usage in native mode.',
              source: examples.native,
            },
            {
              title: 'Available states',
              subtitle: 'Component supports disabled and error states.',
              source: examples.states,
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
