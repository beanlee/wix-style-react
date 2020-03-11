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
import * as examples from './examples';

import ImageViewer from '..';

const example = config => baseExample({ components: allComponents, ...config });

const exampleImageUrl = [
  { label: 'No Image', value: '' },
  {
    label: 'Image',
    value:
      'https://static.wixstatic.com/media/c78d05b79ede429fb77c9d8ec4443b93.jpg/v1/fit/w_375,h_375/c78d05b79ede429fb77c9d8ec4443b93.jpg',
  },
  {
    label: 'Small Image',
    value:
      'https://static.wixstatic.com/media/7175d1_bc0f6b3c4f43485aa99f0bcceaaea740~mv2.png',
  },
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: ImageViewer,
  componentPath: '..',

  componentProps: {
    dataHook: 'story-image-viewer',
    imageUrl: exampleImageUrl[0].value,
  },

  exampleProps: {
    imageUrl: exampleImageUrl,
    onAddImage: () => 'onAddImage',
    onUpdateImage: () => 'onUpdateImage',
    onRemoveImage: () => 'onRemoveImage',
    tooltipProps: [{ label: 'from left', value: { placement: 'left' } }],
  },

  sections: [
    header({
      component: <ImageViewer />,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                'Image viewer is an container for an image with some functionality like add, update, remove, and status.',
            }),
          ]),

          importExample("import { ImageViewer } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Simple Usage',
            text: 'Some examples with different images.',
            source: examples.standard,
          }),

          example({
            title: 'Status indicator',
            text: `Using a status as an indication for the user. for example: 'error', 'warning' or 'loading'`,
            source: examples.status,
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
