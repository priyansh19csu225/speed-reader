import React, { useEffect, useState, useRef } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import cx from 'classnames';
import { EMPTY_OBJECT } from '../../constants';
import './RichTextEditor.css';

function RichTextEditor(props) {
  const {
    onChange,
    value,
    toolbarOptions,
    placeholder,
    editorHeight,
    readOnly,
    emptyEditor,
  } = props;
  const valueInitialized = useRef(true);
  let defaultValueProps;
  const initialFieldValue = value;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  if (initialFieldValue) {
    defaultValueProps = initialFieldValue;
  } else {
    defaultValueProps = emptyEditor ? ' ' : '';
  }
  const blocksFromHtml = htmlToDraft(defaultValueProps);
  const contentState = ContentState.createFromBlockArray(
    blocksFromHtml.contentBlocks
  );
  const editorStateValue = EditorState.createWithContent(contentState);

  useEffect(() => {
    if (valueInitialized.current && defaultValueProps !== '') {
      setEditorState(editorStateValue);
      valueInitialized.current = false;
    }

    if (!emptyEditor) {
      document
        .getElementsByClassName('public-DraftEditor-content')[0]
        .classList.add('blur-Text', 'noselect');
    }
  }, [defaultValueProps]);

  const onEditorStateChange = (valueonEditorChange) => {
    let textEditorValue = draftToHtml(
      convertToRaw(editorState.getCurrentContent())
    ).trim();
    textEditorValue = textEditorValue !== '<p></p>' ? textEditorValue : '';
    textEditorValue = textEditorValue.replace(/<p>/g, '<div>');
    textEditorValue = textEditorValue.replace(/<\/p>/g, '</div>');
    textEditorValue = textEditorValue.replace(/<div><\/div>/g, '<p></p>');
    setEditorState(valueonEditorChange);
    return onChange(textEditorValue);
  };

  return (
    <Editor
      wrapperStyle={{ height: editorHeight }}
      value={editorState}
      editorState={editorState}
      placeholder={placeholder}
      wrapperClassName={emptyEditor && cx('wrapper-class')}
      toolbarClassName={emptyEditor && cx('___editor__toolbar')}
      editorClassName={cx(
        '___editor__content',
        'border px-2 rounded',
        'textEditorHeight',
        'resize-text-editor'
      )}
      toolbarHidden={!emptyEditor}
      onEditorStateChange={onEditorStateChange}
      toolbar={toolbarOptions}
      readOnly={readOnly}
    />
  );
}

RichTextEditor.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
  toolbarOptions: PropTypes.object,
  placeholder: PropTypes.string,
  editorHeight: PropTypes.string,
  readOnly: PropTypes.bool,
  emptyEditor: PropTypes.bool,
};

RichTextEditor.defaultProps = {
  onChange: noop,
  value: undefined,
  placeholder: undefined,
  toolbarOptions: EMPTY_OBJECT,
  editorHeight: undefined,
  readOnly: false,
  emptyEditor: false,
};
export default RichTextEditor;
