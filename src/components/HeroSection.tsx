import React from "react";
import { ArrowUpRight, GraduationCap, Users2, ShieldCheck, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onNavigate: (tabId: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 bg-white border-b border-slate-200" id="hero-polished-section">
      {/* 1. Left Section - Hero Call to Action in White */}
      <div className="col-span-12 md:col-span-7 p-6 sm:p-10 md:p-14 flex flex-col justify-center bg-white">
        {/* Philosophy Badge */}
        <div className="inline-flex items-center gap-2 px-3 heading-wide py-1.5 bg-amber-50 text-amber-800 rounded-full text-xs font-bold mb-6 border border-amber-200 w-fit animate-pulse">
          <span className="flex h-2.5 w-2.5 rounded-full bg-amber-500"></span>
          <span>Rooted in the Philosophy of Ubuntu</span>
        </div>

        {/* Big human title */}
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 leading-[1.15] mb-6 tracking-tight">
          I am study abroad<br />
          because <span className="text-indigo-700 underline decoration-indigo-200 underline-offset-8">we are.</span>
        </h1>

        {/* Detailed objective text */}
        <p className="text-base sm:text-lg text-slate-600 max-w-xl mb-8 leading-relaxed">
          The <strong className="text-indigo-900 font-extrabold">Ubuntu Rising Scholars Program (URSP)</strong> is a premier global mentorship initiative. We empower African scholars to secure admissions and full graduate funding (100% tuition coverage + living stipends) in the United States, Canada, and beyond.
        </p>

        {/* Action button CTA triggers */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={() => onNavigate("tracker")}
            id="hero-cta-tracker"
            className="w-full sm:w-auto px-8 py-4 bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold rounded-xl text-base shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start Admissions Tracker</span>
            <ArrowUpRight className="h-5 w-5" />
          </button>
          
          <button
            onClick={() => onNavigate("sop")}
            id="hero-cta-sop"
            className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-all font-bold text-base rounded-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Draft SOP Outline</span>
            <Sparkles className="h-4.5 w-4.5 text-indigo-600" />
          </button>
        </div>
      </div>

      {/* 2. Right Section - Corporate Impact Panel in Royal Indigo */}
      <div className="col-span-12 md:col-span-5 bg-indigo-750 bg-gradient-to-b from-indigo-700 to-indigo-800 p-6 sm:p-10 md:p-14 text-white flex flex-col justify-between relative overflow-hidden">
        {/* Subtle decorative vector mesh/circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/60 rounded-full -mr-20 -mt-20 opacity-50 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-600/30 rounded-full opacity-30 blur-2xl" />

        <div className="z-10 relative">
          <h3 className="text-sm font-mono tracking-widest uppercase font-bold text-amber-300 mb-8 flex items-center gap-2">
            <span className="w-8 h-px bg-white/40" />
            <span>Our Global Track Record</span>
          </h3>

          <div className="space-y-8" id="hero-stats-panel">
            {/* Stat 1 */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-white/10 rounded-xl text-amber-400 shrink-0 mt-1">
                <Users2 className="h-6 w-6" />
              </div>
              <div>
                <div className="text-3xl font-black text-amber-400 leading-none">1,000+</div>
                <p className="font-bold text-base text-slate-100 mt-1">African Scholars Supported</p>
                <p className="text-indigo-100 text-xs mt-0.5 leading-relaxed">
                  Active advising and peer preparation networks spanning active African student cohorts.
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-white/10 rounded-xl text-amber-400 shrink-0 mt-1">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="text-3xl font-black text-amber-400 leading-none">95%</div>
                <p className="font-bold text-base text-slate-100 mt-1">Fully Funded Placements</p>
                <p className="text-indigo-100 text-xs mt-0.5 leading-relaxed">
                  Securing competitive Graduate Assistantships (GAs, TAs, RAs) and full fellowships.
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex items-start space-x-4">
              <div className="p-2.5 bg-white/10 rounded-xl text-amber-400 shrink-0 mt-1">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <div className="text-3xl font-black text-amber-400 leading-none">15+</div>
                <p className="font-bold text-base text-slate-100 mt-1">Target Destinations</p>
                <p className="text-indigo-100 text-xs mt-0.5 leading-relaxed">
                  Scholars placed across prestigious research institutions in the US, Canada, UK, and Europe.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Festus Ainoo Director Spotlight */}
        <div className="z-10 mt-12 pt-8 border-t border-indigo-600/50 relative">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/10 rounded-full border border-white/20 flex items-center justify-center font-extrabold text-white text-md shrink-0">
              FA
            </div>
            <div>
              <p className="font-bold text-sm leading-none text-white">Festus Cobena Ainoo, M.Ed.</p>
              <p className="text-[10px] text-amber-300 mt-1 uppercase tracking-wider font-semibold font-mono">
                Founder, URSP & UMass Scholar-Practitioner
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
