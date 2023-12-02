export const getFrancoPrice = (
  price: number,
  distance: number | undefined,
  type: string
) => {
  console.log(price, (distance = 0), type);
  // return 999;
  return price + distance * 0.5;
};
