import React from "react";

import MenuBookIcon from "@mui/icons-material/MenuBook";
import styles from "./headerLogo.module.scss";
import { Link, useNavigate } from "react-router-dom";

function HeaderLogo() {
  const navigate = useNavigate();

  function handleMoveToHomePage() {
    document.documentElement.scrollTop = 0;

    navigate("/");
  }

  return (
    <section className={styles["header__logo"]}>
      <div
        className="flex items-center gap-2 cursor-pointer "
        onClick={handleMoveToHomePage}
      >
        <MenuBookIcon sx={{ fontSize: "3rem" }} />
        <h2 className="font-semibold text-3xl">eLEARNING</h2>
      </div>
    </section>
  );
}

export default HeaderLogo;
