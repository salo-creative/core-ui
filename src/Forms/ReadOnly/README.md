# ReadOnly

This component is for rendering read only value in forms or if the form is not currently editable.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import ReadOnly from '@salo/core-ui/Forms/ReadOnly';
```

Implement as follows

```javascript
<ReadOnly
  label="Label"
  name="field_name"
  value="Field value" // can be an object which will be automatically stringified
/>
```