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

## Asking for user input

In some cases it's useful to have an 'other' field where a user can type in whatever they like, this is accomplished like so:

```javascript
<Radio
  name='checkbox_group_name'
  options={ [{ value:'val', label: 'Label', value: 'other', label: 'Other', input: true }] }
  onChange={ (value) => this.setState({value}) }
  value={ this.state.value }
>
```

The key part is `input: true`, when this is detected and the option is chosen then the input will display.