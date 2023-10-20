import { doc, setDoc } from "firebase/firestore";
import { ICompany } from "../../../types/model";
import { db } from "../../../../firebase";

const addCompany = async (company: ICompany) => {
  if (company.cords == undefined) {
    company.cords = {
      lat: 55,
      lng: 18,
    };
  }
  await setDoc(doc(db, "companies", company.id), company);
};

export default addCompany;
