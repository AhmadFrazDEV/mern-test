import { useState } from 'react';
import Login from './pages/login';
import Feed from './pages/feed';

function App() {
  const [token, setToken] = useState(null);

  if (!token) return <Login onLogin={setToken} />;
  return <Feed token={token} />;
}

export default App;
