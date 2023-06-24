import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import { createContext, useContext } from 'react';
import {
  deleteTodos,
  getFiltredTodos,
  getIdTodos,
  getTodos,
  postTodos,
  toggleTodos,
} from './api';

import { KeyboardEvent } from 'react';
import uuid4 from 'uuid4';

export class TodoList {
  @observable.shallow list: TodoItem[] = [];

  constructor(todos: string[]) {
    makeAutoObservable(this);
  }
  @action
  loadTodo = () => {
    getTodos().then(todo =>
      runInAction(() => {
        if (todo.length > 1) {
          todo.forEach(data => {
            this.list.push(new TodoItem(data.text, data.isDone,data.id));
          });
        } else if (todo.length === 0) {
          return;
        } else {
          this.list.push(new TodoItem(todo[0].text, todo[0].isDone, todo[0].id));
        }
      })
    );
  };

  @action
  addTodo = (text: string) => {
    const id = uuid4();
    postTodos(text,id).then(data => {
      
      this.list.push(new TodoItem(text, false,id));
    });
  };

  @action
  removeTodo = (todo: TodoItem) => {
      console.log(todo.id)
      deleteTodos(todo.id).then(an_res => {
        this.list = [];
        this.loadTodo();
      });
    ;
  };
  @action
  toogleTodo = (todo: TodoItem) => {
    getIdTodos(this.list.indexOf(todo)).then(result => {
      toggleTodos(result[0].id, result[0].isDone).then(an_res => {
        this.list = [];
        this.loadTodo();
      });
    });
  };

  @action finishedTodos = () => {
    this.list = [];
    getFiltredTodos(true).then(todo =>
      runInAction(() => {
        if (todo.length > 1) {
          todo.forEach(data => {
            this.list.push(new TodoItem(data.text, data.isDone,data.id));
          });
        } else if (todo.length === 0) {
          return;
        } else {
          this.list.push(new TodoItem(todo[0].text, todo[0].isDone, todo[0].id));
        }
      })
    );
  };

  @action
  openTodos = () => {
    this.list = [];
    getFiltredTodos(false).then(todo =>
      runInAction(() => {
        if (todo.length > 1) {
          todo.forEach(data => {
            this.list.push(new TodoItem(data.text, data.isDone,data.id));
          });
        } else if (todo.length === 0) {
          return;
        } else {
          this.list.push(new TodoItem(todo[0].text, todo[0].isDone, todo[0].id));
        }
      })
    );
  };
}

export default class TodoItem {
  id = "";

  @observable text: string = '';
  @observable isDone: boolean = false;

  constructor(text: string, isDone: boolean, id: string) {
    this.isDone = isDone;
    this.text = text;
    this.id= id
    makeAutoObservable(this);
  }
}

export const StoreContext = createContext<TodoList>({} as TodoList);
export const StoreProvider = StoreContext.Provider;

export const useStore = (): TodoList => useContext(StoreContext);

export const onEnterPress = (cb: any) => {
  return (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      cb();
    }
  };
};
