export type TeamCategory =
  | "Admin Body"
  | "Documentation Team"
  | "Web Development Team"
  | "Technical Team"
  | "UI/UX Team"
  | "Operational Team"
  | "Publicity Team"
  | "Media Team"
  | "Volunteer Team";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  category: TeamCategory;
  departmentYear: string;
  imageUrl?: string;
  imagePosition?: "top" | "center" | "bottom";
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  bio?: string;
  statusTag?: string;
  skills?: string[];
};

export const teamData: TeamMember[] = [
  // Admin Body
  { id: "1", name: "Piyush Sarve", role: "President", category: "Admin Body", departmentYear: "DS/4th"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "2", name: "Sagar Kharbikar", role: "Vice-President", category: "Admin Body", departmentYear: "CSE/3rd", imageUrl: "/team/2.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "3", name: "Anushka Moon", role: "Secretary", category: "Admin Body", departmentYear: "CSE/3rd", imageUrl: "/team/3.png"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "4", name: "Kapil Pawar", role: "Treasurer", category: "Admin Body", departmentYear: "ME/3rd", imageUrl: "/team/4.png"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "5", name: "Parmanand Bidwaik", role: "Joint Treasurer", category: "Admin Body", departmentYear: "CSE/2nd", imageUrl: "/team/5.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "6", name: "Iram fiza Siddiqui", role: "Spokesperson", category: "Admin Body", departmentYear: "AI/2nd", imageUrl: "/team/6.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  // Documentation Team
  { id: "7", name: "Vansh Bhowate", role: "Documentation Head", category: "Documentation Team", departmentYear: "CSE/2nd", imageUrl: "/team/7.png"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "8", name: "Vaishnavi Burrewar", role: "Documentation Co-Ordinator", category: "Documentation Team", departmentYear: "CY/2nd", imageUrl: "/team/8.jpeg"  , githubUrl: "#", linkedinUrl: "#" },
  // Web Development Team
  { id: "9", name: "Ojaswa Wadichar", role: "Web Development Head", category: "Web Development Team", departmentYear: "CSE/3rd", imageUrl: "/team/9.jpeg"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "10", name: "Divya Mishra", role: "Web Development Co-Head", category: "Web Development Team", departmentYear: "CSE/3rd", imageUrl: "/team/10.JPG"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "11", name: "Himanshu Bawane", role: "Web Development Co-Ordinator", category: "Web Development Team", departmentYear: "CY/2nd", imageUrl: "/team/11.jpg", imagePosition: "top"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "12", name: "Abhishek pahade", role: "Web Development Co-Ordinator", category: "Web Development Team", departmentYear: "DS/2nd", imageUrl: "/team/12.png"  , githubUrl: "#", linkedinUrl: "#" },
  // Technical Team
  { id: "13", name: "Vivek Khandare", role: "Technical Head", category: "Technical Team", departmentYear: "CSE/3rd"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "14", name: "Krishna kale", role: "Technical Co-Ordinator", category: "Technical Team", departmentYear: "CY/2nd", imageUrl: "/team/14.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  // UI/UX Team
  { id: "15", name: "Harshu Kirmire", role: "UI/UX Co-Head", category: "UI/UX Team", departmentYear: "CSE/2nd", imageUrl: "/team/15.png"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "16", name: "Ayushi Bisen", role: "UI/UX Co-Ordinator", category: "UI/UX Team", departmentYear: "CY/2nd"  , githubUrl: "#", linkedinUrl: "#" },
  // Operational Team
  { id: "17", name: "Ashwin Shende", role: "Operational Head", category: "Operational Team", departmentYear: "CSE/3rd"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "18", name: "Yash Yadav", role: "Operational Co-Head", category: "Operational Team", departmentYear: "DS/2nd"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "19", name: "Piyush Agrel", role: "Operational Co-Ordinator", category: "Operational Team", departmentYear: "CY/2nd", imageUrl: "/team/19.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "20", name: "Rani Hatwar", role: "Operational Co-Ordinator", category: "Operational Team", departmentYear: "CY/2nd", imageUrl: "/team/20.jpg", imagePosition: "top"  , githubUrl: "#", linkedinUrl: "#" },
  // Publicity Team
  { id: "21", name: "Samisksha Zodope", role: "Publicity Head", category: "Publicity Team", departmentYear: "ETC/3rd", imageUrl: "/team/21.jpeg"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "22", name: "Maithili Mirchapure", role: "Publicity Co-Head", category: "Publicity Team", departmentYear: "DS/2nd", imageUrl: "/team/22.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "23", name: "Anjali Dhandhe", role: "Publicity Co-Ordinator", category: "Publicity Team", departmentYear: "AI/2nd"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "24", name: "Chaitali Khobragade", role: "Publicity Co-Ordinator", category: "Publicity Team", departmentYear: "AI/2nd", imageUrl: "/team/24.png"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "25", name: "Sanskruti Pittalwar", role: "Publicity Co-Ordinator", category: "Publicity Team", departmentYear: "AI/2nd", imageUrl: "/team/25.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  // Media Team
  { id: "26", name: "Samyak khadse", role: "Media Head", category: "Media Team", departmentYear: "ETC/3rd", imageUrl: "/team/26.jpeg"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "27", name: "Vedant Baraskar", role: "Media Co-Head", category: "Media Team", departmentYear: "AI/2nd"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "28", name: "Bhavesh Thote", role: "Media Co-Ordinator", category: "Media Team", departmentYear: "AI/2nd"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "29", name: "Swetha Hajare", role: "Media Co-Ordinator", category: "Media Team", departmentYear: "AI/2nd", imageUrl: "/team/29.jpg", imagePosition: "top"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "30", name: "Tanvi Kamde", role: "Media Co-Ordinator", category: "Media Team", departmentYear: "CY/2nd", imageUrl: "/team/30.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  // Volunteer Team
  { id: "31", name: "Krish Mohankar", role: "Volunteer Head", category: "Volunteer Team", departmentYear: "CSE/3rd", imageUrl: "/team/31.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "32", name: "Vidhi Pohane", role: "Volunteer Co-Head", category: "Volunteer Team", departmentYear: "CY/2nd", imageUrl: "/team/32.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "33", name: "Saniya Kunghatkar", role: "Volunteer Co-Ordinator", category: "Volunteer Team", departmentYear: "DS/2nd"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "34", name: "Angel Wandre", role: "Volunteer Co-Ordinator", category: "Volunteer Team", departmentYear: "AI/2nd", imageUrl: "/team/34.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "35", name: "Samruddhi akre", role: "Volunteer Co-Ordinator", category: "Volunteer Team", departmentYear: "CY/2nd", imageUrl: "/team/35.jpg"  , githubUrl: "#", linkedinUrl: "#" },
  { id: "36", name: "Vedant Bawankule", role: "Volunteer Co-Ordinator", category: "Volunteer Team", departmentYear: "AI/2nd", imageUrl: "/team/36.png"  , githubUrl: "#", linkedinUrl: "#" },
];
