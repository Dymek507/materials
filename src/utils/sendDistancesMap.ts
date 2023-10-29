import { collection, query, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import accurateDistance from "./accuratePrice/accurateDistance";
import { Cords } from "../types/model";

const sendDistancesMap = async (cords: Cords) => {
  const q = query(collection(db, "products"));

  const distanceMap: any = [];

  console.log(distanceMap);

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    distanceMap.push({
      id: doc.id,
      distance: accurateDistance(doc.data()?.cords_storage, cords),
    });
    console.log("resolved");
  });
};

export default sendDistancesMap;

// useEffect(() => {
//   const unsub = onSnapshot(productsRef, (products) => {
//     const firebaseProductsList = [] as IProduct[];
//     products.forEach((product) => {
//       firebaseProductsList.push(product.data() as IProduct);
//     });
//     setProductList(firebaseProductsList);
//   });
//   return () => {
//     unsub();
//   };
// }, []);
