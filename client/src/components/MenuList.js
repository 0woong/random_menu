import React, { useState, useEffect } from "react";
import {
  getMenus,
  deleteMenu,
  updateMenu,
  addMenu,
} from "../services/menuService";
import MenuForm from "./MenuForm";

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuCategory, setNewMenuCategory] = useState("");

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await getMenus();
      setMenus(response.data.data);
    } catch (error) {
      console.error("Error fetching menus", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteMenu(id);
      setMenus(menus.filter((menu) => menu._id !== id));
      alert("메뉴가 삭제되었습니다.");
    } catch (error) {
      console.error("Error deleting menu", error);
      alert("메뉴 삭제 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = (menu) => {
    setSelectedMenu(menu);
    setShowForm(true);
  };

  const handleUpdate = async (updatedMenu) => {
    try {
      await updateMenu(updatedMenu._id, updatedMenu);
      fetchMenus();
      setSelectedMenu(null);
      setShowForm(false);
      alert("메뉴가 수정되었습니다.");
    } catch (error) {
      console.error("Error updating menu", error);
      alert("메뉴 수정 중 오류가 발생했습니다.");
    }
  };

  const handleAddSubmit = async () => {
    const newMenu = {
      name: newMenuName,
      category: newMenuCategory,
    };

    try {
      await addMenu(newMenu);
      fetchMenus();
      setNewMenuName("");
      setNewMenuCategory("");
      alert("새 메뉴가 추가되었습니다.");
    } catch (error) {
      console.error("Error adding menu", error);
      alert("메뉴 추가 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="container">
      <div className="menu-form">
        <input
          type="text"
          value={newMenuName}
          onChange={(e) => setNewMenuName(e.target.value)}
          placeholder="메뉴 이름"
        />
        <input
          type="text"
          value={newMenuCategory}
          onChange={(e) => setNewMenuCategory(e.target.value)}
          placeholder="카테고리"
        />
        <button onClick={handleAddSubmit}>추가</button>
      </div>
      <ul className="menu-list">
        {menus.map((menu) => (
          <li key={menu._id}>
            <span>
              {menu.name} - {menu.category}
            </span>
            <button onClick={() => handleEdit(menu)}>수정</button>
            <button onClick={() => handleDelete(menu._id)}>삭제</button>
          </li>
        ))}
      </ul>
      {showForm && (
        <MenuForm
          selectedMenu={selectedMenu}
          onSubmit={selectedMenu ? handleUpdate : handleAddSubmit}
        />
      )}
    </div>
  );
};

export default MenuList;
