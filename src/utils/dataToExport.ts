import { ICompanyDistance } from "../pages/Locations/root";

export const dataToExport = (data: ICompanyDistance[]) => {
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
