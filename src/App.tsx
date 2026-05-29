/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from "react";
import { GraduationCap, BookOpen, Compass, Award, ExternalLink, Calendar, HelpCircle, CheckCircle, ChevronDown, ChevronUp, Clock, Linkedin } from "lucide-react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProgramServices from "./components/ProgramServices";
import SuccessSpotlight from "./components/SuccessSpotlight";
import AdmissionsTracker from "./components/AdmissionsTracker";
import SOPBuilder from "./components/SOPBuilder";
import VisaPrepSim from "./components/VisaPrepSim";
import URSPChatbot from "./components/URSPChatbot";
import TeamProfiles from "./components/TeamProfiles";
import { PROGRAM_FAQ } from "./data";

const NAV_ITEMS = [
  { id: "home", desktopLabel: "Home & Philosophy", mobileLabel: "Home" },
  { id: "team", desktopLabel: "Leadership Profiles", mobileLabel: "Profiles" },
  { id: "tracker", desktopLabel: "Admissions Tracker", mobileLabel: "Tracker" },
  { id: "sop", desktopLabel: "SOP Architect", mobileLabel: "SOP" },
  { id: "visa", desktopLabel: "Embassy Visa Sim", mobileLabel: "Visa" },
] as const;

const getInitialTab = () => {
  if (typeof window === "undefined") {
    return "home";
  }

  const requestedTab = new URLSearchParams(window.location.search).get("tab");
  return NAV_ITEMS.some((tab) => tab.id === requestedTab) ? requestedTab! : "home";
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>(getInitialTab);
  const [expandedFaqIdx, setExpandedFaqIdx] = useState<number | null>(null);

  const handleToggleFaq = (idx: number) => {
    setExpandedFaqIdx(expandedFaqIdx === idx ? null : idx);
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getInitialTab());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const syncTabToUrl = (tabId: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("tab", tabId);

    if (tabId !== "team") {
      params.delete("profile");
    }

    const queryString = params.toString();
    const nextUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    window.history.replaceState({}, "", nextUrl);
  };

  const handleDirectNavigation = (tabId: string) => {
    setActiveTab(tabId);
    syncTabToUrl(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none antialiased" id="ursp-main-dashboard">
      
      {/* Dynamic Cohort Ribbon Notification banner */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 py-2.5 px-4 text-center text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-sm relative z-50">
        <Clock className="h-4.5 w-4.5 shrink-0 animate-spin [animation-duration:15s]" />
          <span>Cohort III (2026) admissions decisions are completed. Now accepting general inquiries and interest list sign-ups!</span>
        <a 
          href="https://www.linkedin.com/company/ursp" 
          target="_blank" 
          rel="noreferrer"
          className="underline hover:text-slate-900 transition-colors flex items-center gap-1 font-mono tracking-tight shrink-0 text-[10px] sm:text-xs ml-2 bg-slate-950 text-white rounded px-2 py-0.5 border border-slate-850"
        >
          <span>Apply/Contact On LinkedIn</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Global Main Navigation header */}
      <header className="sticky top-0 z-40 bg-slate-950 text-white border-b border-slate-900 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & acronym */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleDirectNavigation("home")}>
            <div className="p-2.5 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-xl text-slate-950 font-black shadow-[0_0_15px_rgba(245,158,11,0.15)] flex items-center justify-center shrink-0">
              <GraduationCap className="h-6 w-6 stroke-[2px]" />
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="font-sans font-extrabold text-lg sm:text-xl tracking-tight">URSP</span>
                <span className="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">GLOBAL</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-widest hidden sm:block uppercase">
                Ubuntu Rising Scholars Program
              </p>
            </div>
          </div>

          {/* Nav Tabs Selector */}
          <nav className="hidden md:flex items-center gap-1.5" id="desktop-navbar-nav">
            {NAV_ITEMS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleDirectNavigation(tab.id)}
                className={`px-4.5 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-amber-500 text-slate-950 font-black"
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                {tab.desktopLabel}
              </button>
            ))}
          </nav>

          {/* Social connection actions header */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/company/ursp"
              target="_blank"
              rel="noreferrer"
              title="Official Link LinkedIn Profile"
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-all text-xs flex items-center gap-1 cursor-pointer font-bold shrink-0"
              id="header-linkedin-btn"
            >
              <Linkedin className="h-4.5 w-4.5 text-amber-500" />
              <span className="hidden lg:inline">LinkedIn Page</span>
            </a>
          </div>

        </div>

        {/* Mobile Nav Tabs Grid */}
        <div className="md:hidden border-t border-slate-900 bg-slate-950 grid grid-cols-5 text-center px-1 py-1" id="mobile-navbar-nav">
          {NAV_ITEMS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleDirectNavigation(tab.id)}
              className={`py-2 px-1 text-xs font-bold rounded-md transition-colors ${
                activeTab === tab.id
                  ? "bg-amber-500 text-slate-950 font-extrabold"
                  : "text-slate-400 hover:text-white hover:bg-slate-900"
              }`}
            >
              {tab.mobileLabel}
            </button>
          ))}
        </div>
      </header>

      {/* Main content display zone based on nested Tab State */}
      <main className="flex-1" id="tab-dynamic-viewport">
        {activeTab === "home" && (
          <div className="animate-in fade-in duration-300">
            <HeroSection onNavigate={handleDirectNavigation} />
            <AboutSection />
            <ProgramServices />
            <SuccessSpotlight />

            {/* General program Accordion FAQs at bottom of landing Home */}
            <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200" id="landing-faq-accordion">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <span className="inline-block bg-slate-100 text-slate-800 text-xs font-mono font-semibold tracking-wider uppercase px-2.5 py-1 rounded mb-4">
                    Support Desk
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Frequently Answered Inquiries
                  </h3>
                  <p className="text-slate-500 text-sm mt-2">
                    Have lingering questions regarding Cohort III timelines or admissions procedures? Consult our general log below.
                  </p>
                </div>

                <div className="space-y-4" id="faq-accordions-container">
                  {PROGRAM_FAQ.map((faq, fIdx) => (
                    <div 
                      key={fIdx}
                      className="border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors"
                      id={`faq-item-${fIdx}`}
                    >
                      <button
                        onClick={() => handleToggleFaq(fIdx)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-xs sm:text-sm bg-slate-50/60 hover:bg-slate-50 transition-colors cursor-pointer"
                        id={`faq-toggle-btn-${fIdx}`}
                      >
                        <div className="flex items-center gap-3">
                          <HelpCircle className="h-4.5 w-4.5 text-amber-600 shrink-0" />
                          <span>{faq.question}</span>
                        </div>
                        {expandedFaqIdx === fIdx ? (
                          <ChevronUp className="h-4.5 w-4.5 text-slate-500" />
                        ) : (
                          <ChevronDown className="h-4.5 w-4.5 text-slate-500" />
                        )}
                      </button>

                      {expandedFaqIdx === fIdx && (
                        <div className="p-5 border-t border-slate-200 bg-white text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="animate-in fade-in duration-300">
            <TeamProfiles />
          </div>
        )}

        {activeTab === "tracker" && (
          <div className="animate-in fade-in duration-300">
            <AdmissionsTracker />
          </div>
        )}

        {activeTab === "sop" && (
          <div className="animate-in fade-in duration-300">
            <SOPBuilder />
          </div>
        )}

        {activeTab === "visa" && (
          <div className="animate-in fade-in duration-300">
            <VisaPrepSim />
          </div>
        )}
      </main>

      {/* Global persistent floating virtual mentoring agent chatbot */}
      <URSPChatbot />

      {/* Elegant footer block */}
      <footer className="bg-slate-950 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-900 text-xs sm:text-sm">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 border-b border-slate-900 pb-12 mb-10">
          
          {/* Logo & motto */}
          <div>
            <div className="flex items-center gap-2 text-white font-extrabold text-base mb-4">
              <GraduationCap className="h-5 w-5 text-amber-500 shrink-0 animate-pulse" />
              <span>Ubuntu Rising Scholars Program</span>
            </div>
            <p className="text-slate-400 leading-relaxed pr-4 text-xs">
              A free, global educational mentorship network providing peer guidance, testing templates, and admissions strategy for African scholars. Rooted in the spirit of shared global academic excellence.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase font-mono tracking-wider mb-4">
              Scholar Capabilities Workspace
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleDirectNavigation("home")} className="hover:text-amber-400 transition-colors cursor-pointer font-semibold">Home Landing & Philosophy</button>
              </li>
              <li>
                <button onClick={() => handleDirectNavigation("team")} className="hover:text-amber-400 transition-colors cursor-pointer font-semibold">Leadership Profiles</button>
              </li>
              <li>
                <button onClick={() => handleDirectNavigation("tracker")} className="hover:text-amber-400 transition-colors cursor-pointer font-semibold">Interactive Study-Abroad Milestones</button>
              </li>
              <li>
                <button onClick={() => handleDirectNavigation("sop")} className="hover:text-amber-400 transition-colors cursor-pointer font-semibold">AI Statement of Purpose Outline Builder</button>
              </li>
              <li>
                <button onClick={() => handleDirectNavigation("visa")} className="hover:text-amber-400 transition-colors cursor-pointer font-semibold">F-1 Visa Embassy Interview Prep</button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase font-mono tracking-wider mb-4">
              Foundership Spotlight
            </h4>
            <p className="text-slate-400 leading-relaxed mb-3 text-xs">
              Directed by <strong>Festus Cobena Ainoo, M.Ed.</strong>, Ghanaian scholar-practitioner, graduate administrator and consultancy practitioner currently based at UMass Amherst.
            </p>
            <p className="text-slate-400 font-mono text-[10px] leading-relaxed">
              Find announcements and application updates via TikTok channel <strong>@festuscainoo</strong> or LinkedIn.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-slate-500 gap-4 text-center">
          <p>(C) 2026 Ubuntu Rising Scholars Program (URSP). Built with pride. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/company/ursp" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <span>Official LinkedIn Page</span>
              <ExternalLink className="h-3 w-3" />
            </a>
            <span>|</span>
            <span className="text-slate-600">Free, Community Mentorship Initiative</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
