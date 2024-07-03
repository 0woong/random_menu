import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../services/authService";

const SignUp = () => {
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    nickName: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.id) newErrors.id = "ID를 입력하세요.";
    if (!formData.password) newErrors.password = "비밀번호를 입력하세요.";
    if (!formData.nickName) newErrors.nickName = "닉네임을 입력하세요.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await signUp(formData);
      if (response.status === 200) {
        navigate("/signin");
      }
    } catch (error) {
      if (error.response.status === 400) {
        newErrors.idCheck = "중복된 이메일/닉네임이 존재합니다.";
        setErrors(newErrors);
      }
      console.error("Error during sign up", error);
    }
  };

  return (
    <div className="sign-up">
      <h2>회원가입</h2>
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <div>
          <label>ID</label>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
          />
          {errors.id && <p>{errors.id}</p>}
        </div>
        <div>
          <label>비밀번호</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        <div>
          <label>닉네임</label>
          <input
            type="text"
            name="nickName"
            value={formData.nickName}
            onChange={handleChange}
          />
          {errors.nickName && <p>{errors.nickName}</p>}
        </div>
        {errors.idCheck && <p>{errors.idCheck}</p>}
        <div className="button-container">
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
