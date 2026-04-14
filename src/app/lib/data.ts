
import { PlaceHolderImages } from './placeholder-images';

export const portfolioData = {
  personalInfo: {
    name: "NİCAT HUSEYNLI",
    title: "S T U D E N T",
    profession: ["Founder of Sınaq Mərkəzi", "Student Developer", "C++ Programmer", "Competition Participant"],
    aboutMe: "I am an active volunteer with strong teamwork and communication skills, experienced in dynamic environments. I have a background in programming and cybersecurity, along with achievements such as being a 3-time STEAM competition winner. I am responsible, adaptable, and always eager to learn and contribute effectively.",
    phone: "+994-51-426-26-76",
    email: "huseynlinicat2010@gmail.com",
    linkedin: "https://www.linkedin.com/in/nicat-huseynli-12022b283/",
    instagram: "https://instagram.com/nicathuseynli",
    cvLink: "https://drive.google.com/file/d/1EuWEgXM0d0iBd2wjq3d3X7XFojEeE5ZF/view?usp=sharing",
    education: "Secondary School No. 204",
    location: "Baku, Azerbaijan"
  },
  skills: {
    technical: [
      { name: "Programming (C++)", level: 90 },
      { name: "Cybersecurity", level: 75 },
      { name: "Electronics", level: 80 },
      { name: "Python", level: 70 },
      { name: "Robotics", level: 85 }
    ],
    soft: [
      "Teamwork", "Critical Thinking", "Leadership", "Problem Solving", "Communication", "Adaptability", "Creativity"
    ],
    languages: [
      { name: "Azerbaijani", level: "Native" },
      { name: "English", level: "B1" },
      { name: "Turkish", level: "B2" }
    ]
  },
  educationDetails: [
    {
      title: "Deneyap Technology Laboratories",
      meta: "3-year scholarship program (Scholarship Program 100%)"
    },
    {
      title: "Techspace Azerbaijan",
      meta: "Cybersecurity Training (Technest Scholarship Program 100%)"
    },
    {
      title: "Code&More",
      meta: "Electronics Training Program (Technest Scholarship Program 100%)"
    }
  ],
  achievements: [
    {
      year: "2025",
      title: "2nd Turkic Integration Olympiad (TIO)",
      description: "Silver Medal winner. Integrated competition covering mathematics, computer science, chemistry, biology, history, physics, and geography among Turkic states.",
      organization: "Hədəf Kursları"
    },
    {
      year: "2025",
      title: "National Inter-School Hackathon",
      description: "Selected among 300 finalists from ~300,000 participants. Developed a web platform for mountain tourism with a booking and coupon system.",
      organization: "Ministry of Science and Education Republic of Azerbaijan"
    },
    {
      year: "2023",
      title: "AzercellCup Programming Olympiad",
      description: "1st place nationwide in C++ programming.",
      organization: "Azercell | Ministry of Science and Education"
    }
  ],
  projects: [
    {
      id: "p-saf-2025",
      title: "SAF 2025 — CubeSat Engineering",
      description: "Developing space systems engineering models for CubeSat category at SAF 2025. Awarded 2nd place for technical innovation in satellite prototyping.",
      image: PlaceHolderImages.find(img => img.id === 'project-cubesat-saf2025')?.imageUrl || "",
      github: "https://github.com",
      tags: ["C++", "Aerospace", "IoT"]
    },
    {
      id: "p-saf-2023",
      title: "SAF 2023 — Boat Racing",
      description: "Built a custom 3D-printed surface watercraft with integrated electronics. Secured 3rd place in the Boat Racing category at the International Steam Azerbaijan Festival.",
      image: PlaceHolderImages.find(img => img.id === 'project-boat-saf2023')?.imageUrl || "",
      github: "https://github.com",
      tags: ["Electronics", "Robotics", "3D Printing"]
    },
    {
      id: "p-saf-2022",
      title: "SAF 2022 — Edu Drone",
      description: "Developed an educational drone-based project focused on flight control electronics and aerodynamic engineering. 3rd place winner.",
      image: PlaceHolderImages.find(img => img.id === 'project-drone-saf2022')?.imageUrl || "",
      github: "https://github.com",
      tags: ["Robotics", "Engineering", "C++"]
    }
  ],
  founderProjects: [
    {
      id: "p-snaq",
      title: "Sınaq Mərkəzi AI",
      role: "Founder & Lead Developer",
      description: "An AI-powered exam platform for students to practice and improve their scores with personalized feedback. Revolutionizing exam preparation through generative AI analysis and adaptive testing.",
      image: PlaceHolderImages.find(img => img.id === 'hero-bg')?.imageUrl || "",
      github: "https://github.com",
      tags: ["AI", "Next.js", "Education", "Founder"]
    }
  ],
  certificates: [
    {
      id: "c1",
      title: "Deneyap Technology Laboratories",
      description: "3-year scholarship program completion in high-tech fields including robotics, coding, and design.",
      image: PlaceHolderImages.find(img => img.id === 'cert-deneyap')?.imageUrl || ""
    },
    {
      id: "c2",
      title: "2nd Turkic Integration Olympiad (TIO)",
      description: "Silver medal recognition for excellence in interdisciplinary sciences across Turkic states.",
      image: PlaceHolderImages.find(img => img.id === 'cert-tio')?.imageUrl || ""
    },
    {
      id: "c3",
      title: "Spring Camp for Student Volunteers",
      description: "Leadership and team-building training program, resulting in a first-place competition finish.",
      image: PlaceHolderImages.find(img => img.id === 'cert-volunteer')?.imageUrl || ""
    },
    {
      id: "c4",
      title: "Technest Cybersecurity Program",
      description: "Intensive cybersecurity training provided by Techspace Azerbaijan under the Technest scholarship.",
      image: PlaceHolderImages.find(img => img.id === 'cert-technest')?.imageUrl || ""
    },
    {
      id: "c5",
      title: "AzercellCup Programming Olympiad",
      description: "National recognition for C++ programming excellence, organized by Azercell.",
      image: PlaceHolderImages.find(img => img.id === 'cert-azercell')?.imageUrl || ""
    },
    {
      id: "c6",
      title: "Cyber Summer School - 2023",
      description: "International summer school focused on cybersecurity, organized by ACOA and the State Security Service.",
      image: PlaceHolderImages.find(img => img.id === 'cert-cybersummer')?.imageUrl || ""
    }
  ],
  volunteering: [
    {
      title: "Spring Camp for Student Volunteers",
      organization: "One Volunteer | Ministry of Education",
      year: "2025",
      description: "Participated in leadership training; team won 1st place in “What? Where? When?” competition."
    }
  ],
  testScores: [
    {
      exam: "The State Examination Center",
      score: "297/300",
      date: "Apr 2025"
    }
  ]
};
