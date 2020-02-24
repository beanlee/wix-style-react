import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import InputArea from '..';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleError from './ExampleError';
import ExampleErrorRaw from '!raw-loader!./ExampleError';

import ExampleWarning from './ExampleWarning';
import ExampleWarningRaw from '!raw-loader!./ExampleWarning';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

import ExampleRefs from './ExampleRefs';
import ExampleRefsRaw from '!raw-loader!./ExampleRefs';

import ExampleSizes from './ExampleSizes';
import ExampleSizesRaw from '!raw-loader!./ExampleSizes';

import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: InputArea,
  componentPath: '..',

  componentProps: {
    dataHook: storySettings.dataHook,
    error: false,
    status: undefined,
    theme: 'normal',
    hasCounter: false,
    resizable: false,
    disabled: false,
    statusMessage: 'This is a message!',
  },

  exampleProps: {
    status: [
      {
        label: 'Error',
        value: 'error',
      },
      {
        label: 'Warning',
        value: 'warning',
      },
      {
        label: 'Loading',
        value: 'loading',
      },
    ],
  },

  examples: (
    <div>
      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard />
      </CodeExample>

      <CodeExample title="Error" code={ExampleErrorRaw}>
        <ExampleError />
      </CodeExample>

      <CodeExample title="Warning" code={ExampleWarningRaw}>
        <ExampleWarning />
      </CodeExample>

      <CodeExample title="Controlled input" code={ExampleControlledRaw}>
        <ExampleControlled />
      </CodeExample>

      <CodeExample title="Sizes" code={ExampleSizesRaw}>
        <ExampleSizes />
      </CodeExample>

      <CodeExample title="Commands test" code={ExampleRefsRaw}>
        <ExampleRefs />
      </CodeExample>
    </div>
  ),
};
