import React from 'react';
import PropTypes from 'prop-types';
import {
  CompositeDecorator,
  ContentState,
  Editor,
  EditorState,
  Entity,
  RichUtils,
  convertFromHTML
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import { Wrapper, Controls } from './editor.styles';

import BlockStyleControls from './editor.block';
import InlineStyleControls from './editor.inline';
import Link from './editor.link';

import reducer from './editor.reducer';
import { styleMap, getBlockStyle, findLinkEntities } from './editor.helpers';

const WYSIWYG = (props) => {
  const { className, placeholder, value, onExport } = props;

  const editor = React.useRef();
  const urlInput = React.useRef();
  
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link
    }
  ]);

  const blocksFromHTML = convertFromHTML(value);
  const x = ContentState.createFromBlockArray(
    blocksFromHTML.contentBlocks,
    blocksFromHTML.entityMap
  );
  
  const [state, dispatch] = React.useReducer(reducer, {
    editorState: value ? EditorState.createWithContent(x, decorator) : EditorState.createEmpty(decorator),
    showURLInput: false,
    urlValue: ''
  });

  const { editorState, showURLInput, urlValue } = state;

  const handleChange = (newEditorState) => {
    dispatch({
      type: 'UPDATE_EDITOR_STATE',
      payload: newEditorState
    });

    if (typeof onExport === 'function') {
      onExport({
        html: stateToHTML(newEditorState.getCurrentContent())
      });
    }
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  // Placeholder behaviour
  const contentState = editorState.getCurrentContent();
  let showPlaceholder = false;
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() === 'unstyled') {
      showPlaceholder = true;
    }
  }

  const toggleBlockType = (blockType) => {
    handleChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
  };

  const toggleInlineStyle = (inlineStyle) => {
    handleChange(
      RichUtils.toggleInlineStyle(
        editorState,
        inlineStyle
      )
    );
  };

  // * Links
  const promptForLink = async (event) => {
    event.preventDefault();
    const selection = editorState.getSelection();
    debugger; //eslint-disable-line
    if (!selection.isCollapsed()) {
      debugger; //eslint-disable-line
      await dispatch({
        type: 'PROMPT_FOR_LINK'
      });
      setTimeout(() => urlInput.current.focus(), 0);
    }
  };

  const confirmLink = async (e) => {
    e.preventDefault();
    const entityKey = Entity.create('LINK', 'MUTABLE', {
      url: urlValue
    });

    await dispatch({
      type: 'CONFIRM_LINK',
      payload: RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      )
    });

    setTimeout(() => editor.current.focus(), 0);
  };

  const onLinkInputKeyDown = (event) => {
    if (event.which === 13) {
      confirmLink(event);
    }
  };

  const removeLink = (e) => {
    e.preventDefault();
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      dispatch({
        type: 'UPDATE_EDITOR_STATE',
        payload: RichUtils.toggleLink(editorState, selection, null)
      });
    }
  };

  const onURLChange = (event) => dispatch({
    type: 'UPDATE_URL',
    payload: event.target.value
  });

  return (
    <Wrapper className='salo-editor'>
      { showURLInput && (
        <div>
          <input
            onChange={ onURLChange }
            ref={ urlInput }
            type='text'
            value={ urlValue }
            onKeyDown={ onLinkInputKeyDown }
          />
          <button type='button' onMouseDown={ confirmLink }>
            Confirm
          </button>
        </div>
      ) }
      <Controls>
        { /* <button type='button' onClick={ () => handleStyleClick('BOLD') }>B</button>
        <button type='button' onClick={ () => handleStyleClick('ITALIC') }>I</button>
        <button type='button' onClick={ () => handleStyleClick('UNDERLINE') }>U</button> */ }
        <button
          type='button'
          onMouseDown={ promptForLink }
          style={ {
            marginRight: 10
          } }
        >
          Add Link
        </button>
        <button type='button' onMouseDown={ removeLink }>
          Remove Link
        </button>
        <BlockStyleControls
          editorState={ editorState }
          onToggle={ toggleBlockType }
        />
        <InlineStyleControls
          editorState={ editorState }
          onToggle={ toggleInlineStyle }
        />
      </Controls>
      <Editor
        className={ `salo-editor__editor ${ !showPlaceholder ? 'hide-placeholder' : '' } ${ className }` }
        editorState={ editorState }
        onChange={ handleChange }
        handleKeyCommand={ handleKeyCommand }
        placeholder={ placeholder }
        blockStyleFn={ getBlockStyle }
        customStyleMap={ styleMap }
        spellCheck={ true }
      />
    </Wrapper>
  );
};

WYSIWYG.defaultProps = {
  className: '',
  placeholder: '',
  value: '',
  onExport: null
};

WYSIWYG.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onExport: PropTypes.func
};

export default WYSIWYG;