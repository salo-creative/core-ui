import React from 'react';
import PropTypes from 'prop-types';
import punycode from 'punycode';

import { Characters, Count } from '../editor.styles';

function getCharCount(editorState) {
  const decodeUnicode = str => punycode.ucs2.decode(str); // func to handle unicode characters
  const plainText = editorState.getCurrentContent().getPlainText('');
  const regex = /(?:\r\n|\r|\n)/g; // new line, carriage return, line feed
  const cleanString = plainText.replace(regex, '').trim(); // replace above characters w/ nothing
  return decodeUnicode(cleanString).length;
}

const EditorCharacterCount = props => {
  const { editorState, limit } = props;
  const count = getCharCount(editorState);
  return (
    <Characters>Characters left <Count>{ limit - count }</Count></Characters>
  );
};

EditorCharacterCount.propTypes = {
  editorState: PropTypes.object.isRequired,
  limit: PropTypes.number.isRequired
};

export default EditorCharacterCount;