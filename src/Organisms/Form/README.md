# Form

An all-in-one solution for managing forms.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Form from '@salo/core-ui/Organisms/Form';
```

Implement as follows

```javascript
<Form
  name='form_name'
/>
```

## Resetting

You can reset the form by sending it something like this:

```javascript
const [reset, setReset] = React.useState(false);
const resetForm = () => {
  if (!reset) {
    return false;
  }
  return () => {
    setReset(false);
  };
};

<Form resetForm={ resetForm } />
```