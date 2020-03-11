import { Category } from '../../../stories/storiesHierarchy';

import Loader from '..';
import {
  api,
  example as baseExample,
  columns,
  description,
  divider,
  header,
  importExample,
  playground,
  tab,
  tabs,
  testkit,
  title,
} from 'wix-storybook-utils/dist/src/Sections';
import allComponents from '../../../stories/utils/allComponents';
import React from 'react';
import * as examples from './examples';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: Category.COMPONENTS,
  storyName: 'Loader',

  component: Loader,
  componentPath: '..',

  componentProps: {
    dataHook: 'storybook-loader',
    status: 'loading',
    statusMessage: 'some message here',
    text: '',
  },

  sections: [
    header({
      component: (
        <div style={{ width: '50%' }}>
          <Loader />
        </div>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(`Provides a spinner to be used for async operations.`),

          importExample("import { Loader } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({ title: 'Size', source: examples.sizes }),
          example({ title: 'Status', source: examples.status }),
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
