import { ICargo } from "../../../types/model";

export enum SortingVariants {
  price = "price",
  loadingDate = "loadingDate",
}

const sortCargos = (
  cargosArray: ICargo[],
  sortingAtr: SortingVariants,
  sortingDir: boolean
): ICargo[] => {
  const newArray = [...cargosArray];
  //Sorting by attribute
  newArray.sort((a, b) => {
    if (sortingAtr === SortingVariants.price) {
      return a.price - b.price;
    } else if (sortingAtr === SortingVariants.loadingDate) {
      const aLoadingDate = new Date(a.loadingDate);
      const bLoadingDate = new Date(b.loadingDate);
      return aLoadingDate.getTime() - bLoadingDate.getTime();
    } else {
      return 0;
    }
  });

  //Sorting by direction
  if (sortingDir) {
    newArray.reverse();
  }

  return newArray;
};

export default sortCargos;
