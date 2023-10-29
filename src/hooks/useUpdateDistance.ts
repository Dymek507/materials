// import React, { useEffect } from "react";
// import { IProduct } from "../types/model";
// import { useAppSelector } from "../store/app/hooks";
// import accurateDistance from "../utils/accuratePrice/accurateDistance";

// type IDistanceMap = {
//   id: string;
//   distance: number;
// };

// type IDistancesList = {
//   id: string;
//   distancesMap: Promise<IDistanceMap[]>;
// };

// const useUpdateDistance = (productsList: IProduct[]) => {
//   const constructionSite = useAppSelector(
//     (state) => state.construction.constructionSite
//   );
//   useEffect(() => {
//     const distanceUpdater = async () => {
//       const distanceMap = productsList.map(async (product) => ({
//         id: product.id,
//         distance: await accurateDistance(product.cords, constructionSite.cords),
//       }));
//       console.log(distanceMap);
//       // setDistancesList({
//       //   id: constructionSite.id,
//       //   distancesMap: distanceMap,
//       // });
//     };
//     distanceUpdater();
//   }),
//     [productsList, constructionSite];
// };

// export default useUpdateDistance;
