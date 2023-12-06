import { createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/root";

import Home from "./pages/Home/root";
import Locations from "./pages/Manufacturers/root";
import Products from "./pages/ProductsList/root";
import Company from "./pages/CardCompany/root";
import Product from "./pages/CardProduct/root";
import CompaniesTable from "./pages/Manufacturers/Table/root";
import Masa from "./pages/Masa/root";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Login/RegisterPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <Error />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "companies", element: <Locations />,
      },
      {
        path: "table", children: [
          { index: true, element: <CompaniesTable /> },
          { path: ":id", element: <Company /> },
        ]
      },
      {
        path: "products", children: [
          { index: true, element: <Products /> },
          { path: ":id", element: <Product /> },
        ]
      },
      {
        path: "masa", element: <Masa />
      },
      {
        path: "login", element: <LoginPage />
      },
      {
        path: "register", element: <RegisterPage />
      },


    ],
  },
]);
