import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginPage from './assets/pages/login_page';
import { ToDoPages } from './assets/pages/todos_pages';
import { useStore } from './service/store';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={LoginPage} />
        <Route path="/todos" Component={ToDoPages} />
      </Routes>
    </>
  );
}

export default App;
