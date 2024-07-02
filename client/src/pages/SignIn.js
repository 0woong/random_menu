import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/authService";

const SignIn = () => {
  const [formData, setFormData] = useState({ id: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signIn(formData);
      if (response.status === 200) {
        localStorage.setItem("accessToken", response.data.accessToken);
        navigate("/");
      }
    } catch (error) {
      setError("ID 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className="sign-in">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="button-container">
          <button type="submit">로그인</button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default SignIn;
