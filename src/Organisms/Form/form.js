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
    className,
    height,
    margin,
    name,
    renderSteps,
    showTitles,
    stepper,
    textStrings,
    typeaheads,
    width,
    // Custom components
    Button: CustomButton,
    Checkbox: CustomCheckBox,
    Copy: CustomCopy,
    Heading: CustomHeading,
    Input: CustomInput,
    Link,
    Password: CustomPassword,
    Select: CustomSelect,
    Submit: CustomSubmit,
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
    strings,
    submit,
    toggleErrors,
    ...fieldProps
  } = useFormData({ name });

  // Assign custom components to an object so we can pass them down easily
  const customComponents = {
    CustomButton,
    CustomCheckBox,
    CustomCopy,
    CustomHeading,
    CustomInput,
    CustomPassword,
    CustomSelect,
    CustomTextArea,
    CustomTypeAhead,
    CustomUpload,
    Link
  };

  const submitted = get(submit, 'data.form_submit');

  // form should render
  const formShouldRender = !loading && !error && !submitted;
  // check if form is stepped
  const isStepper = renderSteps && !isEmpty(steps);

  const renderFormSubmission = () => {
    // Works out if we should pass submitted data to a custom component or not.
    if (!submit.error && submitted) {
      if (CustomSubmit) {
        return <CustomSubmit data={ submitted } />;
      }
      return <H3 align='center' margin='1rem 0'>{ submitted }</H3>;
    }
    return null;
  };

  return (
    <FormWrapper
      className={ `${ className } ${ !loading && !error && !submitted ? 'expanded' : 'collapsed' }` }
      height={ height }
      margin={ margin }
      width={ width }
    >
      { submit.error && <ApolloError addAlert error={ submit.error } /> }
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
      { renderFormSubmission() }
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
            { ...fieldProps } 
            { ...customComponents } 
            activeStep={ activeStep }
            changeStep={ changeStep }
            showTitles={ showTitles }
            stepper={ stepper }
            steps={ steps }
            strings={ strings }
            typeaheads={ typeaheads }
          />
        ) }
      </form>
    </FormWrapper>
  );
};

Form.defaultProps = {
  className: null,
  height: 'auto',
  margin: '0',
  renderSteps: true,
  showTitles: true,
  stepper: 'full',
  textStrings: {},
  typeaheads: null,
  width: 'auto',
  // Custom components
  Button: null,
  Checkbox: null,
  Copy: null,
  Heading: null,
  Input: null,
  Link: null,
  Password: null,
  Select: null,
  Submit: null,
  TextArea: null,
  TypeAhead: null,
  Upload: null
};

Form.propTypes = {
  // Standard props
  className: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  renderSteps: PropTypes.bool, // Optionally render a stepper if the form supports it
  showTitles: PropTypes.bool,
  stepper: PropTypes.oneOf(['condensed', 'full']),
  textStrings: PropTypes.object,
  typeaheads: PropTypes.object,
  width: PropTypes.string,
  // Custom components
  Button: PropTypes.func,
  Checkbox: PropTypes.func,
  Copy: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Heading: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Input: PropTypes.func,
  Link: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Password: PropTypes.func,
  Select: PropTypes.func,
  Submit: PropTypes.func,
  TextArea: PropTypes.func,
  TypeAhead: PropTypes.func,
  Upload: PropTypes.func
};

export default Form;