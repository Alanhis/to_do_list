import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
export default function LoginPage() {
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const changeinfo = (type: string, data: string) => {
    if (type === 'emain') {
      setEmail(data);
    } else if (type === 'password') {
      setPassword(data);
    }
  };
  const handleAuthorization = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = 'http://localhost:3000'; // Необходимо будет понять на необходимый url
    fetch(url + '/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then(data => data.json())
      .then(res => {
        console.log('done');
        document.cookie = res.accessToken + '; max-age=3600';
        navigation('/todos');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div>
      <form className="login_container" onSubmit={handleAuthorization}>
        <input
          type="emain"
          placeholder="emain"
          onChange={e => {
            changeinfo('emain', e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={e => {
            changeinfo('password', e.target.value);
          }}
        ></input>
        <button></button>
      </form>
    </div>
  );
}
