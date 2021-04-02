import React from 'react';
import { useSelector } from 'react-redux';
import Button from './components/Button';
import { toggle } from './redux/stateSlice/StateSlice';
import { RootState, useAppDispatch } from './redux/store';

const App = () => {
  const dispatch = useAppDispatch();

  const selector = (state: RootState) => state.state;

  const store = useSelector(selector);

  return (
    <div className='App'>
      <Button onClick={() => dispatch(toggle())} />
      <br />
      {store.toggle ? 'On' : 'Off'}
    </div>
  );
};

export default App;
