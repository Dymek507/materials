export const getDateAndTime = () => {
  const newDate = new Date();
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const d = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();

  return `${d.toString().padStart(2, "0")}.${month
    .toString()
    .padStart(2, "0")}.${year} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};
