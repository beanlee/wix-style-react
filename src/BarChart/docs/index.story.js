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

import BarChart from '..';

const example = config => baseExample({ components: allComponents, ...config });

const items = [
  {
    value: 25000000,
    label: '$25,000,000',
    labelShort: '$25M',
    description: 'Sales',
    descriptionInfo: 'Revenue from sales is $25M',
  },
  {
    value: 20000000,
    label: '$20,000,000',
    labelShort: '$20M',
    description: 'Subscription',
    descriptionInfo: 'Revenue from subscriptions is $20M',
  },
  {
    value: 42000000,
    label: '$42,000,000',
    labelShort: '$42M',
    description: 'Ads',
    descriptionInfo: 'Revenue from ads is $42M',
  },
  {
    value: 72000000,
    label: '$72,000,000',
    labelShort: '$72M',
    description: 'Other',
    descriptionInfo: 'Other revenue is $72M',
  },
];

export default {
  category: storySettings.category,
  storyName: 'BarChart',

  component: BarChart,
  componentPath: '..',

  componentProps: {
    items: items,
  },

  exampleProps: {
    items: [
      { label: '4 Items', value: items },
      { label: '1 Item', value: items.slice(0, 1) },
    ],
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
              text:
                'BarChart is a statistics component. It shows the relative value of the compared data. Use it to help users analyse source of income, visits and similar.',
            }),
          ]),

          importExample("import { BarChart } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'Simple usage',
            text:
              'The only required prop is items with values. Items will be sorted by values from highest to lowest.',
            source: `
               <BarChart
                  items={[
                  {
                    value: 220,
                  },
                  {
                    value: 270,
                  },
                  {
                    value: 720,
                  },
                  {
                    value: 250,
                  },
                  {
                    value: 450,
                  },
                ]}
              />`,
          }),

          example({
            title: 'Description and additional information',
            text:
              'Use description and descriptionInfo to explain data. Descriptions appear under each bar and descriptionInfo appear on hover.',
            source: `
               <BarChart
                  items={[
                  {
                    value: 2400,
                    description: 'Facebook',
                    descriptionInfo: '2400 users came from a Facebook',
                  },
                  {
                    value: 1150,
                    description: 'Instagram',
                    descriptionInfo: '1150 users came from a Instagram',
                  },
                  {
                    value: 980,
                    description: 'Direct Link',
                    descriptionInfo: '980 users came by direct link',
                  },
                ]}
              />`,
          }),

          example({
            title: 'Displayed value',
            text: 'It is possible to format data shown to the user.',
            source: `
               <BarChart
                  items={[
                  {
                    value: 25000,
                    label: '$25,000',
                    description: 'Sales',
                  },
                  {
                    value: 48000,
                    label: '$48,000',
                    description: 'Subscription',
                  },
                  {
                    value: 42000,
                    label: '$42,000',
                    description: 'Ads',
                  },
                ]}
              />`,
          }),

          example({
            title: 'Total value',
            text:
              'Chart calculates its total value. By default it’s a sum of all items. It can be changed manually to a higher value, then the chart will adjust to a corresponding space. When total is not specified widget will take all the place',
            source: `
               <BarChart
                  total={1200}
                  items={[
                  {
                    value: 250,
                    description: 'Desktop',
                    descriptionInfo: '250 of 1200 users visiting site from a desktop',
                  },
                  {
                    value: 480,
                    description: 'Mobile',
                    descriptionInfo: '250 of 1200 users visiting site from mobile',
                  },
                ]}
              />`,
          }),

          example({
            title: 'Usage with one item.',
            source: `
               <BarChart
                  total={1200}
                  items={[
                  {
                    value: 570,
                    description: 'Unique visitors',
                    descriptionInfo: '570 of 1200 visitors are uniq for current page',
                  }
                ]}
              />`,
          }),

          example({
            title: 'Shortened value',
            text:
              'When there is not enough space to display a full value, use shortened labels.',
            source: `
               <BarChart
                  items={[
                  {
                    value: 25000000,
                    label: '$25,000,000',
                    description: 'Sales',
                  },
                  {
                    value: 20000000,
                    label: '$20,000,000',
                    labelShort: '$20M',
                    description: 'Subscriptions',
                  },
                  {
                    value: 42000000,
                    label: '$42,000,000',
                    labelShort: '$42M',
                    description: 'Ads',
                  },
                  {
                    value: 72000000,
                    label: '$72,000,000',
                    labelShort: '$72M',
                    description: 'Other',
                  },
                ]}
              />`,
          }),

          example({
            title: 'Hiding values or showing ellipsis',
            text:
              'By default values that don\'t fit show ellipsis. If "descriptionInfo" prop is added those values are hidden and can be exposed on hover in a tooltip.',
            source: `
               <BarChart
                  items={[
                  {
                    value: 30000000,
                    label: '$30,000,000',
                    labelShort: '$30M',
                    description: 'Sales',
                  },
                  {
                    value: 20000000,
                    label: '$20,000,000',
                    labelShort: '$20M',
                    description: 'Subscriptions',
                    descriptionInfo: '$20,000,000 revenue from Subscriptions',
                  },
                  {
                    value: 42000000,
                    label: '$42,000,000',
                    description: 'Ads',
                  },
                  {
                    value: 65000000,
                    label: '$65,000,000',
                    labelShort: '$65M',
                    description: 'Other',
                    descriptionInfo: 'Other gains: $65,000,000',
                  },
                ]}
              />`,
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
