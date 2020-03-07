export const plain = `<AddItem>Add Item</AddItem>`;

export const themes = `
<Layout gap={10} cols={1}>
  <div style={{ height: '55px'}}>
    <AddItem theme="dashes">Add Item</AddItem>
  </div>
  <div style={{ height: '55px'}}>
    <AddItem theme="plain">Add Item</AddItem>
  </div>
  <div style={{ height: '55px'}}>
    <AddItem theme="filled">Add Item</AddItem>
  </div>
  <div>
    <AddItem theme="image" tooltipProps={{content: 'Add Item'}}>Add Item</AddItem>
  </div>
</Layout>
`;

export const alignItems = `
<Layout gap={10} cols={1}>
  <div style={{ height: '55px'}}>
    <AddItem alignItems="center" theme="plain">Add Item</AddItem>
  </div>
  <div style={{ height: '55px'}}>
    <AddItem alignItems="left" theme="plain">Add Item</AddItem>
  </div>
  <div style={{ height: '55px'}}>
    <AddItem alignItems="right" theme="plain">Add Item</AddItem>
  </div>
</Layout>
`;

export const sizes = `
  <Layout gap={10} cols={1} justifyItems="center">
    <div style={{ height: '130px', width: '250px'}}>
      <AddItem size="large">Add Item</AddItem>
    </div>
    <div style={{ height: '100px', width: '250px'}}>
      <AddItem size="medium">Add Item</AddItem>
    </div>
    <div style={{ height: '70px', width: '250px'}}>
      <AddItem size="small">Add Item</AddItem>
    </div>
    <div style={{ height: '55px',  width: '250px'}}>
      <AddItem size="tiny">Add Item</AddItem>
    </div>
  </Layout>
`;

export const states = `<AddItem disabled>Add Item</AddItem>`;

export const content = `
  <Layout gap={10} cols={1} justifyItems="center">
    <div style={{ height: '130px', width: '250px'}}>
      <AddItem size="large"/>
    </div>
    <div style={{ height: '55px', width: '250px'}}>
      <AddItem size="tiny">Add Item</AddItem>
    </div>
  </Layout>
`;

export const showIcon = `<AddItem showIcon={false}>Add Item</AddItem>`;

export const removePadding = `<AddItem showIcon={false} removePadding={true}>Add Item</AddItem>`;
