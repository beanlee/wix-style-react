import React from 'react';
import { storiesOf } from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';
import TabbedView from 'wix-storybook-utils/TabbedView';

import Readme from '../README.md';
import ReadmeTestKit from '../README.TESTKIT.md';

import Example from './Example';
import ExampleRaw from '!raw-loader!./Example';

import ExampleCallingServer from './ExampleCallingServer';
import ExampleCallingServerRaw from '!raw-loader!./ExampleCallingServer';

import ExampleWithoutHeader from './ExampleWithoutHeader';
import ExampleWithoutHeaderRaw from '!raw-loader!./ExampleWithoutHeader';

import ExampleWithAnimatedRowDetails from './ExampleWithAnimatedRowDetails';
import ExampleWithAnimatedRowDetailsRaw from '!raw-loader!./ExampleWithAnimatedRowDetails';

import ExampleSortable from './ExampleSortable';
import ExampleSortableRaw from '!raw-loader!./ExampleSortable';

import ExampleSortableOldDesign from './ExampleSortableOldDesign';
import ExampleSortableOldDesignRaw from '!raw-loader!./ExampleSortableOldDesign';

import { storySettings } from './storySettings';

storiesOf(storySettings.category, module).add(storySettings.storyName, () => (
  <TabbedView tabs={['API', 'TestKits']}>
    <div>
      <Markdown source={Readme} />
      <h1>Usage examples</h1>

      <CodeExample title="With infinite scroll" code={ExampleRaw}>
        <Example />
      </CodeExample>
      <CodeExample
        title="With animated row details"
        code={ExampleWithAnimatedRowDetailsRaw}
      >
        <ExampleWithAnimatedRowDetails />
      </CodeExample>
      <CodeExample
        title="Within a dynamic width container (80%)"
        code={ExampleSortableRaw}
      >
        <ExampleSortable
          style={{ width: '80%' }}
          dataHook="storybook-responsive-width"
        />
      </CodeExample>
      <CodeExample
        title="With sorting & info tooltip"
        code={ExampleSortableRaw}
      >
        <ExampleSortable />
      </CodeExample>
      <CodeExample
        title="With sorting - old design"
        code={ExampleSortableOldDesignRaw}
      >
        <ExampleSortableOldDesign />
      </CodeExample>
      <CodeExample title="Without header" code={ExampleWithoutHeaderRaw}>
        <ExampleWithoutHeader />
      </CodeExample>
      <CodeExample
        title="With server calling (up to 100 items)"
        code={ExampleCallingServerRaw}
      >
        <ExampleCallingServer />
      </CodeExample>
    </div>

    <Markdown source={ReadmeTestKit} />
  </TabbedView>
));
