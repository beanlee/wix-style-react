import { linkTo } from '@storybook/addon-links';

import {
  inputsComponentsNames,
  layoutComponentsNames,
  navigationComponentsNames,
  tooltipPopoverComponentsNames,
  modalsComponentsNames,
  sharedComponentsNames,
} from './components';

import {
  foundationSymbols,
  inputsSymbols,
  navigationSymbols,
  tooltipPopoverSymbols,
  modalsSymbols,
} from './symbols';
import { Category } from '../storiesHierarchy';

export const getComponentUrl = ({ componentName }) =>
  componentActualUrl[componentName] ||
  linkTo(Category.COMPONENTS, componentName);

export const getSymbolUrl = ({ groupSymbol, symbol }) =>
  symbolActualUrl[symbol] || linkTo(groupSymbol, symbol);

/**
 * For misspelled Components stories or Compound components (Card.Header story part of Card story)
 */
const componentActualUrl = {
  [sharedComponentsNames.Icon]: linkTo(Category.FOUNDATION, '1.4 Icons'),

  [inputsComponentsNames.TimeInput]: linkTo(Category.COMPONENTS, 'TimePicker'),
  [inputsComponentsNames.DateInput]: linkTo(Category.WIP, 'DateInput'),
  [inputsComponentsNames.MultiSelect]: linkTo(
    Category.COMPONENTS,
    'Multiselect',
  ),

  [layoutComponentsNames.PageHeader]: linkTo(Category.COMPONENTS, 'PageHeader'),
  [layoutComponentsNames.Layout]: linkTo(
    `${Category.COMPONENTS}/Layout`,
    'Usage',
  ),
  [layoutComponentsNames.CardHeader]: linkTo(Category.COMPONENTS, 'Card'),
  [layoutComponentsNames.CardContent]: linkTo(Category.COMPONENTS, 'Card'),
  [layoutComponentsNames.CardDivider]: linkTo(Category.COMPONENTS, 'Card'),

  [tooltipPopoverComponentsNames.PopoverMenu]: linkTo(
    Category.COMPONENTS,
    'PopoverMenu',
  ),

  [modalsComponentsNames.MessageBoxMarketerialLayout]: linkTo(
    Category.MODALS,
    '9.4 Announcement',
  ),

  [navigationComponentsNames.VerticalTabs]: linkTo(
    Category.WIP,
    'VerticalTabs',
  ),

  [navigationComponentsNames.VerticalTabsItem]: linkTo(
    Category.WIP,
    'VerticalTabsItem',
  ),
};

/**
 * This is mapping the good names to the bad UX Story names that are actually in the storybook (9.4 Announcement instead of 9.3 Marketing)
 */
const symbolActualUrl = {
  [foundationSymbols.icons]: linkTo(Category.FOUNDATION, '1.4 Icons'),

  [inputsSymbols.tagsInput]: linkTo(Category.INPUTS, '3.12 Tags'),

  [navigationSymbols.sidebarMenu]: linkTo(Category.NAVIGATION, '6.1 Sidebar'),

  [tooltipPopoverSymbols.popoverMenu]: linkTo(
    Category.TOOLTIP,
    '7.3 PopoverMenu',
  ),

  [modalsSymbols.content]: linkTo(Category.MODALS, '9.3 Custom Modal'),
  [modalsSymbols.marketing]: linkTo(Category.MODALS, '9.4 Announcement'),
};
