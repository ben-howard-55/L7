import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { hydrateAuth } from '../../redux/authSlice/thunks/hydrateThunk';
import { RootState, useAppDispatch } from '../../redux/store';
import Login from './Login';
import Signup from './Signup';
import Verification from './Verification';

const AuthRouter: React.FC = ({ children }) => {
  const selectorFn = (store: RootState) => ({
    isHydrated: store.auth.isHydrated,
    isAuthenticated: store.auth.isAuthenticated,
    completedSignup: store.auth.isConfirmed,
  });

  const { isHydrated, isAuthenticated, completedSignup } = useSelector(selectorFn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  if (!isHydrated) {
    return <h1>loading...</h1>;
  }

  return (
    <Router>
      {isAuthenticated ? (
        completedSignup ? (
          children
        ) : (
          <Switch>
            <Route component={Verification} path={'/signup/verification'} />
            <Redirect from={'/*'} to={'/signup/verification'} />
          </Switch>
        )
      ) : (
        <Switch>
          <Route component={Login} path={'/login'} />
          <Route component={Signup} path={'/signup'} />
          <Redirect from={'/*'} to={'/login'} />
        </Switch>
      )}
    </Router>
  );
};

export default AuthRouter;
