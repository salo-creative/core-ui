import React from 'react';
import PropTypes from 'prop-types';

const Link = (props) => {
  const { children, contentState, entityKey } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a href={ url }>
      { children }
    </a>
  );
};

Link.propTypes = {
  children: PropTypes.any.isRequired,
  contentState: PropTypes.object.isRequired,
  entityKey: PropTypes.string.isRequired
};

export default Link;