import { themeMain } from "./AppMuiTheme";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./App.routes"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function App() {


  return (
    <ThemeProvider theme={themeMain}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
