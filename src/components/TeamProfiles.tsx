import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Building2,
  Crown,
  GraduationCap,
  Linkedin,
  Mail,
  Quote,
  Sparkles,
  Star,
  UserRound,
  Users,
} from "lucide-react";
import { TEAM_MEMBERS } from "../data";

export default function TeamProfiles() {
  const founder = TEAM_MEMBERS.find((member) => member.role === "Founder & Director") ?? TEAM_MEMBERS[0];
  const detailRef = useRef<HTMLDivElement | null>(null);

  const normalizeCopy = (text: string) =>
    text.replace(/Ã¢â‚¬â€/g, " - ").replace(/â€”/g, " - ").replace(/Ã‚/g, "").replace(/Â/g, "");

  const getInitialProfileId = () => {
    if (typeof window === "undefined") {
      return founder.id;
    }

    const profileId = new URLSearchParams(window.location.search).get("profile");
    return TEAM_MEMBERS.some((member) => member.id === profileId) ? profileId! : founder.id;
  };

  const [selectedMemberId, setSelectedMemberId] = useState<string>(getInitialProfileId);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    params.set("tab", "team");
    params.set("profile", selectedMemberId);

    const queryString = params.toString();
    const nextUrl = queryString ? `${window.location.pathname}?${queryString}` : window.location.pathname;
    window.history.replaceState({}, "", nextUrl);
  }, [selectedMemberId]);

  const selectedMember = TEAM_MEMBERS.find((member) => member.id === selectedMemberId) ?? founder;
  const coordinatorCount = TEAM_MEMBERS.filter((member) => member.role === "Coordinator").length;
  const representedUniversities = new Set(TEAM_MEMBERS.map((member) => member.university)).size;
  const isFounderSelected = selectedMember.role === "Founder & Director";
  const selectedMemberMailto = `mailto:${selectedMember.email ?? "info@urspglobal.org"}?subject=${encodeURIComponent(
    `URSP profile inquiry for ${selectedMember.name}`,
  )}&body=${encodeURIComponent(
    `Hello ${selectedMember.name},\n\nI would love to learn more about your work with the Ubuntu Rising Scholars Program.\n\nBest regards,`,
  )}`;

  const scrollToProfileStage = () => {
    if (!detailRef.current || typeof window === "undefined") {
      return;
    }

    const detailTop = detailRef.current.getBoundingClientRect().top;

    if (detailTop < 96 || detailTop > window.innerHeight * 0.6) {
      detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSelectMember = (memberId: string) => {
    setSelectedMemberId(memberId);
    window.setTimeout(scrollToProfileStage, 40);
  };

  return (
    <div className="border-b border-slate-200 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8" id="team-profiles-page">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-8 text-white shadow-xl sm:px-8 sm:py-10">
            <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-amber-500/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />

            <div className="relative space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-amber-300">
                <Sparkles className="h-3.5 w-3.5" />
                Leadership Circle
              </span>

              <div className="max-w-3xl space-y-4">
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Coordinator profiles with a simpler, cleaner layout.
                </h2>
                <p className="max-w-2xl text-sm leading-7 text-slate-200 sm:text-base">
                  Explore the founder and coordinators guiding URSP scholars through admissions, funding, visa
                  preparation, and pre-departure support. The profile page now moves straight into the leadership
                  details without the search and filter panel.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-slate-300">Profiles</p>
                  <p className="mt-2 text-2xl font-black text-white">{TEAM_MEMBERS.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-slate-300">Coordinators</p>
                  <p className="mt-2 text-2xl font-black text-white">{coordinatorCount}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-slate-300">Universities</p>
                  <p className="mt-2 text-2xl font-black text-white">{representedUniversities}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-slate-300">Founder</p>
                  <p className="mt-2 text-2xl font-black text-white">1</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-amber-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-lg shadow-amber-200/80">
                <Crown className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-amber-800">
                Founder Spotlight
              </span>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-sm font-black text-slate-900">{founder.name}</p>
                <p className="mt-1 text-xs font-mono uppercase tracking-[0.24em] text-slate-500">{founder.title}</p>
              </div>

              <p className="text-sm leading-7 text-slate-600">{normalizeCopy(founder.bio)}</p>

              <button
                onClick={() => handleSelectMember(founder.id)}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
              >
                <span>{selectedMemberId === founder.id ? "Founder profile selected" : "View founder profile"}</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        <section
          ref={detailRef}
          className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl"
          id="team-profile-detail"
        >
          <div
            className={`relative px-6 py-8 sm:px-8 sm:py-10 ${
              isFounderSelected
                ? "bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white"
                : "bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white"
            }`}
          >
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />

            <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.24em] ${
                      isFounderSelected
                        ? "border-amber-300/30 bg-amber-400/10 text-amber-300"
                        : "border-indigo-300/25 bg-indigo-400/10 text-indigo-200"
                    }`}
                  >
                    {isFounderSelected ? <Crown className="h-3.5 w-3.5" /> : <Star className="h-3.5 w-3.5" />}
                    {selectedMember.role}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-slate-200">
                    <Building2 className="h-3.5 w-3.5" />
                    {selectedMember.university}
                  </span>
                </div>

                <div className="mt-6 flex items-start gap-4">
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-lg ${
                      isFounderSelected
                        ? "bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950 shadow-amber-900/20"
                        : "bg-white/10 text-white shadow-slate-950/30"
                    }`}
                  >
                    {isFounderSelected ? <GraduationCap className="h-8 w-8" /> : <UserRound className="h-7 w-7" />}
                  </div>

                  <div>
                    <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl">{selectedMember.name}</h3>
                    <p className="mt-2 text-sm font-mono uppercase tracking-[0.24em] text-slate-300">
                      {selectedMember.title}
                    </p>
                  </div>
                </div>

                {selectedMember.quote && (
                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/6 p-5">
                    <Quote className="h-5 w-5 text-amber-300" />
                    <p className="mt-3 text-sm leading-7 text-slate-100">&quot;{normalizeCopy(selectedMember.quote)}&quot;</p>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={selectedMemberMailto}
                    className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-3 text-sm font-bold text-slate-950 transition-colors hover:bg-amber-400"
                  >
                    <Mail className="h-4 w-4" />
                    Email Profile
                  </a>
                  {selectedMember.linkedIn && (
                    <a
                      href={selectedMember.linkedIn}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                    >
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-slate-300">Current Focus</p>
                  <p className="mt-2 text-sm font-semibold text-white">{selectedMember.expertise[0]}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-slate-300">Mentorship Areas</p>
                  <p className="mt-2 text-sm font-semibold text-white">{selectedMember.expertise.length} specialties</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/6 p-4">
                  <p className="text-[11px] font-mono uppercase tracking-[0.24em] text-slate-300">Directory Slot</p>
                  <p className="mt-2 text-sm font-semibold text-white">
                    {TEAM_MEMBERS.findIndex((member) => member.id === selectedMember.id) + 1} of {TEAM_MEMBERS.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-slate-500">Biography</p>
              <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-[15px]">{normalizeCopy(selectedMember.bio)}</p>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-slate-500">
                  Best Known For
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">
                  {selectedMember.name.split(",")[0]} supports URSP scholars through{" "}
                  <strong className="text-slate-950">{selectedMember.expertise.slice(0, 2).join(" and ")}</strong>,
                  combining program insight with the lived experience of navigating competitive global admissions.
                </p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-slate-500">
                Areas of Mentorship
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedMember.expertise.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                <p className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-slate-500">
                  Quick Contact
                </p>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                    <Mail className="h-4.5 w-4.5 text-amber-600" />
                    <span>{selectedMember.email ?? "info@urspglobal.org"}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                    <Users className="h-4.5 w-4.5 text-indigo-600" />
                    <span>{selectedMember.role === "Founder & Director" ? "Program leadership" : "Coordinator support"}</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-4 py-3">
                    <Building2 className="h-4.5 w-4.5 text-slate-700" />
                    <span>{selectedMember.university}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-slate-500">
                Profile Directory
              </p>
              <h3 className="mt-1 text-2xl font-black tracking-tight text-slate-900">
                Browse all coordinators and leadership profiles
              </h3>
            </div>
            <p className="text-sm text-slate-500">Select any card to load that person into the profile stage above.</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member) => {
              const isSelected = member.id === selectedMember.id;
              const isFounder = member.role === "Founder & Director";

              return (
                <button
                  key={member.id}
                  onClick={() => handleSelectMember(member.id)}
                  className={`group rounded-[1.6rem] border p-6 text-left transition-all ${
                    isSelected
                      ? "border-amber-400 bg-amber-50/70 shadow-lg shadow-amber-100"
                      : "border-slate-200 bg-white shadow-sm hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                        isFounder
                          ? "bg-gradient-to-br from-amber-400 to-orange-500 text-slate-950"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {isFounder ? <GraduationCap className="h-6 w-6" /> : <UserRound className="h-5 w-5" />}
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.24em] ${
                        isFounder ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {member.role}
                    </span>
                  </div>

                  <div className="mt-5">
                    <h4 className="text-lg font-black text-slate-950 transition-colors group-hover:text-amber-700">
                      {member.name}
                    </h4>
                    <p className="mt-1 text-xs font-mono uppercase tracking-[0.22em] text-slate-500">{member.title}</p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-xs font-medium text-slate-600">
                    <Building2 className="h-3.5 w-3.5 text-indigo-600" />
                    <span className="truncate">{member.university}</span>
                  </div>

                  <p className="mt-4 line-clamp-3 text-sm leading-6 text-slate-600">{normalizeCopy(member.bio)}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.expertise.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-sm font-bold text-slate-600">
                    <span>{isSelected ? "Selected profile" : "Open full profile"}</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 px-6 py-8 text-white shadow-xl sm:px-8 sm:py-10">
          <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-amber-500/10 to-transparent" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-[11px] font-mono font-bold uppercase tracking-[0.24em] text-amber-300">
                Community Invitation
              </p>
              <h3 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                Interested in partnering with URSP or joining the next coordinator cohort?
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                URSP thrives because scholars keep returning to support the next generation. If you want to collaborate,
                mentor, or help build resources, connect with the program directly.
              </p>
            </div>

            <a
              href="https://www.linkedin.com/company/ursp"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-5 py-3 text-sm font-black text-slate-950 transition-colors hover:bg-amber-400"
            >
              <Linkedin className="h-4.5 w-4.5" />
              Connect with URSP
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
