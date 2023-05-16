import { useObserver } from 'mobx-react';
import { useStore } from '../../service/store';
import { TodoItem } from './todoitem';
import { useEffect, useState } from 'react';
export const TodoList = () => {
  const todoList = useStore();
  const [status, setStatus] = useState('all');
  useEffect(() => {
    todoList.loadTodo();
    console.log(todoList);
  }, []);
  return useObserver(() => (
    <div className="todo-list">
      <div className="open-todos">
        <div className="todo-filter">
          <button
            onClick={() => {
              setStatus('all');
            }}
          >
            All
          </button>
          <button
            onClick={() => {
              setStatus('open');
            }}
          >
            Open
          </button>
          <button
            onClick={() => {
              setStatus('finished');
            }}
          >
            Finished
          </button>
        </div>
        {status === 'all'
          ? todoList.list.map(todo => (
              <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />
            ))
          : status === 'open'
          ? todoList.openTodos.map(todo => (
              <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />
            ))
          : todoList.finishedTodos.map(todo => (
              <TodoItem key={`${todo.id}-${todo.text}`} todo={todo} />
            ))}
      </div>
    </div>
  ));
};
{
}
