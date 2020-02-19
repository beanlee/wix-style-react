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

## Changed

- `<TableActionCell/>` - replaced `primaryAction.theme` with `primaryAction.skin` (with new values).
- `<TableActionCell/>` - removed `upgrade` prop, new upgrade behaviour is enabled by default.
