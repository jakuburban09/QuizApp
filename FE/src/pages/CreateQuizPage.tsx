import { Color } from "helpers/enums";
import Button, { IconPosition } from "../components/bricks/Button";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/bricks/Card";
import Text from "../components/bricks/Text";
import { Icon } from "../components/bricks/Icon";
import Navbar from "../components/bricks/Navbar";
import { useTranslation } from "react-i18next";
import TextInput from "../components/bricks/TextInput";
import TextInputWithRating from "../components/bricks/TextInputWithRating";

interface Question {
  question: string;
  correctOption: string;
  incorrectOptions: string[];
}

const CreateQuizPage: React.FC = () => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([{ question: "", correctOption: "", incorrectOptions: ["", "", ""] }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", correctOption: "", incorrectOptions: ["", "", ""] }]);
  };

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    } else if (field === "correctOption") {
      updatedQuestions[index].correctOption = value;
    } else {
      const optionIndex = parseInt(field.split("-")[1], 10);
      updatedQuestions[index].incorrectOptions[optionIndex] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleComplete = () => {
    const quiz = {
      id: Math.random().toString(36).substring(2, 15),
      name: name,
      numberOfQuestions: questions.length,
      level: difficulty,
      language: "CZ",
      questions: questions.map((q, index) => ({
        question: q.question,
        options: [q.correctOption, ...q.incorrectOptions],
        correctOption: q.correctOption,
        index: index,
        answer: null,
        correct: false
      })),
      correctAnswers: 0,
      incorrectAnswers: 0,
      score: 0.0
    };
    console.log(quiz);
  };

  return (
    <div className="p-4 container">
      <Navbar />
      <Text element="h1" style="h1" className="mb-6 w-full lg:w-1/2">
        {t('createQuizPage.heading')}
      </Text>
      <Text className="mb-10 w-full lg:w-1/2">
        {t('createQuizPage.text')}
      </Text>
      <div className="w-full h-52 rounded-xl bg-purpleishWhiteOpacity flex justify-center align-middle items-center mb-14">
        <Icon iconName="PlayBtn" width={40} height={40} />
      </div>
      <Button className="w-full" icon={{ iconName: "Plus" }}>
        {t('createQuizPage.createQuizButton')}
      </Button>

      {/* Formulář pro základní údaje kvízu */}
      <div className="rounded-2xl px-4 py-5 bg-purpleishWhiteOpacity border-2 border-grayOpacity shadow-basic flex flex-col gap-3">
        <TextInput labelText="Name of quiz" placeholder="Colors..." value={name} onChange={(e) => setName(e.target.value)} />
        <TextInputWithRating labelText={"Select difficulty"} value={difficulty.toString()} onChange={(e) => setDifficulty(parseInt(e.target.value, 10))} />
      </div>

      {/* Dynamické otázky */}
      {questions.map((question, index) => (
        <div key={index} className="rounded-2xl px-4 py-5 mt-5 bg-purpleishWhiteOpacity border-2 border-grayOpacity shadow-basic flex flex-col gap-3">
          <div className="flex pb-4 mb-2 border-solid border-b-2 border-grayOpacity w-full justify-between items-center">
            <Text style="h5">{index + 1}. Question</Text>
            <Button icon={{ iconName: "Trash" }} className="p-3" color={Color.Red600} onClickButton={() => {
              const updatedQuestions = questions.filter((_, i) => i !== index);
              setQuestions(updatedQuestions);
            }}> </Button>
          </div>
          <div className="flex flex-col gap-5">
            <TextInput labelText="Question" placeholder="Blue" value={question.question} onChange={(e) => handleQuestionChange(index, "question", e.target.value)} />
            <TextInput labelText="Correct answer" placeholder="Modrá" value={question.correctOption} onChange={(e) => handleQuestionChange(index, "correctOption", e.target.value)} />
            {question.incorrectOptions.map((option, i) => (
              <TextInput key={i} labelText={`${i + 1}. Incorrect answer`} color={Color.Red600} placeholder={`Incorrect answer ${i + 1}`} value={option} onChange={(e) => handleQuestionChange(index, `incorrectOption-${i}`, e.target.value)} />
            ))}
          </div>
        </div>
      ))}

      {/* Tlačítka pro přidání otázky a dokončení kvízu */}
      <div className="flex w-full justify-between gap-4 my-5">
        <Button color={Color.PurpleDark} icon={{ iconName: "Flag" }} className="w-full justify-center" onClickButton={handleComplete}>Complete</Button>
        <Button color={Color.Purple} iconPosition={IconPosition.Right} icon={{ iconName: "PlusLg" }} className="w-full justify-center" onClickButton={handleAddQuestion}>Add</Button>
      </div>
    </div>
  );
};

export default CreateQuizPage;
