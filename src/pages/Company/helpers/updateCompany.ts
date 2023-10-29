import { doc, updateDoc } from "firebase/firestore";
import { ICompany } from "../../../types/model";
import { db } from "../../../../firebase";

const updateCompany = async (company: ICompany) => {
  await updateDoc(doc(db, "companies", company.id), {
    ...company,
  });
  // if (typeof company.category === "string") {
  //   //@ts-nocheck
  //   const dividedCategory = company.category.split(",");
  //   company.category = dividedCategory.map((item) => item.trim());
  // }
};

export default updateCompany;
