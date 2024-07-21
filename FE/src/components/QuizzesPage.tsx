import { Link } from "react-router-dom";
import Navbar from "./bricks/Navbar";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  return (
    <div className="p-4">
      <Navbar />
      <Text element="h1" style="h1" className="mb-10">
        {t("quizPage.heading")}
      </Text>
      <Text element="p" style="p" className="mb-10 w-full md:w-1/2">
        {t("quizPage.text")}
      </Text>
      <div className="flex w-full md:w-1/2 justify-between md:justify-normal gap-3 mb-14">
        <Link
          to="#ourQuizzes"
          className="w-full md:w-auto"
          onClick={() => {
            const element = document.getElementById("ourQuizzes");
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
        >
          <Button icon={{ iconName: "PlayFill" }} className="w-full">
            {t("other.buttons.selectQuiz")}
          </Button>
        </Link>
        <Link to="#createQuizz" className="w-full md:w-auto">
          <Button
            icon={{ iconName: "PlusLg" }}
            className="w-full"
            hiearchy="secondary"
          >
            {t("other.buttons.createQuiz")}
          </Button>
        </Link>
      </div>
      <Text element="h2" style="h2" className="mb-5" id="ourQuizzes">
        {t("quizPage.secondHeading")}
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
