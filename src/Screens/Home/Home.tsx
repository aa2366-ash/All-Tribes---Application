import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h2>
        <Link to="/register">click</Link> here to register
      </h2>
    </div>
  );
};

export default Home;
