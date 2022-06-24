import React, { useEffect, useRef, useState } from 'react';
import AddTodo from '../AddTodo/AddTodo';
import style from './todoList.module.scss';
import TodoItem from './../TodoItem/TodoItem';
import { useDispatch, useSelector } from 'react-redux';
import { getTodoList } from 'redux/middleware/todo/getTodoList';
import useIsMounted from 'hooks/useIsMounted';
import TodoFooter from 'components/TodoFilter/TodoFilter';
import useQueyParams from 'hooks/useQueryParams';
import { clearTodoListReducer, todoPageReducer } from 'redux/reducer/todo/todoReducer';

const TodoList = () => {
  const dispatch = useDispatch();
  const { stringQueyParam } = useQueyParams();
  const isMounted = useIsMounted();
  const [height, setHeight] = useState(0);
  const ref = useRef(null);
  const { todoList, page, isCompleteTodoPageData } = useSelector((state) => state.todoStore.value);
  const todosScrollHeight = document.querySelector('.todos')?.scrollHeight;

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  });

  useEffect(() => {
    if (isMounted()) {
      dispatch(getTodoList(stringQueyParam, page));
    }
  }, [stringQueyParam, page]);

  useEffect(() => {
    if (todosScrollHeight === height && height !== 0 && todosScrollHeight !== 0 && !isCompleteTodoPageData) {
      dispatch(clearTodoListReducer());
      dispatch(getTodoList(stringQueyParam, 1));
    }
  }, [height, todosScrollHeight]);

  const onScrollHandler = (e) => {
    const isBottom = e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    const isVertialScroll = e.target.scrollHeight > height;

    if (isBottom && isVertialScroll && !isCompleteTodoPageData) {
      dispatch(todoPageReducer(page + 1));
    }
  };

  return (
    <div className={style.container}>
      <AddTodo isCompleteTodoPageData={isCompleteTodoPageData} />

      <div className={`todos ${style['todo-items']}`} ref={ref} onScroll={onScrollHandler}>
        {todoList.map((item) => (
          <TodoItem fullInfo={item} key={item.id} title={item.title} isActive={item.isActive} />
        ))}
      </div>

      <TodoFooter todoList={todoList} />
    </div>
  );
};

export default TodoList;
