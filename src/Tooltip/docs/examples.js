export const flip = `
class TooltipFlip extends React.Component {

  render() {
    return (
    <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
    >
      <div
        data-hook="story-popover-fixed-disabled"
        style={{
          overflow: 'auto',
          height: 120
        }}
      >
        <div style={{ padding: '70px 500px 100px 450px', display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%' }} >
            <Tooltip appendTo="scrollParent" content="I am here">
              <TextButton size="small">
                Focus
              </TextButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
    )
  }
}
`;

export const flipnot = `
class TooltipFlip extends React.Component {

  render() {
    return (
    <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
    >
      <div
        data-hook="story-popover-fixed-disabled"
        style={{
          overflow: 'auto',
          height: 120,
        }}
      >
        <div style={{ padding: '70px 500px 100px 450px', display: 'flex', justifyContent: 'center' }}>
          <Tooltip flip={false} appendTo="scrollParent" content="I am here">
            <TextButton size="small">
               Focus
            </TextButton>
          </Tooltip>
        </div>
      </div>
    </div>
    )
  }
}
`;

export const fixed = `
class TooltipFixed extends React.Component {

  render() {
    return (
    <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
    >
      <div
        data-hook="story-popover-fixed-disabled"
        style={{
          overflow: 'auto',
          height: 120,
        }}
      >
        <div style={{ padding: '70px 500px 100px 450px', display: 'flex', justifyContent: 'center' }}>
          <Tooltip fixed appendTo="scrollParent" content="I am here">
            <TextButton fullWidth size="small">
               Focus
            </TextButton>
          </Tooltip>
        </div>
      </div>
    </div>
    )
  }
}
`;

export const parent = `
<Layout cols={1} justifyItems="center">
  <Tooltip appendTo="parent" content="Enter your postal code, so postman can easier send you a mail.">
    <TextButton>Parent</TextButton>
  </Tooltip>
</Layout>
`;

export const window = `
<Layout cols={1} justifyItems="center">
  <Tooltip appendTo="window" content="Enter your postal code, so postman can easier send you a mail.">
    <TextButton>Window</TextButton>
  </Tooltip>
</Layout>
`;

export const viewport = `
<Layout cols={1} justifyItems="center">
  <Tooltip appendTo="viewport" content="Enter your postal code, so postman can easier send you a mail.">
    <TextButton>Viewport</TextButton>
  </Tooltip>
</Layout>
`;

export const predicate = `
<div data-hook="hello">
  <Layout cols={1} justifyItems="center">
    <Tooltip appendTo={elm => elm.getAttribute('data-hook') === ('hello')} content="Enter your postal code, so postman can easier send you a mail.">
      <TextButton>Attach custom (By predicate)</TextButton>
    </Tooltip>
  </Layout>
 </div>
`;

export const scrollParent = `
class TooltipFixed extends React.Component {

  render() {
    return (
    <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
    >
      <div
        data-hook="story-popover-fixed-disabled"
        style={{
          overflow: 'auto',
          height: 50,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div style={{ padding: '15px 25px 20px' }}>
          <Tooltip fixed appendTo="scrollParent" content="I am here">
            <TextButton size="small">
               ScrollParent
            </TextButton>
          </Tooltip>
        </div>
      </div>
    </div>
    )
  }
}
`;

export const focus = `
<Layout cols={2} justifyItems="center" alignItems="center">
  <Tooltip content="i am tooltip">
    <button>native</button>
  </Tooltip>
  <Tooltip content="i am tooltip">
    <TextButton>TextButton</TextButton>
  </Tooltip>
</Layout>
`;

export const a11y = `
<Layout cols={2} justifyItems="center" alignItems="center">
<Tooltip content="i am tooltip" aria-describedby="tooltip:1">
  <TextButton>tooltip:1</TextButton>
</Tooltip>
<Tooltip content="i am tooltip" aria-describedby="tooltip:2">
  <TextButton>tooltip:2</TextButton>
</Tooltip>
</Layout>
`;
