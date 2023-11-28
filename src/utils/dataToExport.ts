import { ICompanywithDistance } from "../pages/Manufacturers/helpers/types";

export const dataToExport = (data: ICompanywithDistance[]) => {
  const dataToExport = data.map((item) => {
    return {
      name: item.company,
      person: item.person,
      mail: item.mail,
      phone: item.phone?.toString(),
      comment: item.comment,
      siding: item.siding,
    };
  });
  return dataToExport;
};
