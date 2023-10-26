import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="gap-4 mt-72 flex-center">
      <Link to="companies">
        <Button size="large" variant="contained">Firmy</Button>
      </Link>
      <Link to="products">
        <Button size="large" variant="contained">Materiały</Button>
      </Link>
      <Link to="masa">
        <Button size="large" variant="contained">Masa</Button>
      </Link>
    </div>
  );
};

export default Home;
