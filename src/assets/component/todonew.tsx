import React, { useState } from 'react';
import { onEnterPress, useStore } from '../../service/store';
import '../../App.css';
export const TodoNew = () => {
  const [newTodo, setTodo] = useState('');
  const todoList = useStore();

  const addTodo = () => {
    todoList.addTodo(newTodo);
    setTodo('');
  };

  return (
    <div className="todo-new">
      <input
        type="text"
        value={newTodo}
        onKeyDown={onEnterPress(addTodo)}
        onChange={e => setTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
    </div>
  );
};
