import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppContainer from './components/AppContainer';
import AuthRouter from './pages/auth/AuthWrapper';

const App = () => (
  <AppContainer>
    <AuthRouter>
      <Switch>
        <Route path={'/dashboard'} render={(props) => 'hello'} />
        <Redirect from={'/*'} to={'/dashboard'} />
      </Switch>
    </AuthRouter>
  </AppContainer>
);

export default App;
