import { ReactSpreadsheetImport } from "react-spreadsheet-import";

import { v1 as uuidv1 } from "uuid";

import { IMPORT_FIELDS } from "./data";

import { Result } from "react-spreadsheet-import/types/types";


type ImportFromExcelProps = {
  open: boolean
  onClose: () => void
  companyData: ICompany
}

const ImportFromExcel
  = ({ open, onClose, companyData }: ImportFromExcelProps) => {
    const fields = IMPORT_FIELDS

    const onSubmit = (data: Result<string>) => {
      data.validData.forEach((row) => {
        const { category, type, material, transport, price, unit } = row
        if (category === undefined || typeof category === "boolean") return
        addProduct(
          {
            price: Number(price) ?? 0,
            unit: unit?.toString() ?? "",
            category: [category],
            type: type?.toString() ?? "",
            material: material?.toString() ?? "",
            transport: transport?.toString() ?? "",
            id: uuidv1(),
            adress: companyData.adress,
            company: companyData.company,
            key: companyData.id,
            cords: companyData.cords
          }
        )
      }
      )

    }

    return (
      <ReactSpreadsheetImport isOpen={open} onClose={onClose} onSubmit={onSubmit} fields={fields} />
    )
  }

export default ImportFromExcel
