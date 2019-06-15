# Selector

The selector component is for use in place of a standard form select element for areas that concern navigation. It should not be used in forms as a replacement for a true select. If this is your use case please use the Select component in the Forms section.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Selector from '@salo/core-ui/Molecules/Selector';
```

Implement as follows

```javascript
const { value } = this.state;

<Selector 
  data={ [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ] }
  value={ value }
  onChange={ (value) => this.setState({ value }) }
/>
```