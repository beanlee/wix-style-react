# Upgrading `wix-style-react` from 7 to 8

## Removed

- `<VBox/>` & `<HBox/>` - Use `<Box/>` instead.
- `<FullTextView/>` - Use `<Text/>` instead.
- `<AutoCompleteComposite/>` - Use `<FormField/>` instead.
- `<InputAreaWithLabelComposite/>` - Use `<FormField/>` instead.
- `<MultiSelectComposite/>` - Use `<FormField/>` instead.
- `<FieldWithSelectionComposite/>` - Use `<FormField/>` instead.
- `<GoogleAddressInputWithLabel/>` - Use `<FormField/>` instead.
- Icons from `wix-style-react/new-icons` import path were removed. Please install and use icons from `wix-ui-icons-common` package directly. You can migrate your existing codebase using provided codemod, please see [migration guide](./docs/migration/ICONS.md) for more details.
- `<TextLink/>` - Use `<TextButton as="a"/>` instead.
- `<SideMenu/>` - Use `<Sidebar/>` instead.
- `<SideMenuDrill/>` - Use `<Sidebar/>` instead.
- `<StatsWidget/>` - Use `<StatisticsWidget/>` instead. See [migration guide](./docs/migration/StatsWidget.md).
- `<PopoverMenu/>` - replaced with new beta PopoverMenu, see migration guide below.
- `<DataTable/>` - Use `<Table/>` instead.

## Changed:

#### `<TableActionCell/>`

- Props:
  - removed `upgrade` - component is now upgraded by default
  - changed `primaryAction.theme` to `primaryAction.skin` (with new values)

#### `<Table/>`

- Testkit:
  - removed `clickRowChecbox` - removed due to typo, use `clickRowCheckbox` instead

#### `<Input/>`
- Props:
  - removed `units` use `<Input.Affix/>` component instead
  - removed `magnifyingGlass` use `<Search/>` component instead
  - removed `help` and `helpMessage` use a `<FormField/>` wrapper instead

- Testkit:
  - removed `clickUnit`
  - removed `getUnit`
  - removed `hasMagnifyingGlass`
  - removed `clickMagnifyingGlass`
  - removed `hasHelp`

Removed `<Input.Units/>` use `<Input.Affix>` instead.

#### `<InputArea/>`

- Props:
  - removed `onTooltipShow`
  - changed `error` to `status='error'`
  - changed `errorMessage` to `statusMessage`
- Testkit:
  - removed `hasError`
  - removed `hasWarning`
  - removed `getTooltipDataHook`
  - removed `getTooltipElement`
  - removed `isErrorMessageShown`
  - removed `mouseEnterErrorIndicator`
  - removed `getErrorMessage`
  - removed `getStatusMessage`
  - added `hasStatus`
  - added `getStatus`
  - added `hasStatusMessage`
  - added `getStatusMessage`

#### `<Avatar/>`

- Prop `color` - Deprecated old values, valid values are now only A1 to A6.

#### `<DatePicker/>`

- Props:
  - removed `isOpen` - use `initialOpen` instead.
  - changed `error` to `status='error'`
  - changed `errorMessage` to `statusMessage`

#### `<Tag/>`

- Props:
  - removed `wrap` - now text has ellipsis by default

#### `<ImageViewer/>`

- Props:
  - removed `tooltipPlacement`
  - changed `error` to `status='error'`
  - changed `errorMessage` to `statusMessage`
- Testkit:
  - removed `isErrorVisible`
  - removed `getErrorTooltipContent`
  - added `hasStatus`
  - added `getStatus`
  - added `hasStatusMessage`
  - added `getStatusMessage`

#### `<StatisticsWidget/>`

- Props:
  - removed `statistics` use `items` instead.

#### `<Button/>`

- Props:
  - removed `type` - For type button, use `<SegmentedToggle/>` component instead
- Testkit:
  - removed `isButtonType`

## Migrating to new PopoverMenu

Old PopoverMenu component was removed and replaced with new component that was previously available as `beta/PopoverMenu`.

Replace old PopoverMenu:

```jsx
import PopoverMenu from 'wix-style-react/PopoverMenu';
import PopoverMenuItem from 'wix-style-react/PopoverMenuItem';

<PopoverMenu>
  <PopoverMenuItem onClick={() => {}} text="Item" />
</PopoverMenu>
```

With new PopoverMenu:

```jsx
import { PopoverMenu, IconButton } from 'wix-style-react';
import More from 'wix-ui-icons-common/More';

<PopoverMenu
  triggerElement={
    <IconButton skin="inverted">
      <More />
    </IconButton>
  }
>
  <PopoverMenu.MenuItem onClick={() => {}} text="Item" />
</PopoverMenu>
```
