# CheckBoxGroup

CheckBoxGroup takes a 'fields' prop and uses that to generate a number of CheckBox elements inside a styled container. It's intended to be used for situations in which the user can select from multiple different options at once. These checkboxes inherit fields from the array passed in from props.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import { CheckBoxGroup } from '@salo/core-ui/Forms/CheckBox';
```

Implement as follows

```javascript
<CheckBoxGroup
  name='checkbox_group_name'
  fields={ this.state.fields }
  onChange={ fields => this.setState({fields}) }
>
```

The fields prop is an array of objects with the structure

```javascript
{
  name: 'field_name',
  label: 'Checkbox label',
  checked: false
}
```