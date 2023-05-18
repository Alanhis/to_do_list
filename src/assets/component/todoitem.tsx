import { onEnterPress, useStore } from '../../service/store';
import '../../App.css';
export const TodoItem = ({ todo }: any) => {
  const todoList = useStore();

  return (
    <div className="todo-item">
      <div className="todo_info">
        <div>
          <span>{todo.text}</span>
          <input
            type="checkbox"
            onChange={() => {
              todoList.toogleTodo(todo);
            }}
            defaultChecked={todo.isDone}
          ></input>
        </div>

        <button onClick={() => todoList.removeTodo(todo)}>X</button>
      </div>
    </div>
  );
};
