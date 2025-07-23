import React, { useState } from "react";
import { useNavigate } from "react-router";

const FormComponent = React.memo(({ questions }) => {
  let navigate = useNavigate();
  const [questionId, setQuestionId] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  if (!questions) return null;
  const currentQuestion = questions[questionId];
  // updating the questions on the UI, without saving answers
  // just simulating the flow of the survey based on the answers
  const handleNext = () => {
    // if questions ended redirect to BP Test
    if (questionId >= questions.length - 1) {
      navigate("/bptest");
    } else if (questionId < questions.length - 1) {
      switch (selectedOption) {
        case "mixed":
        case "indian":
        case "pakistani":
        case "chinese":
        case "other_asian":
        case "used_to":
        case "less_than_1":
        case "1_to_9":
        case "10_to_19":
        case "20_plus":
        case "no":
          setQuestionId((prev) => prev + 2);
          setSelectedOption(null);
          break;
        case "asian":
        case "white_black_caribbean":
        case "white_black_african":
        case "white_asian":
        case "other_mixed":
        case "never":
          setQuestionId((prev) => prev + 3);
          setSelectedOption(null);
          break;
        case "black":
        case "british":
        case "irish":
        case "gypsy":
        case "roma":
        case "other_white":
          setQuestionId((prev) => prev + 4);
          setSelectedOption(null);
          break;
        case "other":
          setQuestionId((prev) => prev + 5);
          setSelectedOption(null);
          break;
        case "not_said":
          setQuestionId((prev) => prev + 5);
          setSelectedOption(null);
          break;

        default:
          setQuestionId((prev) => prev + 1);
          setSelectedOption(null);
          break;
      }
    }
  };

  return (
    <form className="survey-form">
      <fieldset>
        <legend>{currentQuestion.question}</legend>
        {currentQuestion.options.map((option, index) => (
          <label key={index} htmlFor={option.value}>
            <input
              type="radio"
              id={option.value}
              name={`question-${questionId}`}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => setSelectedOption(option.value)}
            />
            {option.label}
          </label>
        ))}
      </fieldset>
      <button
        className="next-button"
        type="button"
        disabled={!selectedOption}
        onClick={handleNext}
      >
        {questionId >= questions.length - 1
          ? "Go To Blood Pressure Test"
          : "Next"}
      </button>
    </form>
  );
});

export default FormComponent;
