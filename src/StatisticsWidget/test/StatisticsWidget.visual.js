import React from 'react';
import { storiesOf } from '@storybook/react';
import StatisticsWidget from '../StatisticsWidget';

const tests = [
  {
    describe: 'sanity',
    its: [
      {
        it: '3 items',
        props: {
          items: [
            {
              value: '$7,500',
              description: 'Monday',
              percentage: 21,
              invertedPercentage: true,
            },
            {
              value: '1 200 000',
              description: 'Tuesday',
              descriptionInfo: 'Sales on Tuesday',
              percentage: 11,
            },
            {
              value: '21k',
              description: 'Wednesday',
            },
          ],
        },
      },
      {
        it: '5 items',
        props: {
          items: [
            {
              value: '$500',
              description: 'Monday',
              percentage: 21,
            },
            {
              value: '$1,500',
              description: 'Tuesday',
              percentage: 21,
              invertedPercentage: true,
            },
            {
              value: '$2,500',
              percentage: -11,
            },
            {
              value: '$3,500',
              description: 'Thursday',
              percentage: -11,
              invertedPercentage: true,
              descriptionInfo: 'Sales on Thursday',
            },
            {
              value: '0',
              description: 'Friday',
              percentage: 0,
              invertedPercentage: true,
              descriptionInfo: 'Sales on Friday',
            },
          ],
        },
      },
      {
        it: '> 5 items',
        props: {
          items: [
            {
              value: '$500',
              description: 'Monday',
            },
            {
              value: '$1,500',
              description: 'Tuesday',
              percentage: 21,
              invertedPercentage: true,
            },
            {
              value: '$2,500',
              percentage: 11,
            },
            {
              value: '$3,500',
              description: 'Thursday',
              percentage: 0,
              invertedPercentage: true,
              descriptionInfo: 'Sales on Thursday',
            },
            {
              value: '$4,500',
              description: 'Friday',
              descriptionInfo: 'Sales on Friday',
            },
            {
              value: '$5,500',
              description: 'Saturday',
              percentage: 0,
            },
          ],
        },
      },
    ],
  },
  {
    describe: 'title',
    its: [
      {
        it: 'without short text in a value',
        props: {
          items: [
            {
              value: '$7,500,000,000',
            },
            {
              value: '$1,200,000',
            },
            {
              value: '$1,872',
            },
            {
              value: 'Testing very very long text',
            },
          ],
        },
      },
      {
        it: 'with short text in a value',
        props: {
          items: [
            {
              value: '$7,500,000,000',
              valueInShort: '$7,5B',
            },
            {
              value: '$1,200,000',
              valueInShort: '$1,2M',
            },
            {
              value: '$1,872',
              valueInShort: '$1,8K',
            },
            {
              value: 'Testing very very long text',
              valueInShort: 'Text',
            },
          ],
        },
      },
    ],
  },
  {
    describe: 'description',
    its: [
      {
        it: 'extra long description',
        props: {
          items: [
            {
              value: '$1,000',
              description: 'The income out of trading goods on Monday',
              descriptionInfo: 'Sales on Monday',
            },
            {
              value: '$2,000',
              description: 'The income out of trading goods on Tuesday',
            },
            {
              value: '$3,000',
              description: 'The income out of trading goods on Wednesday',
            },
            {
              value: '$4,000',
              description: 'The income out of trading goods on Thursday',
              descriptionInfo: 'Sales on Thursday',
            },
            {
              value: '$4,000',
              description: 'The income out of trading goods on Friday',
            },
          ],
        },
      },
      {
        it: 'Info icons',
        props: {
          items: [
            {
              value: '$500',
              description: 'Monday',
              descriptionInfo: 'Sales on Thursday',
            },
            {
              value: '$1,500',
              descriptionInfo:
                'I am not visible because there is no description',
            },
            {
              value: '$2,500',
              description: 'Wednesday',
              descriptionInfo: 'Sales on Wednesday',
            },
            {
              value: '$2,500',
              description: 'The income out of trading goods on Thursday',
              descriptionInfo: 'Sales on Wednesday',
            },
            {
              value: '$4,250,000,000',
              valueInShort: '$4,3B',
              description: 'The income out of trading goods on Friday',
            },
          ],
        },
      },
    ],
  },
  {
    describe: 'trends',
    its: [
      {
        it: 'trends and inverted trends',
        props: {
          items: [
            {
              value: '$500',
              description: 'Monday',
              percentage: 21,
            },
            {
              value: '$1,500',
              description: 'Tuesday',
              percentage: 21,
              invertedPercentage: true,
            },
            {
              value: '$2,500',
              percentage: -11,
            },
            {
              value: '$3,500',
              description: 'Thursday',
              percentage: -11,
              invertedPercentage: true,
              descriptionInfo: 'Sales on Thursday',
            },
            {
              value: '0',
              description: 'Friday',
              percentage: 0,
              invertedPercentage: true,
              descriptionInfo: 'Sales on Friday',
            },
          ],
        },
      },
    ],
  },
  {
    describe: 'children',
    its: [
      {
        it: 'renders children',
        props: {
          items: [
            {
              value: '100',
              description: 'Money',
              children: <div>That's a lot</div>,
            },
          ],
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(({ it, props }) => {
    storiesOf(`StatisticsWidget${describe ? '/' + describe : ''}`, module).add(
      it,
      () => (
        <div style={{ marginLeft: 100, marginTop: 100 }}>
          <StatisticsWidget {...props} />
        </div>
      ),
    );
  });
});
