import List from "./components/List/List";
import { themeMain } from "./AppMuiTheme";
import { ThemeProvider } from "@mui/material";
import Navbar from "./components/Layout/Navbar";
import ProductsList from "./pages/ProductsList/ProductsList";
import Locations from "./pages/Locations/Locations";
import { RouterProvider } from "react-router-dom";
import { router } from "./App.routes"

function App() {
  return (
    <ThemeProvider theme={themeMain}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
