# Selectput

An opinionated way to select from a list and then input a value against that list.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Selectput from '@salo/core-ui/Molecules/Selectput';
```

Implement as follows

```javascript
const [value, setValue] = React.useState('1');

<Selectput 
  options={ [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' }
  ] }
  value={ value }
  onSubmit={ (val) => setValue(val) }
/>
```