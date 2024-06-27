import React from "react";
import MenuList from "../components/MenuList";
import { Link } from "react-router-dom";

const MenuManagementPage = () => {
  return (
    <div className="MenuManagementPage">
      <h1>메뉴 관리</h1>
      <MenuList />
      <div className="link">
        <Link to="/" className="manage-link">
          메인 페이지로 가기
        </Link>
      </div>
    </div>
  );
};

export default MenuManagementPage;
