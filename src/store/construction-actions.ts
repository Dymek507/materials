// import { AnyAction, ThunkAction } from "@reduxjs/toolkit";
// import { db } from "../../firebase";
// import { doc, getDoc, updateDoc } from "@firebase/firestore";
// import { ResultT } from "../types/modelTypes";
// import { adminActions } from "./admin-slice";
// import { RootState } from "./store";
// import resultHandler from "./app/resultHandler";
// import manageMoney from "./app/manageMoney";

// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../../firebase";
// import accurateDistance from "./accurateDistance";
// import { IConstructionSite } from "../../types/model";

// export const generateArray =
//   (): ThunkAction<void, RootState, unknown, AnyAction> =>
//   async (dispatch, getState) => {
//     const results = getState().construction.constructionSite.dist_arr;

//     const userDocRef = doc(db, `products`);
//     try {
//       await updateDoc(userDocRef, {
//         results: results,
//       });
//     } catch (error) {
//       console.log(`Błąd wysyłania ${error}`);
//     }
//   };

// const getDistanceList = async (constructionSite: IConstructionSite) => {
//   const productsRef = collection(db, "products");
//   const productsSnapshot = await getDocs(productsRef);
//   const productsList: any[] = [];

//   if (productsSnapshot) {
//     productsSnapshot.forEach(async (product) => {
//       productsList.push(product.data());
//     });
//   }

//   productsList.forEach(async (product, index) => {
//     setTimeout(async () => {
//       product.distance = await accurateDistance(
//         product.cords_storage,
//         constructionSite.cords
//       );
//     }, 500 * index);
//   });
//   console.log(productsList);
// };
// export default getDistanceList;
