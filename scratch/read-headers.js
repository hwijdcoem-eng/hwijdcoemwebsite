const XLSX = require("xlsx");
const workbook = XLSX.readFile("Git & GitHub Workshop + Operation Hunt (Responses).xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
console.log("Headers:");
console.log(data[0]);
console.log("First Row:");
console.log(data[1]);
