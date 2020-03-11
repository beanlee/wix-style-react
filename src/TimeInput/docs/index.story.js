import TimeInput from '..';
import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: TimeInput,
  componentPath: '..',

  exampleImport: `import { TimePicker } from 'wix-style-react';`,

  componentProps: {
    dashesWhenDisabled: false,
    disabled: false,
  },

  exampleProps: {
    onChange: moment => moment.format('h:mm a'),
  },
};
