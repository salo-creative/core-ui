import React from 'react';
import PropTypes from 'prop-types';
import { indexOf } from 'lodash';
// COMPONENTS & STYLES

const Accordion = (props) => {
  const {
    allowMultiple,
    children,
    initialOpen
  } = props;

  const [active, setActive] = React.useState(initialOpen);

  const handleClick = (id) => {
    const i = indexOf(active, id);
    if (i >= 0) { // remove active state for this id
      setActive([
        ...active.slice(0, i),
        ...active.slice(i + 1)
      ]);
    } else { // Make active and handle multiple bool
      setActive(allowMultiple ? [...active, id] : [id]);
    }
  };

  const items = children.map(item => {
    const { id } = item.props;
    return {
      ...item,
      props: {
        ...item.props,
        onClick: () => handleClick(id),
        isOpen: !!active.includes(id)
      }
    };
  });
  return items;
};

Accordion.defaultProps = {
  allowMultiple: false,
  initialOpen: []
};

Accordion.propTypes = {
  allowMultiple: PropTypes.bool,
  children: PropTypes.any.isRequired,
  initialOpen: PropTypes.arrayOf(PropTypes.oneOf([PropTypes.string, PropTypes.number]))
};

export default Accordion;