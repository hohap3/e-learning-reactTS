import Footer from "layouts/Footers/Footer";
import Header from "layouts/Header/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function MainPage() {
  return (
    <section className="overflow-hidden">
      <Header />

      <Outlet />
    </section>
  );
}

export default MainPage;
