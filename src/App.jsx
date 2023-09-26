import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegisterForm';
import PostList from './components/PostList';
function App() {
  const [token, setToken] = useState(null);

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  const handleLogout = () => {
    setToken(null);
    // Optionally, clear the token from sessionStorage as well
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {token ? (
        <div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleLogout}>
            Logout
          </button>
          <PostList />
        </div>
      ) : (
        <div>
          <LoginForm onLogin={handleLogin} />
          <RegistrationForm />
        </div>
      )}
    </div>
  );
}

export default App;
