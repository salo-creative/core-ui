import React from 'react';
import PropTypes from 'prop-types';
import { find, get, isEmpty } from 'lodash';

// COMPONENTS
import { colours } from '../../helpers/colours';
import FieldLabel from '../../Forms/components/Label';
import ErrorText from '../../Forms/components/ErrorText';
import HelperText from '../../Forms/components/HelperText';
import { IconAfter, Label } from './selector.styles';
import Drop from '../Drop';
import Button from '../Button';

class Selector extends React.Component {
  constructor() {
    super();
    this.state = {
      dropOpen: false,
      element: null
    };
  }
  
  handleChange = (e, value) => {
    const { onChange } = this.props;
    this.setState({
      dropOpen: false
    });
    if (typeof onChange === 'function') {
      onChange(value, e);
    }
  }

  
  dropClose = (e) => {
    const { element } = this.state;
    if (e.target !== element) {
      this.setState({
        dropOpen: false
      });
    }
  };
  
  openDrop = (e) => {
    e.preventDefault();
    this.setState({
      element: e.target, dropOpen: true
    });
  }
  
  renderItems() {
    const { data, valueKey, labelKey, size } = this.props;
    if (isEmpty(data)) return null;
    return data.map(item => (
      <Button
        key={ item[valueKey] }
        onClick={ (e) => this.handleChange(e, item[valueKey]) }
        appearance='text'
        fullWidth
        radius={ false }
        align='start'
        size={ size }
        className='salo-selector__item'
      >
        { item[labelKey] }
      </Button>
    ));
  }

  renderDropDown() {
    const { fixedPositionDrop, dropDownBackground, dropBorder } = this.props;
    const { dropOpen, element } = this.state;
    const width = get(element, 'clientWidth', 0);
    return (
      <Drop
        background={ dropDownBackground }
        width={ width + 2 || 0 }
        className='selector-drop'
        disableOverflow={ false }
        element={ element }
        onClose={ (e) => this.dropClose(e) }
        top={ fixedPositionDrop ? 70 : 0 }
        offsetTop={ !fixedPositionDrop ? 2 : 0 }
        offsetLeft={ 1 }
        fixed={ fixedPositionDrop }
        open={ dropOpen }
        border={ dropBorder ? `1px solid ${ colours.blue }` : 'none' }
        shadow='none'
        spacing={ 0 }
        zIndex={ 100 }
      >
        { this.renderItems() }
      </Drop>
    );
  }

  renderIconAfter() {
    const { iconAfter } = this.props;
    if (iconAfter) {
      return (
        <IconAfter>
          <svg
            style={ {
              width: '24px', height: '24px'
            } }
            viewBox='0 0 24 24'
          >
            <path d='M7,10L12,15L17,10H7Z' />
          </svg>
        </IconAfter>
      );
    }
    return null;
  }

  renderValue() {
    const { value, valueKey, placeholder, labelKey, data } = this.props;
    if (!value || !find(data, {
      [valueKey]: value
    }, null)) return placeholder;
    return find(data, {
      [valueKey]: value
    }, null)[labelKey];
  }

  render() {
    const {
      background,
      className,
      disabled,
      error,
      errorMessage,
      helperText,
      label,
      name,
      placeholder,
      required,
      size,
      value
    } = this.props;

    const valueLabel = this.renderValue();
    return (
      <div className={ `salo-selector ${ className }` }>
        <FieldLabel
          error={ error }
          label={ label }
          name={ name }
          required={ required }
          size={ size }
          className='salo-selector__label'
        />
        <Label
          value={ value }
          onClick={ (e) => this.openDrop(e) }
          background={ background }
          className={ valueLabel === placeholder ? 'noValue' : '' }
          size={ size }
          name={ name }
        >
          { valueLabel }
          { this.renderIconAfter() }
        </Label>
        { this.renderDropDown() }
        <ErrorText
          className='salo-checkbox__error'
          disabled={ disabled }
          error={ error }
          errorMessage={ errorMessage }
          size={ size }
        />
        <HelperText
          className='salo-checkbox__helper'
          disabled={ disabled }
          error={ error }
          helperText={ helperText }
          size={ size }
        />
      </div>
    );
  }
}

Selector.defaultProps = {
  background: 'transparent',
  className: '',
  data: [],
  disabled: false,
  dropBorder: true,
  dropDownBackground: '#fff',
  error: false,
  errorMessage: 'Field invalid',
  fixedPositionDrop: false,
  helperText: '',
  iconAfter: true,
  labelKey: 'label',
  onChange: null,
  placeholder: 'Please select…',
  required: false,
  size: 'M',
  value: '',
  valueKey: 'value'
};

Selector.propTypes = {
  background: PropTypes.string,
  className: PropTypes.string,
  data: PropTypes.array,
  disabled: PropTypes.bool,
  dropBorder: PropTypes.bool,
  dropDownBackground: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  fixedPositionDrop: PropTypes.bool,
  helperText: PropTypes.string,
  iconAfter: PropTypes.bool,
  label: PropTypes.string.isRequired,
  labelKey: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueKey: PropTypes.string
};

export default Selector;