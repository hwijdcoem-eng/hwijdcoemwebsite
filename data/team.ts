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
  avatarUrl?: string;
  githubUrl?: string;
  twitterUrl?: string;
};

export const teamData: TeamMember[] = [
  // Admin Body
  { id: "1", name: "Piyush Sarve", role: "President", category: "Admin Body", departmentYear: "DS/4th" },
  { id: "2", name: "Sagar Kharbikar", role: "Vice-President", category: "Admin Body", departmentYear: "CSE/3rd" },
  { id: "3", name: "Anushka Moon", role: "Secretary", category: "Admin Body", departmentYear: "CSE/3rd" },
  { id: "4", name: "Kapil Pawar", role: "Treasurer", category: "Admin Body", departmentYear: "ME/3rd" },
  { id: "5", name: "Parmanand Bidwaik", role: "Joint Treasurer", category: "Admin Body", departmentYear: "CSE/2nd" },
  { id: "6", name: "Iram fiza Siddiqui", role: "Spokesperson", category: "Admin Body", departmentYear: "AI/2nd" },
  
  // Documentation Team
  { id: "7", name: "Vansh Bhowate", role: "Documentation Head", category: "Documentation Team", departmentYear: "CSE/2nd" },
  { id: "8", name: "Vaishnavi Burrewar", role: "Documentation Co-Ordinator", category: "Documentation Team", departmentYear: "CY/2nd" },

  // Web Development Team
  { id: "9", name: "Ojaswa Wadichar", role: "Web Development Head", category: "Web Development Team", departmentYear: "CSE/3rd" },
  { id: "10", name: "Divya Mishra", role: "Web Development Co-Head", category: "Web Development Team", departmentYear: "CSE/3rd" },
  { id: "11", name: "Himanshu Bawane", role: "Web Development Co-Ordinator", category: "Web Development Team", departmentYear: "CY/2nd" },
  { id: "12", name: "Abhishek pahade", role: "Web Development Co-Ordinator", category: "Web Development Team", departmentYear: "DS/2nd" },

  // Technical Team
  { id: "13", name: "Vivek Khandare", role: "Technical Head", category: "Technical Team", departmentYear: "CSE/3rd" },
  { id: "14", name: "Krishna kale", role: "Technical Co-Ordinator", category: "Technical Team", departmentYear: "CY/2nd" },

  // UI/UX Team
  { id: "15", name: "Harshu Kirmire", role: "UI/UX Co-Head", category: "UI/UX Team", departmentYear: "CSE/2nd" },
  { id: "16", name: "Ayushi Bisen", role: "UI/UX Co-Ordinator", category: "UI/UX Team", departmentYear: "CY/2nd" },

  // Operational Team
  { id: "17", name: "Ashwin Shende", role: "Operational Head", category: "Operational Team", departmentYear: "CSE/3rd" },
  { id: "18", name: "Yash Yadav", role: "Operational Co-Head", category: "Operational Team", departmentYear: "DS/2nd" },
  { id: "19", name: "Piyush Agrel", role: "Operational Co-Ordinator", category: "Operational Team", departmentYear: "CY/2nd" },
  { id: "20", name: "Rani Hatwar", role: "Operational Co-Ordinator", category: "Operational Team", departmentYear: "CY/2nd" },

  // Publicity Team
  { id: "21", name: "Samisksha Zodope", role: "Publicity Head", category: "Publicity Team", departmentYear: "ETC/3rd" },
  { id: "22", name: "Maithili Mirchapure", role: "Publicity Co-Head", category: "Publicity Team", departmentYear: "DS/2nd" },
  { id: "23", name: "Anjali Dhandhe", role: "Publicity Co-Ordinator", category: "Publicity Team", departmentYear: "AI/2nd" },
  { id: "24", name: "Chaitali Khobragade", role: "Publicity Co-Ordinator", category: "Publicity Team", departmentYear: "AI/2nd" },
  { id: "25", name: "Sanskruti Pittalwar", role: "Publicity Co-Ordinator", category: "Publicity Team", departmentYear: "AI/2nd" },

  // Media Team
  { id: "26", name: "Samyak khadse", role: "Media Head", category: "Media Team", departmentYear: "ETC/3rd" },
  { id: "27", name: "Vedant Baraskar", role: "Media Co-Head", category: "Media Team", departmentYear: "AI/2nd" },
  { id: "28", name: "Bhavesh Thote", role: "Media Co-Ordinator", category: "Media Team", departmentYear: "AI/2nd" },
  { id: "29", name: "Swetha Hajare", role: "Media Co-Ordinator", category: "Media Team", departmentYear: "AI/2nd" },
  { id: "30", name: "Tanvi Kamde", role: "Media Co-Ordinator", category: "Media Team", departmentYear: "CY/2nd" },

  // Volunteer Team
  { id: "31", name: "Krish Mohankar", role: "Volunteer Head", category: "Volunteer Team", departmentYear: "CSE/3rd" },
  { id: "32", name: "Vidhi Pohane", role: "Volunteer Co-Head", category: "Volunteer Team", departmentYear: "CY/2nd" },
  { id: "33", name: "Saniya Kunghatkar", role: "Volunteer Co-Ordinator", category: "Volunteer Team", departmentYear: "DS/2nd" },
  { id: "34", name: "Angel Wandre", role: "Volunteer Co-Ordinator", category: "Volunteer Team", departmentYear: "AI/2nd" },
  { id: "35", name: "Samruddhi akre", role: "Volunteer Co-Ordinator", category: "Volunteer Team", departmentYear: "CY/2nd" },
  { id: "36", name: "Vedant Bawankule", role: "Volunteer Co-Ordinator", category: "Volunteer Team", departmentYear: "AI/2nd" },
];
