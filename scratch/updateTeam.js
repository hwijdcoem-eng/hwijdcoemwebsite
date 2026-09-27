const fs = require('fs');
let content = fs.readFileSync('data/team.ts', 'utf8');

// A simpler regex to match objects in the array
content = content.replace(/}(,?)\s*(?=\n)/g, (match, comma) => {
  if (match.includes('githubUrl')) return match;
  return ', githubUrl: "#", linkedinUrl: "#" }' + (comma || '');
});

fs.writeFileSync('data/team.ts', content);
