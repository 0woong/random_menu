import React, { useState, useEffect } from "react";

const MenuForm = ({ selectedMenu, onSubmit }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (selectedMenu) {
      setName(selectedMenu.name);
      setCategory(selectedMenu.category);
    }
  }, [selectedMenu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...selectedMenu, name, category });
  };

  return (
    <form className="menu-form" onSubmit={handleSubmit}>
      <input
        className="menu-input"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="메뉴 이름"
      />
      <input
        className="menu-input"
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="카테고리"
      />
      <button className="menu-button" type="submit">
        저장
      </button>
    </form>
  );
};

export default MenuForm;
