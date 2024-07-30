// QuizApp.tsx
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import QuizQuestion from "./QuizQuestion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import QuizNavigation from "./QuizNavigation";
import Button, { IconPosition } from "./bricks/Button";
import { Color } from "helpers/enums";
import Summary from "./Summary";
import ControlButtons from "./ControlButtons";
import Text from "./bricks/Text";
import Modal from "./bricks/Modal";
import { useHistory } from "react-router-dom";
import { Question, Quiz } from "../helpers/enums";
import QuizzesPage from "./QuizzesPage";
import baseURL from "config";

import { useNotification } from "./NotificationContext";

const QuizApp: React.FC = () => {
  const { addNotification } = useNotification();
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>("");

  //BE CALLS
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quiz, setQuiz] = useState<Quiz>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(`${baseURL}/infoQuiz`);
        setQuizzes(response.data);
        console.log("BE - ", response.data);
      } catch (err) {
        setError("Failed to fetch quizzes");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleQuizClick = async (quizId: string) => {
    try {
      const response = await axios.get(
        `${baseURL}/quiz/${quizId}?randomizeQuiz=true`,
      );
      console.log(response.data);
      const selectedQuiz = quizzes.find((quiz) => quiz.id === quizId);
      if (selectedQuiz) {
        setQuiz(selectedQuiz);
      }
      setNumberOfQuestions(response.data.numberOfQuestions);
      setQuizQuestions(response.data.questions);
      setStartQuiz(true);
    } catch (error) {
      addNotification(
        "Error fetching quiz details:",
        error,
        undefined,
        "error",
      );
      console.error("Error fetching quiz details:", error);
    }
  };

  const history = useHistory();

  const [startQuiz, setStartQuiz] = useState<boolean>(false);

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);

  /* NAVIGATION, SLIDES, HANDLE CHANGES */

  const [answers, setAnswers] = useState<string[]>(
    Array(
      !isNaN(parseInt(numberOfQuestions)) && numberOfQuestions.length !== 0
        ? parseInt(numberOfQuestions)
        : 0,
    ),
  );

  const [isQuizEvaluated, setIsQuizEvaluated] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  /* TODO - předělat */
  const handleAnswerChange = (questionIndex: number, value: string): void => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSlideChange = (newIndex: number): void => {
    setCurrentSlideIndex(newIndex);
  };

  const handleQuizNavigation = (newIndex: number): void => {
    if (swiper) {
      swiper.slideTo(newIndex);
    }
  };

  /* SWIPER */

  const [swiper, setSwiper] = useState<any>(() => null);
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (swiperRef.current) {
      setSwiper(() => swiperRef.current);
    }
  }, [swiperRef.current]);

  /* EVAULATE CHECK */

  const [isQuizEvaluatable, setIsQuizEvaluatable] = useState<boolean>(false);

  const canBeQuizEvaluated = (answers: (string | undefined | null)[]) => {
    const result = answers.every(
      (item) =>
        item && typeof item === "string" && item.trim() !== "" && item !== null,
    );

    setIsQuizEvaluatable(result);
    return result;
  };


  useEffect(() => {
    canBeQuizEvaluated(answers);
  }, [answers]);

  useEffect(() => {
    setIsQuizEvaluatable(false);
  }, []);

  /* EVALUATE */

  const [score, setScore] = useState<number>(0);
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] =
    useState<number>(0);
  const [numberOfWrongAnswers, setNumberOfWrongAnswers] = useState<number>(0);

  const evaluateQuiz = async (): Promise<void> => {
    if (canBeQuizEvaluated(answers)) {
      const quizData = {
        ...quiz!,
        questions: quizQuestions.map((question, index) => ({
          ...question,
          answer: answers[index],
        })),
      };

      try {
        const response = await axios.post(`${baseURL}/submitQuiz`, quizData);
        const evaluatedQuiz = response.data;

        setQuizQuestions(evaluatedQuiz.questions);
        setScore(evaluatedQuiz.score);
        setNumberOfCorrectAnswers(evaluatedQuiz.correctAnswers);
        setNumberOfWrongAnswers(evaluatedQuiz.incorrectAnswers);
        setIsQuizEvaluated(true);
        handleSlideChange(answers.length);
        handleQuizNavigation(answers.length);

        // Volitelně můžete přidat kód pro obnovení kvízových otázek nebo přesměrování uživatele
        addNotification(
          "Quiz evaluated successfully",
          `Your score: ${score && score}`,
          undefined,
          "success",
        );
        console.log("Quiz evaluated successfully:", evaluatedQuiz);
      } catch (error) {
        addNotification("Error submitting quiz", error, undefined, "error");
        console.error("Error submitting quiz:", error);
      }
    } else {
      window.alert(
        "Quiz cannot be evaluated because you did not answer all questions!",
      );
    }
  };

  /* TODO - možná by mohlo jít do komponenty s QuizApp - ohledně kvízu */
  /* MODAL */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
    history.push("/");
  };

  const handleReject = () => {
    console.log("Rejected");
    setIsModalOpen(false);
  };

  const handleClose = () => {
    console.log("Closed");
    setIsModalOpen(false);
  };

  return (
    <div
      className="relative min-h-screen max-w-screen-xl mx-auto"
      style={{ minHeight: "100dvh" }}
    >
      {startQuiz ? (
        <div className="p-2">
          <div
            className={
              currentSlideIndex == parseInt(numberOfQuestions)
                ? "flex justify-between px-4 py-3 items-center rounded-xl bg-purpleishWhiteOpacity nav shadow-basic mx-2"
                : "hidden md:flex md:justify-between md:px-4 md:py-3 md:items-center md:rounded-xl md:bg-purpleishWhiteOpacity md:nav md:shadow-basic md:mx-2"
            }
          >
            <Text style="h4">{quiz?.name}</Text>

            <Button
              icon={{ iconName: "XLg" }}
              color={Color.Red600}
              onClickButton={() => setIsModalOpen(true)}
              className="w-auto"
            >
              Quit
            </Button>

            {isModalOpen && (
              <Modal
                title="Leave the quiz"
                text="Do you really leave the quiz?"
                onConfirm={handleConfirm}
                onReject={handleReject}
                onClose={handleClose}
              />
            )}
          </div>
          <QuizNavigation
            questions={quizQuestions}
            isQuizEvaluated={isQuizEvaluated}
            currentQuestion={currentSlideIndex + 1}
            onClickQuizNavigation={handleQuizNavigation}
            questionsState={answers}
            showAllQuestions={
              currentSlideIndex === quizQuestions.length ? true : false
            }
          />
          <Swiper
            className="!static"
            style={
              currentSlideIndex === quizQuestions.length
                ? isQuizEvaluated
                  ? {}
                  : { height: "calc(100dvh - 72px - 128px - 226px)" }
                : { height: "calc(100dvh - 226px)" }
            }
            allowTouchMove
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={(swiper) => handleSlideChange(swiper.activeIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setSwiper(swiper);
            }}
          >
            {quizQuestions.map((question, index) => (
              <SwiperSlide key={index}>
                <>
                  <QuizQuestion
                    key={index}
                    question={{
                      ...question,
                      index,
                      correct: question.correct,
                    }}
                    answers={answers}
                    onAnswerChange={handleAnswerChange}
                    isQuizEvaluated={isQuizEvaluated}
                  />
                </>
              </SwiperSlide>
            ))}

            <SwiperSlide>
              <Summary
                isQuizEvaluated={isQuizEvaluated}
                isQuizEvaluatable={isQuizEvaluatable}
                score={score}
                numberOfCorrectAnswers={numberOfCorrectAnswers}
                numberOfWrongAnswers={numberOfWrongAnswers}
                isSummaryVisible={
                  parseInt(numberOfQuestions) === currentSlideIndex
                }
                goToSlideNumber={handleQuizNavigation}
                questions={quizQuestions}
                evaluateQuiz={evaluateQuiz}
              />
            </SwiperSlide>
          </Swiper>
          {/* TODO - nefunkční tlačítka - nefungují správně */}
          <ControlButtons
            /* isQuizEvaluatable={isQuizEvaluatable} */
            /* isQuizEvaluated={isQuizEvaluated} */
            currentSlideIndex={currentSlideIndex}
            isSummaryVisible={parseInt(numberOfQuestions) === currentSlideIndex}
            evaluateQuiz={evaluateQuiz}
            handleQuizNavigation={handleQuizNavigation}
            numberOfQuestions={parseInt(numberOfQuestions)}
          />
        </div>
      ) : (
        <QuizzesPage
          quizzes={quizzes}
          loading={loading}
          error={error}
          onQuizClick={handleQuizClick}
        />
      )}
    </div>
  );
};

export default QuizApp;
