import { storySettings } from './storySettings';
import {
  tab,
  code as baseCode,
  importExample,
  api,
  testkit,
  playground,
} from 'wix-storybook-utils/Sections';
import allComponents from '../../../stories/utils/allComponents';
import * as examples from './examples';

import NumberInput from 'wix-style-react/NumberInput';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: NumberInput,
  componentPath: '../NumberInput.js',

  componentProps: {
    step: 1,
    min: -5,
    max: 5,
  },

  sections: [
    tab({
      title: 'Usage',
      sections: [
        importExample("import { NumberInput } from 'wix-style-react';"),
        code({ title: 'Standard', source: examples.standard }),
        code({ title: 'Error', source: examples.error }),
        code({ title: 'Affix', source: examples.affix }),
        code({ title: 'Icon Affix', source: examples.iconAffix }),
        code({ title: 'Sizes', source: examples.sizes }),
        code({ title: 'Rounded', source: examples.rounded }),
        code({ title: 'Strict', source: examples.strict }),
        code({
          title: 'Controlled',
          source: examples.controlled,
          autoRender: false,
        }),
      ],
    }),

    ...[
      { title: 'API', sections: [api()] },
      { title: 'TestKit', sections: [testkit()] },
      { title: 'Playground', sections: [playground()] },
    ].map(tab),
  ],
};
