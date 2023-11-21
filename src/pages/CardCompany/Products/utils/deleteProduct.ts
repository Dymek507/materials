import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../../../firebase";

const deleteProduct = async (id: string) => {
  await deleteDoc(doc(db, "products", id));
};

export default deleteProduct;
