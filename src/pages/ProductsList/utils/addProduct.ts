import React from "react";
import { IProduct } from "../../../types/model";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../../firebase";

const addProduct = async (product: IProduct) => {
  await setDoc(doc(db, "products", product.id), product);
};

export default addProduct;
