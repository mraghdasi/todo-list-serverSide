import { memo } from 'react';
import { instance } from 'api';
import { endPointUrls } from 'constant/endpoints';
import useQueyParams from 'hooks/useQueryParams';
import { useDispatch } from 'react-redux';
import { getTodoList } from 'redux/middleware/todo/getTodoList';
import TodoFilterOption from './TodoFilterOption';
import style from './todoFooter.module.scss';
import { clearTodoListReducer } from 'redux/reducer/todo/todoReducer';

const TodoFilter = ({ todoList }) => {
  const dispatch = useDispatch();
  const { stringQueyParam } = useQueyParams();

  const deleteCompletedTodos = (completedTodos) => {
    if (completedTodos.length > 0) {
      Promise.all(
        completedTodos.map(async ({ id }) => {
          const apiUrls = endPointUrls({ id });

          return await instance
            .delete(apiUrls.deleteTodo)
            .then()
            .catch((err) => console.log(err));
        })
      ).then(() => {
        dispatch(clearTodoListReducer());
        dispatch(getTodoList(stringQueyParam, 1));
      });
    }
  };

  const onClearCompletedHandler = async (todos) => {
    const completedTodos = todos.filter((todo) => todo.isActive === false);

    deleteCompletedTodos(completedTodos);
  };

  return (
    <div className={style.container}>
      <div>{todoList.length} items left</div>
      <TodoFilterOption />
      <div onClick={() => onClearCompletedHandler(todoList)} className={style['clear-completed']}>
        clear completed
      </div>
    </div>
  );
};

export default memo(TodoFilter);
