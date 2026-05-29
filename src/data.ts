import { SuccessStory, TrackerTask, VisaQuestion, TeamMember } from "./types";

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: "story-1",
    name: "Kwame Mensah",
    country: "Ghana 🇬🇭",
    targetMajor: "Higher Education Administration & Leadership",
    degree: "Masters",
    university: "University of Massachusetts Amherst (UMass)",
    fundingAmount: "100% Tuition Waiver + $24,500 Annual Stipend",
    assistantshipType: "Assistant Residence Director (Graduate Assistantship)",
    fundingPercent: 100,
    storySummary: "KWAME worked closely with URSP advisors to craft a stunning academic resume reflecting his student union leadership in Ghana. Secured a competitive GA position at UMass Amherst that covered his entire tuition and provided an excellent stipend status.",
    awardYear: "2025"
  },
  {
    id: "story-2",
    name: "Chidimma Okafor",
    country: "Nigeria 🇳🇬",
    targetMajor: "Biomedical Sciences (Cancer Research)",
    degree: "PhD",
    university: "University at Buffalo",
    fundingAmount: "Full Fellowship & $32,000 Graduate Assistantship",
    assistantshipType: "Graduate Research Assistant (GRA)",
    fundingPercent: 100,
    storySummary: "CHIDIMMA targeted fully funded biomedical molecular biology labs in the US. URSP guided her cold-email writing strategy, helping her secure direct supervisor commitment before submitting her university application.",
    awardYear: "2024"
  },
  {
    id: "story-3",
    name: "Elphas Kimutai",
    country: "Kenya 🇰🇪",
    targetMajor: "Energy Systems Engineering",
    degree: "Masters",
    university: "University of Alberta (Canada)",
    fundingAmount: "Graduate Assistantship + $21,000 Tuition Fellowship",
    assistantshipType: "Graduate Teaching Assistant (GTA)",
    fundingPercent: 100,
    storySummary: "ELPHAS wanted affordable higher degrees in energy systems. URSP mentors assisted in navigating Canadian visa regulations and drafting a tight interest profile matching clean science projects in Alberta.",
    awardYear: "2025"
  },
  {
    id: "story-4",
    name: "Alain Ndayishimiye",
    country: "Rwanda 🇷🇼",
    targetMajor: "Mechanical Engineering",
    degree: "Bachelors",
    university: "Western Illinois University",
    fundingAmount: "Global Diversity Presidential Scholarship (100% Tuition)",
    assistantshipType: "Presidential Merit Award",
    fundingPercent: 100,
    storySummary: "ALAIN, with a spectacular high school track record, secured a full-ride undergraduate scholarship. URSP mentors guided him through high-score SAT preparation and personal statement writing workshops.",
    awardYear: "2025"
  },
  {
    id: "story-5",
    name: "Zenebech Demissie",
    country: "Ethiopia 🇪🇹",
    targetMajor: "Applied Economics & Policy Analysis",
    degree: "PhD",
    university: "Indiana University Bloomington",
    fundingAmount: "Full Tuition Credit + $28,000 Research Fellowship",
    assistantshipType: "Graduate Assistantship / Economic Policy Lab",
    fundingPercent: 100,
    storySummary: "ZENEBECH transitioned from private business analysis to advanced economics. Mentoring modules assisted in organizing her research goals, leading to multiple assistantship offers.",
    awardYear: "2026"
  }
];

