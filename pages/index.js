import React, { useEffect, useState } from "react";
import Index from "../components/Index";
import UserForm from "../components/UserForm";

export default function Home() {
  useEffect(() => {
    let initalPage = localStorage.getItem("weight") ? "index" : "userForm";
    setActivePage(initalPage);
  }, []);

  const [activePage, setActivePage] = useState("userForm");

  const navigateToPage = (page) => {
    setActivePage(page);
  };

  return (
    <>
      {activePage === "userForm" && (
        <UserForm navigateToPage={navigateToPage} />
      )}
      {activePage === "index" && <Index navigateToPage={navigateToPage} />}
    </>
  );
}
