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

  const submitted = get(submit, 'data.form_submit');

  return (
    <FormWrapper
      className={ !loading && !error && !submitted ? 'expanded' : 'collapsed' }
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

      { /* Handle case when form has been submitted */ }
      { submitted && (
        <H3 align='center' margin='1rem 0'>{ submitted }</H3>
      ) }

      { /* Render the form */ }
      { !loading && !error && !submitted && (
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