import { configureStore } from '@reduxjs/toolkit';
import positionReducer from './positionSlice';

const store = configureStore({
  reducer: {
    position: positionReducer,
  },
});

export default store;
