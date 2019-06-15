import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import Item from './breadcrumb.item';
import { Wrapper } from './breadcrumb.styles';

const Breadcrumb = (props) => {
  const { margin, trail } = props;

  return (
    <Wrapper margin={ margin }>
      { trail.map((item, i) => {
        const lastItem = i === (trail.length - 1);
        return (
          <Item
            key={ item.label }
            lastItem={ lastItem }
            { ...item }
          />
        );
      }) }
    </Wrapper>
  );
};

Breadcrumb.defaultProps = {
  margin: '0 0 2rem',
  trail: []
};

Breadcrumb.propTypes = {
  margin: PropTypes.string,
  trail: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    link: PropTypes.string
  }))
};

export default Breadcrumb;