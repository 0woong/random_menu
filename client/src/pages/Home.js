import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMenus } from "../services/menuService";
import { getProfile } from "../services/authService";

const Home = () => {
  const allCategories = ["전체", "한식", "양식", "중식", "일식"];

  const [menus, setMenus] = useState([]);
  const [randomMenu, setRandomMenu] = useState(null);
  const [excludeMenu, setExcludeMenu] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState(allCategories);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [nickName, setNickName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchMenus();
    // 로그인 상태 확인
    const token = localStorage.getItem("accessToken");
    if (token) {
      // 로그인된 유저 정보 가져오기
      profile(token);
    }
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await getMenus();
      setMenus(response.data.data);
    } catch (error) {
      console.error("Error fetching menus", error);
    }
  };

  const profile = async (token) => {
    try {
      const response = await getProfile(token);
      if (response.data) {
        setNickName(response.data.nickName);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error fetching profile", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setNickName("");
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
      selectedCategories.includes("전체")
        ? setSelectedCategories([])
        : setSelectedCategories(allCategories);
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
            return newCategories.length === 0 ? [""] : newCategories;
          } else {
            const newCategories = [
              ...prevCategories.filter((cat) => cat !== ""),
              category,
            ];
            return newCategories.length === 4 ? allCategories : newCategories;
          }
        }
      });
    }
  };

  return (
    <div className="home">
      <div className="header">
        <h1>오늘 뭐 먹지?</h1>
        <div className="auth-buttons">
          {isLoggedIn ? (
            <>
              <span>{nickName}님</span>
              <button onClick={handleLogout}>로그아웃</button>
            </>
          ) : (
            <>
              <button onClick={() => navigate("/signup")}>회원가입</button>
              <button onClick={() => navigate("/signin")}>로그인</button>
            </>
          )}
        </div>
      </div>
      <div className="category-filter">
        {allCategories.map((category) => (
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
      {isLoggedIn && (
        <>
          <div className="link">
            <Link to="/menu" className="manage-link">
              메뉴 관리 페이지로 가기
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
