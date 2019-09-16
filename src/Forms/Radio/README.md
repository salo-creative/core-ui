# Radio

Radio takes an 'options' prop and uses that to generate a number of CheckBox elements inside a styled container.

## Usage

Install

```javascript
yarn add @salo/core-ui
```

Include

```javascript
import Radio from '@salo/core-ui/Forms/Radio';
```

Implement as follows

```javascript
<Radio
  name='checkbox_group_name'
  options={ [{ value:'val', label: 'Label' }] }
  onChange={ (value) => this.setState({value}) }
  value={ this.state.value }
>
```