import FooterForm from "components/form/FooterForm/FooterForm";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import EmailIcon from "@mui/icons-material/Email";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import course1 from "assets/footer/course-1.jpg";
import course2 from "assets/footer/course-2.jpg";
import course3 from "assets/footer/course-3.jpg";
import styles from "./footerTop.module.scss";

function FooterTop() {
  function handleSubmitForm(formValues: any) {
    console.log(formValues);
  }

  return (
    <section className={`${styles["footer__top"]}`}>
      <section className="grid grid-cols-12 gap-8">
        <div className="col-span-6  lg:col-span-3">
          <div className="footer__item">
            <h3 className="capitalize text-white text-2xl mb-4">Quick link</h3>
            <nav>
              <a
                href="#"
                className="tracking-normal hover:tracking-wider flex items-center gap-1 text-white hover:text-white transition-all inline-block mb-2"
              >
                <ArrowRightIcon />
                <span className="capitalize"> About us</span>
              </a>

              <a
                href="#"
                className="tracking-normal hover:tracking-wider flex items-center gap-1 text-white hover:text-white transition-all inline-block mb-2"
              >
                <ArrowRightIcon />
                <span className="capitalize"> Contact us</span>
              </a>

              <a
                href="#"
                className="tracking-normal hover:tracking-wider flex items-center gap-1 text-white hover:text-white transition-all inline-block mb-2"
              >
                <ArrowRightIcon />
                <span className="capitalize"> Privacy & Condition</span>
              </a>

              <a
                href="#"
                className="tracking-normal hover:tracking-wider flex items-center gap-1 text-white hover:text-white transition-all inline-block mb-2"
              >
                <ArrowRightIcon />
                <span className="capitalize">Terms & Condition</span>
              </a>

              <a
                href="#"
                className="tracking-normal hover:tracking-wider flex items-center gap-1 text-white hover:text-white transition-all inline-block mb-2"
              >
                <ArrowRightIcon />
                <span className="capitalize">FAQs & Help</span>
              </a>
            </nav>
          </div>
        </div>
        <div className="col-span-6  lg:col-span-3">
          <div className="footer__item">
            <h3 className="capitalize text-white text-2xl mb-4">Contact</h3>
            <nav>
              <div className="mb-4 text-white flex items-center gap-2">
                <LocationOnIcon />
                <span>123 Street, New York, USA</span>
              </div>

              <div className="mb-4 text-white flex items-center gap-2">
                <LocalPhoneIcon />
                <span>+012 345 67890</span>
              </div>

              <div className="mb-4 text-white flex items-center gap-2">
                <EmailIcon />
                <span>info@example.com</span>
              </div>
            </nav>
            <div className="flex items-center gap-2">
              <div className="rounded-full py-2 px-2 border text-white cursor-pointer hover:bg-white hover:text-[#06bbcc] transition-all">
                <TwitterIcon />
              </div>

              <div className="rounded-full py-2 px-2 border text-white cursor-pointer hover:bg-white hover:text-[#06bbcc] transition-all">
                <FacebookOutlinedIcon />
              </div>

              <div className="rounded-full py-2 px-2 border text-white cursor-pointer hover:bg-white hover:text-[#06bbcc] transition-all">
                <YouTubeIcon />
              </div>

              <div className="rounded-full py-2 px-2 border text-white cursor-pointer hover:bg-white hover:text-[#06bbcc] transition-all">
                <LinkedInIcon />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6  lg:col-span-3 overflow-hidden">
          <div className="footer__item">
            <h3 className="capitalize text-white text-2xl mb-4">Gallery</h3>
            <nav className="flex items-center gap-4 flex-wrap">
              <div className="w-[28%]">
                <img src={course1} className="w-full bg-white p-1" />
              </div>
              <div className="w-[28%]">
                <img src={course2} className="w-full bg-white p-1" />
              </div>

              <div className="w-[28%]">
                <img src={course3} className="w-full bg-white p-1" />
              </div>

              <div className="w-[28%]">
                <img src={course3} className="w-full bg-white p-1" />
              </div>

              <div className="w-[28%]">
                <img src={course2} className="w-full bg-white p-1" />
              </div>

              <div className="w-[28%]">
                <img src={course1} className="w-full bg-white p-1" />
              </div>
            </nav>
          </div>
        </div>
        <div className="col-span-6  lg:col-span-3">
          <div className="footer__item text-white ">
            <h3 className="capitalize text-2xl mb-4">Newsletter</h3>
            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>

            <FooterForm onSubmit={handleSubmitForm} />
          </div>
        </div>
      </section>
    </section>
  );
}

export default FooterTop;
