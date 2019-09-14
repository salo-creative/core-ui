import React from 'react';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';

// COMPONENTS & STYLES
import Button from '../../Molecules/Button';
import Loader from '../../Molecules/Loader';
import H3 from '../../Typography/H3';
import ErrorMessage from '../../Molecules/ErrorMessage';
import ApolloError from '../../Apollo/Error';
import FormStepper from './form.stepper';
import RenderFields from './form.renderFields';
import { FormWrapper } from './form.styles';


// HELPERS & CONSTANTS
import useFormData from '../../Forms/useFormData';

const Form = (props) => {
  const {
    height,
    name,
    renderSteps,
    textStrings,
    typeaheads,
    // Custom components
    Button: CustomButton,
    Input: CustomInput,
    Select: CustomSelect,
    TextArea: CustomTextArea,
    TypeAhead: CustomTypeAhead,
    Upload: CustomUpload
  } = props;

  const {
    activeStep,
    changeStep,
    error,
    handleSubmit,
    handleSubmitStepper,
    loading,
    refetch,
    reset,
    steps,
    submit,
    toggleErrors,
    ...fieldProps
  } = useFormData({ name });

  // Assign custom components to an object so we can pass them down easily
  const customComponents = {
    CustomButton,
    CustomInput,
    CustomSelect,
    CustomTextArea,
    CustomTypeAhead,
    CustomUpload
  };

  const submitted = get(submit, 'data.form_submit');

  // form should render
  const formShouldRender = !loading && !error && !submitted;
  // check if form is stepped
  const isStepper = renderSteps && !isEmpty(steps);

  return (
    <FormWrapper
      className={ !loading && !error && !submitted ? 'expanded' : 'collapsed' }
      height={ height }
    >
      { submit.error && <ApolloError error={ submit.error } /> }
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
      <form
        noValidate
        autoComplete='off'
        onSubmit={ (e) => (isStepper ? handleSubmitStepper(e) : handleSubmit(e)) }
      >
        { /* Render the basic form */ }
        { formShouldRender && !isStepper && (
          <React.Fragment>
            <RenderFields { ...fieldProps } { ...customComponents } typeaheads={ typeaheads } /> { /* eslint-disable-line react/jsx-props-no-spreading */ }
            <Button
              loading={ submit.isSubmitting }
              type='submit'
            >
              { get(textStrings, 'submit', 'Submit') }
            </Button>
          </React.Fragment>
        ) }

        { /* Render the stepper */ }
        { formShouldRender && isStepper && (
          <FormStepper
            { ...fieldProps } // eslint-disable-line react/jsx-props-no-spreading
            { ...customComponents } // eslint-disable-line react/jsx-props-no-spreading
            activeStep={ activeStep }
            changeStep={ changeStep }
            steps={ steps }
          />
        ) }
      </form>
    </FormWrapper>
  );
};

Form.defaultProps = {
  height: 'auto',
  renderSteps: true,
  textStrings: {},
  typeaheads: null,
  // Custom components
  Button: null,
  Input: null,
  Select: null,
  TextArea: null,
  TypeAhead: null,
  Upload: null
};

Form.propTypes = {
  // Standard props
  height: PropTypes.string,
  name: PropTypes.string.isRequired,
  renderSteps: PropTypes.bool, // Optionally render a stepper if the form supports it
  textStrings: PropTypes.object,
  typeaheads: PropTypes.object,
  // Custom components
  Button: PropTypes.func,
  Input: PropTypes.func,
  Select: PropTypes.func,
  TextArea: PropTypes.func,
  TypeAhead: PropTypes.func,
  Upload: PropTypes.func
};

export default Form;