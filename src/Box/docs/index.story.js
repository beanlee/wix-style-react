import React from 'react';
import {
  tab,
  api,
  playground,
  testkit,
  title,
  description,
  importExample,
  code as baseCode,
} from 'wix-storybook-utils/Sections';

import { storySettings } from './storySettings';
import Box from '..';
import propExplanations from './propExplanations';
import ExampleEventItem from '!raw-loader!./examples/ExampleEventItem';
import allComponents from '../../../stories/utils/allComponents';

const childrenExamples = [
  {
    label: 'Text',
    value: <span>Here is a simple text</span>,
  },
  {
    label: 'Multiple direct children',
    value: [
      <Box
        align="center"
        verticalAlign="middle"
        margin={1}
        width={80}
        height={80}
        color="D70"
        backgroundColor="B10"
        borderRadius={3}
        key={1}
      >
        Blue
      </Box>,
      <Box
        align="center"
        verticalAlign="middle"
        margin={1}
        width={80}
        height={80}
        color="D70"
        backgroundColor="R10"
        borderRadius={3}
        key={2}
      >
        Red
      </Box>,
      <Box
        align="center"
        verticalAlign="middle"
        margin={1}
        width={80}
        height={80}
        color="D70"
        backgroundColor="G10"
        borderRadius={3}
        key={3}
      >
        Green
      </Box>,
    ],
  },
];

const code = config =>
  baseCode({ components: allComponents, compact: true, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Box,
  componentPath: '..',

  componentProps: () => ({
    children: childrenExamples[0].value,
    inline: false,
    direction: 'horizontal',
    align: 'center',
    verticalAlign: 'middle',
    padding: 1,
    minHeight: 200,
    color: 'P00',
    backgroundColor: 'B50',
    dataHook: storySettings.dataHook,
  }),

  exampleProps: {
    children: childrenExamples,
  },

  sections: [
    tab({
      title: 'Description',
      sections: [
        description(
          `
📦  Box is a wrapper component that provides a way to align, space, resize and style - easily and straightforwardly.\n
This component behaves exactly like “CSS Flexbox”, therefore any related **valid** CSS property is exposed as \`prop\` (excepts \`flexDirection\`, \`justifyContent\` and \`alignItems\` which are wrapped specifically with appropriate \`props\`).
          `,
        ),

        importExample("import { Box } from 'wix-style-react';"),

        // Children
        description(propExplanations.children.description),
        code({ source: propExplanations.children.example }),

        // Alignment
        description(propExplanations.alignment.description),
        code({ source: propExplanations.alignment.example }),

        // Spacing
        description(propExplanations.spacing.description),
        code({ source: propExplanations.spacing.example }),

        // Sizing
        description(propExplanations.sizing.description),
        code({ source: propExplanations.sizing.example }),

        // Styling
        description(propExplanations.styling.description),
        code({ source: propExplanations.styling.example }),

        title('Examples'),

        code({
          title: 'Event Item (multiple boxes)',
          source: ExampleEventItem,
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
