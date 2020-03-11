import SectionHelper from '..';
import { storySettings } from './storySettings';
import {
  api,
  example as baseExample,
  columns,
  description,
  divider,
  header,
  importExample,
  playground,
  tab,
  tabs,
  testkit,
  title,
} from 'wix-storybook-utils/dist/src/Sections';
import * as examples from './examples';
import React from 'react';
import allComponents from '../../../stories/utils/allComponents';

const example = config => baseExample({ components: allComponents, ...config });

const titleExamples = [
  { label: 'short text', value: 'Look at this important message!' },

  {
    label: 'long text',
    value:
      'Look at this really long and important message that could in some cases contain many lengthy words like psychophysicotherapeutics!',
  },
];

const childrenExamples = [
  {
    label: 'short text',
    value: 'This is a very important message',
  },
  {
    label: 'long text',
    value:
      'This is the content of very important message which actually has a lot of detailed explanation about various things. It may even have multiple sentences but they do not need to be those boring "Lorem Ipsum"',
  },
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: SectionHelper,
  componentPath: '..',

  componentProps: {
    dataHook: 'storybook-sectionhelper',
    actionText: 'I understand the consequences',
    appearance: 'standard',
    title: titleExamples[0].value,
    children: childrenExamples[0].value,
    showCloseButton: true,
    fullWidth: false,
  },

  exampleProps: {
    title: titleExamples,
    children: childrenExamples,

    onAction: () => 'onAction',
    onClose: () => 'onClose',
  },

  sections: [
    header({
      component: <div style={{ width: '50%' }}></div>,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            `Used in pages where you need to explain or mention things about the content or actions.`,
          ),

          importExample("import { SectionHelper } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({ title: 'Appearance', source: examples.appearance }),
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