export const INITIAL_TRACKER_TASKS: TrackerTask[] = [
  {
    id: "task-1",
    title: "Obtain an International Passport",
    category: "General",
    description: "Ensure you have a passport valid for at least 18-24 months from prospective international travel dates.",
    isCompleted: false,
    recommendedMonth: "July - August"
  },
  {
    id: "task-2",
    title: "Request Official Academic Transcripts & Certificate",
    category: "Academics",
    description: "Request copies of academic records and graduation certificates from previous institutions. Seal them carefully.",
    isCompleted: false,
    recommendedMonth: "August"
  },
  {
    id: "task-3",
    title: "Identify 10-15 Target Programs & Funding Models",
    category: "General",
    description: "Search for universities matching your profile that offer full teaching/research assistantships (GAs / GTAs / GRAs).",
    isCompleted: false,
    recommendedMonth: "August - September"
  },
  {
    id: "task-4",
    title: "Identify & Secure Three (3) Recommenders",
    category: "Academics",
    description: "Reach out to undergraduate lecturers or work supervisors who can articulate your research drive and leadership skills.",
    isCompleted: false,
    recommendedMonth: "September"
  },
  {
    id: "task-5",
    title: "Prepare Academic CV/Resume & Research Pitch",
    category: "Essays",
    description: "Structure your CV highlight-first (leadership, volunteering, academic milestones). Keep format down to maximum 2 pages.",
    isCompleted: false,
    recommendedMonth: "September"
  },
  {
    id: "task-6",
    title: "Draft Core Statement of Purpose (SOP)",
    category: "Essays",
    description: "Create an engaging narrative addressing: Introduction hook, why this specific research, professional foundation, career goals, community return.",
    isCompleted: false,
    recommendedMonth: "September - October"
  },
  {
    id: "task-7",
    title: "Write Cold Outreach Emails to Professors (For Research MSc/PhD)",
    category: "Academics",
    description: "Contact faculty doing relevant work. Keep the emails short, cite their papers, pitch your background, and ask for vacancies.",
    isCompleted: false,
    recommendedMonth: "October - November"
  },
  {
    id: "task-8",
    title: "Take Standardized Tests (If Required/GRE/TOEFL)",
    category: "Tests",
    description: "Register and sit for examinations. (Verify if target schools allow waivers for English medium of instruction).",
    isCompleted: false,
    recommendedMonth: "October"
  },
  {
    id: "task-9",
    title: "Request Application Fee Waivers",
    category: "Financials",
    description: "Check departments for waiver opportunities (e.g. attending graduate webinars or belonging to diversity organizations).",
    isCompleted: false,
    recommendedMonth: "November"
  },
  {
    id: "task-10",
    title: "Submit Complete Applications",
    category: "General",
    description: "Double check all required essays, proof of English proficiency waivers, recommendations, and submit before early funding deadlines.",
    isCompleted: false,
    recommendedMonth: "December"
  },
  {
    id: "task-11",
    title: "Prepare Financial Records & Fund Proof",
    category: "Financials",
    description: "If fully funded through GA, prepare your official Admission Assistantship Offer letter as main proof. Set up co-sponsor documents if necessary.",
    isCompleted: false,
    recommendedMonth: "March - April"
  },
  {
    id: "task-12",
    title: "Receive I-20 Form (USA) or Study Permit Document",
    category: "Visa",
    description: "Upon accepting the admission offer, request the school's international office to release your SEVIS I-20 document.",
    isCompleted: false,
    recommendedMonth: "April - May"
  },
  {
    id: "task-13",
    title: "Pay SEVIS Fee and Complete Form DS-160",
    category: "Visa",
    description: "Submit SEVIS I-901 payment ($350) and DS-160 student non-immigrant form online accurately.",
    isCompleted: false,
    recommendedMonth: "May"
  },
  {
    id: "task-14",
    title: "Schedule & Attend Visa Interview Simulation",
    category: "Visa",
    description: "Schedule your embassy slot. Practice mock interviews inside the URSP simulator or with alumni counselors.",
    isCompleted: false,
    recommendedMonth: "May - June"
  }
];

