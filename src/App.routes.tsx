import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/Locations";
import Products from "./pages/ProductsList/ProductsList";
import Company from "./pages/Company/Company";
import Product from "./pages/Product/Product";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      { path: "locations", element: <Locations /> },
      {
        path: "products", element: <Products />
      },
      {
        path: "productst", children: [
          { path: ":id", element: <Product /> },
        ]
      },
      {
        path: "company", children: [
          { path: ":id", element: <Company /> },
        ]
      },
    ],
  },
]);
