import { ReactSpreadsheetImport, StepType } from "react-spreadsheet-import";
import { Result } from "react-spreadsheet-import/types/types";
import { IMPORT_FIELDS } from "./data";

type ImportFromExcelProps = {
  open: boolean
  onClose: () => void
}

const ImportFromExcel
  = ({ open, onClose }: ImportFromExcelProps) => {
    const fields = IMPORT_FIELDS

    const onSubmit = (data: Result<string>) => {
      console.log(data)
    }

    return (
      <ReactSpreadsheetImport isOpen={open} onClose={onClose} onSubmit={onSubmit} fields={fields} />
    )
  }

export default ImportFromExcel
