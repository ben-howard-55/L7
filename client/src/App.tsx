import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AppContainer from './components/Layout/AppContainer';
import AuthRouter from './pages/auth/AuthWrapper';
import Dashboard from './pages/Dashboard';
import AddCard from './pages/card/AddCard';
import CardList from './pages/card/CardList';

const App = () => (
  <AppContainer>
    <AuthRouter>
      <Switch>
        <Route path={'/dashboard'} component={Dashboard} exact />
        <Route path={'/cards'} component={CardList} exact />
        <Route path={'/cards/add'} component={AddCard} exact />
        <Redirect from={'/*'} to={'/dashboard'} />
      </Switch>
    </AuthRouter>
  </AppContainer>
);

export default App;
