import FooterBottom from "components/Footer/FooterBottom/FooterBottom";
import FooterTop from "components/Footer/FooterTop/FooterTop";
import styles from "./footer.module.scss";

function Footer() {
  return (
    <footer className={`${styles.footer} pt-[3rem] px-[0.8rem] `}>
      <section className={`container mx-auto`}>
        <FooterTop />

        <FooterBottom />
      </section>
    </footer>
  );
}

export default Footer;
