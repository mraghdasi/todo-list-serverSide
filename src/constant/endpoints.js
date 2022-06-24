export const endPointUrls = (param = {}) => {
  return {
    // product
    getTodoList: '/todo',
    deleteTodo: `/todo/${param?.id}`,
    finishTodo: `/todo/${param?.id}`,
    createTodo: '/todo',
  };
};
