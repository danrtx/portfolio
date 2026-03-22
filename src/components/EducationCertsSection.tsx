import { motion } from 'framer-motion';
import { education, certifications } from '../data/projects';
import { useLanguage } from '../context/AppContext';
import { translations } from '../data/translations';

export function EducationCertsSection() {
  const lang = useLanguage();
  const tr = translations[lang];
  const eduData = tr.education_data as readonly { degree: string; detail: string }[];

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto" id="education">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Education */}
        <div>
          <motion.span aria-hidden="true" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.25em' }} className="mb-4">
            {tr.education_label}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-heading text-glass mb-8"
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
            {tr.education_heading_1}{' '}
            <span className="gradient-text">{tr.education_heading_accent}</span>
          </motion.h2>
          <div className="space-y-4">
            {education.map((ed, i) => {
              const t = eduData[i] ?? { degree: ed.degree, detail: ed.detail };
              return (
                <motion.div key={ed.institution}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                  className="glass-card p-5" whileHover={{ y: -3 }}>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                    {t.degree}
                  </h3>
                  <h4 style={{ color: ed.accent, fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>{ed.institution}</h4>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{ed.period} · {t.detail}</div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <motion.span aria-hidden="true" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.25em' }} className="mb-4">
            {tr.certs_label}
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="font-heading text-glass mb-8"
            style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
            {tr.certs_heading_1}{' '}
            <span className="gradient-text-green">{tr.certs_heading_accent}</span>
          </motion.h2>
          <div className="space-y-4">
            {certifications.map((cert, i) => (
              <motion.div key={cert.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
                className="glass-card p-5 flex items-start gap-4" whileHover={{ y: -3 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: `${cert.accent}18`, border: `1px solid ${cert.accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>
                  {cert.icon}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 3 }}>
                    {cert.title}
                  </h3>
                  <h4 style={{ color: cert.accent, fontSize: '0.8rem', fontWeight: 600, marginBottom: 2 }}>{cert.issuer}</h4>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>
                    {cert.date}{cert.detail ? ` · ${cert.detail}` : ''}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
