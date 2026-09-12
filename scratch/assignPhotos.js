const fs = require('fs');
const path = require('path');

const photoDir = path.join(__dirname, '../Team Photos/Photo (In College Uniform Only) (File responses)');
const publicTeamDir = path.join(__dirname, '../public/team');

if (!fs.existsSync(publicTeamDir)) {
  fs.mkdirSync(publicTeamDir, { recursive: true });
}

const teamData = [
  { id: "1", name: "Piyush Sarve" },
  { id: "2", name: "Sagar Kharbikar" },
  { id: "3", name: "Anushka Moon" },
  { id: "4", name: "Kapil Pawar" },
  { id: "5", name: "Parmanand Bidwaik" },
  { id: "6", name: "Iram fiza Siddiqui" },
  { id: "7", name: "Vansh Bhowate" },
  { id: "8", name: "Vaishnavi Burrewar" },
  { id: "9", name: "Ojaswa Wadichar" },
  { id: "10", name: "Divya Mishra" },
  { id: "11", name: "Himanshu Bawane" },
  { id: "12", name: "Abhishek pahade" },
  { id: "13", name: "Vivek Khandare" },
  { id: "14", name: "Krishna kale" },
  { id: "15", name: "Harshu Kirmire" },
  { id: "16", name: "Ayushi Bisen" },
  { id: "17", name: "Ashwin Shende" },
  { id: "18", name: "Yash Yadav" },
  { id: "19", name: "Piyush Agrel" },
  { id: "20", name: "Rani Hatwar" },
  { id: "21", name: "Samisksha Zodope" }, // Wait, filename says "Samiksha Zodape"
  { id: "22", name: "Maithili Mirchapure" },
  { id: "23", name: "Anjali Dhandhe" },
  { id: "24", name: "Chaitali Khobragade" },
  { id: "25", name: "Sanskruti Pittalwar" },
  { id: "26", name: "Samyak khadse" },
  { id: "27", name: "Vedant Baraskar" },
  { id: "28", name: "Bhavesh Thote" },
  { id: "29", name: "Swetha Hajare" }, // "Shweta Hajare"
  { id: "30", name: "Tanvi Kamde" }, // "tanvi Kamdi"
  { id: "31", name: "Krish Mohankar" },
  { id: "32", name: "Vidhi Pohane" },
  { id: "33", name: "Saniya Kunghatkar" },
  { id: "34", name: "Angel Wandre" },
  { id: "35", name: "Samruddhi akre" },
  { id: "36", name: "Vedant Bawankule" },
];

const files = fs.readdirSync(photoDir);
const mappings = [];

files.forEach(file => {
  const namePart = file.split('-').pop().split('.')[0].trim().toLowerCase();
  
  let bestMatch = null;
  let bestScore = 0;

  teamData.forEach(member => {
    const memberName = member.name.toLowerCase();
    const parts = namePart.split(' ');
    
    // Check if parts match
    let score = 0;
    parts.forEach(p => {
      if (p.length > 2 && memberName.includes(p)) score++;
    });

    if (namePart === "samiksha zodape" && memberName.includes("samisksha")) score = 10;
    if (namePart === "shweta hajare" && memberName.includes("swetha")) score = 10;
    if (namePart === "tanvi kamdi" && memberName.includes("tanvi")) score = 10;
    if (namePart === "ojaswa wadichar" && memberName.includes("ojaswa")) score = 10;
    if (file === "Documentation Co Head.jpeg") {
      if (memberName.includes("vaishnavi")) score = 10; // Vaishnavi is doc co-head
    }

    if (score > bestScore) {
      bestScore = score;
      bestMatch = member;
    }
  });

  if (bestMatch) {
    const ext = path.extname(file);
    const destName = `${bestMatch.id}${ext}`;
    fs.copyFileSync(path.join(photoDir, file), path.join(publicTeamDir, destName));
    mappings.push(`{ id: "${bestMatch.id}", imageUrl: "/team/${destName}" }`);
  } else {
    console.log("No match for:", file);
  }
});

console.log("Mappings:\n", mappings.join(",\n"));
