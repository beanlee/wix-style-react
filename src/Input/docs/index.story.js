import React from 'react';
import { storySettings } from './storySettings';
import {
  header,
  divider,
  tabs,
  tab,
  code as baseCode,
  title,
  importExample,
  api,
  testkit,
  playground,
} from 'wix-storybook-utils/Sections';
import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';

import Input from '..';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: Input,
  componentPath: '../Input.js',

  componentProps: {
    theme: 'normal',
    status: undefined,
  },

  exampleProps: {
    status: [
      {
        label: 'Valid',
        value: undefined,
      },
      {
        label: 'Loading',
        value: Input.StatusLoading,
      },
      {
        label: 'Warning',
        value: Input.StatusWarning,
      },
      {
        label: 'Error',
        value: Input.StatusError,
      },
    ],
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl: 'https://github.com/wix/wix-style-react/tree/master/src/Input',
      component: (
        <div style={{ width: '50%' }}>
          <Input />
        </div>
      ),
    }),

    tabs([
      tab({
        title: 'Usage',
        sections: [
          importExample("import { Input } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          ...[
            { title: 'Standard States', source: examples.standard },
            { title: 'Read Only', source: examples.readOnly },
            { title: 'Error', source: examples.error },
            { title: 'Warning', source: examples.warning },
            { title: 'Loader', source: examples.loader },
            { title: 'Affix', source: examples.affix },
            {
              title: 'Icon Affix',
              description:
                "When using icons you should match icon's size to input's` size. For normal sized input use normal icons. For small/large inputs use icons which ends with the proper prefix of Small/Large.",
              source: examples.iconAffix,
            },
            { title: 'Sizes', source: examples.sizes },
            { title: 'Rounded', source: examples.rounded },
          ].map(code),
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
