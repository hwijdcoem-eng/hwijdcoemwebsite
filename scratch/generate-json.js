const XLSX = require("xlsx");
const fs = require("fs");

const workbook = XLSX.readFile("Git & GitHub Workshop + Operation Hunt (Responses).xlsx");
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(sheet);

const githubParticipants = [];
const huntParticipants = [];

data.forEach((row) => {
  if (!row["Name"] || !row["Mobile Number"]) return;
  
  const name = row["Name"].toString().trim();
  const phone = row["Mobile Number"].toString().trim();
  const isHunt = row["  Are you participating in the Operation Hunt?  "] === "Yes" || row["Are you participating in the Operation Hunt?"] === "Yes" || row["  Are you participating in the Operation Hunt?  "]?.toString().toLowerCase().includes("yes");

  // Format participant
  const p = {
    name: name,
    phone: phone,
    certificate: "participation"
  };

  githubParticipants.push(p);
  
  if (isHunt) {
    huntParticipants.push({ ...p });
  }
});

const githubJson = {
  participants: githubParticipants
};

const huntJson = {
  participants: huntParticipants
};

fs.writeFileSync("public/certificates/git-github-workshop-2026/data.json", JSON.stringify(githubJson, null, 2));
fs.writeFileSync("public/certificates/operation-hunt-2026/data.json", JSON.stringify(huntJson, null, 2));

console.log(`Generated GitHub Workshop JSON: ${githubParticipants.length} participants.`);
console.log(`Generated Operation Hunt JSON: ${huntParticipants.length} participants.`);
