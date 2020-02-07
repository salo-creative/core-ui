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

import {
  Wrapper, Controls, Format, URLPrompt
} from './editor.styles';

import BlockStyleControls from './editor.block';
import InlineStyleControls from './editor.inline';
import Link from './editor.link';

import reducer from './editor.reducer';
import { styleMap, getBlockStyle, findLinkEntities } from './editor.helpers';

const WYSIWYG = (props) => {
  const { className, placeholder, value, onExport } = props;

  // * Refs (used to focus)
  const editorEl = React.useRef();
  const urlInput = React.useRef();
  
  // Setup ability to add anchor tags.
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link
    }
  ]);

  // Evaluate if we need to decode HTML.
  const blocks = (() => {
    if (!value) {
      return null;
    }
    try {
      const blocksFromHTML = convertFromHTML(value);
      return ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
    } catch (error) {
      return null;
    }
  })();
  
  const [state, dispatch] = React.useReducer(reducer, {
    // Either create from pre-populated HTML or empty
    editorState: blocks ? EditorState.createWithContent(blocks, decorator) : EditorState.createEmpty(decorator),
    showControls: false,
    showPlaceholder: false,
    showURLInput: false,
    urlValue: ''
  });

  const {
    editorState,
    showControls,
    showPlaceholder,
    showURLInput,
    urlValue
  } = state;

  // Handle updating editor state changes.
  const handleChange = (newEditorState) => {
    dispatch({
      type: 'UPDATE_EDITOR_STATE',
      payload: newEditorState
    });

    // Export new HTML on every change.
    if (typeof onExport === 'function') {
      onExport({
        html: stateToHTML(newEditorState.getCurrentContent(), {
          entityStyleFn: (entity) => {
            // Add _blank to all links.
            const entityType = entity.get('type').toLowerCase();
            if (entityType === 'link') {
              const data = entity.getData();
              return {
                element: 'a',
                attributes: {
                  href: data.url,
                  target: '_blank',
                  rel: 'noopener noreferrer'
                }
              };
            }
            return entity;
          }
        })
      });
    }
  };

  // Handle formatting commands.
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleChange(newState);
      return 'handled';
    }

    return 'not-handled';
  };

  // Placeholder behaviour.
  React.useEffect(() => {
    const contentState = editorState.getCurrentContent();
    const firstType = contentState
      .getBlockMap()
      .first()
      .getType();
    // The default draft.js placeholder behaviour doesn't mimic a normal input
    // So we have to manually hide it. This check hides it if there's no text or
    // the first item is unstyled (in case they start with a list).
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
  }, [editorState, showPlaceholder]);

  // Toggles block selections e.g. headings.
  const toggleBlockType = (blockType) => {
    handleChange(
      RichUtils.toggleBlockType(
        editorState,
        blockType
      )
    );
    setTimeout(() => editorEl.current.focus(), 0);
  };

  // Toggles inline selections e.g. bold.
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

  const confirmLink = async (event) => {
    event.preventDefault();
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

    setTimeout(() => editorEl.current.focus(), 0);
  };

  const onLinkInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      confirmLink(event);
    }
  };

  const removeLink = (event) => {
    event.preventDefault();
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

  const hasLink = RichUtils.currentBlockContainsLink(editorState);

  return (
    <Wrapper
      className='salo-editor'
      showControls={ showControls }
    >
      { showURLInput && (
        <URLPrompt>
          <input
            type='url'
            onChange={ onURLChange }
            ref={ urlInput }
            value={ urlValue }
            onKeyDown={ onLinkInputKeyDown }
          />
          <Format
            type='button'
            onClick={ confirmLink }
          >
            Add link
          </Format>
        </URLPrompt>
      ) }
      <Controls hide={ !showControls }>
        <InlineStyleControls
          editorState={ editorState }
          onToggle={ toggleInlineStyle }
        />
        { !hasLink && (
          <Format
            type='button'
            onClick={ promptForLink }
          >
            <Icon icon='link' />
          </Format>
        ) }
        { hasLink && (
          <Format
            type='button'
            onClick={ removeLink }
          >
            <Icon icon='link_off' />
          </Format>
        ) }
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
          ref={ editorEl }
          onBlur={ () => {
            dispatch({
              type: 'TOGGLE_CONTROLS',
              payload: false
            });
          } }
          onFocus={ () => {
            dispatch({
              type: 'TOGGLE_CONTROLS',
              payload: true
            });
          } }
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