# Mobile Web Guidelines

This document describes best practices to create a mobile-friendly web application using wix-style-react.

Here's a [demo application](https://apps.wix.com/wix-style-react-mobile) that follows the practices below (also rendered with [SSR](https://apps.wix.com/wix-style-react-mobile/ssr)).

## Table of Contents

- [Fluid Design](#fluid-design)
- [Responsive Design](#responsive-design)
- [Native Controls](#native-controls)
- [Testing](#testing)
- [Server-Side Rendering](#server-side-rendering)

## Fluid Design

ℹ Fluid Design means that elements adapt and scale relatively to any viewport size.

- Use [`<Page/>`](https://wix-style-react.now.sh/?path=/story/components-api-components--page)'s `minWidth` prop to make the page content be fluid for small viewports.

  > Why? The page content has default `minWidth` which might not be suitable for small viewports.

  ```jsx
  <Page minWidth={0}>
    <Page.Header title="Title" />
    <Page.Content>Content</Page.Content>
  </Page>
  ```

- Use [`<Container/>`](https://wix-style-react.now.sh/?path=/story/components-api-components--grid)'s `fluid` prop to make the grid container be completely fluid.

  > Why? The grid container has default `minWidth` and `maxWidth` which might not be suitable for small or large viewports.

  ```jsx
  <Container fluid>
    <Row>
      <Col>Content</Col>
    </Row>
  </Container>
  ```

- Use [`<ModalMobileLayout/>`](https://wix-style-react.now.sh/?path=/story/components-api-components--modalmobilelayout) to display a fluid modal layout.

  > Why? This modal layout adapts to all viewport sizes.

  ```jsx
  <ModalMobileLayout
    title="Title"
    content={<div>Content</div>}
    footer={<div>Footer</div>}
  />
  ```

- Use [`Grid's family`](https://wix-style-react.now.sh/?path=/story/components-api-components--grid) to display a fluid grid (instead of [`<Box/>`](https://wix-style-react.now.sh/?path=/story/components-api-components--box) or [`<Layout/>`](https://wix-style-react.now.sh/?path=/story/components-api-components--layout)).

  > Why? The grid's family provides a pretty strict (but simple) structure of API for creating a two-dimensional layout (which means, grid). Using `<Layout/>` for this case is possible but not ideal, because we don't use its main benefit (flexibility) while it arrives with less structural API (no columns, just cells), so the meaning might be less intuitive. In contrast, `<Box/>` is a one-dimensional layout that doesn't fit this case at all (we could combine two `<Box/>` to make a grid but there are no actual benefits but rather just redundant complexity).

  ```jsx
  <Container fluid>
    <Row>
      <Col>Header</Col>
    </Row>
    <Row>
      <Col span={6}>Left</Col>
      <Col span={6}>Right</Col>
    </Row>
  </Container>
  ```

- Use [`<Button/>`](https://wix-style-react.now.sh/?path=/story/components-api-components--button)'s `fullWidth` prop to make the button be completely fluid (as necessary).

  > Why? The default button width is determined by the text, however sometimes it should be fluid (mainly when emphasizing the button presence).

  ```jsx
  <Button fullWidth>Text</Button>
  ```

**[⬆ Back to top](#table-of-contents)**

## Responsive Design

ℹ Responsive Design means that elements change behavior or style on different devices and viewports.

- Use the meta viewport tag to determine the width and scaling of the browser's viewport.

  > Why? Viewport is the area within the browser which actually displays the webpage.
  > Mobile browsers render firstly the webpage within a virtual viewport (that usually wider than the device's screen), and then, the viewport is shrunk down to fit the physical dimensions of the screen.
  > This might cause the content to seem shrunk as well. Using `width=device-width` makes the virtual viewport to match the physical dimensions from the beginning, so the browser renders the content by its own screen without shrinking.
  > Notice that rotating the device to landscape wides the virtual viewport, which eventually might lead to the same problem. Using `initial-scale=1` adjusts the CSS pixels and device-independent pixels to be in a 1:1 relationship, regardless of device orientation.

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  ```

- Use a media query to modify the element's style and behavior, based on the device properties.

  > Why? It allows making responsive elements that look well and function in all viewport sizes and various devices.

- Use [react-responsive](https://github.com/contra/react-responsive) instead of using `window.matchMedia` web API directly.

  > Why? Without the library, it means you need to manage an event listener for the window resize or media query change on our own, when the library already does that **efficiently**.

  ```javascript
  // bad
  const { matches: isTablet } = window.matchMedia('(max-width: 1194px)');

  // good
  import { useMediaQuery } from 'react-responsive';
  const isTablet = useMediaQuery({ maxWidth: '1194px' });
  ```

- Use the specified design system breakpoints.

  > Why? These breakpoints are recommended by the design system, considering all of the devices and constraints.

  ```javascript
  import { useMediaQuery } from 'react-responsive';
  const isMobile = useMediaQuery({ maxWidth: 'TBD' });
  const isTablet = useMediaQuery({ maxWidth: '1194px' });
  const isDesktop = useMediaQuery({ maxWidth: 'TBD' });
  ```

- Create your breakpoint component wrappers.

  > Why? These semantic and reusable wrappers guarantee you import react-responsive only in one place and define the breakpoints once.

  ```jsx
  // option 1 - `MediaQuery` component
  import React from "react";
  import MediaQuery from "react-responsive";
  const Tablet = ({ children }) => (
    <MediaQuery maxWidth="1194px">{children}</MediaQuery>
  );

  // option 2 - `useMediaQuery` hook
  import { useMediaQuery } from "react-responsive";
  const Tablet = ({ children }) => {
    const isTablet = useMediaQuery({ maxWidth: "1194px" });
    return isTablet ? children : null;
  };

  // usage
  render() {
    return (
      <Tablet>
        <div>This appears only for tablet devices</div>
      </Tablet>
    );
  }
  ```

- Use [`<Layout/>`](https://wix-style-react.now.sh/?path=/story/components-api-components--layout) to display a responsive grid (instead of [`Grid's family`](https://wix-style-react.now.sh/?path=/story/components-api-components--grid)).

  > Why? `<Layout/>` is much flexible than Grid's family, which makes it easier to restructure (no columns, just cells) - especially when we need to change the amount of columns and the gap using media query.

  ```jsx
  import { useMediaQuery } from "react-responsive";
  const isTablet = useMediaQuery({ maxWidth: "1194px" });

  render() {
    return (
      <Layout cols={isTablet ? 6 : 12} gap={isTablet ? 20 : 30}>
        <Cell span={6}>
          Content
        </Cell>
        <Cell span={6}>
          Content
        </Cell>
      </Layout>
    );
  }
  ```

**[⬆ Back to top](#table-of-contents)**

## Native Controls

ℹ Native Controls refers to standard elements that are available and integrated for any browser, regardless of the device, but applies the style of that browser.

- Use [`<Dropdown/>`](https://wix-style-react.now.sh/?path=/story/components-api-components--dropdown)'s `native` prop to display the native dropdown menu (example: [native only for mobile](https://github.com/wix-private/wix-style-react-mobile/blob/master/src/components/Content/BasicInfo/BasicInfo.tsx#L48)).

> Why? For mobile devices, the selection experience is mostly better when using native dropdown.

```jsx
<Dropdown
  options={[
    { id: 0, value: 'Option 1' },
    { id: 1, value: 'Option 2' },
  ]}
  native
/>
```

**[⬆ Back to top](#table-of-contents)**

## Testing

- Use react-responsive's Context to set the viewport while testing responsive components with JSDOM.

> Why? It allows setting the device properties easily, without messing with simulating a `resize` event.

```jsx
import { render } from '@testing-library/react';
import React from 'react';
import { useMediaQuery, Context as ResponsiveContext } from 'react-responsive';
import Button from 'wix-style-react/Button';

const isTablet = useMediaQuery({ maxWidth: '1194px' });
const App = () => (
  <div>{isTablet && <Button dataHook="my-button">Text</Button>}</div>
);

describe('App', () => {
  it('should render the button on tablet', async () => {
    const { findByTestId } = render(
      <ResponsiveContext.Provider value={{ width: 1194 }}>
        <App />
      </ResponsiveContext.Provider>,
    );

    // Assuming testIdAttribute is configured to be 'data-hook', as described here:
    // https://testing-library.com/docs/dom-testing-library/api-configuration
    expect(await findByTestId('my-button')).not.toBe(null);
  });
});
```

- Use Puppeteer's device descriptors to set the viewport while testing responsive webpages with Puppeteer.

> Why? It allows setting the device properties easily and simply.

```js
import { buttonTestkitFactory } from 'wix-style-react/dist/testkit/puppeteer';
const { devices } = require('puppeteer');

// Assuming our app component renders the following on tablet viewport sizes:
// <Button dataHook="my-button">Text</Button>

describe('App', () => {
  const iPad = devices['iPad Pro'];
  let buttonTestkit;

  beforeEach(
    async () =>
      (buttonTestkit = await buttonTestkitFactory({
        dataHook: 'my-button',
        page,
      })),
  );

  it('should not display the button on desktop', async () => {
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.goto(app.getUrl('/'));

    expect(await buttonTestkit.exists()).toBe(false);
  });

  it('should display the button on tablet', async () => {
    await page.emulate(iPad);
    await page.goto(app.getUrl('/'));

    expect(await buttonTestkit.getButtonTextContent()).toBe('Text');
  });
});
```

**[⬆ Back to top](#table-of-contents)**

## Server-Side Rendering

⚠️ Make sure you've configured the `.st.css` files [hook](https://github.com/wix/wix-style-react/blob/master/docs/FAQ/README.md#making-server-side-rendering-ssr-work) and [imported](https://github.com/wix/wix-style-react/blob/master/docs/FAQ/README.md#components-do-not-have-styling-in-the-first-render-of-server-side-rendering-ssr) the Stylable output separately.

- Prefer applying media queries using CSS over device-based APIs (such as `matchMedia` or react-responsive) when possible.

> Why? The server doesn't recognize the `window` neither `document`. This means that the device properties, including viewport size, aren't detectable and the server-rendered markup might be defective. In contrast, media queries that are applied using CSS will be included in the markup, which is hydrated later and detected by the browser.

- Use `userAgent` to detect information regarding the device.

> Why? It allows inferring the device type from the client and passing that to the server-side renderer.

```javascript
const userAgent = req.headers['user-agent'] || '';

const isMobile = ['mobile', 'tablet'].some(deviceType =>
  userAgent.toLowerCase().includes(deviceType),
);
```

- Use react-responsive's Context to manually prepare the viewport measurements for the initial render.

> Why? It allows passing the `value` prop through the responsive components thereby matching the server-rendered markup before the hydration process.

```jsx
import React from 'react';
import { Context as ResponsiveContext } from 'react-responsive';
import App from './components/App';

const appHtml = renderToString(
  <ResponsiveContext.Provider
    value={{
      // isMobile is inferred out of the `userAgent`
      width: isMobile ? 1194 : TBD,
    }}
  >
    <App />
  </ResponsiveContext.Provider>,
);
```

**[⬆ Back to top](#table-of-contents)**
