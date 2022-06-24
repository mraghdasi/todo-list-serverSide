import { instance } from 'api';
import { endPointUrls } from 'constant/endpoints';
import { useState, memo } from 'react';
import Input from '../UI/Input/InputText';
import { useDispatch } from 'react-redux';
import { todoReducer } from 'redux/reducer/todo/todoReducer';
import style from './addTodo.module.scss';

const AddTodo = (isCompleteTodoPageData) => {
  const apiUrls = endPointUrls();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');

  const onChangeInputValueHandler = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmitHandler = (e) => {
    const todoTitle = inputValue.trim();

    if (e.keyCode === 13 && todoTitle.length) {
      instance
        .post(apiUrls.createTodo, { isActive: true, title: todoTitle })
        .then((res) => {
          if (res.status === 201) {
            if (isCompleteTodoPageData) dispatch(todoReducer([res.data]));

            setInputValue('');
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return <Input className={style.input} onKeyDown={onSubmitHandler} placeholder='what needs to be done?' value={inputValue} onChange={onChangeInputValueHandler} />;
};

export default memo(AddTodo);
