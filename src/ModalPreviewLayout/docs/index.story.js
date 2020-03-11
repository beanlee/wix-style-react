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

import LinkTo from '@storybook/addon-links/react';
import Box from 'wix-style-react/Box';

import ModalPreviewLayout from '..';
import { storySettings } from '../test/storySettings';
import { ModalWrapperExample } from './examples/ModalWrapper';
import SimpleExample from '!raw-loader!./examples/Simple';
import FullWidthContentExample from '!raw-loader!./examples/FullWidthContent';
import ScrollableContentExample from '!raw-loader!./examples/ScrollableContent';
import MultipleContentExample from '!raw-loader!./examples/MultipleContent';
import allComponents from '../../../stories/utils/allComponents';
import { Category } from '../../../stories/storiesHierarchy';

const example = config => baseExample({ components: allComponents, ...config });

const childrenNodesExamples = [
  {
    label: 'Single child node',
    value: (
      <Box
        width="90vw"
        height="100%"
        align="center"
        verticalAlign="middle"
        backgroundColor="D80"
        children="This is the content!"
      />
    ),
  },
  {
    label: 'Multiple child nodes',
    value: ['first', 'second', 'third'].map(ordinalNum => (
      <Box
        width="90vw"
        height="100%"
        align="center"
        verticalAlign="middle"
        backgroundColor="D80"
        children={`This is the ${ordinalNum} content page`}
      />
    )),
  },
];

export default {
  category: storySettings.category,
  storyName: 'ModalPreviewLayout',

  component: ModalPreviewLayout,
  componentPath: '..',
  componentWrapper: ({ component }) => (
    <ModalWrapperExample>
      {({ onClose }) => React.cloneElement(component, { onClose })}
    </ModalWrapperExample>
  ),
  componentProps: {
    title: 'Basic Website Design',
    children: childrenNodesExamples[0].value,
    shouldCloseOnOverlayClick: true,
    onClose: () => null,
  },

  exampleProps: {
    children: childrenNodesExamples,
  },

  sections: [
    header(),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text: [
                'Use this component together with ',
                <LinkTo
                  kind={Category.COMPONENTS}
                  story="Modal"
                >{`<Modal />`}</LinkTo>,
                ' to display content in preview mode. In the header strip you may place a title and/or a button strip with actions relevant to the displayed content.',
              ],
            }),
          ]),

          importExample(
            "import { ModalPreviewLayout } from 'wix-style-react';",
          ),

          divider(),

          title('Examples'),

          example({
            title: 'Plain Example',
            text:
              'A simple example for preview layout modal with title, actions and inner content',
            source: SimpleExample,
          }),

          example({
            title: 'Example with Full-Width Content',
            text:
              'An example for preview layout modal with title, actions and content that takes the full width',
            source: FullWidthContentExample,
          }),

          example({
            title: 'Example with Scrollable Content',
            text:
              'An example for preview layout modal with title, actions and content that overflows the height',
            source: ScrollableContentExample,
          }),

          example({
            title: 'Example with Multiple Content',
            text:
              'An example for preview layout modal with title, actions and multiple content',
            source: MultipleContentExample,
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
