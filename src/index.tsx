import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { StoreProvider, TodoList } from './service/store';
const todoList = new TodoList([]);
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <StoreProvider value={todoList}>
      <App />
    </StoreProvider>
  </BrowserRouter>
);
