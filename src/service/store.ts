import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from 'mobx';
import { createContext, useContext } from 'react';
import { deleteTodos, getIdTodos, getTodos, postTodos } from './api';

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
    console.log(this.list);
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

  @computed
  get finishedTodos(): TodoItem[] {
    return this.list.filter(todo => todo.isDone);
  }

  @computed
  get openTodos(): TodoItem[] {
    return this.list.filter(todo => !todo.isDone);
  }
}

export default class TodoItem {
  id = Date.now();

  @observable text: string = '';
  @observable isDone: boolean = false;

  constructor(text: string, isDone: boolean) {
    this.text = text;
    makeAutoObservable(this);
  }

  @action
  toggleIsDone = () => {
    console.log(this.id);
    this.isDone = !this.isDone;
  };
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
