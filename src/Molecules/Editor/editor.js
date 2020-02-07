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
import Icon from '@salo/icons';

import { Wrapper, Controls, Format } from './editor.styles';

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
    showPlaceholder: false,
    showURLInput: false,
    urlValue: ''
  });

  const {
    editorState,
    showPlaceholder,
    showURLInput,
    urlValue
  } = state;

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
  React.useEffect(() => {
    const contentState = editorState.getCurrentContent();
    console.log('hasText', contentState.hasText());
    const firstType = contentState
      .getBlockMap()
      .first()
      .getType();
    console.log('firstType', firstType);
    console.log('eval', !contentState.hasText() && firstType === 'unstyled');
    if (!contentState.hasText() && firstType === 'unstyled') {
      dispatch({
        type: 'TOGGLE_PLACEHOLDER',
        payload: true
      });
    } else {
      dispatch({
        type: 'TOGGLE_PLACEHOLDER',
        payload: false
      });
    }
  
    console.log('in', {
      showPlaceholder
    });
  }, [editorState, showPlaceholder]);
  console.log('out', {
    showPlaceholder
  });
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
    if (!selection.isCollapsed()) {
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
          <Format type='button' onMouseDown={ confirmLink }>
            Confirm
          </Format>
        </div>
      ) }
      <Controls>
        <InlineStyleControls
          editorState={ editorState }
          onToggle={ toggleInlineStyle }
        />
        <Format
          type='button'
          onMouseDown={ promptForLink }
        >
          <Icon icon='link' />
        </Format>
        <Format
          type='button'
          onMouseDown={ removeLink }
        >
          <Icon icon='link_off' />
        </Format>
        <BlockStyleControls
          editorState={ editorState }
          onToggle={ toggleBlockType }
        />
        
      </Controls>
      <div
        className={ `salo-editor__editor ${ !showPlaceholder ? 'hide-placeholder' : '' } ${ className }` }
      >
        <Editor
          editorState={ editorState }
          onChange={ handleChange }
          handleKeyCommand={ handleKeyCommand }
          placeholder={ placeholder }
          blockStyleFn={ getBlockStyle }
          customStyleMap={ styleMap }
          spellCheck={ true }
        />
      </div>
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