import style from './app.module.scss';
import TodoList from './TodoList/TodoList';

const App = () => {
  return (
    <>
      <h1 className={style['app-title']}>todo list app</h1>

      <TodoList />

      <div className={style.description}>
        <h2>description :</h2>
        <ul>
          <li>
            start server : <b>yarn server</b>
          </li>
          <li>lazy load data</li>
          <li>
            for edit : double click on todo title and <b>press Enter</b> Key
          </li>
        </ul>
      </div>
    </>
  );
};

export default App;
