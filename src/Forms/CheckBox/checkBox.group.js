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
    const { fields, onChange, singleSelect } = this.props;
    const { checked, label, name } = e;
    let updatedFields = [];
    if (singleSelect) {
      updatedFields = fields.map(field => {
        return {
          ...field,
          checked: field.name === name
        };
      });
    } else {
      const i = findIndex(fields, { name });
      updatedFields = [
        ...fields.slice(0, i),
        { checked, label, name },
        ...fields.slice(i + 1)
      ];
    }
    onChange(updatedFields);
  }

  render() {
    const {
      disabled,
      fields,
      error,
      errorMessage,
      helperText,
      label,
      name,
      margin,
      required,
      singleSelect,
      size
    } = this.props;
    return (
      <Group margin={ margin }>
        <Label
          error={ error }
          label={ label }
          name={ name }
          required={ required }
        />
        <GroupWrapper>
          { fields.map((field, i) => {
            // Set margin equivalent to parent but hide for last item
            const checkMargin = i <= (fields.length - 2) ? margin : '0';
            return (
              <CheckBox
                checked={ field.checked }
                disabled={ disabled }
                label={ field.label }
                key={ field.name }
                margin={ checkMargin }
                name={ field.name }
                onChange={ this.handleFieldChange }
                radio={ singleSelect }
                size={ size }
              />
            );
          }) }
        </GroupWrapper>
        <ErrorText
          disabled={ disabled }
          error={ error }
          errorMessage={ errorMessage }
          size={ size }
        />
        <HelperText
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
  disabled: false,
  error: false,
  errorMessage: 'Field invalid',
  fields: [],
  helperText: '',
  label: 'Label Text',
  margin: '0 0 2rem 0',
  onChange: () => null,
  required: false,
  singleSelect: false,
  size: 'M'
};

CheckBoxGroup.propTypes = {
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
  singleSelect: PropTypes.bool,
  size: PropTypes.oneOf(['L', 'M'])
};

export default CheckBoxGroup;