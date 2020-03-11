import React from 'react';
import Checkbox from '..';
import { Languages } from 'wix-ui-icons-common';

import { storySettings } from './storySettings';
import {
  api,
  description,
  divider,
  header,
  importExample,
  playground,
  tab,
  tabs,
  testkit,
  title,
  code as baseCode,
} from 'wix-storybook-utils/dist/src/Sections';
import * as examples from './examples';
import allComponents from '../../../stories/utils/allComponents';

const code = config =>
  baseCode({
    components: allComponents,
    ...config,
  });

const labelExamples = [
  { label: 'Simple string', value: 'Hello World!' },
  {
    label: 'Component',
    value: (
      <span key={0}>
        Hello <strong>World!</strong>
      </span>
    ),
  },
  {
    label: 'Component with icon',
    value: (
      <span key={1}>
        Hello <Languages />
      </span>
    ),
  },
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Checkbox,
  componentPath: '..',

  componentProps: setState => ({
    children: labelExamples[0].value,
    onChange: ({ target: { checked } }) => setState({ checked }),
    errorMessage: '',
    hasError: false,
    dataHook: 'storybook-checkbox',
  }),

  exampleProps: {
    children: labelExamples,
    onChange: ({ target: { checked } }) => (checked ? 'Checked' : 'Unchecked'),
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Checkbox',
      component: <Checkbox>Hello World!</Checkbox>,
    }),

    tabs([
      tab({
        title: 'Usage',
        sections: [
          importExample("import { Checkbox } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          code({
            title: 'Simple generic use',
            source: examples.simple,
          }),

          code({
            title: 'With Error',
            source: examples.error,
          }),

          description({
            title: 'Using selectionArea',
            text:
              'A selection area makes is easier to select the checkbox, with a background  as an indicator to the click area',
          }),

          code({
            source: examples.selectionArea,
          }),
        ],
      }),
      ...[
        { title: 'API', sections: [api()] },
        { title: 'TestKit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
