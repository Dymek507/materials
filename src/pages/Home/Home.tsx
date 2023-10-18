import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="gap-4 mt-72 flex-center">
      <Link to="locations">
        <Button size="large" variant="contained">Kopalnie</Button>
      </Link>
      <Link to="products">
        <Button size="large" variant="contained">Materiały</Button>
      </Link>
      <Link to="companies">
        <Button size="large" variant="contained">Firmy</Button>
      </Link>
    </div>
  );
};

export default Home;
