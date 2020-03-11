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
  example as baseExample,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import { SIZES, SKINS } from '../constants';

import ControlledToggleSwitch from '!raw-loader!./ControlledToggleSwitch';
import * as examples from './examples';

import ToggleSwitch from '..';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: ToggleSwitch,
  componentPath: '..',

  componentProps: (setState, getState) => ({
    checked: false,
    onChange: () => setState({ checked: !getState().checked }),
  }),

  exampleProps: {
    size: Object.keys(SIZES),
    skin: Object.keys(SKINS),

    onChange: () => 'changed',
  },

  sections: [
    header({
      component: <ToggleSwitch onChange={() => 'changed'} />,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'Toggle Switch changes the state of a single setting on or off.',
            }),
          ]),

          importExample("import { ToggleSwitch } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Size',
            text: `ToggleSwitch has 3 sizes: \`${SIZES.small}\`,\`${SIZES.medium}\` and \`${SIZES.large}\` (default).`,
            source: examples.sizes,
          }),

          example({
            title: 'Skins',
            text: `ToggleSwitch has 3 skins: \`${SKINS.standard}\` (default),\`${SIZES.success}\` and \`${SKINS.error}\`.`,
            source: examples.skins,
          }),

          example({
            title: 'Controlled Toggle Switch',
            text: 'An example of a controlled Toggle Switch',
            source: ControlledToggleSwitch,
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
