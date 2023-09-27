import React, { useState } from "react";

const COHORT_NAME = "2302-acc-pt-web-pt-b";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
  });

  const [registrationError, setRegistrationError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirmation) {
      setRegistrationError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            username: formData.username,
            password: formData.password,
          },
        }),
      });
      if (response.ok) {
        const data = await response.json();
        const token = data.data.token;
        localStorage.setItem("token", token);

        // Fetch user data thsi will get the users infor form the API
        const userDataResponse = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = await userDataResponse.json();
        console.log(userData);
      } else {
        const errorData = await response.json();
        setRegistrationError(errorData.error.message);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {registrationError && <p className="text-red-500">{registrationError}</p>}
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
      <input
        type="password"
        name="passwordConfirmation"
        placeholder="Confirm Password"
        value={formData.passwordConfirmation}
        onChange={handleChange}
        required
        minLength="1"
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
