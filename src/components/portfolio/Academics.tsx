import { GraduationCap } from "lucide-react";
import type { AcademicProfile, AcademicRecord, Education } from "@/lib/site-types";
import { Section, Reveal } from "./Section";

export function Academics({
  academicProfile,
  records,
  education,
}: {
  academicProfile: AcademicProfile | null;
  records: AcademicRecord[];
  education: Education[];
}) {
  if (!academicProfile && records.length === 0 && education.length === 0) return null;

  // Current CGPA up to Semester 5
  const cgpa = 8.35;
  const scale = 10;
  const pct = (cgpa / scale) * 100;

  // Semester-wise SGPA
  const semesterResults = [
    { semester: "Semester 1", sgpa: "7.68", status: "Completed" },
    { semester: "Semester 2", sgpa: "7.68", status: "Completed" },
    { semester: "Semester 3", sgpa: "8.36", status: "Completed" },
    { semester: "Semester 4", sgpa: "9.25", status: "Completed" },
    { semester: "Semester 5", sgpa: "8.67", status: "Completed" },
    { semester: "Semester 6", sgpa: null, status: "Result Awaited" },
    { semester: "Semester 7", sgpa: null, status: "Currently Pursuing" },
  ];

  return (
    <Section
      id="academics"
      eyebrow="Academics"
      title="Academic Performance"
      intro="A transparent view of my academic journey and semester-wise performance."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        {/* =========================================================
            LEFT COLUMN
        ========================================================= */}
        <div className="space-y-5">
          {/* ================= CURRENT CGPA ================= */}
          {academicProfile && (
            <Reveal>
              <div className="glass card-hover rounded-2xl p-6">
                {/* Icon */}
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <GraduationCap className="h-5 w-5" />
                </span>

                {/* CGPA */}
                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                  Current CGPA
                </p>

                <p className="mt-2 font-display text-5xl font-semibold text-foreground">
                  {cgpa.toFixed(2)}
                  <span className="ml-1 text-lg text-muted-foreground">/ {scale}</span>
                </p>

                {/* CGPA Progress */}
                <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-[width] duration-1000"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                {/* Academic Information */}
                <dl className="mt-6 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      Degree
                    </dt>

                    <dd className="mt-1 text-foreground">{academicProfile.degree}</dd>
                  </div>

                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      Institution
                    </dt>

                    <dd className="mt-1 text-foreground">{academicProfile.institution}</dd>

                    <dd className="text-muted-foreground">{academicProfile.university}</dd>
                  </div>
                </dl>

                {/* CGPA note */}
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  CGPA calculated up to the 5th semester. 6th semester result is currently awaited.
                </p>
              </div>
            </Reveal>
          )}

          {/* =======================================================
              EDUCATION CARD
          ======================================================= */}
          {education.length > 0 && (
            <>
              {education.map((e, i) => (
                <Reveal key={e.id} delay={i * 80}>
                  <article className="glass card-hover rounded-2xl p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {e.degree}
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {e.institution}
                      {e.university ? ` · ${e.university}` : ""}
                    </p>

                    <p className="mt-2 font-mono text-[11px] uppercase tracking-widest text-primary">
                      {e.start_date} — {e.is_current ? "Present" : (e.end_date ?? "")}
                    </p>

                    {e.description && (
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {e.description}
                      </p>
                    )}

                    {e.coursework.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {e.coursework.map((c) => (
                          <li
                            key={c}
                            className="rounded-md border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </article>
                </Reveal>
              ))}
            </>
          )}
        </div>

        {/* =========================================================
            RIGHT COLUMN — SEMESTER RECORDS
        ========================================================= */}
        <Reveal delay={100}>
          <div className="glass rounded-2xl p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                Semester Records
              </p>

              <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-primary">
                1 — 7
              </span>
            </div>

            {/* Semester List */}
            <div className="mt-5 space-y-2">
              {semesterResults.map((item, index) => {
                const completed = item.sgpa !== null;

                return (
                  <div
                    key={item.semester}
                    className="group flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 transition-all hover:border-primary/30 hover:bg-surface-strong"
                  >
                    {/* Left */}
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-background font-mono text-[10px] text-muted-foreground">
                        {index + 1}
                      </span>

                      <div>
                        <p className="text-sm font-medium text-foreground">{item.semester}</p>

                        <p className="mt-0.5 text-[10px] text-muted-foreground">{item.status}</p>
                      </div>
                    </div>

                    {/* Right */}
                    {completed ? (
                      <div className="text-right">
                        <p className="font-display text-lg font-semibold text-primary">
                          {item.sgpa}
                        </p>

                        <p className="text-[9px] uppercase tracking-wider text-muted-foreground">
                          SGPA
                        </p>
                      </div>
                    ) : (
                      <span
                        className={
                          item.status === "Result Awaited"
                            ? "rounded-full border border-yellow-400/20 bg-yellow-400/5 px-3 py-1.5 text-[10px] font-medium text-yellow-300"
                            : "rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-[10px] font-medium text-primary"
                        }
                      >
                        {item.status}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Note */}
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-xs leading-relaxed text-muted-foreground">
                <span className="text-primary">Note:</span> Semester 6 result is awaited. Currently
                pursuing Semester 7.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
