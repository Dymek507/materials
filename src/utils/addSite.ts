import { IConstructionSite } from "../types/model";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const addSite = async (site: IConstructionSite) => {
  await setDoc(doc(db, "sites", site.id), site);
};

export default addSite;
