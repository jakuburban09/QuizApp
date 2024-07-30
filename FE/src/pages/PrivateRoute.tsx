// PrivateRoute.js

import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { checkAuth } from "authService";

interface PrivateRouteProps {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      const isAuthenticated = await checkAuth();
      setAuthenticated(isAuthenticated);
    };

    authenticate();
  }, []);

  if (authenticated === null) {
    return <div>Loading...</div>; // nebo nějaký jiný loading indikátor
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/en/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
