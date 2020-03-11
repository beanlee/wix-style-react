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

import MessageModalLayout from '..';
import Checkbox from '../../Checkbox';

import BasicExample from '!raw-loader!./examples/BasicExample';
import FootnoteExample from '!raw-loader!./examples/FootnoteExample';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: MessageModalLayout,
  componentPath: '..',

  componentProps: {
    title: 'Modal title',
    children: 'Lorem ipsum',
    primaryButtonText: 'Confirm',
    secondaryButtonText: 'Cancel',
    sideActions: <Checkbox>Check</Checkbox>,
    footnote: 'footnote text',
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/MessageModalLayout/',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'Use this component inside a <Modal /> to display content in the MessageModalLayout. You may place a title and/or a footer with actions relevant to the displayed content',
            }),
          ]),

          columns([
            importExample(
              "import { MessageModalLayout } from 'wix-style-react';",
            ),
          ]),

          divider(),

          title('Examples'),

          columns([
            description({
              title: 'Simple Usage',
              text: 'A simple example with compact preview',
            }),

            code({
              compact: true,
              source: BasicExample,
            }),
          ]),

          code({
            title: 'Illustration Example',
            description: 'A simple example with illustration',
            compact: true,
            source: FootnoteExample,
          }),

          code({
            title: 'Footnote Example',
            description: 'A non compact version of same code example as above',
            compact: true,
            source: FootnoteExample,
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
