import React from "react";
import styles from "./header.module.scss";
import HeaderLogo from "components/Header/HeaderLogo/HeaderLogo";
import HeaderNavbar from "components/Header/HeaderNavbar/HeaderNavbar";

function Header() {
  return (
    <header className={styles.header}>
      <section className={`container mx-auto h-full`}>
        <section className="flex items-center justify-between h-full">
          <HeaderLogo />
          <HeaderNavbar />
        </section>
      </section>
    </header>
  );
}

export default Header;
