import { AsyncThunkAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';

const useHydrator = (
  selector: (state: RootState) => boolean,
  action: () => AsyncThunkAction<any, void, {}>
) => {
  const dispatch = useAppDispatch();
  const isHydrated = useSelector(selector);

  useEffect(() => {
    if (isHydrated === false) {
      dispatch(action());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
};

export default useHydrator;
