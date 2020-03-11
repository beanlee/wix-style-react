import { storySettings } from './storySettings';
import icons from '../../../stories/utils/icons-for-story';
import {
  tab,
  api,
  testkit,
  code as baseCode,
  description,
  playground,
  importExample,
} from 'wix-storybook-utils/Sections';

import allComponents from '../../../stories/utils/allComponents';
import FloatingNotification from '..';
import { TYPES } from '../constants';
import * as examples from './examples';

const code = config => baseCode({ components: allComponents, ...config });

const trashLabel = { label: 'Trash' };
const linkProps = {
  as: 'a',
  href: 'https://www.wix.com',
  label: 'Wix.com',
};
const textButtonPropsExamples = [
  { label: 'Standard', value: trashLabel },
  { label: 'Link', value: linkProps },
];

const undoLabel = { label: 'Undo' };
const buttonPropsExamples = [
  { label: 'Stndard', value: undoLabel },
  { label: 'Link', value: linkProps },
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: FloatingNotification,
  componentPath: '..',

  componentProps: {
    dataHook: storySettings.dataHook,
    type: TYPES.standard,
    text: 'Some content text',
    showCloseButton: true,
    textButtonProps: textButtonPropsExamples[0].value,
    buttonProps: buttonPropsExamples[0].value,
    prefixIcon: null,
  },

  exampleProps: {
    prefixIcon: icons,
    type: Object.values(TYPES),
    textButtonProps: textButtonPropsExamples,
    buttonProps: buttonPropsExamples,
  },

  sections: [
    tab({
      title: 'Description',
      sections: [
        description(
          'Displays simple and temporary messages or destructive events',
        ),

        importExample({
          source: "import { FloatingNotification } from 'wix-style-react';",
        }),

        code({
          title: `Notification types`,
          source: examples.types,
        }),

        code({
          title: `All options`,
          source: examples.options,
        }),

        code({
          title: `Set buttons as anchors with href`,
          source: examples.href,
        }),

        code({
          title: `Defining the width`,
          source: examples.fullWidth,
        }),
      ],
    }),

    ...[
      { title: 'Playground', sections: [playground()] },
      { title: 'API', sections: [api()] },
      { title: 'Testkit', sections: [testkit()] },
    ].map(tab),
  ],
};
