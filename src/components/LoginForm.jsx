import React, { useState } from 'react';

const COHORT_NAME = '2302-acc-pt-web-pt-b'
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`

function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/users/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: formData,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        const token = data.data.token;
        localStorage.setItem("token", token);
      } else {
        const errorData = await response.json();
        setLoginError(errorData.error.message);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {loginError && (
        <p className="text-red-500">{loginError}</p>
      )}
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
        minLength="1"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        minLength="1"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
