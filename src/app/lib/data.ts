
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
      year: "2025",
      title: "SAF 2025 — CubeSat Category",
      description: "2nd place. Worked on a space systems engineering project developing a CubeSat prototype.",
      organization: "International Steam Azerbaijan Festival (SAF)"
    },
    {
      year: "2023",
      title: "AzercellCup Programming Olympiad",
      description: "1st place nationwide in C++ programming.",
      organization: "Azercell | Ministry of Science and Education"
    },
    {
      year: "2023",
      title: "SAF 2023 — Boat Racing Category",
      description: "3rd place. Built a 3D-printed surface watercraft project with custom electronics.",
      organization: "International Steam Azerbaijan Festival (SAF)"
    },
    {
      year: "2022",
      title: "SAF 2022 — Edu Drone Category",
      description: "3rd place. Developed a drone-based project focused on electronics and engineering.",
      organization: "International Steam Azerbaijan Festival (SAF)"
    }
  ],
  projects: [
    {
      id: "p-saf-2025",
      title: "SAF 2025 — CubeSat Engineering",
      description: "Developing space systems engineering models for CubeSat category at SAF 2025. Awarded 2nd place for technical innovation in satellite prototyping.",
      image: "https://media.licdn.com/dms/image/v2/D4E22AQGOzYRzy8gW0A/feedshare-shrink_1280/B4EZqhjOQLKYAs-/0/1763646959976?e=1777507200&v=beta&t=_b-ZWI2quDf0yOqn57Sr_I8i3FczKNaPEJxRjoMCfSo",
      github: "https://github.com",
      tags: ["C++", "Aerospace", "IoT"]
    },
    {
      id: "p-saf-2023",
      title: "SAF 2023 — Boat Racing",
      description: "Built a custom 3D-printed surface watercraft with integrated electronics. Secured 3rd place in the Boat Racing category at the International Steam Azerbaijan Festival.",
      image: "https://media.licdn.com/dms/image/v2/D4E2DAQEhRLhr_9R8qw/profile-treasury-image-shrink_1280_1280/B4EZuF.j3qIUAQ-/0/1767479334026?e=1776769200&v=beta&t=Do79bLwQPR_mQPeWcHedyHhspnxmnJMOrccMwdUURvc",
      github: "https://github.com",
      tags: ["Electronics", "Robotics", "3D Printing"]
    },
    {
      id: "p-saf-2022",
      title: "SAF 2022 — Edu Drone",
      description: "Developed an educational drone-based project focused on flight control electronics and aerodynamic engineering. 3rd place winner.",
      image: "https://media.licdn.com/dms/image/v2/D4E22AQFN-V-EHFTYAw/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1716204025584?e=1777507200&v=beta&t=iCKCto6KE4cVHPdZyvbDIVjBUNhDf7ji-Q_cgHEQaVQ",
      github: "https://github.com",
      tags: ["Robotics", "Engineering", "C++"]
    },
    {
      id: "p-snaq",
      title: "Sınaq Mərkəzi AI",
      description: "Founder of “Sınaq Mərkəzi” — An AI-powered exam platform for students to practice and improve their scores with personalized feedback.",
      image: PlaceHolderImages.find(img => img.id === 'hero-bg')?.imageUrl || "",
      github: "https://github.com",
      tags: ["AI", "Next.js", "Education"]
    }
  ],
  certificates: [
    {
      id: "c6",
      title: "Cyber Summer School - 2023",
      description: "International summer school focused on cybersecurity, organized by ACOA and the State Security Service.",
      image: PlaceHolderImages.find(img => img.id === 'cert-cybersummer')?.imageUrl || ""
    },
    {
      id: "c4",
      title: "OpenAI GPTs: Creating Your Own Custom AI Assistants",
      description: "Certification from Vanderbilt University focused on building specialized AI agents and GPT models.",
      image: PlaceHolderImages.find(img => img.id === 'cert-vanderbilt')?.imageUrl || ""
    },
    {
      id: "c5",
      title: "Cybersecurity and Privacy",
      description: "Microsoft certification covering core security principles and privacy protection strategies.",
      image: PlaceHolderImages.find(img => img.id === 'cert-microsoft')?.imageUrl || ""
    },
    {
      id: "c1",
      title: "Deneyap Technology Laboratories",
      description: "3-year scholarship program completion in high-tech fields.",
      image: PlaceHolderImages.find(img => img.id === 'cert-cpp')?.imageUrl || ""
    },
    {
      id: "c2",
      title: "Technest Cybersecurity Program",
      description: "Intensive training program by Techspace Azerbaijan.",
      image: PlaceHolderImages.find(img => img.id === 'cert-cyber')?.imageUrl || ""
    }
  ],
  educationDetails: [
    {
      title: "Deneyap Technology Laboratories",
      meta: "3-year scholarship program (100%)"
    },
    {
      title: "Techspace Azerbaijan",
      meta: "Cybersecurity Training (Technest Scholarship 100%)"
    },
    {
      title: "Code&More",
      meta: "Electronics Training Program (Technest Scholarship 100%)"
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
