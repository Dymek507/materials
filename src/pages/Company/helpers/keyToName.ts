export const keyToName = (key: string) => {
  let name = key.replace(/_/g, " ");
  name = name.charAt(0).toUpperCase() + name.slice(1);
  return name;
};
