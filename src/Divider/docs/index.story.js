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

import Divider from '..';
import Box from '../../Box';
import * as examples from './examples';
import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'Divider',

  component: Divider,
  componentPath: '..',

  componentWrapper: ({ component }) => (
    <Box verticalAlign="middle" minHeight="50px">
      {component}
    </Box>
  ),

  sections: [
    header(),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description({
            title: 'Description',
            text:
              'A component that separates content by a line horizontally or vertically.',
          }),

          importExample("import { Divider } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Horizontal Example',
            text: 'By default, the divider is horizontal.',
            source: examples.plain,
          }),

          example({
            title: 'Vertical Example',
            text:
              'The divider could be vertical by using the `direction` prop. Notice that the direct parent should have an explicit `height` or be stretched by flexbox.',
            source: examples.vertical,
          }),

          example({
            title: 'Example with Dark Skin',
            text:
              'The divider could be displayed in dark color using the `skin` prop.',
            source: examples.dark,
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
