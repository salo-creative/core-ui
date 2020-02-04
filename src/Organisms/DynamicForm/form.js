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
import useFormData from '../../Forms/useFormData.next';

const Form = (props) => {
  const {
    className,
    name,
    styles,
    data,
    options,
    inputs
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
    name,
    options,
    onSubmit: data.onSubmit,
    initialData: data.initialData
  });

  // Assign custom components to an object so we can pass them down easily
  const customComponents = inputs;

  const formRef = React.useRef(null);
  const submitted = !!get(submit, 'data');
  const formShouldRender = !loading && !error && !(options.hideFormPostSubmit && submitted);
  // check if form is stepped
  const isStepper = options.stepper.renderSteps && !isEmpty(steps);
  const Submit = inputs.Button || Button;
  
  // useEffect only expects functions to be returned.
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    if (options.showPrompt) {
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
  }, [isDirty, options.showPrompt, submit]);

  if (submitted && options.hideFormPostSubmit) {
    return (
      <H3 align='center' margin='1rem 0'>
        { get(strings, 'successMessage', 'Submission successfully added') }
      </H3>
    );
  }

  return (
    <FormWrapper
      className={ `${ className } ${ formShouldRender ? 'expanded' : 'collapsed' }` }
      height={ styles.height }
      margin={ styles.margin }
      width={ styles.width }
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
              typeaheads={ options.typeaheads }
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
            showTitles={ options.stepper.showTitles }
            stepper={ options.stepper.type }
            steps={ steps }
            strings={ strings }
            typeaheads={ options.typeaheads }
          />
        ) }
      </form>
    </FormWrapper>
  );
};

Form.defaultProps = {
  className: null,
  styles: {
    height: 'auto',
    margin: '0',
    width: 'auto'
  },
  data: {
    onSubmit: null,
    initialData: null
  },
  options: {
    hideFormPostSubmit: false,
    resetFormPostSubmit: true,
    showPrompt: true,
    typeaheads: null,
    stepper: {
      renderSteps: true,
      showTitles: true,
      type: 'full'
    }
  },
  inputs: {
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
  }
};

Form.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  data: PropTypes.shape({
    initialData: PropTypes.object, // Optionally pass in values to pre-populate fields
    onSubmit: PropTypes.func
  }),
  options: PropTypes.shape({
    hideFormPostSubmit: PropTypes.bool, // Optionally hide form after submission
    resetFormPostSubmit: PropTypes.bool, // Optionally reset form fields to pristine state after submission
    showPrompt: PropTypes.bool, // Optionally disable the prompter when navigating away from dirty forms
    typeaheads: PropTypes.object, // Customise typeahead behaviour
    stepper: PropTypes.shape({
      type: PropTypes.oneOf(['condensed', 'full']),
      showTitles: PropTypes.bool, // Optionally show step titles
      renderSteps: PropTypes.bool // Optionally render a stepper if the form supports it

    })
  }),
  styles: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
    margin: PropTypes.string
  }),
  inputs: PropTypes.shape({ // Custom components
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
  })
};

export default Form;