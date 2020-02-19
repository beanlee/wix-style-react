import React from 'react';
import { storiesOf } from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import Readme from './README.md';

import AllIcons from './AllIcons';
import AllIconsRaw from '!raw-loader!./AllIcons';

import CustomIconColor from './CustomIconColor';
import CustomIconColorRaw from '!raw-loader!./CustomIconColor';

import CustomIconSize from './CustomIconSize';
import CustomIconSizeRaw from '!raw-loader!./CustomIconSize';

import RTLIcon from './RTLIcon';
import RTLIconRaw from '!raw-loader!./RTLIcon';

import { Category } from '../storiesHierarchy';

storiesOf(Category.FOUNDATION, module).add('1.4 Icons', () => (
  <div>
    <Markdown source={Readme} />

    <CodeExample title="All Icons" code={AllIconsRaw}>
      <AllIcons />
    </CodeExample>
    <CodeExample title="Custom Icon color" code={CustomIconColorRaw}>
      <CustomIconColor />
    </CodeExample>
    <CodeExample title="Custom Icon size" code={CustomIconSizeRaw}>
      <CustomIconSize />
    </CodeExample>
    <CodeExample title="RTL Icon" code={RTLIconRaw}>
      <RTLIcon />
    </CodeExample>
  </div>
));
