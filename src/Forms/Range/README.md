# Range

This is an input field with type=range, styled according to the theme. It can take most properties that an Input element can take, as well as a few others. The unique properties include:

* min. Number. The minimum value of the range. Default 0.
* max. Number. The maximum value of the range. Default 100.
* step. Number. The amount to increment by when the slider is manipulated.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Range from '@salo/core-ui/Forms/Range';
```

Implement as follows

```javascript
<Range
  error={ error }
  errorMessage={ errorMessage }
  helperText={ helperText }
  label={ label }
  name='story'
  min={ 0 }
  max={ 100 }
  value={ state.value }
  onChange={ ({ value }) => {
    store.set({ value });
  } }
  step={ step }
/>
```