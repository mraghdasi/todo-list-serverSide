import style from './todoFooter.module.scss';
import { useState } from 'react';
import useQueyParams from 'hooks/useQueryParams';
import { stringToBoolean } from 'utils/utils';
import { useDispatch } from 'react-redux';
import { clearTodoListReducer, todoPageReducer } from 'redux/reducer/todo/todoReducer';

const TodoFilterOption = () => {
  const dispatch = useDispatch();
  const { queryParam, setQueryParam } = useQueyParams();

  const [options, setOptions] = useState([
    { id: 1, title: 'All', isActive: queryParam?.isActive ? false : true },
    { id: 2, title: 'Active', isActive: stringToBoolean(queryParam?.isActive) },
  ]);

  const setNewOptions = (options, detail) => {
    const newOptions = options.map((option) => {
      if (option.id === detail.id) {
        return { ...option, isActive: true };
      } else {
        return { ...option, isActive: false };
      }
    });

    setOptions(newOptions);
  };

  const onFilterTodoHandler = (detail) => {
    setNewOptions(options, detail);
    dispatch(clearTodoListReducer());
    dispatch(todoPageReducer(1));

    if (detail.title === 'Active') {
      setQueryParam({ isActive: true });
    } else {
      setQueryParam({});
    }
  };

  return (
    <div>
      {options.map((option) => (
        <span onClick={() => onFilterTodoHandler(option)} className={`${style.option} ${option.isActive && style.active}`} key={option.id}>
          {option.title}
        </span>
      ))}
    </div>
  );
};

export default TodoFilterOption;
