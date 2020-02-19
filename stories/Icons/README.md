# Icons

> SVG Icon base type.

To use icons, please install a separate [wix-ui-icons-common](https://www.npmjs.com/package/wix-ui-icons-common) package:

```bash
npm i wix-ui-icons-common
# or
yarn add wix-ui-icons-common
```

## Usage

```jsx
import { Component } from 'react';
import Favorite from 'wix-ui-icons-common/Favorite';
import ChevronDown from 'wix-ui-icons-common/ChevronDown';

class MyComponent extends Component {
  render() {
    return (
      <div>
        <Favorite />;
        <ChevronDown size="24px" className="someclass" />;
      </div>
    );
  }
}
```

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| className | string |  | - | Set custom class to svg root of icon |
| size | string |  | - | Set the size of the icon |
| style | object |  | - | Set style object to svg root of icon |
| ***All other Props are passed to the SVG element*** | | | | |
