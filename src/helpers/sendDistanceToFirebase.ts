import { ICargo } from "../types/model";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface IRouteSummary {
  totalDistance: number;
  totalTime: number;
}

const sendDistanceToFirebase = async (
  cargo: ICargo,
  routeSummary: IRouteSummary
) => {
  if (cargo.distance !== 0) return;
  const updateCargoData = async () => {
    const cargoRef = doc(db, "cargos", cargo.id);
    await updateDoc(cargoRef, {
      distance: (routeSummary.totalDistance / 1000).toFixed(0),
      time: routeSummary.totalTime / 60 / 3600,
    });
  };
  await updateCargoData();
};

export default sendDistanceToFirebase;
