import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";

import Home from "./pages/Home/Home";
import Locations from "./pages/Locations/root";
import Products from "./pages/ProductsList/ProductsList";
import Company from "./pages/Company/root";
import Product from "./pages/Product/Product";
import CompaniesTable from "./pages/Locations/Table/root";
import Masa from "./pages/Masa/root";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "companies", element: <Locations />
      },
      {
        path: "table", children: [
          { index: true, element: <CompaniesTable /> },
          { path: ":id", element: <Company /> },
        ]
      },
      {
        path: "products", element: <Products />
      },
      {
        path: "productst", children: [
          { path: ":id", element: <Product /> },
        ]
      },
      {
        path: "masa", element: <Masa />
      },


    ],
  },
]);
