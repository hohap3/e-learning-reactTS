import React, { useEffect, useRef, useState } from "react";
import styles from "./header.module.scss";
import HeaderLogo from "components/Header/HeaderLogo/HeaderLogo";
import HeaderNavbar from "components/Header/HeaderNavbar/HeaderNavbar";
import ViewWeekIcon from "@mui/icons-material/ViewWeek";
import HeaderNavMobile from "components/Header/HeaderNavMobile/HeaderNavMobile";
import clsx from "clsx";

function Header() {
  const mobileNavbarRef = useRef<null | HTMLDivElement>(null);
  const headerRef = useRef<null | HTMLElement>(null);
  const [showMobileNav, setShowMobileNav] = useState<boolean>(false);

  return (
    <header ref={headerRef} className={styles.header}>
      <section className={`container mx-auto h-full px-4 lg:px-0`}>
        <section className="flex items-center justify-between h-full">
          <HeaderLogo />

          <div className="hidden lg:block h-full">
            <HeaderNavbar />
          </div>

          <div className="block lg:hidden">
            <button
              className="text-[#06bbcc]"
              onClick={() => setShowMobileNav((prevState) => !prevState)}
            >
              <ViewWeekIcon />
            </button>
          </div>
        </section>
      </section>

      <div>
        <div
          className={clsx(`fixed inset-0 z-0`, {
            hidden: !showMobileNav,
            block: showMobileNav,
          })}
          style={{ background: "rgba(0,0,0,0.3)" }}
          onClick={() => setShowMobileNav(false)}
        ></div>
        <HeaderNavMobile toggleNavbar={showMobileNav} ref={mobileNavbarRef} />
      </div>
    </header>
  );
}

export default Header;
