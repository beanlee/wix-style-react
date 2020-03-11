export const importExample = `import { FormField, NumberInput } from 'wix-style-react';`;

export const sizes = `
<Layout>
  <Cell>
    <FormField label="Field label">
      <NumberInput size="small" placeholder="Placeholder" />
    </FormField>
  </Cell>

  <Cell>
    <FormField label="Field label">
      <NumberInput size="normal" placeholder="Placeholder" />
    </FormField>
  </Cell>

  <Cell>
    <FormField label="Field label">
      <NumberInput size="large" placeholder="Placeholder" />
    </FormField>
  </Cell>
</Layout>
`;

export const affix = `
<Layout>
  <Cell>
    <FormField label="Field label">
      <NumberInput size="normal" placeholder="Placeholder" prefix={<Input.Affix>$</Input.Affix>}/>
      </FormField>
  </Cell>

  <Cell>
    <FormField label="Field label">
      <NumberInput size="normal" placeholder="Placeholder" suffix={<Input.Affix>Kg.</Input.Affix>}/>
    </FormField>
  </Cell>
</Layout>
`;

export const required = `
<FormField label="Field label" required>
  <NumberInput size="normal" placeholder="Placeholder" required/>
</FormField>
`;

export const position = `
<Layout>
  <Cell>
    <FormField label="Field label" infoContent="Tooltip text" required>
        <NumberInput placeholder="Placeholder" required/>
    </FormField>
  </Cell>

  <Cell>
    <FormField label="Field label" infoContent="Tooltip text" labelPlacement="left" required>
        <NumberInput placeholder="Placeholder" required/>
    </FormField>
  </Cell>

  <Cell>
    <FormField label="Field label" infoContent="Tooltip text" labelPlacement="right" required>
        <NumberInput placeholder="Placeholder" required/>
    </FormField>
  </Cell>
</Layout>
`;
