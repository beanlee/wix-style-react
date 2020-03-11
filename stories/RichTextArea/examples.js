export const importExample = `import { FormField, RichTextInputArea } from 'wix-style-react';`;

export const basicExample = `
<FormField label="Rich Text Area label">
  <RichTextInputArea
    placeholder="placeholder text"
  />
</FormField>
`;

export const charLimitExample = `
<FormField label="Rich Text Area label">
  {({ setCharactersLeft }) => (
    <RichTextInputArea
      onChange={(htmlText, { plainText }) => setCharactersLeft(100 - plainText.length)}
    />
  )}
</FormField>
`;

export const resizableHeightExample = `
<FormField
label="Rich Text Area label"
>
  <RichTextInputArea
    placeholder="placeholder text"
    resizable
  />
</FormField>
`;

export const positionExample = `
<Layout>
  <Cell>
    <FormField label="Text Area label" infoContent="Tooltip text" required>
      {({ setCharactersLeft }) => (
        <RichTextInputArea
          placeholder="placeholder text"
          required
        />
      )}
    </FormField>
  </Cell>

  <Cell >
    <FormField
      label="Text Area label"
      infoContent="Tooltip text"
      labelPlacement="left"
      required
    >
      {({ setCharactersLeft }) => (
        <RichTextInputArea
          placeholder="placeholder text"
          required
        />
      )}
    </FormField>
  </Cell>

  <Cell>
    <FormField
      label="Text Area label"
      infoContent="Tooltip text"
      labelPlacement="right"
      required
    >
      {({ setCharactersLeft }) => (
        <RichTextInputArea
          placeholder="placeholder text"
          required
        />
      )}
    </FormField>
  </Cell>
</Layout>
`;
