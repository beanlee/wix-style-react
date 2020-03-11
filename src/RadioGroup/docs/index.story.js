import React from 'react';
import RadioGroup from '..';
import { createAutoExampleWrapper } from '../../../stories/utils/AutoExampleWrapper';
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

import { storySettings } from './storySettings';

const exampleChildren = [
  {
    label: 'One line',
    value: [1, 2, 3, 4].map(n => (
      <RadioGroup.Radio key={n} value={n} children={`Option ${n}`} />
    )),
  },
  {
    label: '2 lines',
    value: [
      <RadioGroup.Radio key={0} value={1}>
        <div>Option 1</div>
        <small>best option</small>
      </RadioGroup.Radio>,
      <RadioGroup.Radio key={1} value={2}>
        <div>Option 2</div>
        <small>Also pretty good option</small>
      </RadioGroup.Radio>,
    ],
  },
];

const exampleOptions = [
  {
    label: 'All enabled',
    value: [],
  },
  {
    label: 'with disabled options',
    value: [1, 2],
  },
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: createAutoExampleWrapper(RadioGroup),
  componentPath: '..',

  componentProps: setState => ({
    value: 1,
    hasError: false,
    children: exampleChildren[0].value,
    onChange: value => setState({ value }),
    dataHook: storySettings.dataHook,
  }),

  exampleProps: {
    disabledRadios: exampleOptions,
    children: exampleChildren,
    onChange: value => value,
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/RadioGroup',
      component: (
        <RadioGroup value={1}>
          <RadioGroup.Radio value={1}>Option 1</RadioGroup.Radio>
          <RadioGroup.Radio value={2}>Option 2</RadioGroup.Radio>
        </RadioGroup>
      ),
    }),

    tabs([
      tab({
        title: 'Usage',
        sections: [
          importExample("import { RadioGroup } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          code({
            title: 'Simple generic use',
            source: examples.simple,
          }),

          code({
            title: 'Disabled option',
            source: examples.disabledRadios,
          }),

          description({
            title: 'Using selectionArea',
            text:
              'A selection area makes is easier to select a radio option, with a background  as an indicator to the click area',
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
