const fs = require('fs');

const dataStr = fs.readFileSync('data/team.ts', 'utf8');

// We will do this carefully via regex or just eval the array and write it back out.
// Let's eval the array since it's just JS objects.
const match = dataStr.match(/export const teamData: TeamMember\[\] = (\[[\s\S]*\]);/);
if (match) {
  let arrayStr = match[1];
  
  // Replace the teamData array with a new string representation
  // We'll just regex replace the objects to be safer than eval.
  let newArrayStr = arrayStr.replace(/\{([^}]+)\}/g, (objMatch, inner) => {
    // If it already has skills, let's remove it and regenerate to ensure consistency
    let cleanInner = inner
      .replace(/,\s*skills:\s*\[[^\]]*\]/g, '')
      .replace(/,\s*statusTag:\s*"[^"]*"/g, '')
      .replace(/,\s*githubUrl:\s*"[^"]*"/g, '')
      .replace(/,\s*linkedinUrl:\s*"[^"]*"/g, '');

    // Extract role and departmentYear
    const roleMatch = cleanInner.match(/role:\s*"([^"]+)"/);
    const deptMatch = cleanInner.match(/departmentYear:\s*"([^"]+)"/);
    
    let role = roleMatch ? roleMatch[1] : "";
    let dept = deptMatch ? deptMatch[1] : "";
    
    let statusTag = "";
    if (role.includes("President") || role.includes("Head") && !role.includes("Co-Head")) statusTag = "CORE";
    else if (role.includes("Co-Head")) statusTag = "LEAD";
    else statusTag = "OP"; // Operator

    let skills = [];
    if (dept) {
      const parts = dept.split("/");
      if (parts[0]) skills.push('"' + parts[0] + '"');
      if (parts[1]) skills.push('"' + parts[1] + ' Year"');
    }
    if (skills.length === 0) skills = ['"TECH"', '"COMMUNITY"'];

    let additions = `, statusTag: "${statusTag}", skills: [${skills.join(', ')}], githubUrl: "#", linkedinUrl: "#"`;
    
    return `{${cleanInner}${additions} }`;
  });

  const newFileContent = dataStr.replace(match[1], newArrayStr);
  fs.writeFileSync('data/team.ts', newFileContent);
} else {
  console.log("Could not parse array");
}
