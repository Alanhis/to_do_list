import { useState } from 'react';
import { Props } from 'react-modal';
import { onEnterPress, useStore } from '../../service/store';
import '../../App.css';
export const TodoItem = ({ todo }: any) => {
  const todoList = useStore();
  const [newText, setText] = useState('');
  const [isEditing, setEdit] = useState(false);

  const saveText = () => {
    todo.updateText(newText);
    setEdit(false);
    setText('');
  };

  return (
    <div className="todo-item">
      <div className="todo_info">
        <span>{todo.text}</span>
        <input
          type="checkbox"
          onChange={todo.toggleIsDone}
          defaultChecked={todo.isDone}
        ></input>

        <button onClick={() => todoList.removeTodo(todo)}>X</button>
      </div>
    </div>
  );
};
