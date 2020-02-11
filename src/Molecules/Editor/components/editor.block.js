import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@salo/icons';

import { Dropdown, DropdownWrapper } from '../editor.styles';

const BLOCK_TYPES = [
  {
    label: 'Heading',
    style: 'header-three'
  },
  {
    label: 'Subheading',
    style: 'header-four'
  },
  {
    label: 'Paragraph',
    style: 'unstyled'
  },
  {
    label: 'Quote',
    style: 'blockquote'
  },
  {
    label: 'Bulleted list',
    style: 'unordered-list-item'
  },
  {
    label: 'Numbered list',
    style: 'ordered-list-item'
  },
  {
    label: 'Code',
    style: 'code-block'
  }
];

const EditorBlock = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  const handleChange = (event) => {
    props.onToggle(event.target.value);
  };

  return (
    <DropdownWrapper>
      <Dropdown onChange={ handleChange } value={ blockType }>
        { BLOCK_TYPES.map((type) => (
          <option
            key={ type.label }
            label={ type.label }
            onToggle={ props.onToggle }
            value={ type.style }
          >
            { type.label }
          </option>
        )) }
      </Dropdown>
      <Icon
        icon='chevron_down'
        fill='#444'
        vAlign='middle'
        size={ 17 }
      />
    </DropdownWrapper>
  );
};

EditorBlock.propTypes = {
  editorState: PropTypes.object.isRequired,
  onToggle: PropTypes.func.isRequired
};

export default EditorBlock;