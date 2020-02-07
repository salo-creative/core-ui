import React from 'react';
import PropTypes from 'prop-types';
import { Entity } from 'draft-js';

const Link = (props) => {
  const { children, entityKey } = props;
  const { url } = Entity.get(entityKey).getData();
  return (
    <a href={ url }>
      { children }
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.any.isRequired,
  entityKey: PropTypes.string.isRequired
};

export default Link;