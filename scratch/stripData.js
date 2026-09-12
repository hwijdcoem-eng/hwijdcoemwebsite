const fs = require('fs');
let dataStr = fs.readFileSync('data/team.ts', 'utf8');

// Strip statusTag and skills fields from every member
dataStr = dataStr.replace(/,\s*statusTag:\s*"[^"]*"/g, '');
dataStr = dataStr.replace(/,\s*skills:\s*\[[^\]]*\]/g, '');

fs.writeFileSync('data/team.ts', dataStr);
