// AppRouter.tsx
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Home";
import QuizApp from "../components/QuizApp";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/quiz" component={QuizApp} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
