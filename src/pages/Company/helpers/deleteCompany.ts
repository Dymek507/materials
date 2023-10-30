//delete company from firebase by id

import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";

export const deleteCompany = async (id: string) => {
  const companyRef = doc(db, "companies", id);
  await deleteDoc(companyRef);
};
