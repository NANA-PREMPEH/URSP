import React, { useState } from "react";
import { SUCCESS_STORIES } from "../data";
import { Search, GraduationCap, MapPin, Award, ArrowRight } from "lucide-react";

export default function SuccessSpotlight() {
  const [degreeFilter, setDegreeFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredStories = SUCCESS_STORIES.filter(story => {
    const matchesDegree = degreeFilter === "ALL" || story.degree === degreeFilter;
    const matchesSearch = story.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          story.targetMajor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          story.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          story.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDegree && matchesSearch;
  });

  return (
    <div className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200" id="success-spotlight-section">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="inline-block bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded mb-4">
            Alumni Track Record
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Scholar Spotlight & Funding Success
          </h2>
          <p className="text-slate-500 text-sm mt-3 max-w-2xl mx-auto">
            Explore authentic success stories of African students who worked with URSP mentors and successfully transitioned to fully funded international admissions.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, major, country, or university..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm text-slate-905 placeholder-slate-405 bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-600 focus:bg-white transition-colors animate-all"
              id="success-search-input"
            />
          </div>

          {/* Tab Selector */}
          <div className="flex bg-slate-100 p-1.5 rounded-lg w-full md:w-auto border border-slate-200/50" id="success-degree-filter">
            {["ALL", "Bachelors", "Masters", "PhD"].map((degree) => (
              <button
                key={degree}
                onClick={() => setDegreeFilter(degree)}
                className={`flex-1 md:flex-initial px-4 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                  degreeFilter === degree
                    ? "bg-indigo-700 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {degree === "ALL" ? "All Degrees" : degree}
              </button>
            ))}
          </div>
        </div>

        {/* Success Stories Grid */}
        {filteredStories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="success-grid">
            {filteredStories.map((story) => (
              <div 
                key={story.id}
                className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-indigo-500/35 transition-all hover:shadow-lg group"
                id={`story-card-${story.id}`}
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <div>
                      <h3 className="font-extrabold text-lg text-slate-900 tracking-tight group-hover:text-indigo-700 transition-colors">
                        {story.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mt-1">
                        <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{story.country}</span>
                        <span>•</span>
                        <GraduationCap className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        <span>{story.degree}</span>
                      </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-100/80 text-[10px] font-mono font-bold tracking-tight uppercase px-2 py-1 rounded">
                      Funded 100%
                    </span>
                  </div>

                  <div className="mb-4 text-xs font-semibold text-slate-700">
                    <div className="text-amber-700 font-mono text-[10px] uppercase tracking-wider mb-1">Target Major</div>
                    <p className="text-slate-800 leading-snug">{story.targetMajor}</p>
                  </div>

                  <div className="mb-4 text-xs">
                    <div className="text-slate-400 font-mono text-[10px] uppercase tracking-wider mb-1">Destination University</div>
                    <p className="text-slate-700 leading-snug font-medium">{story.university}</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-lg mb-4 text-xs">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-bold mb-1">
                      <Award className="h-4 w-4 shrink-0 text-emerald-600" />
                      <span>Financial Award Package:</span>
                    </div>
                    <p className="text-slate-800 font-semibold">{story.fundingAmount}</p>
                    {story.assistantshipType && (
                      <p className="text-[11px] text-slate-500 italic mt-1 bg-white border border-slate-100 rounded-sm px-1.5 py-0.5 inline-block">
                        Slot: {story.assistantshipType}
                      </p>
                    )}
                  </div>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 italic block border-l-2 border-slate-300 pl-3">
                    &quot;{story.storySummary}&quot;
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Admitted Cohort Year: {story.awardYear}</span>
                  <span className="text-indigo-650 flex items-center gap-1 font-bold group-hover:translate-x-1 transition-transform">
                    Scholar Spotlight <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center" id="no-success-found">
            <GraduationCap className="h-10 w-10 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-800 font-medium text-lg">No scholars found matching your search</p>
            <p className="text-slate-500 text-sm mt-1">Try resetting the filters or tweaking your keywords!</p>
          </div>
        )}

      </div>
    </div>
  );
}
