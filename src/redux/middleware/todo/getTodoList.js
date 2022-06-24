import { instance } from 'api';
import { endPointUrls } from 'constant/endpoints';
import { todoEmptyReducer, todoReducer } from 'redux/reducer/todo/todoReducer';

export const getTodoList = (params, page) => {
  const apiUrls = endPointUrls();

  return async (dispatch) => {
    instance
      .get(params ? `${apiUrls.getTodoList}?${params}&_page=${page}` : `${apiUrls.getTodoList}?_page=${page}`)
      .then((res) => {
        if (res.data.length === 10) dispatch(todoEmptyReducer(false));
        else dispatch(todoEmptyReducer(true));

        dispatch(todoReducer(res.data));
      })
      .catch((err) => {
        dispatch(todoReducer([]));
        console.log(err);
      });
  };
};
