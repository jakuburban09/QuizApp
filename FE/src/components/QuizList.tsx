import React from "react";
import QuizCard from "./QuizCard";
import { Quiz } from "../helpers/enums";

interface QuizListProps {
  quizzes: Quiz[];
  loading: boolean;
  error: string | null;
  onQuizClick: (quizId: string) => void;
}

const QuizList: React.FC<QuizListProps> = ({
  quizzes,
  loading,
  error,
  onQuizClick,
}) => {
  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes.map((quiz) => (
        <QuizCard
          key={quiz.id}
          nameOfQuiz={quiz.name}
          numberOfQuestions={quiz.numberOfQuestions}
          level={quiz.level}
          onClick={() => onQuizClick(quiz.id)}
        />
      ))}
    </div>
  );
};

export default QuizList;
