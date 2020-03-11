const dropDown = `
<PopoverMenu
  triggerElement={
<TextButton size="tiny" prefixIcon={<Icons.Add />}>
Insert Variable</TextButton>  }
>
{['First', 'Second', 'Third', 'Fourth'].map(v => (
  <PopoverMenu.MenuItem
    text={\`\${v} Option\`}
    onClick={() => this._ref.insertVariable(\`\${v} Option\`)}
  />
))}
</PopoverMenu>`;
const _actionExample = ({
  initialValue = '{{Variable 1}} Text {{Variable 2}} Text',
  variableParser = k => k,
  rows = 1,
  size = 'medium',
  action = false,
  info = false,
  required = false,
  labelPlacement = false,
} = {}) => `
  <FormField
    ${labelPlacement === 'right' ? '' : 'label="Variable Input"'}
    ${info ? 'infoContent="I help you to fill info"' : ''}
    ${required ? 'required' : ''}
    ${labelPlacement ? `labelPlacement="${labelPlacement}"` : ''}
    ${action ? `suffix={${dropDown}}` : ''}
    >
      <VariableInput
        initialValue="${initialValue}"
        variableParser={${variableParser}}
        rows={${rows}}
        size="${size}"
        ${action ? `ref={ref => {this._ref = ref}}` : ''}
      />
  </FormField>
`;
const _cellWrapper = (title, content) => {
  return `<Cell>
  <Box marginBottom="12px">
    <Heading appearance="H4">${title}</Heading >
  </Box>
  ${content}
</Cell>`;
};
export const importExample = `import { FormField, TextButton, VariableInput } from 'wix-style-react'`;

export const sizes = `
<Layout>
  ${_cellWrapper('Small', _actionExample({ size: 'small' }))}

  ${_cellWrapper('Medium', _actionExample({ size: 'medium' }))}

  ${_cellWrapper('Large', _actionExample({ size: 'large' }))}
</Layout>
`;

export const action = `class myExample extends React.Component {
  render() {
    return (
<Layout>
  ${_cellWrapper('Enabled', _actionExample({ rows: 3, action: true }))}

  ${_cellWrapper('None', _actionExample({ rows: 3 }))}
</Layout>)
    }
  }
`;

export const info = `
<Layout>
  ${_cellWrapper('Enabled', _actionExample({ info: true }))}

  ${_cellWrapper('None', _actionExample())}
</Layout>
`;
export const required = `
<Layout>
  ${_cellWrapper('Enabled', _actionExample({ required: true }))}

  ${_cellWrapper('None', _actionExample())}
</Layout>
`;
export const labelPlacement = `
<Layout>
  ${_cellWrapper('Top', _actionExample())}

  ${_cellWrapper(
    'Start',
    _actionExample({ labelPlacement: 'left', required: true, info: true }),
  )}

  ${_cellWrapper(
    'None',
    _actionExample({ labelPlacement: 'right', required: true, info: true }),
  )}
</Layout>
`;
