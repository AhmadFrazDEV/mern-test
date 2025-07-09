import { useState } from 'react';

export default function Login({ onLogin }) {
  const [userId, setUserId] = useState('u1');

  const handleLogin = async () => {
    const res = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: userId })
    });
    const data = await res.json();
    onLogin(data.token);
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <label>Select User:</label>
      <select value={userId} onChange={e => setUserId(e.target.value)}>
        <option value="u1">User (u1)</option>
        <option value="u2">Admin (u2)</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
