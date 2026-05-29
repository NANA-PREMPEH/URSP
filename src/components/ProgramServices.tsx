import React from "react";
import { Search, PenTool, CheckCircle, FileText, Award, Calendar } from "lucide-react";

export default function ProgramServices() {
  const services = [
    {
      title: "Graduate Assistantships (GA, RAs, TAs)",
      icon: <Award className="h-6 w-6 text-indigo-600" />,
      description: "Our primary mission. We teach scholars how to secure teaching, research, or residence assistantships that pay 100% of university tuition and offer a bi-weekly stipend, making higher education completely debt-free."
    },
    {
      title: "Strategic University Mapping",
      icon: <Search className="h-6 w-6 text-indigo-600" />,
      description: "Mentors analyze your academic transcripts, research interests, and background to create an optimized list of 10-15 universities that offer a strong history of funding to international scholars."
    },
    {
      title: "SOP & Essay Coaching Workshops",
      icon: <PenTool className="h-6 w-6 text-indigo-600" />,
      description: "We lead highly specialized cohort workshops focused on Statement of Purpose structures. We help you write a powerful narrative emphasizing community upliftment, past challenges, and career vision."
    },
    {
      title: "Academic Resume Branding",
      icon: <FileText className="h-6 w-6 text-indigo-600" />,
      description: "Standard job resumes fail to impress faculty selection boards. We redesign your CV to emphasize lab techniques, teaching assistanceships, leadership, research publications, and scholarship."
    },
    {
      title: "Embassy Visa Simulations",
      icon: <CheckCircle className="h-6 w-6 text-indigo-600" />,
      description: "Our legendary, high-potency mock visa prep reviews. Guided by experienced counselors, scholars practice articulating study intent, ties to home country, and explaining GA scholarship documents with total confidence."
    },
    {
      title: "English Waiver Navigation",
      icon: <Calendar className="h-6 w-6 text-indigo-600" />,
      description: "Applying to study shouldn't require prohibitive test costs. We help scholars evaluate their previous institutions to request TOEFL/IELTS English proficiency waivers from international admissions departments."
    }
  ];

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200" id="services-section">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="inline-block bg-slate-100 text-slate-800 text-xs font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded mb-4">
            Mentorship Offerings
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            How We Empower Scholars
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-2xl mx-auto">
            URSP offers comprehensive, fully guided curricula structured across cohorts to turn student aspirations into funded global admissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="bg-slate-50 border border-slate-200/80 rounded-xl p-6 hover:border-indigo-500/35 hover:shadow-md transition-all group flex flex-col justify-between"
              id={`service-card-${idx}`}
            >
              <div>
                <div className="p-3 bg-white border border-slate-100 rounded-lg inline-block shadow-xs mb-5 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-900 transition-colors mb-2">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
