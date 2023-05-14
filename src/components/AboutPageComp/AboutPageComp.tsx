import React, { useEffect, useRef, useState } from "react";
import styles from "./aboutPage.module.scss";
import Ceo from "assets/about/ceo.jpg";
import signature from "assets/about/signature.png";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CountUp from "react-countup";
import ScrollToTop from "components/ScrollToTopBtn/ScrollToTop";
import { useNavigate } from "react-router-dom";

function AboutPageComp() {
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    function handleShowScrollBtn() {
      setShowScrollBtn(window.scrollY >= 600);
    }

    window.addEventListener("scroll", handleShowScrollBtn);

    return () => {
      window.removeEventListener("scroll", handleShowScrollBtn);
    };
  }, []);

  return (
    <section className={`${styles["about-page"]}`}>
      <div className={`${styles["about-page-ceo"]}`}>
        <div className="container mx-auto lg:px-0 px-4">
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-12 md:col-span-6 lg:col-span-3">
              <div className={`${styles["about-page-ceo-item"]}`}>
                <img src={Ceo} alt="CEO" className="rounded" />
              </div>
            </div>
            <div className="col-span-12 md:col-span-6 lg:col-span-9">
              <div
                className={`${styles["about-page-ceo-item"]} px-[20px] py-[0.4rem] lg:py-[64px] lg:px-[48px]`}
              >
                <h3 className="text-[1.4rem] font-semibold">
                  Message From CEO
                </h3>
                <p className="my-[1.8rem]">
                  Elixir co-operates with clients in solving the hardest
                  problems they face in their businesses—and the world. We do
                  this by channeling the diversity of our people and their
                  thinking.
                </p>
                <img src={signature} />

                <h2 className="my-3 font-semibold">RENAL SCOTT</h2>
                <p>UK office</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles["about-page-count-up"]}`}>
        <div className={`${styles["about-page-count-up-bg"]}`}>
          <div className="container mx-auto px-2 md:px-4">
            <div className="flex gap-1 my-20 relative z-10">
              <div className="hidden md:block">
                <CheckCircleOutlineIcon
                  sx={{ fontSize: "3.4rem", color: "#fddd53" }}
                />
              </div>
              <div>
                <h2 className="text-3xl md:text-5xl text-[#fddd53] font-semibold">
                  Take the right step,
                  <br></br>
                  <span className="text-white">do the big things.</span>
                </h2>

                <div className="grid grid-cols-12 gap-12 z-10 relative mt-12 py-12 px-2 md:px-0">
                  <div className="col-span-5 md:col-span-6 md:col-span-3">
                    <div className={`${styles["about-page-count-up-item"]}`}>
                      <CountUp
                        start={0}
                        end={52}
                        duration={5}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                      >
                        {({ countUpRef }) => (
                          <div>
                            <span className="text-5xl" ref={countUpRef}></span>
                            <p className="text-base lg:text-xl font-semibold">
                              Cases Solved
                            </p>
                          </div>
                        )}
                      </CountUp>
                    </div>
                  </div>
                  <div className="col-span-5 md:col-span-6 md:col-span-3">
                    <div className={`${styles["about-page-count-up-item"]}`}>
                      <CountUp
                        start={0}
                        end={16}
                        duration={5}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                      >
                        {({ countUpRef }) => (
                          <div>
                            <span className="text-5xl" ref={countUpRef}></span>
                            <p className="text-base lg:text-xl font-semibold">
                              Expert Teacher
                            </p>
                          </div>
                        )}
                      </CountUp>
                    </div>
                  </div>
                  <div className="col-span-5 md:col-span-6 md:col-span-3">
                    <div className={`${styles["about-page-count-up-item"]}`}>
                      <CountUp
                        start={0}
                        end={5000}
                        duration={5}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                      >
                        {({ countUpRef }) => (
                          <div>
                            <span className="text-5xl" ref={countUpRef}></span>
                            <p className="text-base lg:text-xl font-semibold">
                              Students
                            </p>
                          </div>
                        )}
                      </CountUp>
                    </div>
                  </div>
                  <div className="col-span-5 md:col-span-6 md:col-span-3">
                    <div className={`${styles["about-page-count-up-item"]}`}>
                      <CountUp
                        start={0}
                        end={200}
                        duration={5}
                        enableScrollSpy={true}
                        scrollSpyOnce={true}
                      >
                        {({ countUpRef }) => (
                          <div>
                            <span className="text-5xl" ref={countUpRef}></span>
                            <p className="text-base lg:text-xl font-semibold">
                              Satisfied clients
                            </p>
                          </div>
                        )}
                      </CountUp>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles["about-page-contact"]}`}>
        <div className="container mx-auto">
          <div className="flex gap-2 justify-between items-center px-4 lg:px-0">
            <p className="text-base md:text-xl lg:text-3xl">
              If you have any query related investment... we are available 24/7
            </p>
            <button
              className="text-sm lg:text-xl"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {showScrollBtn && <ScrollToTop />}
    </section>
  );
}

export default AboutPageComp;
