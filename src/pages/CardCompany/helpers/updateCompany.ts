import { doc, updateDoc } from "firebase/firestore";
import { ICompany } from "../../../types/model";
import { db } from "../../../../firebase";

const updateCompany = async (company: ICompany) => {
  await updateDoc(doc(db, "companies", company.id), {
    ...company,
  });
};

export default updateCompany;
