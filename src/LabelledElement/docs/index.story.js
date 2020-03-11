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
import ControlledExample from '!raw-loader!./ControlledExample';

import Input from '../../Input';
import LabelledElement from '..';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'LabelledElement',

  component: LabelledElement,
  componentPath: '..',

  componentProps: {
    label: 'First Name',
    value: undefined,
    children: <Input size="large" />,
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/LabelledElement/',
      component: (
        <LabelledElement label="First Name">
          <Input size="large" />
        </LabelledElement>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'A wrapper for `<input>` elements which renders the `<label>` inside the `<input>`',
            }),
          ]),

          columns([
            importExample("import { LabelledElement } from 'wix-style-react';"),
          ]),

          divider(),

          title('Examples'),

          columns([
            description({
              title: 'Uncontrolled input',
              text:
                'For uncontrolled `Input` components (value prop is not set explictly) the label is managed automatically',
            }),

            code({
              compact: true,
              source: `
                <LabelledElement label="First Name">
                  <Input size="large" />
                </LabelledElement>
              `,
            }),
          ]),

          columns([
            description({
              title: 'Controlled input',
              text:
                'For controlled `Input` components (value prop is set explictly) the value prop must be passed to `LabelledElement` as well',
            }),

            code({
              compact: true,
              source: ControlledExample,
            }),
          ]),
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
