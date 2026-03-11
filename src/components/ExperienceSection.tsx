import { motion } from 'framer-motion';
import { experience } from '../data/projects';
import { useLanguage } from '../context/AppContext';
import { translations } from '../data/translations';

export function ExperienceSection() {
  const lang = useLanguage();
  const tr = translations[lang];
  // Merge static fields (company, location, stack, accent, current)
  // with translatable fields (role, period, description) from translations
  const expData = tr.experience_data as readonly { role: string; period: string; description: string }[];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto" id="experience">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.25em' }} className="mb-4">
        {tr.experience_label}
      </motion.div>

      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
        className="font-heading text-glass mb-12"
        style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
        {tr.experience_heading_1}{' '}
        <span className="gradient-text">{tr.experience_heading_accent}</span>
      </motion.h2>

      <div className="relative">
        <div className="absolute left-[7px] top-2 bottom-2 w-px hidden md:block"
          style={{ background: 'linear-gradient(to bottom, rgba(79,142,247,0.4), rgba(167,139,250,0.4), rgba(52,211,153,0.2))' }} />

        <div className="space-y-6">
          {experience.map((job, i) => {
            const t = expData[i] ?? { role: job.role, period: job.period, description: job.description };
            return (
              <motion.div key={job.company}
                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                className="md:pl-10 relative">
                <div className="absolute left-0 top-5 w-3.5 h-3.5 rounded-full hidden md:block"
                  style={{ background: job.accent, boxShadow: `0 0 10px ${job.accent}80`, border: `2px solid ${job.accent}40` }} />

                <motion.div className="glass-card p-6"
                  whileHover={{ y: -3, boxShadow: `0 12px 40px rgba(0,0,0,0.4), 0 0 0 1px ${job.accent}20` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}>
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {t.role}
                        </h3>
                        {job.current && (
                          <span className="flex items-center gap-1"
                            style={{ background: 'rgba(52,211,153,0.15)', border: '1px solid rgba(52,211,153,0.3)', borderRadius: '100px', padding: '2px 8px', fontSize: '0.6rem', color: '#34D399', letterSpacing: '0.1em' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse inline-block" />
                            {tr.exp_current}
                          </span>
                        )}
                      </div>
                      <div style={{ color: job.accent, fontSize: '0.85rem', fontWeight: 600 }}>{job.company}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 2 }}>
                        {t.period} · {job.location}
                      </div>
                    </div>
                  </div>

                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: job.stack.length > 0 ? 12 : 0 }}>
                    {t.description}
                  </p>

                  {job.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {job.stack.map((tech) => (
                        <span key={tech} className="glass-chip" style={{ fontSize: '0.65rem', color: job.accent, borderColor: `${job.accent}30` }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
