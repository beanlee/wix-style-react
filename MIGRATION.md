# Upgrading `wix-style-react` from 7 to 8

# Index

- [Components](#components)
  - [\<AddItem/>](#additem)
  - [\<Avatar/>](#avatar)
  - [\<AutoCompleteComposite/>](#autocompletecomposite)
  - [\<CircularProgressBar/>](#circularprogressbar)
  - [\<ColorInput/>](#colorinput)
  - [\<DataTable/>](#datatable)
  - [\<DatePicker/>](#datepicker)
  - [\<Dropdown/>](#dropdown)
  - [\<DropdownLayout/>](#dropdownlayout)
  - [\<FieldWithSelectionComposite/>](#fieldwithselectioncomposite)
  - [\<FillButton/>](#fillbutton)
  - [\<FullTextView/>](#fulltextview)
  - [\<GoogleAddressInputWithLabel/>](#googleaddressinputwithlabel)
  - [\<GoogleAddressInput/>](#googleaddressinput)
  - [\<HBox/>](#hbox)
  - [\<ImageViewer/>](#imageviewer)
  - [\<Input/>](#input)
  - [\<InputArea/>](#inputarea)
  - [\<InputAreaWithLabelComposite/>](#inputareawithlabelcomposite)
  - [\<InputWithOptions/>](#inputwithoptions)
  - [\<LinearProgressBar/>](#linearprogressbar)
  - [\<Loader/>](#loader)
  - [\<MultiSelect/>](#multiselect)
  - [\<MultiSelectComposite/>](#multiselectcomposite)
  - [\<NoBorderInput/>](#noborderinput)
  - [\<NumberInput/>](#numberinput)
  - [\<Page/>](#page)
  - [\<Popover/>](#popover)
  - [\<PopoverMenu/>](#popovermenu)
  - [\<RadioGroup/>](#radiogroup)
  - [\<RichTextInputArea/>](#sidemenu)
  - [\<Search/>](#search)
  - [\<SideMenu/>](#sidemenudrill)
  - [\<SideMenuDrill/>](#richtextinputarea)
  - [\<StatisticsWidget/>](#statisticswidget)
  - [\<StatsWidget/>](#statswidget)
  - [\<TextLink/>](#textlink)
  - [\<Table/>](#table)
  - [\<TableActionCell/>](#tableactioncell)
  - [\<Tag/>](#tag)
  - [\<Tooltip/>](#tooltip)
  - [\<VBox/>](#vbox)

- [Guides](#guides)
  - [Icons](#icons)
  - [error --> status](#error--errormessage----status--statusmessage)
  - [help prop](#help-prop)

# Components

## \<AddItem/>

Props:
- removed `tooltipAppendTo` - use `tooltipProps` instead.
- removed `tooltipContent` - use `tooltipProps` instead.
- removed `tooltipPlacement` - use `tooltipProps` instead.
- removed `tooltipFixed` - use `tooltipProps` instead.
- removed `tooltipFlip` - use `tooltipProps` instead.

_Note: `tooltipProps` are defiled in Tooltip component story page._

Before:
```jsx
<AddItem
  tooltipAppendTo="window"
  tooltipContent="hello"
  tooltipPlacement="top"
  tooltipFixed
  tooltipFlip
/>
```

After:
```jsx
<AddItem
  tooltipProps={
    appendTo: 'window',
    content: 'hello',
    placement: 'top',
    fixed: true,
    flip: true,
  }
/>
```

## \<Avatar/>

Props:
- `color` - Deprecated old values: 'blue', 'green', 'grey', 'red', 'orange'.
- new values are now A1 to A6.

Before:
```jsx
<Avatar color="red" />
```

After:
```jsx
<Avatar color="A1" />
```

## \<AutoCompleteComposite/>

This component was deleted, use `<FormField/>` instead.

Basic example:
```jsx
<AutoCompleteComposite>
  <Component />
</AutoCompleteComposite>
```

Same example using `<FormField/>`:
```jsx
<FormField required>
  <Component />
</FormField>
```

## \<CircularProgressBar/>

Props:
- removed `shouldLoadAsync` - we decided to remove this feature.

Testkit:
- changed `getTooltipErrorMessage` in driver (not uni) returns a `string` instead of `Promise<string>`.
- removed `getTooltip` - use `isErrorIconShown` and `getTooltipErrorMessage` instead.
- removed `isTooltipShown` - use `isErrorIconShown` and `getTooltipErrorMessage` instead.

## \<ColorInput/>

Props:
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.
- removed `hasError` - use `hasStatus` instead.

## \<DataTable/>

This component is _internal_ and should not be used directly - use `<Table/>` instead.

## \<DatePicker/>

Props:
- removed `isOpen` - use `initialOpen` instead.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

An example with the removed `isOpen` prop:
```jsx
<DatePicker isOpen/>
```

Use `initialOpen` instead:
```jsx
<DatePicker initialOpen/>
```

## \<Dropdown/>

Props:
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

## /<DropdownLayout/>

Props:
- removed `theme`

Testkit:
- removed `hasTheme`

## \<FieldWithSelectionComposite/>

This component was deleted, use `<FormField/>` instead.

Basic example:
```jsx
<FieldWithSelectionComposite>
  <Component />
</FieldWithSelectionComposite>
```

Same example using `<FormField/>`:
```jsx
<FormField required>
  <Component />
</FormField>
```

## \<FillButton/>

Props:
- removed `tooltipContent` - use `tooltipProps` instead

_Note: `tooltipProps` are defiled in Tooltip component story page._

Before:

```jsx
<FillButton tooltipContent="hello" />
```

After:
```jsx
<FillButton
  tooltipProps={
    content: 'hello',
  }
/>
```

## \<FullTextView/>

This component was deleted, use `<Text/>` instead.

## \<GoogleAddressInputWithLabel/>

This component was deleted, use `<FormField/>` instead.

Basic example:
```jsx
<GoogleAddressInputWithLabel>
  <Component />
</GoogleAddressInputWithLabel>
```

Same example using `<FormField/>`:
```jsx
<FormField required>
  <Component />
</FormField>
```

## /<GoogleAddressInput/>

Props:
- removed `theme`
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

## \<HBox/>

This component was deleted, use `<Box/>` instead.

## \<ImageViewer/>

Props:
- removed `tooltipPlacement` - use `tooltipProps` instead.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.

Testkit:
- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`
- removed `isErrorVisible` - use `hasStatus` instead
- removed `getErrorTooltipContent` - use `getStatusMessage` instead

Before:
```jsx
<ImageViewer
  tooltipPlacement="top"
/>
```

After:
```jsx
<ImageViewer
  tooltipProps={
    placement: 'top',
  }
/>
```

## \<Input/>

Props:
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.
- removed `units` use `<Input.Affix/>` component instead
- removed `magnifyingGlass` use `<Search/>` component instead
- removed `theme`

Testkit:
- removed `hasHelp`
- removed `clickUnit`
- removed `getUnit`
- removed `hasMagnifyingGlass`
- removed `clickMagnifyingGlass`
- removed `hasExclamation`
- removed `isNarrowError`

Removed sub component `<Input.Units/>` use `<Input.Affix>` instead.

Before:
```jsx
<Dropdown
  prefix={<Input.Units>$</Input.Units>}
/>
```

After:
```jsx
<Dropdown
  prefix={<Input.Affix>$</Input.Affix>}
/>
```

## \<InputArea/>

Props:
- removed `onTooltipShow`.
- removed `theme`.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.
- removed `hasError` - use `hasStatus` & `getStatus` instead.
- removed `hasWarning` - use `hasStatus` & `getStatus` instead.
- removed `getTooltipDataHook`.
- removed `getTooltipElement`.
- removed `isErrorMessageShown`.
- removed `mouseEnterErrorIndicator`.
- removed `getErrorMessage` - use `getStatusMessage` instead.
- removed `getWarningMessage` - use `getStatusMessage` instead.

## \<InputAreaWithLabelComposite/>

This component was deleted, use `<FormField/>` instead.

Basic example:
```jsx
<InputAreaWithLabelComposite>
  <Component />
</InputAreaWithLabelComposite>
```

Same example using `<FormField/>`:
```jsx
<FormField required>
  <Component />
</FormField>
```

## \<InputWithOptions/>

Props:
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `disableClickOutsideWhenClosed`, this functionality is now permanent <br/>
  Just remove this prop, no other change required.

## \<LinearProgressBar/>

Props:
- removed `shouldLoadAsync` - we decided to remove this feature.
Testkit:
- changed `getTooltipErrorMessage` in driver (not uni) returns a `string` instead of a `Promise<string>`.
- removed `getTooltip` - use `isErrorIconShown` and `getTooltipErrorMessage` instead.
- removed `isTooltipShown` - use `isErrorIconShown` and `getTooltipErrorMessage` instead.

## \<Loader/>

Props:
- removed `shouldLoadAsync` - we decided to remove this feature.

## \<MultiSelect/>

Props:
- removed `theme`.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.
- removed `inputWrapperHasError` - use `hasStatus` instead.

## \<MultiSelectComposite/>

This component was deleted, use `<FormField/>` instead.

Basic example:
```jsx
<MultiSelectComposite>
  <Component />
</MultiSelectComposite>
```

Same example using `<FormField/>`:
```jsx
<FormField required>
  <Component />
</FormField>
```

## \<NoBorderInput/>

Props:
- removed `theme`.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.

## \<NumberInput/>

Props:
- removed `theme`.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.

## \<Page/>
// TODO - write a migration guide

Props:
- removed `upgrade` - component is now upgraded by default

## \<Popover/>

Props:
- removed `disableClickOutsideWhenClosed`, this functionality is now permanent <br/>
  Just remove this prop, no other change required.

## \<PopoverMenu/>

Old PopoverMenu component was removed and replaced with new component that was previously available as `beta/PopoverMenu`.

Old PopoverMenu:

```jsx
import PopoverMenu from 'wix-style-react/PopoverMenu';
import PopoverMenuItem from 'wix-style-react/PopoverMenuItem';

<PopoverMenu>
  <PopoverMenuItem onClick={clickHandler} text="Item" />
</PopoverMenu>;
```

New PopoverMenu:

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
  <PopoverMenu.MenuItem onClick={clickHandler} text="Item" />
</PopoverMenu>;
```

## \<RadioGroup/>

Props:
- removed `type`.

Testkit:
- removed `isButtonType`.

Example using removed `type` prop with value `button`:
```jsx
<RadioGroup type="button" />
```

Use `<SegmentedToggle/>` component instead:
```jsx
<SegmentedToggle />
```

## \<RichTextInputArea/>

Props:
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.
- removed `hasError` - use `hasStatus` & `getStatus` instead.
- removed `getErrorMessage` - use `getStatusMessage` instead.

## \<Search/>

Props:
- removed `theme`.
- removed `error` & `errorMessage` to `status` & `statusMessage`. <br/>
  For more information and examples go to [error --> status](#error--errormessage----status--statusmessage) section.
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead. <br/>
  For more information and examples go to [help prop](#help-prop) section.

Testkit:
- added `hasStatus`.
- added `getStatus`.
- added `hasStatusMessage`.
- added `getStatusMessage`.

## \<SideMenu/>
// TODO - write a migration guide
This component was deleted, use `<Sidebar/>` instead.

## \<SideMenuDrill/>
// TODO - write a migration guide
This component was deleted, use `<Sidebar/>` instead.

## \<StatisticsWidget/>

Props:
- removed `statistics` use `items` instead.

## \<StatsWidget/>
// TODO - write a migration guide
Use `<StatisticsWidget/>` instead. See [migration guide](./docs/migration/StatsWidget.md).

## \<TextLink/>
// TODO - write a migration guide
This component was deleted, use `<TextButton as="a"/>` instead.

## \<Table/>

Testkit:
- removed `clickRowChecbox` - removed due to typo, use `clickRowCheckbox` instead

## \<TableActionCell/>
// TODO - write a migration guide

Props:
- removed `upgrade` - component is now upgraded by default
- changed `primaryAction.theme` to `primaryAction.skin` (with new values)

## \<Tag/>

Props:
- removed `wrap` - now text has ellipsis by default

## \<Tooltip/>
// TODO - write a migration guide

Props:
- removed `upgrade` - component is now upgraded by default

## \<VBox/>

This component was deleted, use `<Box/>` instead.

# Guides

## Icons
- Icons from `wix-style-react/new-icons` import path were removed. Please install and use icons from `wix-ui-icons-common` package directly. You can migrate your existing codebase using provided codemod, please see [migration guide](./docs/migration/ICONS.md) for more details.

## error & errorMessage --> status & statusMessage

Props:

- changed `error` to `status`
- changed `errorMessage` to `statusMessage`
- removed `theme` - Look at `<Input/>` component migration guide for more information.

Testkit:

- added `hasStatus`
- added `getStatus`
- added `hasStatusMessage`
- added `getStatusMessage`
- \~ \~ \~
- removed `hasError` - use `hasStatus` and `getStatus` instead
- removed `inputWrapperHasError` - use `hasStatus` and `getStatus` instead
- removed `isErrorVisible` - use `hasStatus` instead
- removed `getErrorTooltipContent` - use `getStatusMessage` instead
- \~ \~ \~
- _Look at `<Input/>` component migration guide for more information._

Before:

```jsx
<NumberInput error errorMessage="Error!" />
```

After:

```jsx
<NumberInput status="error" statusMessage="Error!" />
```

## help prop

[Help prop section](#help-prop)
Props:
- removed `help` and `helpMessage` use a `<FormField/>` wrapper instead

Testkit:
- removed `hasHelp` - use `<FormField/>` testkit instead

Before:
```jsx
<NumberInput help helpMessage="Help!" />
```

After:
```jsx
<FormField infoContent="Help!">
  <NumberInput />
</FormField>
```
