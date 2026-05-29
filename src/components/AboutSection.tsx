import React from "react";
import { Quote, Compass, BookOpen, Link, AlertTriangle } from "lucide-react";

export default function AboutSection() {
  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200" id="about-section">
      <div className="max-w-5xl mx-auto">
        
        {/* Distinction Alert Badge (URSP vs California Academy) */}
        <div className="mb-12 bg-amber-50 border border-amber-200/85 rounded-xl p-4 sm:p-5 flex gap-4 text-amber-900 shadow-sm">
          <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm leading-relaxed">
            <span className="font-bold">Important Program Distinction:</span> The <strong>Ubuntu Rising Scholars Program (URSP)</strong> led by Festus Ainoo is an international study-abroad mentorship initiative. It is <em>entirely separate</em> from the &quot;Ubuntu Rising Scholars Academy&quot; at the Tarzana Treatment Centers College in California (which supports local justice-impacted individuals with re-entry). This portal is dedicated strictly to the global international admissions initiative.
          </div>
        </div>

        {/* Philosophy Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-20">
          <div>
            <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded mb-4">
              Our Philosophical Foundation
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
              &quot;I am because we are&quot;
            </h2>
            <div className="text-slate-600 space-y-4 leading-relaxed">
              <p>
                The Ubuntu Rising Scholars Program is rooted in the rich Zulu and Xhosa philosophy of <strong>Ubuntu</strong>—which celebrates human interconnectedness and communal advancement. 
              </p>
              <p>
                In academic circles, we hold that individual intellectual progress is only complete when it lifts others. Our mentees don&apos;t just seek degree certificates; they strive to return with research, leadership, and resources that pave roads of progress for their home communities.
              </p>
              <p>
                Since Fall 2023, the program has grown from personal outreach into a global alliance of scholars studying at prestigious universities, offering free, premium guides to help those following in their footsteps.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200/90 shadow-sm relative overflow-hidden">
            <Quote className="absolute right-6 top-6 h-12 w-12 text-slate-100" />
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded mb-6">
              Director&apos;s Profile & Spotlight
            </span>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Festus Cobena Ainoo, M.Ed.</h3>
            <p className="text-xs font-mono text-slate-500 mb-4">Founder, URSP & Scholar-Practitioner</p>
            
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Festus Ainoo is a Ghanaian international education consultant currently completing advanced master&apos;s studies in Higher Education Administration at the <strong>University of Massachusetts Amherst (UMass)</strong>. Having received his bachelor&apos;s education at the University of Cape Coast, Ghana, Festus has walked the identical road as our scholars. 
            </p>
            
            <div className="border-t border-slate-100 pt-5 space-y-3 font-medium text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <Compass className="h-4 w-4 text-indigo-600" />
                <span>Assistant Residence Director at UMass Amherst</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-indigo-700" />
                <span>Mentored thousands of African scholars to F-1 approvals</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Supported Countries section */}
        <div className="border-t border-slate-200 pt-16">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Support Beyond Borders</h3>
            <p className="text-slate-500 text-sm mt-2">
              Though specialized in U.S. fully funded assistantships, URSP scholars study at elite institutions globally, including:
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3 text-center text-sm font-semibold text-slate-700">
            <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">United States 🇺🇸</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">Canada 🇨🇦</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">United Kingdom 🇬🇧</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">Australia 🇦🇺</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">Finland 🇫🇮</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">South Africa 🇿🇦</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">Germany 🇩🇪</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">China 🇨🇳</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">Egypt 🇪🇬</div>
            <div className="bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">Sweden 🇸🇪</div>
          </div>
        </div>

      </div>
    </div>
  );
}
