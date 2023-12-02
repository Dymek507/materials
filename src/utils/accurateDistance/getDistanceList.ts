import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../../firebase";
import accurateDistance from "./accurateDistance";
import { IConstructionSite } from "../../types/model";

const sendDistanceList = async (
  constructionSite: IConstructionSite,
  acc_dist: number,
  id: string
) => {
  await updateDoc(doc(db, `sites/${constructionSite.id}`), {
    dist_arr: arrayUnion({ id: id, acc_dist: acc_dist }),
  });
};

const getDistanceList = async (constructionSite: IConstructionSite) => {
  const productsRef = collection(db, "products");
  const productsSnapshot = await getDocs(productsRef);
  const productsList: any[] = [];

  if (productsSnapshot) {
    productsSnapshot.forEach(async (product) => {
      productsList.push(product.data());
    });
  }

  productsList.forEach(async (product, index) => {
    setTimeout(async () => {
      const acc_dist = await accurateDistance(
        product.cords,
        constructionSite.cords
      );
      sendDistanceList(constructionSite, acc_dist, product.id);
    }, 300 * index);
  });
};
export default getDistanceList;
