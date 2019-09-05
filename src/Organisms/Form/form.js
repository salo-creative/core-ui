import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import RenderFields from './form.renderFields';
import Button from '../../Molecules/Button';
import Loader from '../../Molecules/Loader';
import H3 from '../../Typography/H3';
import P from '../../Typography/P';
import ErrorMessage from '../../Molecules/ErrorMessage';
import { FormWrapper } from './form.styles';


// HELPERS & CONSTANTS
import useFormData from '../../Forms/useFormData';

const Form = (props) => {
  const {
    height,
    name,
    textStrings
  } = props;

  const {
    error,
    handleSubmit,
    loading,
    refetch,
    reset,
    submit,
    toggleErrors,
    ...fieldProps
  } = useFormData({ name });

  if (loading) {
    return (
      <Loader display />
    );
  }

  return (
    <FormWrapper
      className={ loading ? 'loading' : '' }
      height={ height }
    >
      { /* Handle form loading */ }
      { loading && <Loader display /> }

      { /* Handle form fetch error */ }
      { !loading && error && (
        <ErrorMessage
          title='Form error'
          error={ error }
        />
      ) }

      { /* Render the form */ }
      { !loading && !error && (
        <form
          noValidate
          autoComplete='off'
          onSubmit={ handleSubmit }
        >
          <RenderFields { ...fieldProps } /> { /* eslint-disable-line react/jsx-props-no-spreading */ }
          <Button
            loading={ submit.isSubmitting }
            type='submit'
          >
            { get(textStrings, 'submit', 'Submit') }
          </Button>
        </form>
      ) }
    </FormWrapper>
    
  );
};

Form.defaultProps = {
  height: 'auto',
  textStrings: {}
};

Form.propTypes = {
  height: PropTypes.string,
  name: PropTypes.string.isRequired,
  textStrings: PropTypes.object
};

export default Form;