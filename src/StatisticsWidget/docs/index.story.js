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
  example as baseExample,
  playground,
  api,
  testkit,
} from 'wix-storybook-utils/Sections';

import { storySettings } from '../test/storySettings';
import allComponents from '../../../stories/utils/allComponents';

import StatisticsWidget from '..';

import OneStatistic from '!raw-loader!./examples/OneStatistic';
import OnlyValues from '!raw-loader!./examples/OnlyValues';
import WithChildren from '!raw-loader!./examples/WithChildren';
import Descriptions from '!raw-loader!./examples/Descriptions';
import InfoIcons from '!raw-loader!./examples/InfoIcons';
import LongText from '!raw-loader!./examples/LongText';
import CustomLongText from '!raw-loader!./examples/CustomLongText';
import Trends from '!raw-loader!./examples/Trends';
import InvertedTrends from '!raw-loader!./examples/InvertedTrends';
import onClick from '!raw-loader!./examples/onClick';
import Card from '!raw-loader!./examples/Card';
import InteractiveCard from '!raw-loader!./examples/InteractiveCard';

const code = config => baseCode({ components: allComponents, ...config });
const example = config => baseExample({ components: allComponents, ...config });

export default {
  category: storySettings.category,
  storyName: 'StatisticsWidget',

  component: StatisticsWidget,
  componentPath: '..',

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
                'StatisticsWidget displays various statistics with a short explanation. Can display up to 5 items with value, description, and change in percents.',
            }),
          ]),

          importExample("import { StatisticsWidget } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          example({
            title: 'One statistic',
            autoRender: false,
            source: OneStatistic,
          }),

          code({
            compact: true,
            autoRender: false,
            title: 'Only values',
            description:
              'The value is the only required property in statistics.',
            source: OnlyValues,
          }),

          code({
            compact: true,
            autoRender: false,
            title: 'descriptions',
            description:
              'Should be short, contains an explanation of the current stat.',
            source: Descriptions,
          }),

          example({
            title: 'Info icon',
            description:
              "Since description is small by design, there is a possibility to clarify the meaning of each statistic by specifying 'descriptionInfo' property.  It this case widget will render an info icon with a text inside a tooltip.",
            autoRender: false,
            source: InfoIcons,
          }),

          example({
            title: 'Long text',
            description:
              'When there is not enough space, part of the value or description will be hidden with an ellipsis. Hover it to see full text.',
            autoRender: false,
            source: LongText,
          }),

          example({
            title: 'Custom text instead of ellipsis',
            description:
              'There is a possibility to set custom text on value, when there is not enough space for long version. Full text will be still visible on hover',
            autoRender: false,
            source: CustomLongText,
          }),

          example({
            title: 'Trends',
            description:
              'Shows a change since the last period. Positive change displays with an arrow up, negative - with an arrow down.',
            autoRender: false,
            source: Trends,
          }),

          code({
            compact: true,
            autoRender: false,
            title: 'Inverted trends',
            description:
              'By default, positive numbers are displayed in green, negative - with red. This could be changed with `invertedPercentage` property.',
            source: InvertedTrends,
          }),

          code({
            compact: true,
            autoRender: false,
            title: 'onClick',
            description:
              "It is possible to specify an 'onClick' handler for every statistic. The items with this property are focusable with Tab button. Also, the handler will be called on Space or Enter press.",
            source: onClick,
          }),

          code({
            compact: true,
            autoRender: false,
            title: 'Inside a card',
            description: 'Statistics widget inside a card.',
            source: Card,
          }),

          code({
            compact: true,
            autoRender: false,
            title: 'Inside a stateful component',
            description:
              'Statistics widget inside a card with multiple filters.',
            source: InteractiveCard,
          }),

          code({
            compact: true,
            autoRender: false,
            title: 'With Children',
            description: 'Appears below other info in section.',
            source: WithChildren,
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
