import { configureStore } from '@reduxjs/toolkit'
import homeSlice from '../src/home/slice';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

const Store = configureStore({
  reducer: {
    home: homeSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
})

// rootSaga.forEach(saga => sagaMiddleware.run(saga));
sagaMiddleware.run(rootSaga);

export default Store;