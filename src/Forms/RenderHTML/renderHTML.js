import React from 'react';
import PropTypes from 'prop-types';

// HELPERS
import { sanitize } from '../../helpers/form';

const RenderHTML = ({ content, ...rest }) => {
  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={ {
        __html: sanitize(content)
      } }
      { ...rest }
    />
  );
};

RenderHTML.propTypes = {
  content: PropTypes.string
};

RenderHTML.defaultProps = {
  content: null
};

export default RenderHTML;