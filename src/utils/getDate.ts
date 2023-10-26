export const getDate = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const d = newDate.getDate();

  return `${d.toString().padStart(2, "0")}.${month
    .toString()
    .padStart(2, "0")}.${year}`;
};
