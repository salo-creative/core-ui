import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { NavWrapper, NavItem } from './stepper.styles';

const Navigation = (props) => {
  const {
    activeItem,
    changeStep,
    steps,
    type
  } = props;

  const evaluateClassName = ({ active, complete, visited }) => {
    const base = 'salo-stepper__nav-item';
    if (active) {
      return `${ base } active`;
    }
    if (complete) {
      return `${ base } complete`;
    }
    if (visited) {
      return `${ base } error`;
    }
    return base;
  };

  return (
    <NavWrapper stepperType={ type } className='salo-stepper__nav'>
      { steps.map(step => {
        const active = activeItem === step.id;
        return (
          <NavItem
            type='button'
            key={ step.id }
            className={ evaluateClassName({
              ...step,
              active
            }) }
            onClick={ () => changeStep(step.id) }
            disabled={ step.disabled }
            stepperType={ type }
          >
            { type === 'full' && step.title }
          </NavItem>
        );
      }) }
    </NavWrapper>
  );
};

Navigation.defaultProps = {};

Navigation.propTypes = {
  activeItem: PropTypes.string.isRequired,
  changeStep: PropTypes.func.isRequired,
  steps: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    complete: PropTypes.bool,
    visited: PropTypes.bool,
    disabled: PropTypes.bool
  })).isRequired,
  type: PropTypes.oneOf(['condensed', 'full']).isRequired
};

export default Navigation;