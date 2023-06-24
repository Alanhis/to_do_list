import TodoItem from './store';
import uuid4 from "uuid4";
export const getTodos = async (): Promise<TodoItem[]> => {
  return await fetch('http://localhost:3000/todo').then(res => res.json());
};

export const postTodos = async (text: string,id: string): Promise<TodoItem[]> => {
  return await fetch('http://localhost:3000/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
      isDone: false,
      id: id,
    }),
  }).then(res => res.json());
};
export const deleteTodos = async (id: string): Promise<TodoItem[]> => {

  return await fetch('http://localhost:3000/todo/' + id, {
    method: 'DELETE',

    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
};
export const toggleTodos = async (
  id: string,
  toogle: boolean
): Promise<TodoItem[]> => {
  return await fetch('http://localhost:3000/todo/' + id, {
    method: 'PATCH',
    body: JSON.stringify({
      isDone: !toogle,
    }),
    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
};
export const getIdTodos = async (index: number): Promise<TodoItem[]> => {
  return await fetch(
    'http://localhost:3000/todo?_start=' + index + '&_limit=1'
  ).then(data => data.json());
};
export const getFiltredTodos = async (type: boolean): Promise<TodoItem[]> => {
  return await fetch('http://localhost:3000/todo?isDone=' + type).then(data =>
    data.json()
  );
};
