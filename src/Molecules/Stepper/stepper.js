import React from 'react';
import PropTypes from 'prop-types';
import {
  isEmpty, get, find, hasIn
} from 'lodash';
import P from '../../Typography/P';

// COMPONENTS & STYLES
import { Container } from './stepper.styles';
import Navigation from './stepper.navigation';

const Stepper = (props) => {
  const {
    activeItem,
    changeStep,
    children,
    className,
    stepper,
    position
  } = props;

  const [visited, setVisited] = React.useState([activeItem]);

  React.useEffect(() => {
    // Set new active id to state
    if (!visited.includes(activeItem)) {
      setVisited([...visited, activeItem]);
    }
  }, [activeItem, visited]);

  if (isEmpty(children)) {
    return (
      <P>No steps defined</P>
    );
  }

  const activeStep = activeItem || get(children, '[0].id');

  const returnContent = () => {
    const body = find(children, {
      id: activeStep
    });
    if (body && hasIn(body, 'content')) {
      return body.content;
    }
    return <P>Active step has no content</P>;
  };

  return (
    <Container className={ className }>
      { position === 'above' && (
        <Navigation
          activeItem={ activeStep } // use passed in active item or first step
          changeStep={ changeStep }
          steps={ children.map(item => ({
            title: item.title,
            id: item.id,
            complete: item.complete,
            disabled: item.disabled,
            visited: visited.includes(item.id)
          })) }
          type={ stepper }
        />
      ) }
      { returnContent() }
      { position === 'below' && (
        <Navigation
          activeItem={ activeStep } // use passed in active item or first step
          changeStep={ changeStep }
          steps={ children.map(item => ({
            title: item.title,
            id: item.id,
            complete: item.complete,
            disabled: item.disabled,
            visited: visited.includes(item.id)
          })) }
          type={ stepper }
        />
      ) }
    </Container>
  );
};

Stepper.defaultProps = {
  activeItem: null,
  children: [],
  className: 'stepper',
  position: 'below'
};

Stepper.propTypes = {
  activeItem: PropTypes.string,
  changeStep: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    complete: PropTypes.bool,
    id: PropTypes.string.isRequired,
    content: PropTypes.any.isRequired
  })),
  className: PropTypes.string,
  position: PropTypes.string,
  stepper: PropTypes.string.isRequired
};

export default Stepper;