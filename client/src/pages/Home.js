import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [randomMenu, setRandomMenu] = useState(null);
  const [excludeMenu, setExcludeMenu] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchMenus();
    // 처음 로드될 때 "전체" 카테고리 선택
    setSelectedCategories(["전체", "한식", "양식", "중식", "일식"]);
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get("http://localhost:3001/menu");
      setMenus(response.data.data);
    } catch (error) {
      console.error("Error fetching menus", error);
    }
  };

  const handleSelectRandomMenu = () => {
    const filteredMenus = selectedCategories.includes("전체")
      ? menus
      : menus.filter((menu) => selectedCategories.includes(menu.category));

    let randomIndex;
    let selectedMenu;

    if (filteredMenus.length === 0) {
      setRandomMenu(null);
      return;
    }

    do {
      randomIndex = Math.floor(Math.random() * filteredMenus.length);
      selectedMenu = filteredMenus[randomIndex];
    } while (selectedMenu._id === excludeMenu?._id);

    setRandomMenu(selectedMenu);
    setExcludeMenu(selectedMenu);
  };

  const handleCategoryToggle = (category) => {
    if (category === "전체") {
      if (selectedCategories.includes("전체")) {
        setSelectedCategories([]);
      } else {
        setSelectedCategories(["전체", "한식", "양식", "중식", "일식"]);
      }
    } else {
      setSelectedCategories((prevCategories) => {
        if (prevCategories.includes("전체")) {
          return prevCategories.filter(
            (cat) => cat !== "전체" && cat !== category
          );
        } else {
          if (prevCategories.includes(category)) {
            const newCategories = prevCategories.filter(
              (cat) => cat !== category
            );
            return newCategories.length === 0 ? [] : newCategories;
          } else {
            const newCategories = [
              ...prevCategories.filter((cat) => cat !== "전체"),
              category,
            ];
            return newCategories.length === 4
              ? ["전체", "한식", "양식", "중식", "일식"]
              : newCategories;
          }
        }
      });
    }
  };

  const categories = ["전체", "한식", "양식", "중식", "일식"];

  return (
    <div className="home">
      <h1>오늘 뭐 먹지?</h1>
      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              selectedCategories.includes(category) ? "selected" : ""
            }`}
            onClick={() => handleCategoryToggle(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="button-container">
        <button className="random-button" onClick={handleSelectRandomMenu}>
          랜덤 메뉴 고르기
        </button>
      </div>
      {randomMenu && (
        <div className="selected-menu">
          <h2>선택된 메뉴</h2>
          <p>
            {randomMenu.name} - {randomMenu.category}
          </p>
        </div>
      )}
      <div className="link">
        <Link to="/menu" className="manage-link">
          메뉴 관리 페이지로 가기
        </Link>
      </div>
    </div>
  );
};

export default Home;
