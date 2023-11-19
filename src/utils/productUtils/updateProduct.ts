import { IProduct } from "../../types/model";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase";

const updateProduct = async (product: IProduct) => {
  if (!product.id) {
    throw new Error("Product must have an id");
  }
  await updateDoc(doc(db, "products", product.id), {
    ...product,
  });
};

export default updateProduct;
