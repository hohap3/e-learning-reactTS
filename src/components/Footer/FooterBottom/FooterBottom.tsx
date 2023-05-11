import React from "react";
import styles from "./footerBottom.module.scss";

function FooterBottom() {
  return (
    <section
      className={`${styles["footer__bottom"]} border-t-2 border-c-[#ffffff1a]`}
    >
      <section className="py-6">
        <div className="flex items-center justify-between text-white">
          <p>
            &copy; eLEARNING,
            <span className="capitalize">All Right Reserved</span>
            .Design by HTMLCodex
          </p>
          <nav
            className={`${styles["footer__nav"]} flex gap-8 items-center gap-2`}
          >
            <div className={`${styles["footer-has-left-border"]}`}>Home</div>
            <div className={`${styles["footer-has-left-border"]}`}>Cookies</div>
            <div className={`${styles["footer-has-left-border"]}`}>Help</div>
            <div>FAQs</div>
          </nav>
        </div>
      </section>
    </section>
  );
}

export default FooterBottom;
