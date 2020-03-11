import React from 'react';
import Label from '..';

import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  code as baseCode,
  divider,
  api,
  testkit,
  playground,
} from 'wix-storybook-utils/Sections';

import allComponents from '../../../stories/utils/allComponents';
import { storySettings } from '../test/storySettings';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: Label,
  componentPath: '..',

  componentProps: {
    children: 'Some label',
    size: 'medium',
    dataHook: 'storybook-label',
  },

  exampleProps: {
    size: ['small', 'medium'],
  },

  sections: [
    header({
      component: <Label>Label Component</Label>,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description('General all purpose label component with Wix styling.'),

          code({
            description: 'Make sure you have Wix fonts loaded from CDN',
            source: `<link rel="stylesheet" href="//static.parastorage.com/services/third-party/fonts/Helvetica/fontFace.css">`,
            interactive: false,
          }),

          importExample("import { Label } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          code({
            source: `<Label size="medium">Hello World</Label>`,
          }),
        ],
      }),

      ...[
        { title: 'Testkit', sections: [testkit()] },
        { title: 'API', sections: [api()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
