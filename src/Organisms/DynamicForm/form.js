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
    inputs,
    renderFunctions
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
    saving: data.loading,
    initialData: data.initialData,
    onCompleted: data.onCompleted
  });

  const formRef = React.useRef(null);
  const submitted = !!get(submit, 'data');
  const formShouldRender = !loading && !error && !(get(options, 'hideFormPostSubmit', Form.defaultProps.options.hideFormPostSubmit) && submitted);
  // check if form is stepped
  const isStepper = get(options, 'stepper.renderSteps', Form.defaultProps.options.stepper.renderSteps) && !isEmpty(steps);
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
              inputs={ inputs }
              renderFunctions={ renderFunctions }
              select={ get(options, 'select') }
              typeaheads={ get(options, 'typeaheads') }
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
            changeStep={ (id) => {
              changeStep(id);
              setTimeout(() => {
                // Scroll form to top when page changes.
                formRef.current.scrollIntoView();
              }, 1);
            } }
            activeStep={ activeStep }
            inputs={ inputs }
            renderFunctions={ renderFunctions }
            isSubmitting={ submit.isSubmitting }
            position={ get(options, 'stepper.position', Form.defaultProps.options.stepper.position) }
            select={ get(options, 'select') }
            showStepCount={ get(options, 'stepper.showStepCount', Form.defaultProps.options.stepper.showStepCount) }
            showTitles={ get(options, 'stepper.showTitles', Form.defaultProps.options.stepper.showTitles) }
            stepper={ get(options, 'stepper.type', Form.defaultProps.options.stepper.type) }
            steps={ steps }
            strings={ strings }
            typeaheads={ get(options, 'typeaheads') }
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
    onCompleted: null,
    onSubmit: null,
    initialData: null,
    loading: null
  },
  options: {
    hideFormPostSubmit: false,
    resetFormPostSubmit: true,
    showPrompt: true,
    typeaheads: null,
    stepper: {
      position: 'below',
      renderSteps: true,
      showStepCount: false,
      showTitles: true,
      type: 'full'
    }
  },
  inputs: {
    Button: null,
    Checkbox: null,
    Copy: null,
    DatePicker: null,
    Heading: null,
    Input: null,
    Link: null,
    Password: null,
    Select: null,
    Submit: null,
    TextArea: null,
    TypeAhead: null,
    Upload: null
  },
  renderFunctions: {}
};

Form.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  data: PropTypes.shape({
    initialData: PropTypes.object, // Optionally pass in values to pre-populate fields
    onCompleted: PropTypes.func,
    onSubmit: PropTypes.func,
    loading: PropTypes.bool
  }),
  options: PropTypes.shape({
    hideFormPostSubmit: PropTypes.bool, // Optionally hide form after submission
    resetFormPostSubmit: PropTypes.bool, // Optionally reset form fields to pristine state after submission
    select: PropTypes.object, // Pass custom select options
    showPrompt: PropTypes.bool, // Optionally disable the prompter when navigating away from dirty forms
    typeaheads: PropTypes.object, // Customise typeahead behaviour
    stepper: PropTypes.shape({
      position: PropTypes.oneOf(['above', 'below']),
      renderSteps: PropTypes.bool, // Optionally render a stepper if the form supports it
      showStepCount: PropTypes.bool, // Optionally show step counter
      showTitles: PropTypes.bool, // Optionally show step titles
      type: PropTypes.oneOf(['condensed', 'full'])
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
    DatePicker: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    Heading: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    Input: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    Link: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    Password: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    Select: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    Submit: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    TextArea: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    TypeAhead: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    Upload: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
  }),
  renderFunctions: PropTypes.object
};

export default Form;