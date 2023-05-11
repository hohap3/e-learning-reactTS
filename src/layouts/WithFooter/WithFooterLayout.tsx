import Footer from "layouts/Footers/Footer";
import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function WithFooterLayout({ children }: Props) {
  return (
    <div>
      {children}

      <Footer />
    </div>
  );
}

export default WithFooterLayout;
