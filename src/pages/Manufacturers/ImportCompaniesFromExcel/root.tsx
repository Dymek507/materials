import { ReactSpreadsheetImport } from "react-spreadsheet-import";

import { Result } from "react-spreadsheet-import/types/types";
import { IMPORT_COMPANIES_FIELDS } from "./data";


type ImportCompaniesFromExcelProps = {
  open: boolean
  onClose: () => void
}

const ImportCompaniesFromExcel
  = ({ open, onClose }: ImportCompaniesFromExcelProps) => {
    const fields = IMPORT_COMPANIES_FIELDS

    const onSubmit = (data: Result<string>) => {
      console.log(data)
      // data.validData.forEach((row) => {
      //   const { category, type, material, transport, price, unit } = row
      //   if (category === undefined || typeof category === "boolean") return
      //   addCompany(
      //   {
      //     price: Number(price) ?? 0,
      //     unit: unit?.toString() ?? "",
      //     category: [category],
      //     type: type?.toString() ?? "",
      //     material: material?.toString() ?? "",
      //     transport: transport?.toString() ?? "",
      //     id: uuidv1(),
      //     adress: companyData.adress,
      //     company: companyData.company,
      //     key: companyData.id,
      //     cords: companyData.cords
      //   }
      //   {}
      //   )
      // }
      // )

    }

    return (
      <ReactSpreadsheetImport isOpen={open} onClose={onClose} onSubmit={onSubmit} fields={fields} />
    )
  }

export default ImportCompaniesFromExcel
