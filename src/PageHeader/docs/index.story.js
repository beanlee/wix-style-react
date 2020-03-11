import React from 'react';

import PageHeader from '..';
import Button from 'wix-style-react/Button';

import Breadcrumbs from '../../Page/docs/Breadcrumbs';
import './PageHeader.scss';
import { storySettings } from './storySettings';
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
import * as examples from './examples';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: PageHeader,
  componentPath: '../PageHeader.js',

  componentProps: {
    onBackClicked: () => {},
    title: 'Page Header',
    dataHook: 'story-page-header',
  },

  exampleProps: {
    breadcrumbs: [{ label: 'Breadcrumbs', value: Breadcrumbs }],
    actionsBar: [
      { label: 'Button', value: <Button>Action</Button> },
      {
        label: 'Two buttons',
        value: (
          <div>
            <Button>Button #1</Button>
            <Button>Button #2</Button>
          </div>
        ),
      },
    ],
  },

  sections: [
    header(),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            `A header that sticks at the top of the container which minimizes on scroll.`,
          ),

          importExample("import { PageHeader } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({ title: 'Breadcrumbs', source: examples.breadcrumbs }),
          example({ title: 'Actionbar', source: examples.actionBar }),
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
