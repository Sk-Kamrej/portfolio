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

  const cgpa = academicProfile?.cgpa ? Number(academicProfile.cgpa) : null;
  const scale = academicProfile?.cgpa_scale ? Number(academicProfile.cgpa_scale) : 10;
  const pct = cgpa ? Math.min(100, (cgpa / scale) * 100) : 0;

  return (
    <Section
      id="academics"
      eyebrow="Academics"
      title="Academic Performance"
      intro="Semester-wise academic record, kept transparent and up to date."
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        {academicProfile && (
          <Reveal>
            <div className="glass card-hover flex h-full flex-col rounded-2xl p-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                <GraduationCap className="h-5 w-5" />
              </span>
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                Current CGPA
              </p>
              <p className="mt-2 font-display text-5xl font-semibold text-foreground">
                {cgpa?.toFixed(2) ?? "—"}
                <span className="ml-1 text-lg text-muted-foreground">/ {scale}</span>
              </p>
              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary transition-[width] duration-1000"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <dl className="mt-6 space-y-3 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">Degree</dt>
                  <dd className="mt-0.5 text-foreground">{academicProfile.degree}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    Institution
                  </dt>
                  <dd className="mt-0.5 text-foreground">{academicProfile.institution}</dd>
                  <dd className="text-muted-foreground">{academicProfile.university}</dd>
                </div>
                {academicProfile.current_semester && (
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                      Current semester
                    </dt>
                    <dd className="mt-0.5 text-foreground">{academicProfile.current_semester}</dd>
                  </div>
                )}
              </dl>
              {academicProfile.note && (
                <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                  {academicProfile.note}
                </p>
              )}
            </div>
          </Reveal>
        )}

        <Reveal delay={100}>
          <div className="glass rounded-2xl p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              Semester records
            </p>
            {records.length === 0 ? (
              <p className="mt-5 text-sm text-muted-foreground">
                Semester results will appear here as they are published.
              </p>
            ) : (
              <div className="mt-5 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-xs uppercase tracking-wider text-muted-foreground">
                      <th scope="col" className="pb-3 pr-4 font-medium">
                        Semester
                      </th>
                      <th scope="col" className="pb-3 pr-4 font-medium">
                        SGPA
                      </th>
                      <th scope="col" className="pb-3 pr-4 font-medium">
                        Credits
                      </th>
                      <th scope="col" className="pb-3 font-medium">
                        Year
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r) => (
                      <tr key={r.id} className="border-t border-border">
                        <td className="py-3 pr-4 font-medium text-foreground">Sem {r.semester}</td>
                        <td className="py-3 pr-4 text-primary">
                          {r.sgpa != null ? Number(r.sgpa).toFixed(2) : "—"}
                        </td>
                        <td className="py-3 pr-4 text-muted-foreground">{r.credits ?? "—"}</td>
                        <td className="py-3 text-muted-foreground">{r.academic_year ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {education.length > 0 && (
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          {education.map((e, i) => (
            <Reveal key={e.id} delay={i * 80}>
              <article className="glass card-hover h-full rounded-2xl p-6">
                <h3 className="font-display text-lg font-semibold text-foreground">{e.degree}</h3>
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
        </div>
      )}
    </Section>
  );
}
