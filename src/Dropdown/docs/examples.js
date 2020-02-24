export const simple = `
  <Dropdown
    placeholder="Select an option"
    options={[{id: 0, value: 'Left'}, {id: 1, value: 'Right'}, {id: 2, value: 'Ambidextrous'}]}
    />
`;

export const group = `
  <Dropdown
    placeholder="Select an option"
    options={[
      { id: 'first title', value: 'title #1', title: true },
{ id: 1, value: 'Option 1' },
{ id: 'title', value: 'title #2', title: true },
{ id: 2, value: 'Option 2' },
{ id: 4, value: 'Option 3' },
    ]}
    />
`;

export const sizes = `
<Layout>
  <Cell>
      <Dropdown
        size="small"
        placeholder="Select an option"
        options={[{id: 0, value: 'Left'}, {id: 1, value: 'Right'}, { id: -99, value: '-' }, {id: 2, value: 'Ambidextrous'}]}
        />
  </Cell>
  <Cell>
      <Dropdown
        size="medium"
        placeholder="Select an option"
        options={[{id: 0, value: 'Left'}, {id: 1, value: 'Right'}, { id: -99, value: '-' }, {id: 2, value: 'Ambidextrous'}]}
        />
  </Cell>
  <Cell>
    <Dropdown
      size="large"
      placeholder="Select an option"
      options={[{id: 0, value: 'Left'}, {id: 1, value: 'Right'}, { id: -99, value: '-' }, {id: 2, value: 'Ambidextrous'}]}
      />
  </Cell>
</Layout>
`;

export const divider = `
  <Dropdown
    placeholder="Select an option"
    options={[{id: 0, value: 'Left'}, {id: 1, value: 'Right'}, { id: -99, value: '-' }, {id: 2, value: 'Ambidextrous'}]}
    />
`;

export const prefix = `
  <Dropdown
    placeholder="Select an option"
    prefix={<Input.Affix>$</Input.Affix>}
    options={[{id: 0, value: '35'}, {id: 1, value: '40'}, {id: 2, value: '50'}]}
    />
`;

export const suffix = `
  <Dropdown
    placeholder="Select an option"
    suffix={<Input.Affix>%</Input.Affix>}
    options={[{id: 0, value: '35'}, {id: 1, value: '40'}, {id: 2, value: '50'}]}
    />
`;

export const footer = `
  <Dropdown
    placeholder="Select an option"
    fixedFooter={<div style={{ display: 'flex', justifyContent: 'space-around', padding: '15px 24px', alignItems: 'center'}}><TextButton skin="dark" underline="always">Clear</TextButton><Button>Apply</Button></div>}
    options={[{id: 0, value: 'Left'}, {id: 1, value: 'Right'}, {id: 2, value: 'Ambidextrous'},{ id: -99, value: '-' }]}
    />
`;

export const states = `
<Layout cols={2}>
<Dropdown
  options={[
    { id: 0, value: 'Option 1' },
    { id: 1, value: 'Option 2' },
    { id: 2, value: 'Option 3' },
    { id: 3, value: 'Option 4' },
  ]}
  disabled
  placeholder="Select an option"
/>
<Dropdown
  options={[
    { id: 0, value: 'Option 1' },
    { id: 1, value: 'Option 2' },
    { id: 2, value: 'Option 3' },
    { id: 3, value: 'Option 4' },
  ]}
  status="error"
  statusMessage="I am in error state"
  placeholder="Select an option"
/>
</Layout>
`;

export const widthConstraints = `
<Layout cols={1}>
  <Dropdown
    options={[
      { id: 0, value: 'Very long long long long long long long long long long long long long long option' },
      { id: 1, value: 'Option 2' },
      { id: 2, value: 'Option 3' },
      { id: 3, value: 'Option 4' },
    ]}
    placeholder="Default"
  />
  <Dropdown
    popoverProps={{ appendTo: "window", maxWidth: "600px" }}
    options={[
      { id: 0, value: 'Very long long long long long long long long long long long long long long option' },
      { id: 1, value: 'Option 2' },
      { id: 2, value: 'Option 3' },
      { id: 3, value: 'Option 4' },
    ]}
    placeholder="Detached"
  />
</Layout>
`;

export const heightConstraints = `
<Dropdown
  maxHeightPixels="107px"
  options={[
    { id: 0, value: 'Option 1' },
    { id: 1, value: 'Option 2' },
    { id: 2, value: 'Option 3' },
    { id: 3, value: 'Option 4' },
  ]}
  placeholder="Select an option"
/>
`;

export const native = `
<Dropdown
  options={[
    { id: 0, value: 'Option 1' },
    { id: 1, value: 'Option 2' },
    { id: 2, value: 'Option 3' },
    { id: 3, value: 'Option 4' },
  ]}
  placeholder="Select an option"
  native
/>
`;

export const infinite = `
class ExampleInfiniteScroll extends React.Component {
  constructor(props) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.itemsPerPage = 15;
    this.total = 300;
    this.state = { hasMore: true, data: [] };
  }

  fetchApi = () => {
    const { data } = this.state;
     // Simulate fetching data from api
     const fetchedData = Array.from(Array(this.itemsPerPage).keys()).reduce((prev, curr, index) => {
       const optionIndex = data.length + index
       return [...prev, { id: optionIndex, value: 'option' + optionIndex}]}, [])
    this.setState(({data}) => ({ data: [...data, ...fetchedData] })) ;
  };

  loadMore() {
    const loadMoreData = () => {
      if (this.state.data.length >= this.total) {
        this.setState({ hasMore: false });
      } else {
        this.fetchApi();
      }
    };
    setTimeout(loadMoreData, 500);
  }

  render = () => {
    return (
        <Dropdown
          placeholder="Select an option"
          infiniteScroll
          hasMore={this.state.hasMore}
          loadMore={this.loadMore}
          options={this.state.data}
        />
    );
  };
}
`;

export const overflow = `
<div style={{ display:'flex', justifyContent:'center', alignItems: 'center', width: '400px', height: '150px', background: 'rgba(240, 244, 247, 1)', overflow:'scroll'}}>
  <Dropdown
    popoverProps={{ appendTo:"window" }}
    options={[
      { id: 0, value: 'Option 1' },
      { id: 1, value: 'Option 2' },
      { id: 2, value: 'Option 3' },
      { id: 3, value: 'Option 4' },
    ]}
    placeholder="Select an option"
  />
</div>
`;
