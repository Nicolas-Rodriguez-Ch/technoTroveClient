import React from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

const Home = () => {
  return (
    <div className="Home">
      <Header />
      <h1>home</h1>
      <p>{import.meta.env.VITE_EXAMPLE_VARIABLE}</p>
      <Footer />
    </div>
  );
};

export default Home;
