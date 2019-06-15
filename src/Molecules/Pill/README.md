# Pill

The Pill component is meant to display values as tags. If given an onRemove prop, it will render a close button as well. Clicking the close button fires the onRemove event specified. It can also take and display a loading prop.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Pill from '@salo/core-ui/Molecules/Pill';
```

Implement as follows

```javascript
<Pill
  value="Pill"
  onRemove={ (value) => remove(value) }
  loading={loading}
/>
```