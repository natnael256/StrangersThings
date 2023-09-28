import { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegisterForm";
import PostList from "./components/PostList";
import Header from "./components/Header";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Header />
      {token ? (
        <div className="w-full max-w-md p-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
          <PostList />
        </div>
      ) : (
        <div className="w-full max-w-md p-4">
          <LoginForm onLogin={handleLogin} />
          <RegistrationForm />
        </div>
      )}
    </div>
  );
}

export default App;
