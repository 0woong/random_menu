import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [menus, setMenus] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get("http://localhost:3001/menu");
        setMenus(response.data.data);
      } catch (error) {
        console.error("Error fetching menus", error);
      }
    };

    fetchMenus();
  }, []);

  const selectRandomMenu = () => {
    if (menus.length > 0) {
      const randomIndex = Math.floor(Math.random() * menus.length);
      setSelectedMenu(menus[randomIndex].name);
    } else {
      console.warn("No menus available to select from.");
    }
  };

  return (
    <div className="App">
      <h1 className="Title">오늘 뭐먹지?</h1>
      <button className="Button" onClick={selectRandomMenu}>
        메뉴 고르기
      </button>
      {selectedMenu && (
        <ul className="MenuList">
          <li className="MenuItem">오늘의 메뉴: {selectedMenu}</li>
        </ul>
      )}
    </div>
  );
};

export default App;
