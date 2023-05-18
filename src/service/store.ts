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
            this.list.push(new TodoItem(data.text, data.isDone));
          });
        } else if (todo.length === 0) {
          return;
        } else {
          this.list.push(new TodoItem(todo[0].text, todo[0].isDone));
        }
      })
    );
  };

  @action
  addTodo = (text: string) => {
    postTodos(text).then(data => {
      this.list.push(new TodoItem(text, false));
    });
  };

  @action
  removeTodo = (todo: TodoItem) => {
    getIdTodos(this.list.indexOf(todo)).then(result => {
      deleteTodos(result[0].id).then(an_res => {
        this.list = [];
        this.loadTodo();
      });
    });
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
            this.list.push(new TodoItem(data.text, data.isDone));
          });
        } else if (todo.length === 0) {
          return;
        } else {
          this.list.push(new TodoItem(todo[0].text, todo[0].isDone));
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
            this.list.push(new TodoItem(data.text, data.isDone));
          });
        } else if (todo.length === 0) {
          return;
        } else {
          this.list.push(new TodoItem(todo[0].text, todo[0].isDone));
        }
      })
    );
  };
}

export default class TodoItem {
  id = Date.now();

  @observable text: string = '';
  @observable isDone: boolean = false;

  constructor(text: string, isDone: boolean) {
    this.isDone = isDone;
    this.text = text;
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
