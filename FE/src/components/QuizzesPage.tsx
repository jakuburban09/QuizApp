import { Link } from "react-router-dom";
import Navbar from "./bricks/Navbar";
import { error } from "console";
import Button from "./bricks/Button";
import QuizList from "./QuizList";
import Text from "./bricks/Text";
import { FC } from "react";

type QuizzesPageProps = {
  quizzes: any;
  loading: boolean;
  error: string | null;
  onQuizClick: (id: string) => void;
};

const QuizzesPage: FC<QuizzesPageProps> = ({
  quizzes,
  loading,
  error,
  onQuizClick,
}) => {
  return (
    <div className="p-4">
      <Navbar />
      <Text element="h1" style="h1" className="mb-10">
        Choose one or create your own
      </Text>
      <div className="flex w-full justify-between gap-3 mb-14">
        <Link
          to="/quiz#ourQuizzes"
          className="w-full"
          onClick={() => {
            const element = document.getElementById("ourQuizzes");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <Button icon={{ iconName: "PlayFill" }} className="w-full">
            Select Quiz
          </Button>
        </Link>
        <Link to="#createQuizz" className="w-full">
          <Button
            icon={{ iconName: "PlusLg" }}
            className="w-full"
            hiearchy="secondary"
          >
            Create Quiz
          </Button>
        </Link>
      </div>
      <Text element="h2" style="h2" className="mb-5" id="ourQuizzes">
        Our quizzes
      </Text>
      <QuizList
        quizzes={quizzes}
        loading={loading}
        error={error}
        onQuizClick={onQuizClick}
      />
    </div>
  );
};

export default QuizzesPage;
