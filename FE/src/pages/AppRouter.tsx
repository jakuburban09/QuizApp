// src/pages/AppRouter.js
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./Home";
import QuizApp from "../components/QuizApp";
import CreateQuizPage from "./CreateQuizPage";
import Register from "../components/Register";
import Login from "../components/Login";
import PrivateRoute from "./PrivateRoute"; // Importujte PrivateRoute

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute path="/:lng/createQuiz" component={CreateQuizPage} />
        <Route path="/:lng/quiz" component={QuizApp} />
        <Route path="/:lng" exact component={HomePage} />
        <Route path="/:lng/register" component={Register} />
        <Route path="/:lng/login" component={Login} />
        <Route path="/" exact>
          <Redirect to="/en" />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
