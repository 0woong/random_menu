import React, { useState, useEffect } from "react";
import {
  getMenus,
  addMenu,
  updateMenu,
  deleteMenu,
} from "../services/menuService";

const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [editingMenu, setEditingMenu] = useState(null);
  const [formData, setFormData] = useState({ name: "", category: "한식" });
  const [error, setError] = useState("");

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

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!formData.name) {
      setError("메뉴 이름을 입력하세요.");
      return;
    }

    try {
      const response = await addMenu(formData);
      if (response.status === 200) {
        setMenus([...menus, response.data.data]);
        setFormData({ name: "", category: "한식" });
        setError("");
      }
    } catch (error) {
      console.error("Error adding menu", error);
      setError("메뉴 추가 중 오류가 발생했습니다.");
    }
  };

  const handleEdit = (menu) => {
    setEditingMenu(menu._id);
    setFormData({ name: menu.name, category: menu.category });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (id) => {
    if (!formData.name) {
      setError("메뉴 이름을 입력하세요.");
      return;
    }

    try {
      const response = await updateMenu(id, formData);
      if (response.status === 200) {
        fetchMenus();
        setEditingMenu(null);
        setFormData({ name: "", category: "한식" });
        setError("");
      }
    } catch (error) {
      console.error("Error updating menu", error);
      setError("메뉴 업데이트 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteMenu(id);
      if (response.status === 200) {
        fetchMenus();
      }
    } catch (error) {
      console.error("Error deleting menu", error);
    }
  };

  const categories = ["한식", "양식", "중식", "일식"];

  return (
    <div className="menu-list">
      <form className="menu-list-form" onSubmit={handleAdd}>
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
        {error && <p className="error-message">{error}</p>}
      </form>

      <ul>
        {menus.map((menu) => (
          <li key={menu._id}>
            {editingMenu === menu._id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
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
                <button
                  className="edit-button"
                  onClick={() => handleUpdate(menu._id)}
                >
                  저장
                </button>
                <button onClick={() => setEditingMenu(null)}>취소</button>
              </>
            ) : (
              <>
                <span>
                  {menu.name} - {menu.category}
                </span>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(menu)}
                >
                  수정
                </button>
                <button onClick={() => handleDelete(menu._id)}>삭제</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
