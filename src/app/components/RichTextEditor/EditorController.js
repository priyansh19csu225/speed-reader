import React from 'react';
import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import RichTextEditor from './RichTextEditor';
import { EMPTY_OBJECT } from '../../constants';

function EditorController(props) {
  const { name, control, toolbarOptions, placeholder, editorHeight } =
    props;

  return (
    <Controller
      name={name}
      control={control}
    
      render={({ field: { value, onChange } }) => (
        <div>
          <RichTextEditor
            onChange={onChange}
            // placeholder={placeholder}
            placeholder={placeholder}
            value={value}
            toolbarOptions={toolbarOptions}
            editorHeight={editorHeight}
          />
       
        </div>
      )}
    />
  );
}
EditorController.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  control: PropTypes.object,
  toolbarOptions: PropTypes.object,
  editorHeight: PropTypes.string,
};
EditorController.defaultProps = {
  name: undefined,
  placeholder: undefined,
  control: EMPTY_OBJECT,
  toolbarOptions: EMPTY_OBJECT,
  editorHeight: undefined,
};
export default EditorController;
