import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [menus, setMenus] = useState([]);
  const [randomMenu, setRandomMenu] = useState(null);
  const [excludeMenu, setExcludeMenu] = useState(null); // 현재 출력된 메뉴를 저장할 상태 추가

  useEffect(() => {
    fetchMenus();
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
    let randomIndex;
    let selectedMenu;

    do {
      randomIndex = Math.floor(Math.random() * menus.length);
      selectedMenu = menus[randomIndex];
    } while (selectedMenu._id === excludeMenu?._id); // 현재 출력된 메뉴와 같으면 다시 선택

    setRandomMenu(selectedMenu);
    setExcludeMenu(selectedMenu); // 선택된 메뉴를 현재 출력된 메뉴로 설정
  };

  return (
    <div className="Home">
      <h1>오늘 뭐 먹지?</h1>
      <div className="button-container">
        <button onClick={handleSelectRandomMenu}>랜덤 메뉴 고르기</button>
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
        <Link to="/menu">메뉴 관리 페이지로 가기</Link>
      </div>
    </div>
  );
};

export default Home;
