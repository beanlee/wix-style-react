### Testkit API

| method           | arguments | returned value     | description                                       |
| ---------------- | --------- | ------------------ | ------------------------------------------------- |
| exists()         | -         | `Promise<boolean>` | returns true if trigger element exists on the DOM |
| tooltipExists()  | -         | `Promise<boolean>` | returns true if tooltip element exists on the DOM |
| mouseEnter()     | -         | `Promise<void>`    | mouse over the target element                     |
| mouseLeave()     | -         | `Promise<void>`    | mouse leaves the target element                   |
| getTooltipText() | -         | `Promise<string>`  | returns tooltips content value in string          |

### ReactTestUtils Example

```javascript
import React from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';
import Tooltip from 'wix-style-react/Tooltip';
import { TooltipTestkit } from 'wix-style-react/dist/testkit';

const div = document.createElement('div');
const dataHook = 'myDataHook';

const component = (
  <div>
    <Tooltip dataHook={dataHook} />
  </div>
);

const wrapper = div.appendChild(renderIntoDocument(component, { dataHook }));

const testkit = TooltipTestkit({ wrapper, dataHook });

describe('Tooltip should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

### Enzyme Example

```javascript
import React from 'react';
import { mount } from 'enzyme';
import Tooltip from 'wix-style-react/Tooltip';
import { TooltipTestkit } from 'wix-style-react/dist/testkit/enzyme';

const dataHook = 'myDataHook';

const wrapper = mount(
  <div>
    <Tooltip dataHook={dataHook} />
  </div>
);

const testkit = TooltipTestkit({ wrapper, dataHook });

describe('Tooltip should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

### Puppeteer Example

> Element should be rendered with a data-hook into the DOM `<Tooltip dataHook="myDataHook" />`

```javascript
import puppeteer from 'puppeteer';
import { TooltipTestkit } from 'wix-style-react/dist/testkit/puppeteer';

const browser = await puppeteer.launch();
const page = await browser.newPage();

await page.goto('/page-where-Tooltip-appears');

const testkit = TooltipTestkit({ dataHook: 'myDataHook', page });

describe('Tooltip should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```

### Protractor Example

> Element should be rendered with a data-hook into the DOM `<Tooltip dataHook="myDataHook" />`

```javascript
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { TooltipTestkit } from 'wix-style-react/dist/testkit/protractor';

const dataHook = 'myDataHook';

await browser.get('/page-where-Tooltip-appears');

const testkit = TooltipTestkit({ dataHook });

await waitForVisibilityOf(await testkit.getElement());

describe('Tooltip should exist', async () => {
  expect(await testkit.exists()).toBeTruthy();
});
```
