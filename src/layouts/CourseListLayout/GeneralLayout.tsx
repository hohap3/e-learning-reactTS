import { ReactElement } from "react";
import Footer from "layouts/Footers/Footer";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import styles from "./courseListLayout.module.scss";

interface Props {
  text: string;
  children: ReactElement;
  title: string;
}

function GeneralLayout({ text, title, children }: Props) {
  return (
    <div>
      <div className={`${styles["course-layout-common"]}`}>
        <div className="container mx-auto h-full">
          <div className="h-full">
            <div className="flex flex-col gap-2 justify-center pt-6 h-full">
              <h2 className="text-5xl font-semibold">{text}</h2>
              <p className="text-xl">
                {title} <KeyboardDoubleArrowRightIcon /> {text}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default GeneralLayout;
