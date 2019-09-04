import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import RenderFields from './form.renderFields';
import Button from '../../Molecules/Button';

// HELPERS & CONSTANTS
import useFormData from '../../Forms/useFormData';

const Form = ({ name }) => {
  const {
    fields,
    handleBlur,
    handleChange,
    handleSubmit,
    showErrors,
    submit,
    textStrings,
    values
  } = useFormData({ name });

  return (
    <form
      noValidate
      autoComplete='off'
      onSubmit={ handleSubmit }
    >
      <RenderFields
        fields={ fields }
        handleBlur={ handleBlur }
        handleChange={ handleChange }
        showErrors={ showErrors }
        values={ values }
      />
      <Button
        loading={ submit.isSubmitting }
        type='submit'
      >
        { get(textStrings, 'submit', 'Submit') }
      </Button>
    </form>
    
  );
};

Form.defaultProps = { textStrings: {} };

Form.propTypes = {
  name: PropTypes.string.isRequired,
  textStrings: PropTypes.object
};

export default Form;