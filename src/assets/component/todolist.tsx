import { useObserver } from 'mobx-react';
import { useStore } from '../../service/store';
import { TodoItem } from './todoitem';
import { useEffect, useState } from 'react';
export const TodoList = () => {
  const todoList = useStore();
  const [status, setStatus] = useState('all');
  useEffect(() => {
    todoList.loadTodo();
  }, []);
  return useObserver(() => (
    <div className="todo-list">
      <div className="open-todos">
        <div className="todo-filter">
          <button
            onClick={() => {
              todoList.list = [];
              todoList.loadTodo();
            }}
          >
            All
          </button>
          <button
            onClick={() => {
              todoList.openTodos();
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              todoList.finishedTodos();
            }}
          >
            Finished
          </button>
        </div>
        {todoList.list.map(todo => (
          <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />
        ))}
      </div>
    </div>
  ));
};
{
}
