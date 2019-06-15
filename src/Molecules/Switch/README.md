# Switch

A simple switch/toggle component

---

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Switch from '@salo/core-ui/Molecules/Switch';
```

Implement as follows

```javascript
<Switch
  disabled={ false } // Set if you want the input disabled
  label='On' // Set if you want a label
  labelOff='Off' // if you want different label for off state
  loading={ false } // Set if you want to trigger the loading state
  onChange={ (value) => setState(value) }
  size={ size }
  value={ state }
/>
```

**For full prop types and usage see storybook info/knobs**

