import { doc, setDoc } from "firebase/firestore";
import { ICompany } from "../../../types/model";
import { db } from "../../../../firebase";
import { getDate } from "../../../utils/getDate";

//add options to add more category

const addCompany = async (company: ICompany) => {
  if (company.cords == undefined) {
    company.cords = {
      lat: 55,
      lng: 18,
    };
  }
  // if (typeof company.category === "string") {
  //   const dividedCategory = company.category.split(",");
  //   company.category = dividedCategory.map((item) => item.trim());
  // }
  company.date = getDate();
  await setDoc(doc(db, "companies", company.id), company);
};

export default addCompany;
