import React, { useState, useEffect } from "react";
import { INITIAL_TRACKER_TASKS } from "../data";
import { TrackerTask } from "../types";
import { Check, ClipboardList, Plus, Trash2, Edit3, HelpCircle, Save, Award, ExternalLink } from "lucide-react";

export default function AdmissionsTracker() {
  const [degree, setDegree] = useState<"Bachelors" | "Masters" | "PhD">("Masters");
  const [destination, setDestination] = useState<"USA" | "Canada" | "UK">("USA");
  const [tasks, setTasks] = useState<TrackerTask[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesInput, setNotesInput] = useState<string>("");

  // Load state from localStorage on mount or when degree/destination variations occur
  useEffect(() => {
    const storageKey = `ursp-tracker-${degree}-${destination}`;
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      try {
        setTasks(JSON.parse(savedData));
      } catch (err) {
        initializeDefaultTasks();
      }
    } else {
      initializeDefaultTasks();
    }
  }, [degree, destination]);

  const initializeDefaultTasks = () => {
    // Clone initial tasks and customize based on selections
    let adjustedTasks = INITIAL_TRACKER_TASKS.map(t => ({ ...t }));

    // Filter or adjust based on Bachelor degree
    if (degree === "Bachelors") {
      adjustedTasks = adjustedTasks.map(t => {
        if (t.id === "task-2") {
          return {
            ...t,
            title: "Request Official High School Transcripts",
            description: "Request official secondary school transcripts and academic certificate. Translate if not in English."
          };
        }
        if (t.id === "task-4") {
          return {
            ...t,
            title: "Request High School Teacher Recommendation Letters",
            description: "Coordinate with 2-3 teachers or counselors who can speak confidently to your academic growth and morals."
          };
        }
        if (t.id === "task-7") {
          return {
            ...t,
            title: "Research Direct Baccalaureate Merit Scholarships",
            description: "Instead of emailing faculty, focus on undergraduate international tuition waivers and regional scholarships."
          };
        }
        if (t.id === "task-11") {
          return {
            ...t,
            title: "Request School Financial Certifications",
            description: "Prepare financial declarations, parent co-sponsor assets, or bank notes to satisfy school admission proof."
          };
        }
        return t;
      });
    }

    // Filter or adjust based on PhD
    if (degree === "PhD") {
      adjustedTasks = adjustedTasks.map(t => {
        if (t.id === "task-7") {
          return {
            ...t,
            title: "Surgical Cold Email Outreach to PhD Advisors",
            description: "CRITICAL: Reach out to professors whose labs have active grants. Send custom 3-paragraph emails detailing research alignment."
          };
        }
        return t;
      });
    }

    // Filter or adjust based on Target Destination
    if (destination === "Canada") {
      adjustedTasks = adjustedTasks.map(t => {
        if (t.id === "task-12") {
          return {
            ...t,
            title: "Receive Canadian Letter of Acceptance (LOA)",
            description: "Accept your graduate offer and ensure the university sends you a formal Designated Learning Institution (DLI) acceptance pack."
          };
        }
        if (t.id === "task-13") {
          return {
            ...t,
            title: "Submit Canadian Study Permit Application (IRCC)",
            description: "Apply for study permit online. Prepare biometric scheduling, medical exam clearance, and GIC (Guaranteed Investment Certificate) if applying via SDS."
          };
        }
        return t;
      });
    } else if (destination === "UK") {
      adjustedTasks = adjustedTasks.map(t => {
        if (t.id === "task-12") {
          return {
            ...t,
            title: "Secure Confirmation of Acceptance for Studies (CAS)",
            description: "Accept the unconditional offer to trigger the university's release of your official CAS reference number."
          };
        }
        if (t.id === "task-13") {
          return {
            ...t,
            title: "Pay NHS Immigration Health Surcharge (IHS) & Apply for UK Student Visa",
            description: "Use your CAS key to launch the visa application. Complete bioscheduling and prep mandatory IHS health payments."
          };
        }
        return t;
      });
    }

    setTasks(adjustedTasks);
    saveTasks(adjustedTasks);
  };

  const saveTasks = (updatedTasks: TrackerTask[]) => {
    const storageKey = `ursp-tracker-${degree}-${destination}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedTasks));
  };

  const handleToggleTask = (taskId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, isCompleted: !t.isCompleted };
      }
      return t;
    });
    setTasks(updated);
    saveTasks(updated);
  };

  const handleStartEditingNotes = (taskId: string, currentNotes: string) => {
    setEditingNotesId(taskId);
    setNotesInput(currentNotes || "");
  };

  const handleSaveNotes = (taskId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, notes: notesInput };
      }
      return t;
    });
    setTasks(updated);
    saveTasks(updated);
    setEditingNotesId(null);
  };

  const handleResetTracker = () => {
    if (window.confirm("Are you sure you want to reset your admissions timeline to default settings?")) {
      initializeDefaultTasks();
    }
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const totalCount = tasks.length;
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Group task categories
  const categories = ["ALL", ...Array.from(new Set(tasks.map(t => t.category)))];

  const filteredTasks = tasks.filter(t => {
    return activeCategory === "ALL" || t.category === activeCategory;
  });

  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200" id="tracker-workspace">
      <div className="max-w-5xl mx-auto">
        
        {/* Workspace Intro Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between border-b border-slate-100 pb-8 mb-10">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 border border-indigo-100 text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-1 rounded mb-4">
              <ClipboardList className="h-3.5 w-3.5 text-indigo-600" />
              <span>Interactive Timeline Workspace</span>
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              African Scholar Admissions Timeline
            </h2>
            <p className="text-slate-500 text-sm mt-2 max-w-xl">
              Customize your degree targets and country destinations. Track your preparations step by step and record your notes locally.
            </p>
          </div>

          <button
            onClick={handleResetTracker}
            id="tracker-reset-btn"
            className="mt-4 md:mt-0 text-xs font-mono text-slate-500 hover:text-red-650 transition-colors border border-slate-200 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-red-50"
          >
            Reset Timeline
          </button>
        </div>

        {/* Configuration Panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-10" id="tracker-config-panel">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold mb-3">
              1. Your Desired Degree track
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["Bachelors", "Masters", "PhD"] as const).map((dOption) => (
                <button
                  key={dOption}
                  onClick={() => setDegree(dOption)}
                  className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg border transition-all cursor-pointer ${
                    degree === dOption
                      ? "bg-indigo-700 border-indigo-700 text-white font-bold shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  {dOption === "Bachelors" ? "Undergrad" : dOption}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 font-mono font-semibold mb-3">
              2. Your Target Destination
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["USA", "Canada", "UK"] as const).map((destOption) => (
                <button
                  key={destOption}
                  onClick={() => setDestination(destOption)}
                  className={`py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-lg border transition-all cursor-pointer ${
                    destination === destOption
                      ? "bg-indigo-700 border-indigo-700 text-white font-bold shadow-xs"
                      : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  {destOption === "USA" ? "United States 🇺🇸" : destOption === "Canada" ? "Canada 🇨🇦" : "United Kingdom 🇬🇧"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Progress Card dashboard */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-10 text-white relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6" id="tracker-progress-dashboard">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />
          
          <div className="relative shrink-0 text-center sm:text-left">
            <h3 className="text-sm font-mono text-indigo-400 font-medium">Timeline Milestones Completed</h3>
            <div className="flex items-baseline justify-center sm:justify-start gap-2 mt-1">
              <span className="text-4xl font-extrabold">{completedCount}</span>
              <span className="text-slate-500 text-xl">/ {totalCount} Steps</span>
            </div>
          </div>

          <div className="w-full sm:max-w-md">
            <div className="flex justify-between items-baseline text-xs mb-2">
              <span className="text-slate-400 font-mono font-medium">Aspiration to Funded Student Visa Progress</span>
              <span className="text-indigo-400 font-bold">{percentComplete}% Done</span>
            </div>
            <div className="w-full bg-slate-800 h-3.5 rounded-full overflow-hidden border border-slate-705">
              <div 
                className="bg-gradient-to-r from-indigo-505 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            {percentComplete === 100 && (
              <p className="text-[11px] font-mono text-emerald-400 mt-2 text-center animate-bounce">
                🎉 Congratulations! Your admissions workspace file is complete. Get ready!
              </p>
            )}
          </div>
        </div>

        {/* Categories Toolbar Filter */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-slate-100 pb-5" id="tracker-category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-slate-950 text-white shadow-xs"
                  : "bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200"
              }`}
            >
              {cat === "ALL" ? "All Milestones" : cat}
            </button>
          ))}
        </div>

        {/* Checklist Container */}
        <div className="space-y-4" id="tracker-tasks-list">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <div
                key={task.id}
                className={`border rounded-xl p-5 hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-start gap-4 ${
                  task.isCompleted 
                    ? "bg-indigo-50/15 border-indigo-200" 
                    : "bg-white border-slate-200/95 shadow-xs"
                }`}
                id={`task-item-${task.id}`}
              >
                {/* 1. Completed Checkbox Toggle */}
                <button
                  onClick={() => handleToggleTask(task.id)}
                  id={`toggle-chk-${task.id}`}
                  className={`w-6 h-6 shrink-0 mt-0.5 rounded-md border flex items-center justify-center transition-all cursor-pointer ${
                    task.isCompleted
                      ? "bg-indigo-700 border-indigo-700 text-white scale-105"
                      : "bg-slate-50 border-slate-300 hover:border-slate-400"
                  }`}
                >
                  {task.isCompleted && <Check className="h-4.5 w-4.5 stroke-[3px]" />}
                </button>

                {/* 2. Content Zone */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold uppercase tracking-wider font-mono px-2 py-0.5 rounded border border-slate-200/40">
                      {task.category}
                    </span>
                    {task.recommendedMonth && (
                      <span className="bg-amber-50 text-amber-800 text-[10px] font-bold font-mono px-2 py-0.5 rounded border border-amber-200">
                        Target Time: {task.recommendedMonth}
                      </span>
                    )}
                  </div>
                  
                  <h4 className={`text-sm sm:text-base font-bold text-slate-900 tracking-tight ${
                    task.isCompleted ? "line-through text-slate-500" : ""
                  }`}>
                    {task.title}
                  </h4>
                  <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    {task.description}
                  </p>

                  {/* Editable notes area */}
                  <div className="mt-4 border-t border-slate-100/80 pt-4">
                    {editingNotesId === task.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={notesInput}
                          onChange={(e) => setNotesInput(e.target.value)}
                          placeholder="Add status details e.g. Emailed lecturer, waiting on visa confirmation..."
                          className="flex-1 text-xs text-slate-800 border border-indigo-300 bg-indigo-50/5 p-2 rounded-lg focus:outline-hidden focus:border-indigo-600 focus:bg-white"
                          id={`input-notes-${task.id}`}
                        />
                        <button
                          onClick={() => handleSaveNotes(task.id)}
                          className="p-2 bg-indigo-700 hover:bg-indigo-850 text-white rounded-lg shrink-0 transition-colors flex items-center gap-1 text-xs font-bold cursor-pointer"
                          id={`save-notes-${task.id}`}
                        >
                          <Save className="h-4 w-4" />
                          <span>Save</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        {task.notes ? (
                          <p className="text-slate-700 italic flex items-center gap-1.5 bg-slate-50 border border-slate-100/60 p-2 rounded-lg w-full mr-4 leading-normal">
                            <span className="font-bold text-[10px] uppercase font-mono text-slate-400 shrink-0">Your Notes:</span>
                            <span>&quot;{task.notes}&quot;</span>
                          </p>
                        ) : (
                          <span className="text-slate-400 italic">No notes created yet. Click edit to record your log.</span>
                        )}
                        <button
                          onClick={() => handleStartEditingNotes(task.id, task.notes || "")}
                          className="text-xs font-bold text-indigo-700 hover:text-indigo-800 shrink-0 transition-colors flex items-center gap-1 self-start ml-auto cursor-pointer"
                          id={`edit-notes-${task.id}`}
                        >
                          <Edit3 className="h-3 w-3" />
                          <span>{task.notes ? "Edit" : "Add Log"}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-8 border border-dashed border-slate-200 rounded-xl bg-slate-50">
              <HelpCircle className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-800 text-sm font-semibold">No tasks found for category: {activeCategory}</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
