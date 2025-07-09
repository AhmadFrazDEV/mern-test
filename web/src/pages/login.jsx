// src/pages/Login.jsx
import { useState } from 'react';

export default function Login({ onLogin }) {
  const [userId, setUserId] = useState('u1');

  const handleLogin = async () => {
    try {
      const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId })
      });

      const data = await res.json();
      if (res.ok) {
        console.log('✅ Token:', data.token);
        onLogin(data.token);
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      alert('Failed to connect to backend');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <select value={userId} onChange={e => setUserId(e.target.value)}>
        <option value="u1">User (u1)</option>
        <option value="u2">Admin (u2)</option>
      </select>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
