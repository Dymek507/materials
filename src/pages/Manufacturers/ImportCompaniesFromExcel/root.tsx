import { ReactSpreadsheetImport } from "react-spreadsheet-import";

import { Result } from "react-spreadsheet-import/types/types";

import { v1 as uuidv1 } from "uuid";

import { IMPORT_COMPANIES_FIELDS } from "./data";
import addCompany from "../../../utils/addCompany";
import getCords from "../../../utils/getCords";


type ImportCompaniesFromExcelProps = {
  open: boolean
  onClose: () => void
}

const ImportCompaniesFromExcel
  = ({ open, onClose }: ImportCompaniesFromExcelProps) => {
    const fields = IMPORT_COMPANIES_FIELDS

    const onSubmit = (data: Result<string>) => {
      console.log(data)
      data.validData.forEach(async (row) => {
        const { group, company, mail, phone, person, category, adress, comment, siding, id } = row
        if (company === undefined || typeof category === "boolean") return
        addCompany(
          {
            id: id?.toString() ?? uuidv1(),
            company: company.toString() ?? "",
            group: group?.toString() ?? "",
            mail: mail?.toString() ?? "",
            phone: [phone?.toString() ?? ""],
            person: person?.toString() ?? "",
            category: [category?.toString() ?? ""],
            adress: adress?.toString() ?? "",
            comment: comment?.toString() ?? "",
            siding: siding?.toString() ?? "",
            cords: await getCords(adress?.toString() ?? ""),
          }
        )
      }
      )

    }

    return (
      <ReactSpreadsheetImport isOpen={open} onClose={onClose} onSubmit={onSubmit} fields={fields} />
    )
  }

export default ImportCompaniesFromExcel
