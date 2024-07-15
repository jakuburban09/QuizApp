import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect, RouteComponentProps } from "react-router-dom";
import HomePage from "./Home";
import QuizApp from "../components/QuizApp";
import CreateQuizPage from "./CreateQuizPage";
import { useTranslation } from 'react-i18next';
import Register from "../components/Register";
import Login from "../components/Login";

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/:lng/createQuiz" render={(props) => <PageWrapper Component={CreateQuizPage} {...props} />} />
        <Route path="/:lng/quiz" render={(props) => <PageWrapper Component={QuizApp} {...props} />} />
        <Route path="/:lng" exact render={(props) => <PageWrapper Component={HomePage} {...props} />} />
        <Route path="/:lng/register" component={Register} />
        <Route path="/:lng/login" component={Login} />
        <Route path="/" exact>
          <Redirect to="/en" />
        </Route>
      </Switch>
    </Router>
  );
};

interface PageWrapperProps extends RouteComponentProps<{ lng: string }> {
  Component: React.FC;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ Component, match }) => {
  const { lng } = match.params;
  const { i18n } = useTranslation();

  React.useEffect(() => {
    if (i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]);

  return <Component />;
};

export default AppRouter;
