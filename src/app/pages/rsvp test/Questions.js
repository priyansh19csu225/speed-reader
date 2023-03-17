import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function Questions() {
  const questions = useSelector(
    (state) => state.user.userInfo.selectedComprehension.questions
  );
  const [answers, setAnswers] = useState([]);

  const handleChange = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(answers);
  };
  return (
    <div className="d-flex container subHeader justify-content-center">
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question._id} className="m-2 p-2">
            <p>
              Q{index + 1}. {question.stmt}
            </p>
            {question.options.map((option) => (
              <div key={option} className="ms-3">
                <label>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleChange(index, option)}
                    checked={answers[index] === option}
                  />
                  <span className="ms-2">{option}</span>
                </label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Questions;
