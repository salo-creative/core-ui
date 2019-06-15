# CheckBox

This component is a standalone checkbox that can be used for situations where just one true/false value is required, for example to confirm you've read an alert or similar.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import CheckBox from '@salo/core-ui/Forms/CheckBox';
```

Implement as follows

```javascript
<Checkbox 
  label='The checkbox label'
  name='field_name'
  checked={ this.state.value }
  onChange={ e => this.setState({value: e.value}) }
/>
```