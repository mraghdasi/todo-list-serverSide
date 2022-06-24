import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: { todoList: [], page: 1, isCompleteTodoPageData: false } };

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    todoReducer: (state, action) => {
      state.value.todoList.push(...action.payload);
    },
    todoPageReducer: (state, action) => {
      state.value.page = action.payload;
    },
    todoEmptyReducer: (state, action) => {
      state.value.isCompleteTodoPageData = action.payload;
    },
    todoFinishReducer: (state, action) => {
      state.value.todoList = state.value.todoList.map((todo) => {
        if (todo.id === action.payload.id) return { ...action.payload, isActive: false };
        else return todo;
      });
    },
    todoUpdateReducer: (state, action) => {
      state.value.todoList = state.value.todoList.map((todo) => {
        if (todo.id === action.payload.id) return { ...action.payload };
        else return todo;
      });
    },
    todoDeleteReducer: (state, action) => {
      state.value.todoList = state.value.todoList.filter((todo) => todo.id !== action.payload);
    },
    clearTodoListReducer: (state) => {
      state.value.todoList = [];
    },
  },
});

export const { todoReducer, todoPageReducer, todoEmptyReducer, todoFinishReducer, todoUpdateReducer, todoDeleteReducer, clearTodoListReducer } = todoSlice.actions;

export default todoSlice.reducer;
