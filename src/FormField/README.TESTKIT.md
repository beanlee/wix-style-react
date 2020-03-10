# FormField component

> General FormField container.

## FormField TestKit API


### Puppeteer

| method | arguments | returned value | description |
|--------|-----------|----------------|-------------|
| element | - | element | returns the element |
| getLabelValue | - | string | get the label text |
| isRequired | - | boolean | check if the field is required |

## Usage Example

```javascript
/*******************
   puppeteer example
  *******************/

  import puppeteer from 'puppeteer';
  import {formFieldTestkitFactory} from 'wix-style-react/dist/testkit/puppeteer';

  //puppeteer setup
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  //Create an element testkit via the data-hook attribute
  const testkit = await formFieldTestkitFactory({dataHook: 'myDataHook', page});
  await page.goto(appUrl); //Your application url

  expect(await testkit.getLabelValue()).to.equal('my test');
```
