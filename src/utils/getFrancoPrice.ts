export const getFrancoPrice = (
  price: number,
  distance: number | undefined,
  category: string[]
) => {
  let perKmPrice = 0;

  if (category.includes("kruszywo")) perKmPrice = 0.4;
  if (category.includes("cement")) perKmPrice = 0.65;
  if (category.includes("spoiwo")) perKmPrice = 0.65;

  if (distance === undefined) return 0;

  return price + distance * perKmPrice;
};
