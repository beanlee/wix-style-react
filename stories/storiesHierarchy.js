// We can add here constants for the Storybook category names

export const RTL_QUERY_PARAM_NAME = 'rtl';

export const getTestStoryKind = ({ category, storyName }) =>
  `${category}/${storyName}`;

export const Category = {
  GETTINGSTARTED: 'Introduction|Getting Started',
  PLAYGROUND: 'Introduction|Playground',
  CHEATSHEET: 'Introduction|Cheatsheet',
  TESTING: 'Introduction|Testing',
  TROUBLESHOOTING: 'Introduction|Troubleshooting',
  FOUNDATION: 'Design Guidelines|Foundation',
  LAYOUT: 'Design Guidelines|Layout',
  BUTTONS: 'Design Guidelines|Buttons',
  INPUTS: 'Design Guidelines|Inputs',
  SELECTION: 'Design Guidelines|Selection',
  NAVIGATION: 'Design Guidelines|Navigation',
  TOOLTIP: 'Design Guidelines|Tooltips & Popovers',
  MODALS: 'Design Guidelines|Modals',
  PICKERS_AND_SELECTORS: 'Design Guidelines|Pickers and Selectors',
  OTHER: 'Design Guidelines|Other',
  COMPONENTS: 'Components API|Components',
  STYLING: 'Components API|Styling',
  WIP: 'Components API|Work in Progress',
  DEPRECATED: 'Deprecated',
};
