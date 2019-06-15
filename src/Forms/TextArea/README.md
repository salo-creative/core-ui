# TextArea

This component is designed to be used as a textarea element. Pass a value to it to fill it in.

It can take a label, helper text, an error warning, etc. It can be set to a disabled state as well.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import TextArea from '@salo/core-ui/Forms/TextArea';
```

Implement as follows

```javascript
<TextArea 
  value="This text would show up inside the TextArea field."
  onChange={ ({ e, value }) => console.log({ e, value }) }
  onBlur={ ({ e, value }) => console.log({ e, value }) }
/>
```

For full prop types and usage see storybook info/knobs