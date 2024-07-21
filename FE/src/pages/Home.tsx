// HomePage.tsx
import Button, { IconPosition } from "../components/bricks/Button";
import React from "react";
import Card from "../components/bricks/Card";
import Text from "../components/bricks/Text";
import { Icon } from "../components/bricks/Icon";
import Navbar from "../components/bricks/Navbar";
import DynamicLink from "helpers/DynamicLink";
import { useTranslation } from "react-i18next";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="p-4 container m-auto max-w-screen-xl">
      <div className="h-[calc(100vh-160px)] ">
        <Navbar />
        <div className="h-[calc(100%-160px)] flex flex-row gap-10">
          <div className="flex flex-col h-full justify-center">
            <Text element="h1" style="h1" className="mb-6 w-full">
              Ultimate Quiz Companion!
            </Text>
            <Text className="mb-10 w-full md:w-auto ">
              {t("homePage.text")}
            </Text>
            <div className="flex w-full md:w-auto justify-between md:justify-normal gap-3 mb-14">
              <DynamicLink to="quiz" className="w-full md:w-auto">
                <Button
                  icon={{ iconName: "PlayFill" }}
                  className="w-full md:w-auto"
                >
                  {t("other.buttons.startQuiz")}
                </Button>
              </DynamicLink>
              <DynamicLink to="createQuiz" className="w-full md:w-auto">
                <Button
                  icon={{ iconName: "PlusLg" }}
                  className="w-full"
                  hiearchy="secondary"
                >
                  {t("other.buttons.createQuiz")}
                </Button>
              </DynamicLink>
            </div>
          </div>
          <div className="h-full w-full hidden md:flex items-center justify-end">
            <img
              src={`${process.env.PUBLIC_URL}/images/image-brain-1.png`}
              style={{ height: 400, width: 400 }}
            />
          </div>
        </div>
      </div>
      <div className="grid-cols-1 md:grid-cols-4 grid gap-3 md:gap-6">
        <Card
          headline={t("other.cards.firstCard.heading")}
          text={t("other.cards.firstCard.text")}
          color="green"
        />

        <Card
          headline={t("other.cards.secondCard.heading")}
          text={t("other.cards.secondCard.text")}
          color="orange"
        />

        <Card
          headline={t("other.cards.thirdCard.heading")}
          text={t("other.cards.thirdCard.text")}
          color="red"
        />

        <Card
          headline={t("other.cards.fourthCard.heading")}
          text={t("other.cards.fourthCard.text")}
          color="blue"
        />
      </div>
      <div className="w-full h-52 rounded-xl bg-purpleishWhiteOpacity flex justify-center align-middle items-center mb-14">
        <Icon iconName="PlayBtn" width={40} height={40} />
      </div>
    </div>
  );
};

export default HomePage;
