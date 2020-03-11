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
  api,
  testkit,
  playground,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';
import Stepper from '..';
import { Type, StepType, FitMode } from '../constants';
import responsiveExample from '!raw-loader!./examples/responsive';
import stepTypesExample from '!raw-loader!./examples/stepTypes';
import fitModesExample from '!raw-loader!./examples/fitModes';
import stepperTypeExample from '!raw-loader!./examples/stepperTypes';
import cardExample from '!raw-loader!./examples/card';
import composerHeaderExample from '!raw-loader!./examples/composerHeader';

const code = config => baseCode({ components: allComponents, ...config });

const steps = [
  { text: 'First step', type: StepType.Completed },
  { text: 'Second step' },
  { text: 'Third step', type: StepType.Disabled },
];

export default {
  category: storySettings.category,
  storyName: 'Stepper',

  component: Stepper,
  componentPath: '..',

  componentProps: setState => ({
    dataHook: storySettings.dataHook,
    steps,
    type: Type.Circle,
    fit: FitMode.Compact,
    activeStep: 1,
    onClick: activeStep => setState({ activeStep }),
  }),

  exampleProps: {
    steps: [{ label: '3 steps', value: steps }],
    onClick: stepIndex => undefined, // eslint-disable-line
  },

  sections: [
    header({
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Stepper/',
      component: <Stepper steps={steps} activeStep={1} />,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'Stepper displays the path a user needs to follow to complete the process. It breaks a large number of information into steps and indicates which step is active. It works best when split up to 7 steps.',
            }),
          ]),

          importExample("import { Stepper } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          code({
            title: 'Step types',
            description:
              'Steps can have different types: completed, normal, error and disabled.',
            compact: true,
            source: stepTypesExample,
          }),

          code({
            title: 'Stepper types',
            description:
              'Using `type` prop stepper can appear in `circle` style or plain `text`. Text type is good for neutral and compact layouts.',
            compact: true,
            source: stepperTypeExample,
          }),

          code({
            title: 'Fit modes',
            description:
              'Using `fit` prop stepper can appear in `normal` or `stretched` fit mode. With `stretched` fit the component will grow and fill parent container width.',
            compact: true,
            source: fitModesExample,
          }),

          code({
            title: 'Responsive',
            description:
              "When there is not enough space the active step's text is fully displayed and the rest of the steps are equally shortened.",
            compact: true,
            source: responsiveExample,
          }),

          divider(),

          title('Use Cases'),

          code({
            title: 'Inside a Card',
            description:
              'Stepper is used in a Card header to indicate the path a user needs to follow to complete the process.',
            compact: true,
            source: cardExample,
          }),

          code({
            title: 'Inside a ComposerHeader',
            description:
              'Stepper inside a ComposerHeader can appear in start or center positions and must use type `text`.',
            compact: true,
            source: composerHeaderExample,
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
