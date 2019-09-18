import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// COMPONENTS & STYLES
import Stepper from '../../Molecules/Stepper';
import FormStep from './form.step';

const FormStepper = (props) => {
  const {
    activeStep,
    changeStep,
    showTitles,
    steps,
    stepper,
    strings,
    typeaheads,
    ...fieldProps
  } = props;

  return (
    <React.Fragment>
      <Stepper
        activeItem={ activeStep }
        changeStep={ changeStep }
        className='form__stepper'
        stepper={ stepper }
      >
        { steps.map((step, i) => {
          return {
            id: step.id,
            title: step.title,
            complete: step.complete,
            disabled: step.disabled,
            content: (
              <FormStep
                { ...fieldProps } // eslint-disable-line react/jsx-props-no-spreading
                changeStep={ () => changeStep(get(steps, `[${ i - 1 }].id`)) }
                fields={ step.fields }
                showTitle={ showTitles } // show individual titles if not using navigation
                step={ i + 1 } // pass the step number down
                strings={ strings }
                title={ step.title }
                total={ steps.length } // pass down the total number of steps
                typeaheads={ typeaheads }
              />
            )
          };
        }) }
      </Stepper>
    </React.Fragment>
  );
};

FormStepper.defaultProps = { 
  activeStep: '',
  typeaheads: null
};

FormStepper.propTypes = {
  activeStep: PropTypes.string,
  changeStep: PropTypes.func.isRequired,
  showNavigation: PropTypes.bool.isRequired,
  steps: PropTypes.array.isRequired,
  stepper: PropTypes.string.isRequired,
  typeaheads: PropTypes.object
};

export default FormStepper;