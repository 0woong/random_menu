import React, { useState } from "react";
import { addMenu } from "../services/menuService";

const MenuForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({ name: "", category: "한식" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      setError("메뉴 이름을 입력하세요.");
      return;
    }

    try {
      const response = await addMenu(formData);
      if (response.status === 200) {
        onAdd(response.data);
        setFormData({ name: "", category: "한식" });
        setError("");
      }
    } catch (error) {
      console.error("Error adding menu", error);
      setError("메뉴 추가 중 오류가 발생했습니다.");
    }
  };

  const categories = ["한식", "양식", "중식", "일식"];

  return (
    <div className="menu-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label>메뉴 이름</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>카테고리</label>
          <div>
            {categories.map((category) => (
              <label key={category}>
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={formData.category === category}
                  onChange={handleChange}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
        <button type="submit">추가</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default MenuForm;
