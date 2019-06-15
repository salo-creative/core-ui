import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { NavWrapper, NavItem } from './stepper.styles';

const Navigation = (props) => {
  const {
    activeItem,
    changeStep,
    steps
  } = props;
  return (
    <NavWrapper>
      { steps.map(step => {
        const active = activeItem === step.id;
        return (
          <NavItem
            key={ step.id }
            className={ `${ active ? 'active' : '' } ${ step.complete ? 'complete' : '' }` }
            onClick={ () => changeStep(step.id) }
            disabled={ step.disabled }
          >
            { step.title }
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
    disabled: PropTypes.bool
  })).isRequired
};

export default Navigation;