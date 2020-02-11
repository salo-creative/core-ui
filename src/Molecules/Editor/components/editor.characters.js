import React from 'react';
import PropTypes from 'prop-types';

import { Characters, Count } from '../editor.styles';

const EditorCharacterCount = props => {
  const { limit, count } = props;
  return (
    <Characters className='salo-editor__characters'>Characters left <Count className='salo-editor__count'>{ limit - count }</Count></Characters>
  );
};

EditorCharacterCount.propTypes = {
  count: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired
};

export default EditorCharacterCount;