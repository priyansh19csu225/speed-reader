import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
} from '@mui/material';
import { Cancel, CheckCircle } from '@mui/icons-material';

function Questions() {
  const questions = useSelector(
    (state) => state.user.selectedComprehension.questions
  );
  // const wpmForComprehension = useSelector((state) => state.user.wpm);
  const [answers, setAnswers] = useState(
    new Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (index, option) => {
    if (!submitted) {
      const newAnswers = [...answers];
      newAnswers[index] = option;
      setAnswers(newAnswers);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    // console.log(wpmForComprehension);
  };

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
          <div key={question._id} className="m-2 p-2">
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
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Questions;
