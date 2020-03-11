import React from 'react';
import {
  header,
  tabs,
  tab,
  description,
  importExample,
  example as baseExample,
  title,
  divider,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import * as examples from './examples';

import SocialButton from '..';
import { icons } from '../constants';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'SocialButton',

  component: SocialButton,
  componentPath: '..',

  componentProps: {
    text: 'Share',
    icon: 'facebook',
  },

  exampleProps: {
    icon: icons,
  },

  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/SocialButton/',
      component: <SocialButton text="Share on Facebook" icon="facebook" />,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text: 'Button with defined social button colors and icons.',
          }),

          importExample("import { SocialButton } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Simple Example',
            text: 'Simple usage.',
            source: examples.simple,
          }),
          example({
            title: 'Text Example',
            text: 'Can be enable or without.',
            source: examples.text,
          }),
          example({
            title: 'Social Icons',
            text:
              'Component supports: Facebook, Twitter, LinkedIn, Instagram, Pinterest, Youtube.',
            source: examples.icons,
          }),
          example({
            title: 'States',
            text: 'Component supports state: disabled.',
            source: examples.disabled,
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
