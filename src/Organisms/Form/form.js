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
    mutation,
    mutationName,
    mutationVariables,
    name,
    nestedBody,
    onSubmit,
    initialData,
    renderSteps,
    resetForm,
    showFormAfterSubmission,
    showTitles,
    stepper,
    submitAsString,
    textStrings,
    typeaheads,
    usePrompt,
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
    isDirty,
    loading,
    refetch,
    reset,
    steps,
    strings,
    submit,
    toggleErrors,
    ...fieldProps
  } = useFormData({
    initialData,
    name,
    onSubmit,
    mutation,
    mutationName,
    mutationVariables,
    nestedBody,
    submitAsString
  });

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

  const formRef = React.useRef(null);
  const submitted = get(submit, 'data');
  const formShouldRender = !loading && !error && (showFormAfterSubmission || !submitted);
  // check if form is stepped
  const isStepper = renderSteps && !isEmpty(steps);
  const Submit = CustomButton || Button;
  
  // See readme on resetting
  const shouldResetForm = typeof resetForm === 'function' ? resetForm() : false;

  React.useEffect(() => {
    if (shouldResetForm) {
      // Call data handler
      reset();
      // Call callback
      shouldResetForm();
    }
  }, [reset, shouldResetForm]);

  const renderFormSubmission = () => {
    // Works out if we should pass submitted data to a custom component or not.
    if (!submit.error && submitted) {
      if (CustomSubmit) {
        return <CustomSubmit data={ submitted } />;
      }
      return <H3 align='center' margin='1rem 0'>{ typeof submitted === 'string' ? submitted : 'Submission successfully added' }</H3>;
    }
    return null;
  };

  // useEffect only expects functions to be returned.
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (usePrompt) {
      const prompter = (event) => {
        if (isDirty && !submit.data && !submit.error) {
          // Show prompt if filled in and not submitted/ing
          event.preventDefault();
          // eslint-disable-next-line no-param-reassign
          event.returnValue = '';
        }
      };
      window.addEventListener('beforeunload', prompter);
      return () => {
        window.removeEventListener('beforeunload', prompter);
      };
    }
  }, [isDirty, submit, usePrompt]);

  return (
    <FormWrapper
      className={ `${ className } ${ formShouldRender ? 'expanded' : 'collapsed' }` }
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
        autoComplete='off'
        noValidate
        onSubmit={ (e) => (isStepper ? handleSubmitStepper(e, formRef) : handleSubmit(e)) }
        ref={ formRef }
      >
        { /* Render the basic form */ }
        { formShouldRender && !isStepper && (
          <React.Fragment>
            <RenderFields
              { ...fieldProps }
              { ...customComponents }
              typeaheads={ typeaheads }
            />
            <Submit
              loading={ submit.isSubmitting }
              type='submit'
            >
              { get(strings, 'submit', 'Submit') }
            </Submit>
          </React.Fragment>
        ) }

        { /* Render the stepper */ }
        { formShouldRender && isStepper && (
          <FormStepper
            { ...fieldProps }
            { ...customComponents }
            activeStep={ activeStep }
            changeStep={ (id) => {
              changeStep(id);
              setTimeout(() => {
                // Scroll form to top when page changes.
                formRef.current.scrollIntoView();
              }, 1);
            } }
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
  initialData: null,
  margin: '0',
  mutation: null,
  mutationName: 'form_submit',
  mutationVariables: {},
  nestedBody: true,
  onSubmit: null,
  renderSteps: true,
  resetForm: null,
  showFormAfterSubmission: false,
  showTitles: true,
  stepper: 'full',
  submitAsString: true,
  textStrings: {},
  typeaheads: null,
  usePrompt: true,
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
  initialData: PropTypes.object, // Optionally pass in values to pre-populate fields
  margin: PropTypes.string,
  mutation: PropTypes.object, // gql mutation
  mutationName: PropTypes.string, // Mandatory if passing mutation, mutation name to look up against
  mutationVariables: PropTypes.object, // Any additional variables you need to pass when doing a custom mutation
  name: PropTypes.string.isRequired,
  nestedBody: PropTypes.bool, // Submit form fields nested in a body object
  onSubmit: PropTypes.func,
  renderSteps: PropTypes.bool, // Optionally render a stepper if the form supports it
  resetForm: PropTypes.func,
  showFormAfterSubmission: PropTypes.bool, // Optionally keep form rather than rendering custom component after submit
  showTitles: PropTypes.bool, // Optionally show step titles
  stepper: PropTypes.oneOf(['condensed', 'full']),
  submitAsString: PropTypes.bool, // Send submitted data as a string or object
  textStrings: PropTypes.object, // Customise strings ({ submit })
  typeaheads: PropTypes.object, // Customise typeahead behaviour
  usePrompt: PropTypes.bool, // Optionally disable the prompter when navigating away from dirty forms
  width: PropTypes.string,
  // Custom components
  Button: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Checkbox: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Copy: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Heading: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Link: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Password: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Select: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Submit: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  TextArea: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  TypeAhead: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  Upload: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};

export default Form;