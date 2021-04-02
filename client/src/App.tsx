import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import Login from './pages/Login';
import { hydrateAuth } from './redux/authSlice/thunks/hydrateThunk';
import { RootState, useAppDispatch } from './redux/store';

const App = () => {
  const selectorFn = (store: RootState) => ({
    isHydrated: store.auth.isHydrated,
    isAuthenticated: store.auth.isAuthenticated,
  });

  const { isHydrated, isAuthenticated } = useSelector(selectorFn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(hydrateAuth());
  }, [dispatch]);

  if (!isHydrated) {
    return <h1>loading...</h1>;
  }

  return (
    <AppContainer>
      <Router>{isAuthenticated ? <h1>You are authenticated</h1> : <Login />}</Router>
    </AppContainer>
  );
};

export default App;
