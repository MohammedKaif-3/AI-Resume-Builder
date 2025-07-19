import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/SelectTemplate.css";
import Resume from "./Resume";
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Template_1 from "../components/ResumeTemplates/Template_1";
import Template_2 from "../components/ResumeTemplates/Template_2";
import Template_3 from "../components/ResumeTemplates/Template_3";
import Template_4 from '../components/ResumeTemplates/Template_4';
import Template_5 from '../components/ResumeTemplates/Template_5';
import Template_6 from '../components/ResumeTemplates/Template_6';
import Template_7 from '../components/ResumeTemplates/Template_7';
import Template_8 from '../components/ResumeTemplates/Template_8';
import Template_9 from '../components/ResumeTemplates/Template_9';
import Template_10 from '../components/ResumeTemplates/Template_10';
import Template_11 from '../components/ResumeTemplates/Template_11';
import Template_12 from '../components/ResumeTemplates/Template_12';
import Template_13 from '../components/ResumeTemplates/Template_13';

const SelectTemplate = () => {

  const [resumeData, setResumeData] = useState({
    resumelineheight: 1.5,
    sectionnames: {
      profile: "Profile",
      education: "Education",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
    },
    firstname: "John",
    lastname: "Doe",
    jobtitle: "Full Stack Developer",
    profileimg: "https://randomuser.me/api/portraits/men/60.jpg",
    profile:
      "Passionate Full Stack Developer with 5+ years of experience in designing and developing scalable web applications. Skilled in JavaScript, React, Node.js, and database management.",
    phone: "+1 234 567 890",
    email: "johndoe@example.com",
    github: "https://github.com/johndoe",
    linkedin: "https://www.linkedin.com/in/johndoe",
    website: "https://www.johndoe.dev",
    education: [
      {
        degree: "BTech",
        institution: "University of California",
        field: "Computer Science",
        startdate: "2015",
        enddate: "2019",
        score: "7.5"
      },
      {
        degree: "Higher Secondary School",
        institution: "University of California",
        field: "",
        startdate: "2013",
        enddate: "2015",
        score: "91%"
      }
    ],
    skills: [
      "JavaScript",
      "React.js",
      "Node.js",
      "MongoDB",
      "Express",
      "TypeScript",
      "Git & GitHub",
      "REST APIs",
      "HTML5 & CSS3"
    ],
    projects: [
      {
        name: "Portfolio Website",
        github: "https://www.johndoe.dev",
        description:
          "A personal portfolio website to showcase my projects, resume, and blogs. Built using React and deployed on Netlify.",
        techStack: ["HTML", "CSS", "JavaScript"]
      },
      {
        name: "E-Commerce Platform",
        github: "https://www.github.com",
        description:
          "Developed a full-stack e-commerce platform with user authentication, shopping cart, and payment gateway using MERN stack.",
        techStack: ["MongoDB", "Express", "React", "Node.js"]
      }
    ],
    experience: [
      {
        position: "Software Engineer",
        company: "TechNova Solutions",
        startdate: "2020",
        enddate: "2023",
        description:
          "Worked on developing scalable web apps with React and Node.js. Built and maintained REST APIs, collaborated in Agile teams, and optimized database queries for performance."
      },
      {
        position: "Frontend Developer Intern",
        company: "CodeCraft Inc.",
        startdate: "2019",
        enddate: "2020",
        description:
          "Assisted in building interactive UI components for client dashboards. Gained experience with React hooks and modern JavaScript."
      }
    ],

    // ✅ Custom Sections
    customsections: [
      {
        title: "Certifications",
        type: "simple",
        items: {
          cert1: "AWS Certified Solutions Architect – Associate",
          cert2: "Google UX Design Professional Certificate",
          cert3: "Microsoft Azure Fundamentals"
        }
      },
      {
        title: "Achievements",
        type: "simple",
        items: {
          a1: "Winner of HackTech 2023 - National Hackathon",
          a2: "Built open-source tool with 1K+ GitHub stars",
          a3: "Featured in Dev Weekly for technical blogging"
        }
      },
      {
        title: "Volunteer Experience",
        type: "detailed",
        items: {
          vol1: {
            title: "Coding Mentor – Code For Good",
            date: "2021 - Present",
            description: "Mentored students on full-stack development and open-source contributions.",
            link: ""
          }
        }
      }
    ]
  });

  const [resumeData2, setResumeData2] = useState({
    resumelineheight: 1.6,
    sectionnames: {
      profile: "Profile",
      education: "Education",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
    },
    firstname: "Jane",
    lastname: "Smith",
    jobtitle: "UI/UX Designer",
    profileimg: "https://randomuser.me/api/portraits/women/75.jpg", // placeholder image
    profile:
      "Creative and detail-oriented UI/UX Designer with 4+ years of experience in creating intuitive and user-friendly interfaces. Passionate about design systems, accessibility, and delivering seamless user experiences.",
    phone: "+1 987 654 3210",
    email: "jane.smith@example.com",
    github: "github.com/janesmith",
    linkedin: "linkedin.com/in/janesmith",
    website: "janesmith.design",
    education: [
      {
        degree: "Bachelor of Design",
        institution: "Parsons School of Design",
        field: "User Experience Design",
        startdate: "2014",
        enddate: "2018",
        score: "3.9 GPA"
      },
      {
        degree: "High School Diploma",
        institution: "Riverside High School",
        field: "",
        startdate: "2012",
        enddate: "2014",
        score: "94%"
      }
    ],
    skills: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Accessibility Design",
      "Design Systems",
      "HTML & CSS"
    ],
    projects: [
      {
        name: "UX Redesign for Travel App",
        github: "https://github.com/janesmith/travelapp-uiux",
        description:
          "Led a full UX redesign of a travel booking app to improve booking flow, increase retention, and reduce drop-off rates.",
        techStack: ["Figma", "User Research", "Prototype Testing"]
      },
      {
        name: "Portfolio Website",
        github: "https://janesmith.design",
        description:
          "A personal website to showcase case studies, blog posts, and resume. Designed and developed from scratch using HTML, CSS, and GSAP for animations.",
        techStack: ["HTML", "CSS", "JavaScript", "GSAP"]
      }
    ],
    experience: [
      {
        position: "UI/UX Designer",
        company: "PixelCraft Studios",
        startdate: "2020",
        enddate: "Present",
        description:
          "Designed end-to-end user flows for mobile and web apps. Collaborated with product managers and engineers to implement responsive and accessible designs. Conducted user interviews and usability tests."
      },
      {
        position: "Design Intern",
        company: "CreativeHive Agency",
        startdate: "2018",
        enddate: "2019",
        description:
          "Assisted senior designers with visual mockups, user personas, and prototyping. Contributed to branding projects and mobile app UI libraries."
      }
    ],
    customsections: [
      {
        title: "Certifications",
        type: "simple",
        items: {
          cert1: "Interaction Design Specialization – Coursera",
          cert2: "Google UX Design Certificate",
          cert3: "Adobe Certified Professional: Visual Design"
        }
      },
      {
        title: "Awards",
        type: "simple",
        items: {
          award1: "Top Designer Award – PixelCraft Studios (2022)",
          award2: "Best UX Project – HackForGood 2021"
        }
      },
      {
        title: "Speaking Engagements",
        type: "detailed",
        items: {
          spk1: {
            title: "Guest Speaker – UX Talks SF",
            date: "Mar 2023",
            description: "Spoke about 'Designing for Accessibility in Web Apps'.",
            link: "https://uxtalkssf.org/speakers/jane-smith"
          }
        }
      }
    ]
  });

  const [resumeData3, setResumeData3] = useState({
    resumelineheight: 1.5,
    sectionnames: {
      profile: "Profile",
      education: "Education",
      experience: "Experience",
      skills: "Skills",
      projects: "Projects",
    },
    firstname: "Meera",
    lastname: "Sharma",
    jobtitle: "UI/UX Designer",
    profileimg: "https://randomuser.me/api/portraits/women/44.jpg", // stock placeholder
    profile:
      "Creative and detail-oriented UI/UX Designer with over 4 years of experience crafting intuitive and user-centered digital experiences. Adept at wireframing, prototyping, and using design thinking to solve real-world problems.",
    phone: "+91 99888 77665",
    email: "meerasharma.designs@gmail.com",
    github: "https://github.com/meerasharma",
    linkedin: "https://linkedin.com/in/meerasharma",
    website: "https://meerasharma.design",
    education: [
      {
        degree: "B.Des",
        institution: "National Institute of Design, Ahmedabad",
        field: "Visual Communication",
        startdate: "2015",
        enddate: "2019",
        score: "8.9 CGPA"
      }
    ],
    skills: [
      "Figma",
      "Adobe XD",
      "Sketch",
      "User Research",
      "Wireframing",
      "Prototyping",
      "HTML & CSS",
      "Design Thinking",
      "Usability Testing",
      "Responsive Design"
    ],
    projects: [
      {
        name: "Travel Booking App Redesign",
        github: "https://github.com/meerasharma/travel-redesign",
        description:
          "Redesigned the UI for a major travel booking platform to improve booking flow and mobile responsiveness. Improved conversions by 18%.",
        techStack: ["Figma", "User Research", "Responsive UI"]
      },
      {
        name: "Healthcare App – UX Case Study",
        github: "https://github.com/meerasharma/healthcare-ux",
        description:
          "Conducted end-to-end UX case study for a digital health monitoring app including user interviews, persona creation, wireframes and usability tests.",
        techStack: ["Adobe XD", "User Testing", "UX Research"]
      }
    ],
    experience: [
      {
        position: "UI/UX Designer",
        company: "DesignLoop Studio",
        startdate: "2021",
        enddate: "Present",
        description:
          "Led the UX design of mobile and web products for fintech and e-commerce clients. Collaborated with cross-functional teams and delivered pixel-perfect designs."
      },
      {
        position: "Junior UX Designer",
        company: "BrightPixel Agency",
        startdate: "2019",
        enddate: "2021",
        description:
          "Worked on client projects involving user flows, wireframes, and design handoffs. Helped improve onboarding flows and dashboards."
      }
    ],
    customsections: [
      {
        title: "Certifications",
        type: "simple",
        items: {
          cert1: "Google UX Design Certificate",
          cert2: "Interaction Design Specialization – Coursera",
          cert3: "Adobe Certified Expert (ACE)"
        }
      },
      {
        title: "Workshops Attended",
        type: "simple",
        items: {
          w1: "UX India 2023 – Design Conference",
          w2: "Figma Community Meetup – Bengaluru",
          w3: "Accessibility in Design – Webflow Academy"
        }
      },
      {
        title: "Talks & Mentoring",
        type: "detailed",
        items: {
          talk1: {
            title: "Panelist – Women in Design (Adobe Live)",
            date: "March 2023",
            description: "Spoke about gender inclusivity in design systems and product teams.",
            link: "https://adobe.com/women-in-design"
          },
          talk2: {
            title: "UX Mentor – DesignX Bootcamp",
            date: "Aug 2022",
            description: "Guided junior designers in their UI/UX career paths and portfolio building.",
            link: ""
          }
        }
      }
    ]
  });

  const templates = [
    { id: "wp-1col-tem1", component: Template_1, resumeData: resumeData },
    { id: "p-2col-tem1", component: Template_2, resumeData: resumeData2 },
    { id: "wp-2col-tem1", component: Template_3, resumeData: resumeData3 },
    { id: "wp-2col-tem2", component: Template_4, resumeData: resumeData },
    { id: "p-2col-tem2", component: Template_5, resumeData: resumeData2 },
    { id: "p-1col-tem1", component: Template_6, resumeData: resumeData3 },
    { id: "wp-1col-tem2", component: Template_7, resumeData: resumeData },
    { id: "p-1col-tem2", component: Template_8, resumeData: resumeData2 },
    { id: "wp-1col-des-tem1", component: Template_9, resumeData: resumeData3 },
    { id: "p-2col-des-tem2", component: Template_10, resumeData: resumeData },
    { id: "p-2col-des-tem3", component: Template_11, resumeData: resumeData2 },
    { id: "wp-2col-des-tem4", component: Template_12, resumeData: resumeData3 },
    { id: "wp-2col-des-tem5", component: Template_13, resumeData: resumeData }
  ];

  const useSafeNavigate = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (to, options = {}) => {
      if (location.pathname !== to) {
        navigate(to, options);
      }
    };
  };

  const safeNavigate = useSafeNavigate();

  const handleSelect = (templateId) => {
    safeNavigate(`/create-resume/${templateId}`);
  };

  return (
    <>
      <div className="templates-wrapper">
        <Navbar />
        <div className="template-selection-container">
          <h2 className="templates-heading">Resume Templates</h2>
          <p className="subheading">Opportunity favors the well-prepared, Start with our great resume templates.</p>
          <p className="subheading">Professional, Simple, Safe, Everything you need to get hired.</p>
          <div className="templates-grid">
            {templates.map((template) => (
              <div className="template-card" key={template.id}>
                <Resume template={template.id} resumeData={template.resumeData} />
                <div className="resume-overlay">
                  <button
                    className="resume-action"
                    onClick={() => handleSelect(template.id)}
                  >
                    Use Template
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default SelectTemplate;
