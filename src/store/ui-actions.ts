import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
import { doc, getDoc } from "@firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { RootState } from "./store";
import { uiActions } from "./ui-slice";
import { UserData } from "../types/model";

//Poprawić akcje ui i ui slice

export const logIn =
  (uId: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    if (uId !== null) {
      const userDocRef = doc(db, `users/${uId}`);
      try {
        const userDoc = await getDoc(userDocRef);
        const userObject = userDoc.data();
        if (userObject !== undefined) {
          const userData: UserData = {
            login: userObject!.login,
            uId: uId,
          };
          dispatch(uiActions.login({ logged: true, userData }));
          console.log("Sign-in successful.");
        }
      } catch (error) {
        console.log("Błąd" + error);
      }
    }
  };
export const logInAsGuest =
  (uId: string): ThunkAction<void, RootState, unknown, AnyAction> =>
  async (dispatch) => {
    if (uId !== null) {
      const userDocRef = doc(db, `users/${uId}`);
      try {
        const userDoc = await getDoc(userDocRef);
        const userObject = userDoc.data();
        if (userObject !== undefined) {
          const userData: UserData = {
            login: userObject!.login,
            uId: uId,
          };
          dispatch(uiActions.login({ logged: true, userData }));
          console.log("Sign-in successful.");
        }
      } catch (error) {
        console.log("Błąd" + error);
      }
    }
  };

export const logOut =
  (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    signOut(auth)
      .then(() => {
        dispatch(
          uiActions.login({
            logged: false,
            userData: {
              login: "",
              uId: null,
            },
          })
        );
        console.log("Sign-out successful.");
      })
      .catch((error) => {
        console.log("An error happened." + error);
      });
  };
