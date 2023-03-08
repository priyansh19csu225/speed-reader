import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button , Autocomplete , TextField} from '@mui/material';
import { EMPTY_ARRAY } from '../../constants';

function AddMCQ() {
  const { setValue, getValues } = useFormContext();
  const [questionOptions, setQuestionOptions] = useState(EMPTY_ARRAY);
  const [questionstmt, setQuestionstmt] = useState('');
  const [answerOptions, setAnswerOptions] = useState(EMPTY_ARRAY);
  const handleAddButton = () => {
    const existingQuestions = getValues('questions');
    const newQuestion = {
      stmt: questionstmt,
      answers: answerOptions,
      options: questionOptions,
    };
    if (existingQuestions)
      setValue('questions', [...existingQuestions, newQuestion]);
    else setValue('questions', [newQuestion]);
    setQuestionOptions(EMPTY_ARRAY);
    setQuestionstmt('');
    setAnswerOptions(EMPTY_ARRAY);
  };
  return (
    <div>
      <label htmlFor="question" className="form-label col-12">
        Question:
        <TextField
          value={questionstmt}
          className="w-100"
          type="text"
          onChange={(e) => setQuestionstmt(e.target.value)}
        />
      </label>
      <label htmlFor="options" className="form-label col-12">
        Enter Options:
        <Autocomplete
          className="col-12"
          multiple
          limitTags={5}
          id="questionOptions"
          size="small"
          clearOnBlur
          options={[]}
          value={questionOptions}
          onChange={(_event, newOptions, reason) => {
            if (reason === 'clear') {
              setQuestionOptions([]);
            } else if (reason === 'removeOption') {
              setQuestionOptions(newOptions);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              onKeyDown={(e) => {
                if (e.keyCode === 13 && e.target.value) {
                  setQuestionOptions((prevOptions) => [
                    ...prevOptions,
                    e.target.value,
                  ]);
                  setAnswerOptions((prevOptions) => [
                    ...prevOptions,
                    e.target.value,
                  ]);
                }
              }}
            />
          )}
          freeSolo
        />
      </label>
      <label htmlFor="answers" className="form-label col-12">
        Enter Answers:
        <Autocomplete
          className="col-12"
          multiple
          limitTags={5}
          id="answerOptions"
          isOptionEqualToValue={(option, value) => option.value === value.value}
          size="small"
          clearOnBlur
          options={questionOptions}
          value={answerOptions}
          getOptionLabel={(option) => option.toString()}
          onChange={(_event, newOptions, reason) => {
            if (reason === 'clear') {
              setAnswerOptions([]);
            } else if (reason === 'removeOption') {
              setAnswerOptions(newOptions);
            } else if (reason === 'selectOption') {
              setAnswerOptions((prevOptions) => [
                ...prevOptions,
                ...newOptions,
              ]);
            }
          }}
          renderInput={(params) => <TextField {...params} variant="outlined" />}
        />
      </label>

      <Button
        className="mb-2"
        onClick={handleAddButton}
        type="button"
        variant="contained"
        
      >
        ADD MCQ
      </Button>
    </div>
  );
}

export default AddMCQ;
