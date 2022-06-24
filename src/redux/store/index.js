import { configureStore } from '@reduxjs/toolkit';
import todoStore from 'redux/reducer/todo/todoReducer';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    todoStore,
  },
});