export const VISA_QUESTIONS: VisaQuestion[] = [
  {
    id: "visa-q1",
    question: "Why do you want to study in the United States / at this specific university?",
    category: "Study Intent",
    focusTip: "Do not give a generic response about the US being 'developed'. Focus on the specific curriculum, research labs, or professor profiles at your university that match your past achievements and goals.",
    exampleStrongText: "I chose the University of Massachusetts Amherst specifically to train under Dr. Festus because of his research on student support structures. My undergraduate thesis in Cape Coast focused on student resilience, and this master's program offers a direct residency component that is non-existent in my home country."
  },
  {
    id: "visa-q2",
    question: "How do you plan to cover your tuition and living costs?",
    category: "Financial Sponsorship",
    focusTip: "Be confident and precise. If you have an assistantship, state it immediately as a work contract with the university. Emphasize that it is fully funded.",
    exampleStrongText: "I have been awarded a Graduate Assistantship that covers 100% of my tuition, and pays a monthly stipend of $2,100 in exchange for working 20 hours a week as a Resident Coordinator. This funding is official and documented clearly on section 7 of my I-20."
  },
  {
    id: "visa-q3",
    question: "What are your career plans after finishing this degree?",
    category: "Intent to Return",
    focusTip: "Avoid stating you want to search for long-term work in the US. The F-1 is a non-immigrant visa. Articulate how your skills fit into key development vacancies back home.",
    exampleStrongText: "Armed with this degree, I will return to Ghana to join the Ministry of Education as a Policy Planner. There is currently a significant push for educational decentralization in Ghana, and this technical expertise in Higher Ed management will allow me to spearhead local district student programs directly."
  },
  {
    id: "visa-q4",
    question: "Why did you choose this field of study instead of continuing your current job here?",
    category: "Academic Progression",
    focusTip: "Connect your history seamlessly. Show that the degree is not a random change of track, but a logical progression to increase your competence.",
    exampleStrongText: "After working as a junior environmental engineer in Lagos for 3 years, I realized that we consistently struggle with local water treatment systems. This Master's in Water Quality Engineering is the key tool I need to lead technical water sanitation projects of larger scale back in Nigeria."
  },
  {
    id: "visa-q5",
    question: "You have a low GPA or a long academic gap. How do you explain this?",
    category: "Academic Integrity",
    focusTip: "Take direct responsibility. Explain any life hardships honestly and briefly, then pivot to what you did to improve, such as related work experience or excellent subject performance later on.",
    exampleStrongText: "In my sophomore year, I was working part-time to co-fund my family's farm during a severe local drought. However, in my senior years, my major-specific average was 3.6/4.0, and since graduating, I have accrued 4 years of hands-on research in this sector, verifying my readiness for this rigorous study."
  }
];

