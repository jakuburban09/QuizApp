// QuizApp.tsx

import React, { useState, useEffect, useRef } from "react";
import QuizQuestion from "./QuizQuestion";
import {
  getDataFromString,
  getRandomItemsFromArray,
  createQuizQuestions,
  log,
} from "../computations/utils";

import { adjectives, colors, nouns, verbs } from "computations/inputData";

import { Swiper, SwiperSlide } from "swiper/react";
/* import { Navigation } from 'swiper/modules'; */
import "swiper/css";
import "swiper/css/bundle";
import QuizNavigation from "./QuizNavigation";
import Button, { IconPosition } from "./bricks/Button";
import { Color } from "helpers/enums";
import { Link } from "react-router-dom";
import Summary from "./Summary";
import ControlButtons from "./ControlButtons";
import QuizQuestions from "./QuizQuestions";
import RadioButton from "./bricks/RadioButton";
import Navbar from "./bricks/Navbar";
import Text from "./bricks/Text";
import QuizCard from "./QuizCard";
import Modal from "./bricks/Modal";
import { useHistory } from "react-router-dom";
/* import QuizBigNavigation from "./QuizBigNavigation"; */

interface Question {
  question: string;
  options: string[];
  correctOption: string;
  isCorrect?: boolean;
  answer?: string;
}

