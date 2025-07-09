import { useState } from 'react';
import Login from './pages/login';
import Feed from './pages/feed';

function App() {
  const [token, setToken] = useState(null);

  return token ? <Feed token={token} /> : <Login onLogin={setToken} />;
}

export default App;
