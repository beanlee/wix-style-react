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

import SidebarSectionTitle from '..';

const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'SidebarSectionTitle',

  component: SidebarSectionTitle,
  componentPath: '..',

  componentProps: {
    children: 'Some title',
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
              text: 'A title for the section within the sidebar.',
            }),
          ]),

          importExample(
            "import { SidebarSectionTitle } from 'wix-style-react';",
          ),

          divider(),

          title('Examples'),

          example({
            title: 'Plain Example',
            text: 'A simple example for section title',
            source: examples.plain,
          }),

          example({
            title: 'Multiple Lines',
            text:
              'An example that demonstrates a long section title that is broken down into multiple lines',
            source: examples.longTitle,
          }),

          example({
            title: 'Light Skin',
            text:
              'This example uses the `<Sidebar/>` to demonstrate the "light" skin design. Notice that when `<SidebarSectionTitle/>` is contained inside `<Sidebar/>`, it affected by the `skin` prop accordingly',
            source: examples.lightSkin,
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
