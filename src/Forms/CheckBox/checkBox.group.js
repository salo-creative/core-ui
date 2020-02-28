import React from 'react';
import PropTypes from 'prop-types';
import { findIndex } from 'lodash';

// COMPONENTS & STYLES
import CheckBox from './checkBox';
import ErrorText from '../components/ErrorText';
import HelperText from '../components/HelperText';
import Label from '../components/Label';
import { Group, GroupWrapper } from './checkBox.styles';

class CheckBoxGroup extends React.Component {
  handleFieldChange = (e) => {
    const { fields, onChange } = this.props;
    const { checked, label, name } = e;
    const i = findIndex(fields, {
      name
    });
    const updatedFields = [
      ...fields.slice(0, i),
      {
        checked, label, name
      },
      ...fields.slice(i + 1)
    ];
    onChange(updatedFields);
  }

  render() {
    const {
      className,
      disabled,
      fields,
      error,
      errorMessage,
      helperText,
      label,
      name,
      margin,
      required,
      size
    } = this.props;
    return (
      <Group
        className={ `${ className } salo-checkboxGroup` }
        margin={ margin }
      >
        { label && (
          <Label
            className='salo-checkboxGroup__label'
            error={ error }
            label={ label }
            name={ name }
            required={ required }
          />
        ) }
        <GroupWrapper className='salo-checkboxGroup__wrapper'>
          { fields.map((field, i) => {
            // Set margin equivalent to parent but hide for last item
            const checkMargin = i <= (fields.length - 2) ? margin : '0';
            return (
              <CheckBox
                className={ `salo-checkboxGroup__checkbox ${ field.checked ? 'is-checked' : '' }` }
                checked={ field.checked }
                disabled={ disabled }
                label={ field.label }
                key={ field.name }
                margin={ checkMargin }
                name={ field.name }
                onChange={ this.handleFieldChange }
                size={ size }
              />
            );
          }) }
        </GroupWrapper>
        <ErrorText
          className='salo-checkboxGroup__error-text'
          disabled={ disabled }
          error={ error }
          errorMessage={ errorMessage }
          size={ size }
        />
        <HelperText
          className='salo-checkboxGroup__helper-text'
          disabled={ disabled }
          error={ error }
          helperText={ helperText }
          size={ size }
        />
      </Group>
    );
  }
}

CheckBoxGroup.defaultProps = {
  className: null,
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  fields: [],
  helperText: '',
  label: '',
  margin: '0 0 2rem 0',
  onChange: () => null,
  required: false,
  size: 'M'
};

CheckBoxGroup.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    checked: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired
  })),
  helperText: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M'])
};

export default CheckBoxGroup;