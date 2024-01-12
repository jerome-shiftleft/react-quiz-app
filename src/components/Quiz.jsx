import { useState } from "react";
import QUESTIONS from "../questions";
import QuestionTimer from "./QuestionTimer";
import quizCompleteImg from "../assets/quiz-complete.png";

export default function Quiz() {
  //const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;
  console.log(`activeQuestionIndex: ${activeQuestionIndex}`);

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  function handSelectAnswer(selectedAnswer) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  }

  if (quizIsComplete) {
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy Icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers];
  shuffledAnswers.sort(() => Math.random() - 0.5);

  return (
    <>
      <div id="quiz">
        <div id="question">
          <QuestionTimer timeout={10000} onTimeout={() => handSelectAnswer(null)} />
          <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
          <ul id="answers">
            {shuffledAnswers.map((answer) => (
              <li key={answer} className="answer">
                <button onClick={() => handSelectAnswer(answer)}>
                  {answer}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