const QuizApp: React.FC = () => {
  const history = useHistory();

  const [startQuiz, setStartQuiz] = useState<boolean>(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState<string>("5"); // Defaultní hodnota
  const [selectedQuiz, setSelectedQuiz] = useState<string>("Verbs");

  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  const startQuizHandler = () => {
    setIsMounted(true);
    setStartQuiz(true);
  };

  useEffect(() => {
    if (isMounted) {
      let inputData;

      switch (selectedQuiz) {
        case "Verbs":
          inputData = verbs;
          break;
        case "Nouns":
          inputData = nouns;

          break;
        case "Adjectives":
          inputData = adjectives;
          break;

        case "Colors":
          inputData = colors;
          break;

        default:
          inputData = adjectives;
          break;
      }
      const data = getDataFromString(undefined, undefined, inputData);
      const randomizedItems = getRandomItemsFromArray(
        data,
        !isNaN(parseInt(numberOfQuestions)) && numberOfQuestions.length !== 0
          ? parseInt(numberOfQuestions)
          : 5,
      );
      setQuizQuestions(createQuizQuestions(data, randomizedItems));
      setIsMounted(false);
    }
  }, [startQuiz]);

  /* NAVIGATION, SLIDES, HANDLE CHANGES */

  const [answers, setAnswers] = useState<string[]>(
    Array(
      !isNaN(parseInt(numberOfQuestions)) && numberOfQuestions.length !== 0
        ? parseInt(numberOfQuestions)
        : 5,
    ),
  );

  const [isQuizEvaluated, setIsQuizEvaluated] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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

  const evaluateQuiz = (): void => {
    if (canBeQuizEvaluated(answers)) {
      const newQuizQuestions = [...quizQuestions];

      let correctAnswers = 0;

      newQuizQuestions.forEach((question, index) => {
        const selectedOption = answers[index];
        const isCorrect = selectedOption === question.correctOption;

        question.isCorrect = isCorrect;
        question.answer = answers[index];
        if (isCorrect) {
          correctAnswers++;
        }
      });
      setQuizQuestions(newQuizQuestions);

      const calculatedScore = (correctAnswers / quizQuestions.length) * 100;
      log(
        `Skóré v procentech: ${calculatedScore}% \n Počet správně zodpovězených otázek: ${correctAnswers} / ${quizQuestions.length}`,
        "info",
      );
      setScore(calculatedScore);
      setNumberOfCorrectAnswers(correctAnswers);
      setNumberOfWrongAnswers(quizQuestions.length - correctAnswers);
      setIsQuizEvaluated(true);
      handleSlideChange(answers.length);
      handleQuizNavigation(answers.length);

      console.log(answers);
      console.log(quizQuestions);
    } else {
      window.alert(
        "Quizz can not be evaluated because you did not answer all questions!",
      );
    }
  };

  /* MODAL */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    // Zde můžeš napsat kód, který se spustí po kliknutí na Confirm
    console.log("Confirmed");
    setIsModalOpen(false);
    history.push("/");
  };

  const handleReject = () => {
    // Zde můžeš napsat kód, který se spustí po kliknutí na Reject
    console.log("Rejected");
    setIsModalOpen(false);
  };

  const handleClose = () => {
    // Zde můžeš napsat kód, který se spustí po kliknutí na Close
    console.log("Closed");
    setIsModalOpen(false);
  };

console.log(quizQuestions)

  return (
    <div className="relative min-h-screen" style={{ minHeight: "100dvh" }}>
      {/* <Link to="/">HOME</Link> */}
      {startQuiz ? (
        <div className="p-2">
          <div
            className={
              currentSlideIndex == parseInt(numberOfQuestions)
                ? "flex justify-between px-4 py-3 items-center rounded-xl bg-purpleishWhiteOpacity nav shadow-basic mx-2"
                : "hidden"
            }
          >
            <Text style="h4">Name</Text>

            <Button
              icon={{ iconName: "XLg" }}
              color={Color.Red600}
              onClickButton={() => setIsModalOpen(true)}
            >
              Quit quiz
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
              currentSlideIndex === quizQuestions.length && !isQuizEvaluated
                ? { height: "calc(100dvh - 72px - 48px - 230px)" }
                : {}
            }
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
                      isCorrect: question.isCorrect,
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
          <ControlButtons
            isQuizEvaluatable={isQuizEvaluatable}
            isQuizEvaluated={isQuizEvaluated}
            currentSlideIndex={currentSlideIndex}
            isSummaryVisible={parseInt(numberOfQuestions) === currentSlideIndex}
            evaluateQuiz={evaluateQuiz}
            handleQuizNavigation={handleQuizNavigation}
            numberOfQuestions={parseInt(numberOfQuestions)}
          />
        </div>
      ) : (
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
          <div className="flex flex-col gap-5">
            <QuizCard
              nameOfQuiz="Nouns"
              numberOfQuestions={5}
              level={2}
              onClick={() => {
                setSelectedQuiz("Nouns");
                startQuizHandler();
              }}
            />
            <QuizCard
              nameOfQuiz="Verbs"
              numberOfQuestions={15}
              level={5}
              onClick={() => {
                setSelectedQuiz("Verbs");
                startQuizHandler();
              }}
            />
            <QuizCard
              nameOfQuiz="Adjectives"
              numberOfQuestions={10}
              level={3}
              onClick={() => {
                setSelectedQuiz("Adjectives");
                startQuizHandler();
              }}
            />
            <QuizCard
              nameOfQuiz="Colors"
              numberOfQuestions={5}
              level={1}
              onClick={() => {
                setSelectedQuiz("Colors");
                startQuizHandler();
              }}
            />
          </div>
          {/* <label htmlFor="numberOfQuestions">Number of Questions:</label>
          <br />
          <input
            type="number"
            id="numberOfQuestions"
            name="numberOfQuestions"
            value={numberOfQuestions}
            onChange={(e) => {
              const value = e.target.value;
              if (!isNaN(value as any)) {
                setNumberOfQuestions(value);
              } else setNumberOfQuestions("3");
            }}
            pattern="[0-9]*"
          />

          <br />

          <div className="p-2">
            <div className="rounded-2xl px-4 py-5 bg-purpleishWhiteOpacity border-2 border-grayOpacity shadow-basic max-h-[calc(100vh-243px)] overflow-auto">
              <h3 className="mb-3">Choose your quiz</h3>
              <div className="flex flex-col gap-2">
                <RadioButton
                  labelText="Nouns"
                  isChecked={selectedQuiz == "Nouns"}
                  onChange={() => setSelectedQuiz("Nouns")}
                />
                <RadioButton
                  labelText="Adjectives"
                  isChecked={selectedQuiz == "Adjectives"}
                  onChange={() => setSelectedQuiz("Adjectives")}
                />
                <RadioButton
                  labelText="Verbs"
                  isChecked={selectedQuiz == "Verbs"}
                  onChange={() => setSelectedQuiz("Verbs")}
                />
                <RadioButton
                  labelText="Colors"
                  isChecked={selectedQuiz == "Colors"}
                  onChange={() => setSelectedQuiz("Colors")}
                />
              </div>
            </div>
          </div>

          <Button
            className="w-full"
            icon={{ iconName: "ChevronRight" }}
            onClickButton={startQuizHandler}
            color={Color.Blue600}
          >
            Start Quiz
          </Button> */}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
