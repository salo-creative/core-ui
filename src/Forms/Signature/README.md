# TextArea

This component is designed to capture digital signatures. It exports to a Base64 image after every stroke is added via onChange.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Signature from '@salo/core-ui/Forms/Signature';
```

Implement as follows

```javascript
<Signature 
  onChange={ ({ value }) => console.log({value }) }
/>
```

For full prop types and usage see storybook info/knobs