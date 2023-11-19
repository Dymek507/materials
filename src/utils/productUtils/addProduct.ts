import { IProduct } from "../../types/model";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const addProduct = async (product: IProduct) => {
  if (!product.id) {
    throw new Error("Product must have an id");
  }
  await setDoc(doc(db, "products", product.id), product);
};

export default addProduct;
