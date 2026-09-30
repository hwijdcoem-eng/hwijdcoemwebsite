const fs = require('fs');
const path = require('path');

const certDir = 'public/certificates';
const dirs = fs.readdirSync(certDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const names = {
  'git-github-workshop-2026': 'Git & GitHub',
  'operation-hunt-2026': 'Operation Hunt',
  'hackathon-2026': 'Hackathon 2026',
  'ideathon-2026': 'Ideathon 2026',
  'tech-talk-2026': 'Tech Talk'
};

for (const dir of dirs) {
  const p = path.join(certDir, dir, 'data.json');
  if (fs.existsSync(p)) {
    const data = JSON.parse(fs.readFileSync(p, 'utf8'));
    if (names[dir]) {
      data.eventName = names[dir];
      fs.writeFileSync(p, JSON.stringify(data, null, 2));
      console.log(`Updated ${dir} to ${names[dir]}`);
    }
  }
}
