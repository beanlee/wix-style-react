import DatePicker from '..';
import format from 'date-fns/format';
import { storySettings } from './storySettings';
import {
  header,
  tabs,
  tab,
  api,
  testkit,
  playground,
  importExample,
  divider,
  title,
  description,
  code as baseCode,
} from 'wix-storybook-utils/dist/src/Sections';
import React from 'react';
import * as examples from './examples';
import allComponents from '../../../stories/utils/allComponents';
import { columns } from 'wix-storybook-utils/Sections';

const defaultValue = new Date('2017/05/01');
const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const code = config =>
  baseCode({
    components: allComponents,
    ...config,
  });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: DatePicker,
  componentPath: '..',

  componentProps: setState => ({
    onChange: value => setState({ value }),
    dateFormat: 'YYYY/MM/DD',
    dataHook: 'storybook-datepicker',
    placeholderText: 'Select Date',
    value: defaultValue,
    shouldCloseOnSelect: true,
    showYearDropdown: false,
    showMonthDropdown: false,
    locale: 'en',
    twoMonths: false,
  }),

  exampleProps: {
    onChange: date => format(date, 'YYYY/MM/DD'),
    value: [
      { label: '2017/05/01', value: defaultValue },
      { label: 'Today', value: today },
      { label: 'Tomorrow', value: tomorrow },
    ],
    dateFormat: [
      { label: 'YYYY/MM/DD', value: 'YYYY/MM/DD' },
      { label: 'MM/DD/YYYY', value: 'MM/DD/YYYY' },
      {
        label: 'custom function (date.getDate())',
        value: date => date.getDate(),
      },
    ],
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/DatePicker',
    }),

    tabs([
      tab({
        title: 'Usage',
        sections: [
          importExample("import { DatePicker } from 'wix-style-react';"),

          divider(),

          title('Examples'),

          code({
            title: 'Simple generic use',
            source: examples.simple,
          }),

          code({
            title: 'DatePicker customizations',
            source: examples.customizations,
          }),

          description({
            title: 'Using filterDate',
            text:
              'The function filterDate gets a date and returns true if this date valid to select, in this example only prior dates to today can be selected.',
          }),

          code({
            source: examples.filterDate,
          }),

          columns([
            description({
              title: 'With Status',
              text: `Setting a status to indicate some there's an issue.`,
            }),
            code({
              compact: true,
              source: examples.status,
            }),
          ]),

          // TODO - disabled until https://github.com/wix/wix-style-react/issues/4157 is fixed
          // code({
          //   title: 'Range Selection',
          //   source: examples.rangeSelection,
          // }),
        ],
      }),
      ...[
        { title: 'API', sections: [api()] },
        { title: 'TestKit', sections: [testkit()] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
