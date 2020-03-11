import {
  header,
  tabs,
  tab,
  description,
  importExample,
  title,
  columns,
  divider,
  code as baseCode,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';
import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';
import MarketingLayout from '..';
import {
  sizeSmall,
  sizeMedium,
  sizeLarge,
  inverted,
  imageBackgroundColor,
  advanced,
  description as descriptionText,
  actions,
  images,
} from './examples';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'MarketingLayout',

  component: MarketingLayout,
  componentPath: '..',

  componentProps: {
    title: 'Marketing Layout Title',
    description:
      'Connect to Google and get indexed in seconds so people can easily find your site.',
    actions: actions[0].value,
    image: images[0].value,
    size: 'small',
    inverted: false,
  },

  exampleProps: {
    image: images,
    actions,
  },

  sections: [
    header(),

    tabs([
      tab({
        title: 'Description',
        sections: [
          columns([description(descriptionText)]),

          importExample("import { MarketingLayout } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          description({
            title: 'Size',
            text:
              'Component supports three sizes - small, medium and large. For each size are dedicated illustration sizes. Please note, action button sizes must be adjusted based on marketing layout size.',
          }),
          code({
            compact: true,
            source: sizeSmall,
          }),
          code({
            compact: true,
            source: sizeMedium,
          }),
          code({
            compact: true,
            source: sizeLarge,
          }),

          description({
            title: 'Image Position',
            text:
              'Image can be positioned on the right or left side. Position can be changed with `inverted` prop.',
          }),
          code({
            compact: true,
            source: inverted,
          }),

          description({
            title: 'Image Area Background',
            text:
              'Use `imageBackgroundColor` prop to set a custom background color for the image area.',
          }),
          code({
            compact: true,
            source: imageBackgroundColor,
          }),

          description({
            title: 'Advanced Example',
            text:
              'Marketing layout can be customized to support complex layouts. This example uses `<Card>` component as a container for marketing layout.',
          }),
          code({
            compact: true,
            source: advanced,
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