export const PROGRAM_FAQ = [
  {
    question: "What is the Ubuntu Rising Scholars Program (URSP)?",
    answer: "URSP is a global mentorship and prep initiative rooted in the African philosophy 'Ubuntu' ('I am because we are'). It assists students, particularly from Africa, in navigating admissions, getting funding (like Graduate Assistantships), and preparing for visas to study in the U.S. and other destinations."
  },
  {
    question: "Is URSP free? Are there any application costs?",
    answer: "Yes, URSP is 100% free! We never charge participants any mentorship or processing fees. Our mission is pure community empowerment and shared global academic success. Beware of any imposter sites charging money."
  },
  {
    question: "Who is Festus Cobena Ainoo?",
    answer: "He is the founder and director of URSP. Festus is a Ghanaian scholar-practitioner, international education consultant, and assistant residence director. He is currently scaling educational consulting models while at UMass Amherst."
  },
  {
    question: "Is this associated with the Ubuntu program in California?",
    answer: "No. The Ubuntu Rising Scholars Academy in Tarzana, California is an entirely separate institution assisting justice-impacted individuals with re-entry. The URSP founded by Festus Ainoo focuses exclusively on global study-abroad and higher educational mentoring."
  },
  {
    question: "When are applications open for Cohort III (2026)?",
    answer: "Applications for Cohort III (2026) have recently launched as announced on our TikTok channel (@festuscainoo). Keep an eye on our official LinkedIn and Festus Ainoo's professional channels to register or join the interest lists!"
  },
  {
    question: "Do you guarantee visa approval?",
    answer: "While we have a incredibly strong, documented track record of helping students secure F-1 visa approvals, visa decisions are ultimately at the sole discretion of embassy consular officers. Our visa prep room simulates high-intensity interviews from real-world scenarios to help you walk in prepared and authentic."
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-1",
    name: "Festus C. Ainoo, M.Ed., M.A.",
    role: "Founder & Director",
    title: "Founder & Executive Director",
    university: "University of Massachusetts Amherst",
    expertise: ["International Admissions", "F-1 Visa Strategy", "Graduate Assistantships", "Higher Education Administration"],
    bio: "Festus Cobena Ainoo is a Ghanaian scholar-practitioner, founder of URSP, and a second-year master of education candidate in higher education at the University of Massachusetts Amherst. Public university profiles also highlight his work as an assistant residence director and his research on belonging, linguistic bias, and equity in higher education.",
    quote: "I am because we are. True academic excellence is only realized when we open doors for the next generation of scholars.",
    email: "festus@urspglobal.org",
    linkedIn: "https://www.linkedin.com/in/festus-ainoo/"
  },
  {
    id: "member-2",
    name: "Portia Opoku",
    role: "Coordinator",
    title: "Admissions & SOP Lead Coordinator",
    university: "University of Connecticut",
    expertise: ["SOP Review", "Scholarship Hunting", "Humanities & Social Sciences Admissions"],
    bio: "Portia is currently pursuing a master's in Higher Education and Student Affairs at the University of Connecticut and serves as a graduate assistant in Leadership and Organizational Development. She brings experience in teaching, student governance, and youth outreach to URSP's SOP and admissions support work.",
    quote: "Your story is your superpower. We help you write it with clarity, authenticity, and confidence.",
    email: "ntd25001work@uconn.edu",
    linkedIn: "https://www.linkedin.com/in/portia-opoku/"
  },
  {
    id: "member-3",
    name: "Sadat Abdul Karim",
    role: "Coordinator",
    title: "STEM Pathways Coordinator",
    university: "Indiana University Bloomington",
    expertise: ["STEM Graduate Admissions", "Cold Email Strategy", "Graduate Research Assistantships"],
    bio: "Sadat currently studies at Indiana University Bloomington, where his public profile highlights work in center management at Wilkie Center. He pairs that higher education experience with URSP mentorship around admissions strategy, graduate funding pathways, and student preparation.",
    quote: "A strong cold email is the key that unlocks fully funded laboratory research positions.",
    email: "sadat@urspglobal.org",
    linkedIn: "https://www.linkedin.com/in/sadat-abdul-karim-197190278/"
  },
  {
    id: "member-4",
    name: "Jacob Mensah",
    role: "Coordinator",
    title: "Visa Interview Lead Simulator",
    university: "Ball State University",
    expertise: ["Visa Prep Simulation", "Confidence Coaching", "Document Verification"],
    bio: "Jacob is currently pursuing an M.A. in Student Affairs Administration in Higher Education at Ball State University and serves as a graduate assistant for Living-Learning Communities. At URSP, he channels that student-development background into visa readiness coaching and confidence-building support.",
    quote: "The embassy interview is not an interrogation—it is an opportunity to tell your story in two minutes.",
    email: "jacob@urspglobal.org",
    linkedIn: "https://www.linkedin.com/in/jacob-mensah01/"
  },
  {
    id: "member-5",
    name: "Kingsley MacArthur Fletcher",
    role: "Coordinator",
    title: "Academic Document Specialist",
    university: "University at Buffalo",
    expertise: ["Transcript Evaluations", "WES Evaluation Guidance", "Application Fee Waivers"],
    bio: "Kingsley is publicly listed as a Higher Education and Student Affairs Administration student at the University at Buffalo. He supports URSP scholars with application materials, credential presentation, and practical guidance around evaluation and fee-waiver processes.",
    quote: "Academic credentials are the foundation of your profile. Make sure they are presented meticulously.",
    email: "kingsley@urspglobal.org",
    linkedIn: "https://www.linkedin.com/in/kingsleyarthurfletcher/"
  },
  {
    id: "member-6",
    name: "Nathaniel Mensah",
    role: "Coordinator",
    title: "Standardized Test Mentor",
    university: "University of Alberta",
    expertise: ["GRE Prep Strategy", "TOEFL/IELTS Waiver Advocacy", "Quantitative Preparation"],
    bio: "Nathaniel is URSP's test prep resource coordinator. He helps students prepare schedules for GRE, TOEFL, or Duolingo English Tests, and advises on obtaining test and application waivers.",
    quote: "Standardized tests are hurdles, not roadblocks. With strategy and consistency, anyone can clear them.",
    email: "nathaniel@urspglobal.org",
    linkedIn: "https://www.linkedin.com/in/nathaniel-mensah-b700061b7/"
  },
  {
    id: "member-7",
    name: "Joseph Oteng",
    role: "Coordinator",
    title: "Funding & Finance Advisor",
    university: "New York University",
    expertise: ["Assistantship Contracts", "Sponsor Documentation", "Financial Aid Planning"],
    bio: "Joseph's public LinkedIn profile identifies him as a PhD student in Chemical Engineering at the NYU Tandon School of Engineering. He brings analytical strength to URSP's funding guidance, helping applicants interpret assistantship terms and prepare strong financial documentation.",
    quote: "Understanding the details of your funding offer is crucial for a smooth transition abroad.",
    email: "joseph@urspglobal.org",
    linkedIn: "https://www.linkedin.com/in/joseph-oteng-%F0%9F%97%BD-ba5144188/"
  },
  {
    id: "member-8",
    name: "Kelvin Owusu Mensah",
    role: "Coordinator",
    title: "Outreach & Cohort Lead",
    university: "Western Illinois University",
    expertise: ["Community Engagement", "Undergraduate Admissions", "Orientation Services"],
    bio: "Kelvin is currently pursuing an M.S. in College Student Personnel at Western Illinois University, where he serves as a graduate assistant in the CSP program. His background in student support and community engagement strengthens URSP's cohort communication and transition support.",
    quote: "Connecting incoming scholars with mentors on the ground makes foreign transitions feel like coming home.",
    email: "K-OwusuMensah@wiu.edu",
    linkedIn: "https://www.linkedin.com/in/kelvin-owusu-mensah/"
  },
  {
    id: "member-9",
    name: "Emmanuel Kofi Mensah",
    role: "Coordinator",
    title: "Digital Resource & SOP Mentor",
    university: "University of Iowa",
    expertise: ["SOP Review", "Digital Resource Design", "Resume Structuring"],
    bio: "Emmanuel is publicly listed at the University of Iowa as an M.A. student in Sport and Recreation Management and a graduate student representative. He brings digital communication, student engagement, and document-structuring strengths to URSP's resource and SOP support.",
    quote: "Your resume should be a clean, impact-oriented roadmap of your achievements and potential.",
    email: "emmanuel-mensah@uiowa.edu",
    linkedIn: "https://www.linkedin.com/in/emmanuel-kofimensah/"
  },
  {
    id: "member-10",
    name: "Francis Y. Asare Baffour",
    role: "Coordinator",
    title: "Visa Simulation & Logistics Counselor",
    university: "University of Toledo",
    expertise: ["Visa Prep Simulation", "Travel Logistics", "SEVIS Form Management"],
    bio: "Francis is publicly listed as part of the Materials and Design Lab at the University of Toledo and a graduate student in Mechanical, Industrial, and Manufacturing Engineering. He brings detail-oriented planning and preparation to URSP's visa simulation and travel logistics support.",
    quote: "Preparation eliminates fear. We ensure our scholars walk into their embassy appointments fully prepared.",
    email: "francis@urspglobal.org",
    linkedIn: "https://www.linkedin.com/in/asare6/"
  }
];
