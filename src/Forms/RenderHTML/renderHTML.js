import React from 'react';
import PropTypes from 'prop-types';
import DomPurify from 'dompurify';

const RenderHTML = ({ content }) => {
  return (
    <div
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={ {
        __html: DomPurify.sanitize(content)
      } }
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