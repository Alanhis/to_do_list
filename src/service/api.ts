import TodoItem from './store';

export const getTodos = async (): Promise<TodoItem[]> => {
  return await fetch('http://localhost:3000/todo').then(res => res.json());
};

export const postTodos = async (text: string): Promise<TodoItem[]> => {
  return await fetch('http://localhost:3000/todo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: text,
      isDone: false,
    }),
  }).then(res => res.json());
};
export const deleteTodos = async (id: number): Promise<TodoItem[]> => {
  return await fetch('http://localhost:3000/todo/' + id, {
    method: 'DELETE',

    headers: { 'Content-Type': 'application/json' },
  }).then(res => res.json());
};

export const getIdTodos = async (index: number): Promise<TodoItem[]> => {
  return await fetch(
    'http://localhost:3000/todo?_start=' + index + '&_limit=1'
  ).then(data => data.json());
};
