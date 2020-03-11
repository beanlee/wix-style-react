import React from 'react';
import { storiesOf } from '@storybook/react';

import Markdown from 'wix-storybook-utils/Markdown';

import Readme from '../../README.md';
import Migration from '../../MIGRATION.md';
import Contributing from '../../CONTRIBUTING.md';
import TestingReadme from '../../docs/usage/testing.md';
import TroubleshootingReadme from '../../docs/usage/Troubleshooting.md';
import UsageWithoutYoshiReadme from '../../docs/usage-without-yoshi.md';

import ComponentsCheatsheet from './Cheatsheet/ComponentsCheatsheet';

import { Category } from '../storiesHierarchy';

storiesOf(Category.GETTINGSTARTED, module).add('Getting started', () => (
  <Markdown source={Readme} />
));

storiesOf(Category.GETTINGSTARTED, module).add('Migrating to wsr8', () => (
  <Markdown source={Migration} />
));

storiesOf(Category.GETTINGSTARTED, module).add('Contributing', () => (
  <Markdown source={Contributing} />
));

storiesOf(Category.GETTINGSTARTED, module).add('Usage Without Yoshi', () => (
  <Markdown source={UsageWithoutYoshiReadme} />
));

storiesOf(Category.CHEATSHEET, module).add('Components Cheatsheet', () => (
  <ComponentsCheatsheet />
));

storiesOf(Category.TESTING, module).add('Testing', () => (
  <div style={{ margin: '0 48px', width: '100%', maxWidth: 1161 }}>
    <Markdown source={TestingReadme} />
  </div>
));

storiesOf(Category.TROUBLESHOOTING, module).add('Troubleshooting', () => (
  <div style={{ margin: '0 48px', width: '100%', maxWidth: 1161 }}>
    <Markdown source={TroubleshootingReadme} />
  </div>
));
