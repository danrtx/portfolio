import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { socialLinks } from '../data/projects';
import { useLanguage } from '../context/AppContext';
import { translations } from '../data/translations';

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;

const SocialIcon = ({ name }: { name: string }) => {
  const icons: Record<string, string> = {
    github: 'M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z',
    linkedin: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z',
  };
  return <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d={icons[name] ?? ''} /></svg>;
};

// ─── Toast ───────────────────────────────────────────────────────────────────
function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
  const accent = type === 'success' ? '#34D399' : '#FF5F57';
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 40, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
      style={{
        position: 'fixed', bottom: 80, left: '50%', transform: 'translateX(-50%)',
        zIndex: 99998, minWidth: 300, maxWidth: 400,
        background: type === 'success' ? 'rgba(10,30,20,0.92)' : 'rgba(30,10,10,0.92)',
        backdropFilter: 'blur(20px)',
        border: `1px solid ${accent}40`,
        borderRadius: 14,
        padding: '14px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: `0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px ${accent}20`,
      }}
    >
      <span style={{ fontSize: '1.2rem', flexShrink: 0 }}>{type === 'success' ? '✓' : '✕'}</span>
      <span style={{ fontFamily: 'DM Sans', fontSize: '0.88rem', color: '#F0F4FF', flex: 1 }}>{message}</span>
      <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(240,244,255,0.4)', cursor: 'none', fontSize: '1rem' }}>×</button>
    </motion.div>
  );
}

// ─── Channel Cards ────────────────────────────────────────────────────────────
function ChannelCard({ icon, label, handle, href, accent }: { icon: React.ReactNode; label: string; handle: string; href: string; accent: string }) {
  return (
    <motion.a href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
      className="glass-card p-4 flex items-center gap-4 flex-1"
      style={{ textDecoration: 'none', cursor: 'none', minWidth: 160 }}
      whileHover={{ y: -4, boxShadow: `0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px ${accent}30` }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: `${accent}18`, border: `1px solid ${accent}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: accent, flexShrink: 0 }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: 'DM Sans', fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2, letterSpacing: '0.05em' }}>{label}</div>
        <div style={{ fontFamily: 'DM Sans', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600 }}>{handle}</div>
      </div>
    </motion.a>
  );
}

// ─── Main Contact Section ─────────────────────────────────────────────────────
export function ContactSection() {
  const lang = useLanguage();
  const tr = translations[lang];
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: PUBLIC_KEY },
      );
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
      showToast(lang === 'es' ? '¡Mensaje enviado! Te respondo en menos de 24h ✓' : "Message sent! I'll reply within 24h ✓", 'success');
    } catch {
      setStatus('error');
      showToast(
        lang === 'es'
          ? 'Algo salió mal. Escríbeme a danilomntzm@gmail.com'
          : 'Something went wrong. Try again or email me directly.',
        'error',
      );
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const channels = [
    {
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>,
      label: 'Email', handle: 'danilomntzm@gmail.com', href: 'mailto:danilomntzm@gmail.com', accent: '#4F8EF7',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z"/></svg>,
      label: 'LinkedIn', handle: 'danilo-andres-montezuma', href: 'https://linkedin.com/in/danilo-andres-montezuma-ibarra-a8067b29b', accent: '#A78BFA',
    },
    {
      icon: <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.167 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>,
      label: 'GitHub', handle: 'DaniloMontezuma', href: 'https://github.com/DaniloMontezuma', accent: '#34D399',
    },
  ];

  return (
    <section className="py-24 px-6 max-w-4xl mx-auto" id="contact">
      {/* Section label */}
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="mb-4" style={{ color: 'var(--text-muted)', fontSize: '0.7rem', letterSpacing: '0.25em' }}>
        {tr.contact_label}
      </motion.div>

      <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.1 }} className="font-heading text-glass mb-2"
        style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)' }}>
        {tr.contact_heading_1}{' '}<span className="gradient-text-green">{tr.contact_heading_accent}</span>.
      </motion.h2>

      {/* Response badge */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
        className="mb-8 flex items-center gap-2">
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 100,
          background: 'rgba(52,211,153,0.10)', border: '1px solid rgba(52,211,153,0.25)',
          fontSize: '0.75rem', color: '#34D399', fontFamily: 'DM Sans',
        }}>
          ⚡ {lang === 'es' ? 'Respondo en menos de 24h' : 'Usually responds within 24h'}
        </span>
      </motion.div>

      {/* Channel cards */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.2 }} className="flex flex-wrap gap-3 mb-10">
        {channels.map((ch) => (
          <ChannelCard key={ch.label} {...ch} />
        ))}
      </motion.div>

      {/* Glass form card */}
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.25, type: 'spring', stiffness: 150 }}
        className="glass-card p-8 relative overflow-hidden">
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: 'radial-gradient(circle, rgba(52,211,153,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.1em', marginBottom: 8 }}>
                {tr.contact_name_label.toUpperCase()}
              </label>
              <input type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder={tr.contact_name_placeholder}
                className="glass-input w-full px-4 py-3" style={{ fontSize: '0.9rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.1em', marginBottom: 8 }}>
                {tr.contact_email_label.toUpperCase()}
              </label>
              <input type="email" required value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder={tr.contact_email_placeholder}
                className="glass-input w-full px-4 py-3" style={{ fontSize: '0.9rem' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.72rem', letterSpacing: '0.1em', marginBottom: 8 }}>
              {tr.contact_message_label.toUpperCase()}
            </label>
            <textarea required rows={5} value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder={tr.contact_message_placeholder}
              className="glass-input w-full px-4 py-3 resize-none" style={{ fontSize: '0.9rem' }} />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Social icons */}
            <div className="flex gap-3">
              {socialLinks.map((sl) => (
                <motion.a key={sl.name} href={sl.href} target="_blank" rel="noopener noreferrer"
                  className="glass-btn p-3" style={{ color: 'var(--text-muted)', display: 'flex' }}
                  whileHover={{ scale: 1.12, color: '#4F8EF7' }} whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }} title={sl.name}>
                  <SocialIcon name={sl.icon} />
                </motion.a>
              ))}
            </div>

            {/* Submit button */}
            <motion.button type="submit" disabled={status === 'sending'}
              className="glass-btn px-8 py-3 flex items-center gap-2"
              style={{
                color: '#F0F4FF', fontFamily: 'DM Sans', fontSize: '0.9rem',
                background: status === 'success' ? 'rgba(52,211,153,0.2)' : 'rgba(52,211,153,0.15)',
                border: `1px solid ${status === 'error' ? 'rgba(255,95,87,0.5)' : 'rgba(52,211,153,0.4)'}`,
                boxShadow: '0 0 20px rgba(52,211,153,0.1)',
                opacity: status === 'sending' ? 0.8 : 1,
              }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 30px rgba(52,211,153,0.25)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}>
              <AnimatePresence mode="wait">
                {status === 'sending' ? (
                  <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%' }}
                    />
                    {lang === 'es' ? 'Enviando...' : 'Sending...'}
                  </motion.span>
                ) : status === 'success' ? (
                  <motion.span key="ok" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>✓ {lang === 'es' ? 'Enviado' : 'Sent'}</motion.span>
                ) : (
                  <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {tr.contact_submit} ✦
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* Toast */}
      <AnimatePresence>
        {toast && <Toast key="toast" message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      </AnimatePresence>
    </section>
  );
}
