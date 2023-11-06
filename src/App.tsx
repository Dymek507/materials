import { themeMain } from "./AppMuiTheme";
import { ThemeProvider } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import { router } from "./App.routes"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useAppDispatch } from "./store/app/hooks";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { uiActions } from "./store/ui-slice";
import { useEffect } from "react";
import { logOut } from "./store/ui-actions";

function App() {

  const dispatch = useAppDispatch();
  const auth = getAuth();

  //Fetch user data from firebase and save it in redux store
  const fetchUserData = async (uId: string) => {
    if (uId !== null) {
      const userDocRef = doc(db, `users/${uId}`);
      try {
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
        dispatch(
          uiActions.login({
            logged: true,
            userData: {
              login: userData?.login,
              uId: uId,
            },
          })
        );
      } catch (error) {
        console.log("Błąd" + error);
      }
    }
  };

  //After app starts, this code check if user is logged in. If yes, fetch user data from firebase and save it in redux store.
  useEffect(() => {
    const authentication = onAuthStateChanged(auth, async (user) => {
      if (user !== null) {
        const uid = user?.uid;
        if (uid) {
          await fetchUserData(uid);
        }
      } else {
        dispatch(logOut);
      }
    });

    return authentication();
  }, [auth, dispatch]);

  return (
    <ThemeProvider theme={themeMain}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
