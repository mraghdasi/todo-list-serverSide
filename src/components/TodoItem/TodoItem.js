import { instance } from 'api';
import { endPointUrls } from 'constant/endpoints';
import { useDispatch } from 'react-redux';
import { todoDeleteReducer, todoFinishReducer, todoUpdateReducer } from 'redux/reducer/todo/todoReducer';
import style from './todoItem.module.scss';
import { memo, useState } from 'react';
import InputText from 'components/UI/Input/InputText';
import { useClickOutSide } from 'hooks/useClickOutSide';

const TodoItem = ({ title, isActive, fullInfo }) => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(title);
  const { ref, isComponentVisible, setIsComponentVisible } = useClickOutSide();

  const onDeleteHandler = ({ id }) => {
    const apiUrls = endPointUrls({ id });

    instance
      .delete(apiUrls.deleteTodo)
      .then(({ status }) => {
        if (status === 200) {
          dispatch(todoDeleteReducer(id));
        }
      })
      .catch((err) => console.log(err));
  };

  const onFinishHandler = ({ id, isActive }) => {
    const apiUrls = endPointUrls({ id });

    instance
      .patch(apiUrls.finishTodo, { isActive: !isActive })
      .then(({ data, status }) => {
        if (status === 200) {
          dispatch(todoFinishReducer(data));
        }
      })
      .catch((err) => console.log(err));
  };

  const onDoubleClickHandler = () => {
    setIsComponentVisible(true);
  };

  const onKeyDownHandler = (e, detail) => {
    if (e.key === 'Escape') return setIsComponentVisible(false);

    if (e.key === 'Enter') {
      if (inputValue.trim() === detail.title.trim()) return;

      const apiUrls = endPointUrls({ id: detail.id });

      instance
        .patch(apiUrls.finishTodo, { title: inputValue })
        .then(({ data, status }) => {
          if (status === 200) {
            dispatch(todoUpdateReducer(data));
          }
        })
        .catch((err) => console.log(err));

      setIsComponentVisible(false);
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className={style.container}>
      <div>
        <input checked={isActive === false} className={style.checkbox} type='checkbox' onChange={() => onFinishHandler(fullInfo)} />
      </div>
      <div className={style.todoItem}>
        {isComponentVisible ? (
          <InputText
            ref={ref}
            onKeyDown={(e) => onKeyDownHandler(e, fullInfo)}
            className={style['input-todo-update']}
            type='text'
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
        ) : (
          <div onDoubleClick={() => onDoubleClickHandler()} className={`${style.title} ${isActive === false && style.overline}`}>
            {title}
          </div>
        )}
      </div>
      <div className={style.close} onClick={() => onDeleteHandler(fullInfo)}></div>
    </div>
  );
};

export default memo(TodoItem);
