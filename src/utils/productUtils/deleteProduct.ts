import { db } from "../../../firebase";
import { doc, deleteDoc } from "firebase/firestore";

const deleteProduct = async (id: string | undefined) => {
  if (!id) return;
  await deleteDoc(doc(db, "products", id));
};

export default deleteProduct;
