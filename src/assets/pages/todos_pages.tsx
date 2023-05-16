import { useObserver } from 'mobx-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../service/store';
import { TodoList } from '../component/todolist';
import { TodoNew } from '../component/todonew';

export function ToDoPages() {
  const navigate = useNavigate();
  const todoList = useStore();

  if (document.cookie == '') {
    navigate('/');
  }
  return useObserver(() => (
    <>
      <div className="App">
        <TodoNew />
        <TodoList />
      </div>
    </>
  ));
}
