import React from 'react';
import {
  header,
  description,
  importExample,
  table,
  columns,
  divider,
  title,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import allComponents from '../../../stories/utils/allComponents';

import { Category } from '../../../stories/storiesHierarchy';

import * as examples from './examples';

import styles from './styles.scss';
import CodeExample from 'wix-storybook-utils/CodeExample';

import HeadingExamples from './HeadingExamples';
import HeadingExamplesRaw from '!raw-loader!./HeadingExamples';

import TextExamples from './TextExamples';
import TextExamplesRaw from '!raw-loader!./TextExamples';

const code = config => baseCode({ components: allComponents, ...config });

export default {
  category: Category.FOUNDATION,
  storyName: '1.2 Typography',

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new/choose',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Typography',
    }),

    description({
      title: 'Description',
      text: `The recommended way to use \`wix-style-react\` typography is with \`<Text/>\` and \`<Heading/>\` components. Not only they provide correct styling but also feature ellipsis and tooltip, when necessary.`,
    }),

    columns([
      table({
        title: 'Included Components',
        rows: [
          [
            <LinkTo
              kind={Category.COMPONENTS}
              story="Heading"
            >{`<Heading/>`}</LinkTo>,
            'Component for big headers',
          ],
          [
            <LinkTo
              kind={Category.COMPONENTS}
              story="Text"
            >{`<Text/>`}</LinkTo>,
            'Component for regular text',
          ],
          [
            <LinkTo kind={Category.STYLING} story="1.2 Typography Classes">
              CSS classes
            </LinkTo>,
            'For edge cases when neither `<Heading/>` nor `<Text/>` can be used.',
          ],
        ],
      }),
    ]),

    columns([
      importExample(`import { Heading } from 'wix-style-react';
import { Text } from 'wix-style-react';`),
    ]),

    divider(),

    title('Examples'),

    code({
      title: 'Basic Usage',
      source: examples.basic,
    }),

    description({
      text: (
        <div>
          <CodeExample title="<Heading/> Examples" code={HeadingExamplesRaw}>
            <div className={styles.codeExample}>
              <HeadingExamples />
            </div>
          </CodeExample>
          <CodeExample title="<Text/> Examples" code={TextExamplesRaw}>
            <div className={styles.codeExample}>
              <TextExamples />
            </div>
          </CodeExample>
        </div>
      ),
    }),
  ],
};
