export const importExample = `import { Tooltip, TexButton, Text } from 'wix-style-react';`;

export const basic = `
<Layout cols={1} justifyItems="center">
  <Tooltip appendTo="window" content="Enter your postal code, so postman can easier send you a mail.">
    <Text>Hover me</Text>
  </Tooltip>
</Layout>
`;

export const placements = `
class PlacementExample extends React.Component {

  constructor() {
    super();
    this.state = { placement: 0 };
    this.changeDirection = this.changeDirection.bind(this);
    this.VALID_PLACEMENTS = [
      'top',
      'right',
      'bottom',
      'left'
    ]
  }

  changeDirection() {
    this.setState({
      placement: (this.state.placement + 1) % this.VALID_PLACEMENTS.length,
    });
  };

  render() {
    const placement = this.VALID_PLACEMENTS[this.state.placement];
    return (
      <Layout cols={1} justifyItems="center">
        <Tooltip content={placement} placement={placement} appendTo="window">
          <TextButton onClick={this.changeDirection}>Click me to change the placement</TextButton>
        </Tooltip>
      </Layout>
    );
  }
}
`;

export const delay = `
<Layout cols={1} justifyItems="center">
  <Tooltip enterDelay={350} exitDelay={350} appendTo="window" content="Lagging...">
    <Text>Hover me</Text>
  </Tooltip>
</Layout>
`;

export const size = `
<Layout cols={2} justifyItems="center">
  <Tooltip size="small" appendTo="window" content="Tooltip">
    <Text>small</Text>
  </Tooltip>
  <Tooltip size="medium" appendTo="window" content="Tooltip">
    <Text>medium (default)</Text>
  </Tooltip>
</Layout>
`;

export const disabled = `
<Layout cols={2} justifyItems="center">
  <Tooltip  appendTo="window" content="You don't have permission to do this">
    <TextButton disabled>Native Element</TextButton>
  </Tooltip>
  <Tooltip appendTo="window" content="You don't have permission to do this">
    <span>
      <TextButton disabled>With span</TextButton>
    </span>
  </Tooltip>
</Layout>
`;
