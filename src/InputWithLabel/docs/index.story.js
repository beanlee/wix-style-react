import React from 'react';
import InfoCircle from 'wix-ui-icons-common/InfoCircle';
import Hidden from 'wix-ui-icons-common/Hidden';
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

import Input from '../../Input';
import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';
import InputWithLabel from '..';
import * as examples from './examples';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'InputWithLabel',

  component: InputWithLabel,
  componentPath: '..',

  componentProps: {
    label: 'Full Name',
    value: 'John Doe',
    statusMessage: '',
    status: undefined,
  },

  exampleProps: {
    suffix: [
      {
        label: 'No icon',
        value: [],
      },
      {
        label: 'One icon',
        value: [<InfoCircle style={{ color: 'rgb(56, 153, 236)' }} />],
      },
      {
        label: 'Two icons',
        value: [
          <Hidden style={{ color: 'rgb(56, 153, 236)' }} />,
          <InfoCircle style={{ color: 'rgb(56, 153, 236)' }} />,
        ],
      },
    ],
    status: [
      {
        label: 'Valid',
        value: undefined,
      },
      {
        label: 'Error',
        value: Input.StatusError,
      },
    ],
  },

  sections: [
    header({
      component: <InputWithLabel label="Full Name" />,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'A wrapper for `<Input>` which adds a label with transition to top when typing',
            }),
          ]),

          importExample("import { InputWithLabel } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Suffix',
            text: 'This input supports up to 2 suffix icons',
            source: examples.suffix,
          }),

          example({
            title: 'Error state',
            text:
              'The error state of this input is slightly different then of <code>&lt;Input/&gt;</code>',
            source: examples.error,
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
