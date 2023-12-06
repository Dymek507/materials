import FileSaver from "file-saver";
import XLSX from "sheetjs-style";

type ExportExcelProps = {
  excelData: any[];
  fileName: string;
};

export const ExportExcel = ({ excelData, fileName }: ExportExcelProps) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <button className="bg-red-500" onClick={(e) => exportToExcel()}>Export</button>

  )
};
