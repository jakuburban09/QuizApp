import { Color } from "helpers/enums";
import Button, { IconPosition } from "../components/bricks/Button";
import React, { useState } from "react";
import Text from "../components/bricks/Text";
import { Icon } from "../components/bricks/Icon";
import Navbar from "../components/bricks/Navbar";
import { useTranslation } from "react-i18next";
import TextInput from "../components/bricks/TextInput";
import TextInputWithRating from "../components/bricks/TextInputWithRating";
import axios from "axios";
import { useNotification } from "../components/NotificationContext";
import baseURL from "config";
import {
  Formik,
  Field,
  FieldArray,
  Form,
  FormikHelpers,
  FormikErrors,
  FormikTouched,
} from "formik";
import * as Yup from "yup";

interface Question {
  question: string;
  correctOption: string;
  incorrectOptions: string[];
}

interface QuizFormValues {
  name: string;
  difficulty: number;
  questions: Question[];
}

const CreateQuizPage: React.FC = () => {
  const { addNotification } = useNotification();
  const { t } = useTranslation();
  const [isCreateQuizFormVisible, setCreateQuizFormVisible] = useState(false);

  const initialValues: QuizFormValues = {
    name: "",
    difficulty: 0,
    questions: [
      {
        question: "",
        correctOption: "",
        incorrectOptions: ["", "", ""],
      },
    ],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Quiz name is required"),
    difficulty: Yup.number().min(0).max(5).required("Difficulty is required"),
    questions: Yup.array()
      .of(
        Yup.object().shape({
          question: Yup.string().required("Question is required"),
          correctOption: Yup.string().required("Correct answer is required"),
          incorrectOptions: Yup.array()
            .of(Yup.string().required("Incorrect answer is required"))
            .min(3, "There must be at least three incorrect options"),
        }),
      )
      .min(1, "At least one question is required"),
  });

  const handleComplete = async (
    values: QuizFormValues,
    formikHelpers: FormikHelpers<QuizFormValues>,
  ) => {
    const quiz = {
      id: Math.random().toString(36).substring(2, 15),
      name: values.name,
      numberOfQuestions: values.questions.length,
      level: values.difficulty,
      language: "CZ",
      questions: values.questions.map((q, index) => ({
        question: q.question,
        options: [q.correctOption, ...q.incorrectOptions],
        correctOption: q.correctOption,
        index: index,
        answer: null,
        correct: false,
      })),
      correctAnswers: 0,
      incorrectAnswers: 0,
      score: 0.0,
    };

    try {
      const response = await axios.post(`${baseURL}/createQuiz`, quiz);
      addNotification(
        "Quiz created successfully",
        "Quiz is ready to be tested!",
        undefined,
        "success",
      );
      console.log("Quiz created successfully:", response.data);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      addNotification("Error creating quiz", errorMessage, undefined, "error");
      console.error("Error creating quiz:", errorMessage);
    }

    formikHelpers.setSubmitting(false);
  };

  const getError = (
    errors: FormikErrors<QuizFormValues>,
    touched: FormikTouched<QuizFormValues>,
    index: number,
    field: keyof Question,
  ): string | undefined => {
    const questionErrors = errors.questions as
      | FormikErrors<Question>[]
      | undefined;
    const questionTouched = touched.questions as
      | FormikTouched<Question>[]
      | undefined;

    if (
      questionErrors &&
      questionErrors[index] &&
      typeof questionErrors[index] !== "string" &&
      questionTouched &&
      questionTouched[index] &&
      typeof questionTouched[index] !== "string"
    ) {
      const error = questionErrors[index][field];
      const touch = questionTouched[index][field];
      return error && touch ? (error as string) : undefined;
    }
    return undefined;
  };

  return (
    <div className="p-4 container m-auto max-w-screen-xl">
      <Navbar />
      <Text element="h1" style="h1" className="mb-6 w-full lg:w-1/2">
        {t("createQuizPage.heading")}
      </Text>
      <Text className="mb-10 w-full lg:w-1/2">{t("createQuizPage.text")}</Text>
      <div className="w-full h-52 rounded-xl bg-purpleishWhiteOpacity flex justify-center align-middle items-center mb-14">
        <Icon iconName="PlayBtn" width={40} height={40} />
      </div>
      <Button
        className="w-full"
        icon={{ iconName: "Plus" }}
        onClickButton={() => setCreateQuizFormVisible(!isCreateQuizFormVisible)}
      >
        {t("createQuizPage.createQuizButton")}
      </Button>

      {isCreateQuizFormVisible && (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleComplete}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className="mt-4">
              <div className="rounded-2xl px-4 py-5 bg-purpleishWhiteOpacity border-2 border-grayOpacity shadow-basic flex flex-col gap-3">
                <TextInput
                  labelText="Name of quiz"
                  placeholder="Colors..."
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && errors.name ? errors.name : undefined}
                />
                <TextInputWithRating
                  labelText={"Select difficulty"}
                  name="difficulty"
                  value={values.difficulty.toString()}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    touched.difficulty && errors.difficulty
                      ? errors.difficulty
                      : undefined
                  }
                />
              </div>

              <FieldArray name="questions">
                {({ push, remove }) => (
                  <>
                    {values.questions.map((question, index) => (
                      <div
                        key={index}
                        className="rounded-2xl px-4 py-5 mt-5 bg-purpleishWhiteOpacity border-2 border-grayOpacity shadow-basic flex flex-col gap-3"
                      >
                        <div className="flex pb-4 mb-2 border-solid border-b-2 border-grayOpacity w-full justify-between items-center">
                          <Text style="h5">{index + 1}. Question</Text>
                          <Button
                            icon={{ iconName: "Trash" }}
                            className="p-3 w-auto"
                            color={Color.Red600}
                            onClickButton={() => remove(index)}
                          >
                            {" "}
                          </Button>
                        </div>
                        <div className="flex flex-col gap-5">
                          <TextInput
                            labelText="Question"
                            placeholder="Blue"
                            name={`questions.${index}.question`}
                            value={question.question}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={getError(errors, touched, index, "question")}
                          />
                          <TextInput
                            labelText="Correct answer"
                            placeholder="Modrá"
                            name={`questions.${index}.correctOption`}
                            value={question.correctOption}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={getError(
                              errors,
                              touched,
                              index,
                              "correctOption",
                            )}
                          />
                          {question.incorrectOptions.map((option, i) => (
                            <TextInput
                              key={i}
                              labelText={`${i + 1}. Incorrect answer`}
                              placeholder={`Incorrect answer ${i + 1}`}
                              name={`questions.${index}.incorrectOptions.${i}`}
                              value={option}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              error={
                                touched.questions &&
                                touched.questions[index] &&
                                touched.questions[index].incorrectOptions &&
                                errors.questions &&
                                errors.questions[index] &&
                                typeof errors.questions[index] !== "string" &&
                                (errors.questions[index] as any)
                                  .incorrectOptions &&
                                (errors.questions[index] as any)
                                  .incorrectOptions[i]
                                  ? (errors.questions[index] as any)
                                      .incorrectOptions[i]
                                  : undefined
                              }
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                    <div className="flex w-full justify-between gap-4 my-5">
                      <Button
                        color={Color.PurpleDark}
                        icon={{ iconName: "Flag" }}
                        className="w-full justify-center"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Complete
                      </Button>
                      <Button
                        color={Color.Purple}
                        iconPosition={IconPosition.Right}
                        icon={{ iconName: "PlusLg" }}
                        className="w-full justify-center"
                        type="button"
                        onClickButton={() =>
                          push({
                            question: "",
                            correctOption: "",
                            incorrectOptions: ["", "", ""],
                          })
                        }
                      >
                        Add
                      </Button>
                    </div>
                  </>
                )}
              </FieldArray>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default CreateQuizPage;
