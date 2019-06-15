import React from 'react';
import PropTypes from 'prop-types';
import { find, get, isEmpty } from 'lodash';

// COMPONENTS
import { colours } from '../../helpers/colours';
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
    this.setState({ dropOpen: false });
    if (typeof onChange === 'function') {
      onChange(value, e);
    }
  }

  
  dropClose = (e) => {
    const { element } = this.state;
    if (e.target !== element) {
      this.setState({ dropOpen: false });
    }
  };
  
  openDrop = (e) => {
    e.preventDefault();
    this.setState({ element: e.target, dropOpen: true });
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
          <svg style={ { width: '24px', height: '24px' } } viewBox='0 0 24 24'>
            <path d='M7,10L12,15L17,10H7Z' />
          </svg>
        </IconAfter>
      );
    }
    return null;
  }

  renderValue() {
    const { value, valueKey, placeholder, labelKey, data } = this.props;
    if (!value || !find(data, { [valueKey]: value }, null)) return placeholder;
    return find(data, { [valueKey]: value }, null)[labelKey];
  }

  render() {
    const { value, placeholder, background, size } = this.props;

    const label = this.renderValue();
    return (
      <React.Fragment>
        <Label
          value={ value }
          onClick={ (e) => this.openDrop(e) }
          background={ background }
          className={ label === placeholder ? 'noValue' : '' }
          size={ size }
        >
          { label }
          { this.renderIconAfter() }
        </Label>
        { this.renderDropDown() }
      </React.Fragment>
    );
  }
}

Selector.defaultProps = {
  value: '',
  onChange: null,
  iconAfter: true,
  data: [],
  valueKey: 'value',
  labelKey: 'label',
  placeholder: 'Please select…',
  background: 'transparent',
  dropDownBackground: '#fff',
  fixedPositionDrop: false,
  dropBorder: true,
  size: 'M'
};

Selector.propTypes = {
  iconAfter: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  data: PropTypes.array,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  placeholder: PropTypes.string,
  background: PropTypes.string,
  dropDownBackground: PropTypes.string,
  fixedPositionDrop: PropTypes.bool,
  dropBorder: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M'])
};

export default Selector;