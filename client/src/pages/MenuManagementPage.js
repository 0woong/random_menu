import React from "react";
import MenuList from "../components/MenuList";
import { Link } from "react-router-dom";

const MenuManagementPage = () => {
  const token = localStorage.getItem("accessToken");
  return (
    <div className="MenuManagementPage">
      {token ? (
        <>
          <h1>메뉴 관리</h1>
          <MenuList />
          <div className="link">
            <Link to="/" className="manage-link">
              메인 페이지로 가기
            </Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <h1>접근권한이 없습니다</h1>
            <Link to="/signin" className="manage-link">
              로그인 하러가기
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default MenuManagementPage;
