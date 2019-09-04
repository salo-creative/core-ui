import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import RenderFields from './form.renderFields';

// HELPERS & CONSTANTS
import useFormData from '../../Forms/useFormData';

const Form = ({ name }) => {
  const {
    fields,
    handleBlur,
    handleChange,
    showErrors,
    values
  } = useFormData({ name });
  return (
    <React.Fragment>
      <RenderFields
        fields={ fields }
        handleBlur={ handleBlur }
        handleChange={ handleChange }
        showErrors={ showErrors }
        values={ values }
      />
    </React.Fragment>
    
  );
};

Form.propTypes = { name: PropTypes.string.isRequired };

export default Form;