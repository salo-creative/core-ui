# MultiSelect

The MultiSelect component is built to be used as a more stylised select component and has loading and error states for use with remote resources. 

---

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import MultiSelect from '@salo/core-ui/Molecules/MultiSelect';
```

Implement as follows

```javascript
<MultiSelect
  name='story'
  disabled={ disabled }
  error={ error }
  fontSize={ fontSize }
  label={ label }
  required={ required }
  helperText={ helperText }
  size={ size }
  icon={ icon }
  padding={ padding }
  border={ border }
  borderRadius={ borderRadius }
  value={ store.value }
  onChange={ ({ value }) => store.set({
    value
  }) }
  options={ options }
/>
```

**For full prop types and usage see storybook info/knobs**