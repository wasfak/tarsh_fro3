import xlsx from "xlsx";
import path from "path";

// Store the Excel data in memory
let excelData = null;

// Function to read the Excel file and return the data
function readExcelFile() {
  const filePath = path.join(process.cwd(), "uploads/1.xlsx");
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { code } = req.body;

    try {
      // Read the Excel file once (if not already read)
      if (!excelData) {
        excelData = readExcelFile();
      }

      // Search in the cached data
      const result = excelData.find((item) => item.code === Number(code));

      res.status(200).json({ result });
    } catch (error) {
      console.error("Error searching for code:", error);
      res.status(500).json({ error: "Code search failed" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
