export const importExample = `import { FormField, InputArea }  from 'wix-style-react';`;

export const basicExample = `
<FormField label="Text Area label">
  <InputArea
    placeholder="placeholder text"
  />
</FormField>
`;

export const charLimitExample = `
<FormField label="Text Area label">
  {({setCharactersLeft}) =>
    <InputArea onChange={event => setCharactersLeft(100 - event.target.value.length)} placeholder="placeholder text"/>
  }
</FormField>
`;

export const resizableHeightExample = `
<FormField
label="Text Area label"
>
  <InputArea
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
        <InputArea
          onChange={event => setCharactersLeft(100 - event.target.value.length)}
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
      labelPlacement="left"
      labelAlignment="top"
      required
    >
      {({ setCharactersLeft }) => (
        <InputArea
          onChange={event => setCharactersLeft(100 - event.target.value.length)}
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
      labelAlignment="top"
      required
    >
      {({ setCharactersLeft }) => (
        <InputArea
          onChange={event => setCharactersLeft(100 - event.target.value.length)}
          placeholder="placeholder text"
          required
        />
      )}
    </FormField>
  </Cell>
</Layout>
`;
