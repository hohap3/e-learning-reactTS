import React, { useEffect } from "react";
import styles from "./about.module.scss";
import about from "assets/about/about.jpg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import "animate.css";

function About() {
  return (
    <section className={`${styles.about} py-[3rem]`}>
      <section className="container mx-auto">
        <section className="grid grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-6 fadeInUp">
            <div className={`${styles["about-item"]}`}>
              <img src={about} />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-6 fadeInUp">
            <div className={`${styles["about-item"]} px-4`}>
              <h6 className="uppercase mb-4">About us</h6>

              <h2 className="text-[2.6rem] font-semibold mb-10">
                Welcome to eLEARNING
              </h2>

              <p className="mb-4 text-[1.1rem] font-thin">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit.
              </p>
              <p className="mb-4 text-[1.1rem] font-thin">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit,
                sed stet lorem sit clita duo justo magna dolore erat amet
              </p>

              <div className="grid grid-cols-12">
                <div className=" col-span-12 md:col-span-6">
                  <nav>
                    <div className="flex gap-3 mb-3">
                      <ArrowForwardIcon sx={{ color: "#06bbcc" }} />
                      <span className="capitalize">Skilled Instructors</span>
                    </div>

                    <div className="flex gap-3 mb-3">
                      <ArrowForwardIcon sx={{ color: "#06bbcc" }} />
                      <span className="capitalize">
                        International Certificate
                      </span>
                    </div>

                    <div className="flex gap-3 mb-3">
                      <ArrowForwardIcon sx={{ color: "#06bbcc" }} />
                      <span className="capitalize">Online Classes</span>
                    </div>
                  </nav>
                </div>
                <div className="col-span-12 md:col-span-6">
                  <nav>
                    <div className="flex gap-3 mb-3">
                      <ArrowForwardIcon sx={{ color: "#06bbcc" }} />
                      <span className="capitalize">Online Classes</span>
                    </div>

                    <div className="flex gap-3 mb-3">
                      <ArrowForwardIcon sx={{ color: "#06bbcc" }} />
                      <span className="capitalize">Skilled Instructors</span>
                    </div>

                    <div className="flex gap-3 mb-3">
                      <ArrowForwardIcon sx={{ color: "#06bbcc" }} />
                      <span className="capitalize">
                        International Certificate
                      </span>
                    </div>
                  </nav>
                </div>
              </div>

              <button
                className={`${styles["about-button"]} ${styles["about-button-primary"]} rounded mt-6`}
              >
                Read more
              </button>
            </div>
          </div>
        </section>
      </section>
    </section>
  );
}

export default About;
