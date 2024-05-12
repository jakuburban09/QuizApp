// HomePage.tsx
import { Color } from "helpers/enums";
import Button, { IconPosition } from "../components/bricks/Button";
import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/bricks/Card";
import Text from "../components/bricks/Text";
import { Icon } from "../components/bricks/Icon";
import Navbar from "../components/bricks/Navbar";

const HomePage: React.FC = () => {
  return (
    <div className="p-4">
      <Navbar />
      <Text element="h1" style="h1" className="mb-6">
        Ultimate Quiz Companion!
      </Text>
      <Text className="mb-10">
        Unleash the power of knowledge with Wordz! Create and play custom
        quizzes effortlessly. Get ready for endless fun and learning adventures!
        Discover new topics and expand your mind with Wordz!
      </Text>
      <div className="flex w-full justify-between gap-3 mb-14">
        <Link to="/quiz" className="w-full">
          <Button icon={{ iconName: "PlayFill" }} className="w-full">
            Start Quiz
          </Button>
        </Link>
        <Link to="/quiz" className="w-full">
          <Button
            icon={{ iconName: "PlusLg" }}
            className="w-full"
            hiearchy="secondary"
          >
            Create Quiz
          </Button>
        </Link>
      </div>
      <div className="w-full h-52 rounded-xl bg-purpleishWhiteOpacity flex justify-center align-middle items-center mb-14">
        <Icon iconName="PlayBtn" width={40} height={40} />
      </div>
      <div className="grid-cols-2 grid gap-3">
        <Card
          headline="Endless Word Discovery:"
          text="Discover limitless words with Wordz! Choose or create, tailored for all word lovers!"
          color="green"
        />
        <Card
          headline="Effortless Creation:"
          text="Creating quizzes made easy! Wordz delivers swift, tailored challenges."
          color="orange"
        />
        <Card
          headline="Wordy Delights:"
          text="Wordz offers enriching fun for all! From learning to bonding, it brings joy to word enthusiasts."
          color="red"
        />
        <Card
          headline="Custom Learning:"
          text="Personalize your Wordz journey! Choose topics and levels for a customized quiz experience."
          color="blue"
        />
      </div>
    </div>
  );
};

export default HomePage;
