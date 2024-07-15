import React from "react";
import { SwiperSlide } from "swiper/react";

type QuizQuestionsProps = {
  questions: any;
  answers: string[];
  handleAnswerChange: any;
  isQuizEvaluated: boolean;
};

const QuizQuestions: React.FC<QuizQuestionsProps> = ({
  questions,
  answers,
  handleAnswerChange,
  isQuizEvaluated,
}) => {
  return (
    <>
      {questions.map((question: any, index: number) => (
        <SwiperSlide key={index}>
          {/*  <QuizQuestion
            key={index}
            question={{ ...question, index, isCorrect: question.isCorrect }}
            answers={answers}
            onAnswerChange={handleAnswerChange}
            isQuizEvaluated={isQuizEvaluated}
          /> */}
          <div>Ahooooojd</div>
        </SwiperSlide>
      ))}
    </>
  );
};

export default QuizQuestions;
