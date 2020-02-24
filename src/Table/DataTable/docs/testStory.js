import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../../stories/storiesHierarchy';
import { testStories, storySettings } from './storySettings';

import Example from './Example';
import ExampleCallingServer from './ExampleCallingServer';

const kind = getTestStoryKind(storySettings);

storiesOf(kind, module).add(testStories.dataTable, () => {
  return (
    <>
      <Example />
      <ExampleCallingServer />
    </>
  );
});
