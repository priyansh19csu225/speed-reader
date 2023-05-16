import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormContext, Controller } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import Select from 'react-select';
import EditorController from '../RichTextEditor/EditorController';
import { showSnackBar } from '../../../redux/snackBarSlice';
import { toolbarOptions } from '../../constants/toolbar.constants';
import AddMCQ from './AddMCQ';
import { postRequest } from '../../services';
import { API_URL } from '../../constants/apiUrls';

function ComprehensionComponent() {
  const { control, register, getValues, handleSubmit, setValue, reset } =
    useFormContext();
  const dispatch = useDispatch();

  const onSubmit = () => {
    if (
      // eslint-disable-next-line
      confirm(
        'This will send comprehension to database server. Be sure that you have added all mcqs. If misclicked, press cancel, and continue adding mcqs from wherever you left.'
      ) === false
    ) {
      return;
    }
    // eslint-disable-next-line
    const length = document
      .getElementById('getData')
      .innerText.split(' ').length;
    setValue('wordCount', length);
    const text = getValues();
    postRequest(API_URL.INSERT, text)
      .then((res) => {
        dispatch(
          showSnackBar({
            setopen: true,
            message: res?.data.msg,
            severity: 'success',
          })
        );
        reset({});
      })
      .catch(() => {
        dispatch(
          showSnackBar({
            setopen: true,
            message: 'Some error occured, Please try again later!',
            severity: 'error',
          })
        );
      });
  };
  const options = [
    { value: 1, label: 'BEGINEER' },
    { value: 10, label: 'INTERMEDIATE' },
    { value: 20, label: 'EXPERT' },
  ];

  const divRef = 'getData';
  return (
    <div className="col-md-12 subHeader m-3 p-3">
      <h4 className="center-text m-2 p-2">Add a New Comprehension</h4>
      <label htmlFor="title" className="form-label col-12">
        Comprehension Passage Title:
        <TextField
          className="w-100"
          type="text"
          {...register('title', {
            required: 'Required',
          })}
        />
      </label>
      <label htmlFor="passage" className="form-label col-12">
        Comprehension Passage:
        <div id={divRef}>
          <EditorController
            name="comprehension"
            control={control}
            toolbarOptions={toolbarOptions}
            editorHeight="250px"
          />
        </div>
      </label>
      <label htmlFor="level" className="form-label col-12">
        Choose level
        <Controller
          control={control}
          name="level"
          render={({ field: { onChange, value, ref } }) => (
            <Select
              inputRef={ref}
              classNamePrefix="addl-class"
              options={options}
              value={options.find((c) => c.value === value)}
              onChange={(val) => onChange(val.map((c) => c.value))}
              isMulti
            />
          )}
        />
      </label>

      <AddMCQ />

      <div className="d-flex justify-content-center w-100">
        <Button
          onClick={handleSubmit(onSubmit)}
          type="button"
          variant="contained"
        >
          Submit Passage
        </Button>
      </div>
    </div>
  );
}

export default ComprehensionComponent;
