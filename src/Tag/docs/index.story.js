import React from 'react';

import Tag from '..';
import { createAutoExampleWrapper } from '../../../stories/utils/AutoExampleWrapper';
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

const GREEN_THUMB = (
  <div
    style={{
      height: '100%',
      width: '100%',
      backgroundColor: 'green',
    }}
  />
);

const TagWrapper = ({ story__withThumb, ...rest }) =>
  story__withThumb ? <Tag thumb={GREEN_THUMB} {...rest} /> : <Tag {...rest} />;
TagWrapper.propTypes = Tag.propTypes;
TagWrapper.displayName = Tag.displayName;

import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: createAutoExampleWrapper(TagWrapper),
  componentPath: '..',
  componentProps: {
    children: 'Hello World',
    dataHook: storySettings.dataHook,
  },
  exampleProps: {
    onRemove: id => `ID: ${id} Removed!`,
    onClick: id => `ID: ${id} Clicked!`,
    thumb: [
      {
        label: 'green circle',
        value: GREEN_THUMB,
      },
    ],
  },
  sections: [
    header({
      component: <Tag id="tag">Hello World</Tag>,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(`A Tag component.`),

          importExample("import { Tag } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({ title: 'Size', source: examples.sizes }),
          example({ title: 'Status', source: examples.themes }),
          example({ title: 'Thumb', source: examples.thumbs }),
          example({ title: 'Removable', source: examples.removable }),
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
