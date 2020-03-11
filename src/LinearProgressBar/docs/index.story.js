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

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import LinearProgressBar from '..';

import * as examples from './examples';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'LinearProgressBar',

  component: LinearProgressBar,
  componentPath: '..',

  componentProps: {
    errorMessage: 'some error message',
    value: 20,
    light: false,
    error: false,
    showProgressIndication: false,
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/LinearProgressBar/',
      component: (
        <div style={{ width: '50%' }}>
          <LinearProgressBar value={45} showProgressIndication />
        </div>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text: 'Component for indicating a progress along a process.',
            }),
          ]),

          columns([
            importExample(
              "import { LinearProgressBar } from 'wix-style-react';",
            ),
          ]),

          divider(),

          title('Examples'),

          code({
            title: 'Progress Indication',
            description: 'Displaying a progress indicator in percentage.',
            source: examples.progressIndication,
          }),

          code({
            title: 'Skins',
            description:
              'LinearProgressBar has 2 skins: `"standard"` (default) and `"success"`.',
            source: examples.skins,
          }),

          code({
            title: 'Themes',
            description: 'Appear in all different themes.',
            source: examples.themes,
          }),

          code({
            title: 'Error',
            description: 'Error state',
            source: examples.errors,
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
