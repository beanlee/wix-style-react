export const importExample = `import { FormField, Input } from 'wix-style-react';`;

export const sizes = `
<Layout>
  <Cell>
    <FormField label="Field label">
      <Input size="small" placeholder="Placeholder" />
    </FormField>
  </Cell>

  <Cell>
    <FormField label="Field label">
      <Input size="normal" placeholder="Placeholder" />
    </FormField>
  </Cell>

  <Cell>
    <FormField label="Field label">
      <Input size="large" placeholder="Placeholder" />
    </FormField>
  </Cell>
</Layout>
`;

export const affix = `
<Layout>
  <Cell>
    <FormField label="Field label">
      <Input size="normal" placeholder="Placeholder" prefix={<Input.Affix>$</Input.Affix>}/>
      </FormField>
  </Cell>

  <Cell>
    <FormField label="Field label">
      <Input size="normal" placeholder="Placeholder" suffix={<Input.Affix>Kg.</Input.Affix>}/>
    </FormField>
  </Cell>
</Layout>
`;

export const charLimit = `
<FormField label="Field label">
  {({setCharactersLeft}) =>
    <Input onChange={event => setCharactersLeft(100 - event.target.value.length)} placeholder="Placeholder"/>
  }
</FormField>
`;

export const required = `
<FormField label="Field label" required>
  <Input size="normal" placeholder="Placeholder" required/>
</FormField>
`;

export const position = `
<Layout>
  <Cell>
    <FormField label="Field label" infoContent="Tooltip text" required>
      {({setCharactersLeft}) =>
        <Input onChange={event => setCharactersLeft(100 - event.target.value.length)} placeholder="Placeholder" required/>
      }
    </FormField>
  </Cell>

  <Cell>
    <FormField label="Field label" infoContent="Tooltip text" labelPlacement="left" required>
      {({setCharactersLeft}) =>
        <Input onChange={event => setCharactersLeft(100 - event.target.value.length)} placeholder="Placeholder" required/>
      }
    </FormField>
  </Cell>

  <Cell>
    <FormField label="Field label" infoContent="Tooltip text" labelPlacement="right" required>
      {({setCharactersLeft}) =>
        <Input onChange={event => setCharactersLeft(100 - event.target.value.length)} placeholder="Placeholder" required/>
      }
    </FormField>
  </Cell>
</Layout>
`;
