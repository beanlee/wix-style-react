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

import Box from '../../Box';
import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';
import basicExample from '!raw-loader!./examples/basic';
import sizeExample from '!raw-loader!./examples/size';
import inlineTextExample from '!raw-loader!./examples/inlineText';
import headingExample from '!raw-loader!./examples/heading';
import InfoIcon from '..';

const content = 'Tooltip content!';
const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'InfoIcon',

  component: InfoIcon,
  componentPath: '..',

  componentProps: {
    size: 'medium',
    content,
  },

  componentWrapper: ({ component }) => <Box align="center">{component}</Box>,

  sections: [
    header({
      component: <InfoIcon content={content} />,
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            'A component used to display an information icon with some additional details provided in a tooltip.',
          ),

          importExample("import { InfoIcon } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Simple Usage',
            text: 'The only required prop is `content`.',
            source: basicExample,
          }),

          example({
            text: 'You can specify information icon size using `size` prop.',
            source: sizeExample,
          }),

          example({
            title: 'Text with InfoIcon',
            text:
              'An example where `<InfoIcon>` is used inline with `<Text>` component content.',
            source: inlineTextExample,
          }),

          example({
            title: 'Heading with InfoIcon',
            text:
              'An example of a `<Heading>` component used together with `<InfoIcon>`.',
            source: headingExample,
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
