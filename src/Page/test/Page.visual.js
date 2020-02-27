import React from 'react';
import { storiesOf } from '@storybook/react';

import Page from '..';
import {
  PageContainer,
  renderHeader,
  renderContent,
  FixedContentExample,
  TailExample,
  EmptyStateExample,
} from './examples/testExamples';
import { BMPageContainer } from './examples/BMPageContainer';

const baseProps = {
  children: [renderHeader(), renderContent()],
  backgroundImageUrl:
    'https://static.wixstatic.com/media/f0548921c53940ec803dfb1c203e96fe.jpg/v1/fill/w_400,h_100/f0548921c53940ec803dfb1c203e96fe.jpg',
};

const tests = [
  {
    describe: 'Header',
    its: [
      {
        it: 'Should render with background-image',
        props: {
          ...baseProps,
        },
      },
      {
        it: 'Should render with gradient',
        props: {
          ...baseProps,
          backgroundImageUrl: '',
          gradientClassName: 'background-gradient',
        },
      },
    ],
  },
  {
    describe: 'Content',
    its: [
      {
        it: 'Should render with fixed content',
        props: {
          ...baseProps,
          children: [renderHeader(), FixedContentExample, renderContent(false)],
        },
      },
      {
        it: 'Should render with a tail',
        props: {
          ...baseProps,
          children: [renderHeader(), TailExample, renderContent(false)],
        },
      },
    ],
  },
  {
    describe: 'EmptyState',
    its: [
      {
        it: 'Should render with empty state',
        props: {
          ...baseProps,
          children: EmptyStateExample,
        },
      },
    ],
  },
  {
    describe: 'Height',
    its: [
      {
        it: 'Should render with a limited height',
        props: {
          ...baseProps,
          height: '60vh',
        },
      },
    ],
  },
  {
    describe: 'Side Padding',
    its: [
      {
        it: 'Should not render side padding',
        props: {
          ...baseProps,
          sidePadding: 0,
        },
      },
    ],
  },
  {
    describe: 'BM',
    its: [
      {
        it: 'Should render with placeholder for sidebar',
        componentWrapper: BMPageContainer,
        props: {
          ...baseProps,
        },
      },
    ],
  },
];

tests.forEach(({ describe, its }) => {
  its.forEach(
    ({ it, props, componentWrapper: ComponentWrapper = PageContainer }) => {
      storiesOf(`Page${describe ? '/' + describe : ''}`, module).add(it, () => (
        <ComponentWrapper>
          <Page {...props} />
        </ComponentWrapper>
      ));
    },
  );
});
