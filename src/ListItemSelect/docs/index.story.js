import React from 'react';
import Star from 'wix-ui-icons-common/Star';
import Download from 'wix-ui-icons-common/Download';
import Hint from 'wix-ui-icons-common/Hint';
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
import ListItemSelect from '..';
import Box from '../../Box';

const example = config =>
  baseExample({
    components: { ...allComponents, Star, Download, Hint },
    ...config,
  });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: ListItemSelect,
  componentPath: '..',

  componentProps: {
    prefix: (
      <Box>
        <Star />
      </Box>
    ),
    title: 'List item title',
    subtitle: 'List item subtitle',
    suffix: 'List item suffix',
    checkbox: true,
  },

  sections: [
    header({
      component: (
        <Box
          width="500px"
          backgroundColor="#f0f4f7"
          padding="25px"
          border="1px solid #e5e5e5"
        >
          <ListItemSelect checkbox title="List Item Select" suffix="Suffix" />
        </Box>
      ),
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([
            description({
              title: 'Description',
              text:
                "List Item Select represents a single option of any select component. It's highly configurable and can appear in Dropdown, Multiselect or Search components.",
            }),
          ]),

          importExample(
            `
// Use directly
import { ListItemSelect } from 'wix-style-react';
// Or use a builder
import { listItemSelectBuilder } from 'wix-style-react';
              `,
          ),

          divider(),

          title('Examples'),

          example({
            title: 'Size',
            text: 'Component support two sizes – `small` and `medium`.',
            source: `
                <Layout cols={1}>
                  <ListItemSelect title="Medium size"/>
                  <ListItemSelect size="small" title="Small size"/>
                </Layout>
              `,
          }),

          example({
            title: 'Checkbox',
            text:
              'Item can be configured for multi select components by enabling `checkbox`.',
            source: `
                <Layout cols={1}>
                  <ListItemSelect title="For single selecton"/>
                  <ListItemSelect checkbox title="For multi selection"/>
                </Layout>
              `,
          }),

          example({
            title: 'Affix',
            text:
              'Component has prefix and suffix areas. If plain text or icon is inserted, component automatically inverts the color when selected.',
            source: `
                <Layout cols={1}>
                  <ListItemSelect
                    prefix={<Box><Icons.Toolbox /></Box>}
                    title="Title area"
                    suffix="Suffix area"
                  />
                  <ListItemSelect
                    prefix={<Avatar size="size24" />}
                    title="Title area"
                    suffix={<Box><Badge size="small" skin="success">Badge</Badge></Box>}
                  />
                  <ListItemSelect
                    selected
                    prefix={<Box><Icons.Toolbox /></Box>}
                    title="Title area"
                    suffix="Suffix area"
                  />
                  <ListItemSelect
                    selected
                    prefix={<Avatar size="size24" />}
                    title="Title area"
                    suffix={<Box><Badge size="small" skin="success">Badge</Badge></Box>}
                  />
                </Layout>
              `,
          }),

          example({
            title: 'Subtitle',
            text:
              'Additional information, like user email or address can be inserted to subtitle area.',
            source: `
                <ListItemSelect
                    title="Title area"
                    subtitle="subtitle area"
                />
              `,
          }),

          example({
            title: 'Disabled',
            text:
              'Component can be disabled, it automatically changes color of all areas if used as text or icon.',
            source: `
                <Layout cols={1}>
                  <ListItemSelect
                    disabled
                    prefix={<Box><Icons.Toolbox /></Box>}
                    title="Title area"
                    subtitle="Subtitle area"
                    suffix="Suffix area"
                  />
                  <ListItemSelect
                    disabled
                    checkbox
                    prefix={<Box><Icons.Toolbox /></Box>}
                    title="Title area"
                    subtitle="Subtitle area"
                    suffix="Suffix area"
                  />
                </Layout>
              `,
          }),

          example({
            title: 'Text cropping',
            text:
              'By default component wraps the text. If needed it can be configured to show ellipsis and display full value on hover.',
            source: `
                <Layout cols={1}>
                  <ListItemSelect
                    title="This is a very very very very long text that will wrap at some point"
                    suffix="Nice long long long long long Suffix"
                  />
                   <ListItemSelect
                    ellipsis
                    title="This is a very very very very long text that will be cropped by ellipsis at some point"
                    suffix="Nice long long long long long Suffix"
                  />
                </Layout>
              `,
          }),

          example({
            title: 'Advanced Example',
            text:
              'All properties work together and can be combined in various ways. It can be rendered as standalone or as part of dropdown.',
            source: `
                <Box height="230px">
                  <DropdownLayout
                    visible
                    selectedId={2}
                    options={[
                      listItemSelectBuilder({
                        id: 0,
                        checkbox: true,
                        prefix: <Avatar size="size30" />,
                        title: 'Carmel Lloyd',
                        subtitle: 'Kaplan 41',
                        suffix: '31 Dec 2017',
                      }),
                      listItemSelectBuilder({
                        id: 1,
                        checkbox: true,
                        prefix: <Avatar size="size30" />,
                        title: 'Gracie-May Marsden',
                        subtitle: 'Sderot Ben Gurion 75',
                        suffix: '20 Jan 2000',
                      }),
                      listItemSelectBuilder({
                        id: 2,
                        checkbox: true,
                        prefix: <Avatar size="size30" />,
                        title: 'Keisha Decker',
                        subtitle: 'Aminadav 18',
                        suffix: '4 Nov 2010',
                      }),
                      listItemSelectBuilder({
                        id: 3,
                        checkbox: true,
                        prefix: <Avatar size="size30" />,
                        title: 'Ruairidh Fitzgerald',
                        subtitle: 'HaYarkon 228',
                        suffix: '7 Apr 2009',
                        disabled: true,
                      }),
                      listItemSelectBuilder({
                        id: 4,
                        checkbox: true,
                        prefix: <Avatar size="size30" />,
                        title: 'Sheldon Chavez',
                        subtitle: 'Pinkas 2',
                        suffix: '2 Dec 2019',
                      }),
                      listItemSelectBuilder({
                        id: 5,
                        checkbox: true,
                        prefix: <Avatar size="size30" />,
                        title: 'Brandan Gibbs',
                        subtitle: 'Frishman 38',
                        suffix: '1 Feb 2003',
                      }),
                      listItemSelectBuilder({
                        id: 6,
                        checkbox: true,
                        prefix: <Avatar size="size30" />,
                        title: 'Gordon Holmes',
                        subtitle: 'HaShalom road 66',
                        suffix: '19 Aug 2016',
                      }),
                      listItemSelectBuilder({
                        id: 7,
                        checkbox: true,
                        prefix: <Avatar size="size30" />,
                        title: 'Aaisha Rios',
                        subtitle: 'Arlozorov 101',
                        suffix: '22 Jul 2018',
                      }),
                    ]}
                  />
                </Box>
              `,
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
