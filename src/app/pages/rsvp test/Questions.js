/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Dialog,
  DialogActions,
} from '@mui/material';
import { Cancel, CheckCircle, Warning } from '@mui/icons-material';
import URL from '../../constants/urls';
import { postRequest } from '../../services';
import API_URL from '../../constants/apiUrls';
import { showSnackBar } from '../../../redux/snackBarSlice';

function Questions() {
  const questions = useSelector(
    (state) => state.user.selectedComprehension.questions
  );
  const email = useSelector((state) => state.user.userInfo.email);
  const comprehension_id = useSelector(
    (state) => state.user.selectedComprehension._id
  );
  const comprehension_name = useSelector(
    (state) => state.user.selectedComprehension.title
  );
  const wpm = useSelector((state) => state.user.wpm);
  const [correct_answers, setCorrectAnswersCount] = useState(0);
  const total_questions = questions?.length;
  const comprehension_level = useSelector(
    (state) => state.user.selectedComprehension.level
  );
  const account_level = useSelector(
    (state) => state.user.userInfo.account_level
  );

  const [answers, setAnswers] = useState(
    new Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const handleChange = (index, option) => {
    if (!submitted) {
      const newAnswers = [...answers];
      newAnswers[index] = option;
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitted) return;
    if (answers.includes(null)) {
      setOpen(true);
      return;
    }

    setSubmitted(true);

    let correct_count = 0;

    for (let i = 0; i < total_questions; i++) {
      const userAnswer = answers[i];
      const actualAnswer = questions[i].answers[0];
      if (userAnswer === actualAnswer) correct_count++;
    }

    setCorrectAnswersCount(correct_count);
  };

  useEffect(() => {
    if (!submitted) return;

    postRequest(API_URL.SAVE_RESULT, {
      email,
      comprehension_id,
      comprehension_level,
      comprehension_name,
      correct_answers,
      wpm,
      total_questions,
      account_level,
    })
      .then((res) => {
        dispatch(
          showSnackBar({
            setopen: true,
            message: res?.data.msg,
            severity: 'success',
          })
        );
      })
      .catch((error) => {
        dispatch(
          showSnackBar({
            setopen: true,
            message: error?.data.msg,
            severity: 'error',
          })
        );
      });
  }, [correct_answers]);

  const navigate = useNavigate();

  const getAnswerIcon = (index) => {
    if (!submitted) {
      return null;
    }
    const userAnswer = answers[index];
    const actualAnswer = questions[index].answers[0]; // Assuming there's only one correct answer
    const isCorrect = userAnswer === actualAnswer;
    const answerText = questions[index].options.find(
      (option) => option === actualAnswer
    );
    return (
      <div className="d-flex align-items-center">
        {isCorrect ? (
          <div className="d-flex justify-content-center align-items-center">
            <CheckCircle className="ms-3 me-2" color="success" />
            <span style={{ color: 'green' }}>
              Correct Answer:{' '}
              <strong style={{ color: 'green' }}>{answerText}</strong>
            </span>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center">
            <Cancel className="ms-3 me-2" color="error" />
            <span style={{ color: 'red' }}>
              Wrong Answer, The Correct Answer is:{' '}
              <strong style={{ color: 'green' }}>{answerText}</strong>
            </span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Container className="d-flex flex-column subHeader">
      <h4 className="center-text m-2 p-2">Questions:</h4>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question._id} className="m-2 p-2 mt-3">
            <strong>
              Q{index + 1}. {question.stmt}
            </strong>
            <RadioGroup
              name={`question-${index}`}
              value={answers[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
            >
              {question.options.map((option) => (
                <div
                  key={option}
                  className="optionContainer ms-3 p-2 ps-4"
                  onClick={() => handleChange(index, option)}
                >
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={option}
                    disabled={submitted}
                  />
                </div>
              ))}
              {getAnswerIcon(index)}
            </RadioGroup>
          </div>
        ))}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitted}
          className="me-2 ms-5 mt-3"
        >
          Submit
        </Button>
        {submitted && (
          <Button
            onClick={() => navigate(URL.SEE_RESULTS)}
            variant="contained"
            color="secondary"
            className="ms-2 mt-3"
          >
            See Results
          </Button>
        )}
        <Dialog fullWidth open={open}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '20px',
            }}
          >
            <div>
              <Warning style={{ color: 'orange', fontSize: '50px' }} />
            </div>
            <div style={{ marginBottom: '0px' }}>
              <h5>Please answer all questions </h5>
            </div>
          </div>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>OK</Button>
          </DialogActions>
        </Dialog>
      </form>
    </Container>
  );
}

export default Questions;
