import { motion } from 'framer-motion';
import { ContactSection } from '../components/ContactSection';

export function Contact() {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-block mb-4"
            style={{
              background: 'rgba(52,211,153,0.08)',
              border: '1px solid rgba(52,211,153,0.2)',
              borderRadius: '100px',
              padding: '4px 16px',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: '#34D399',
            }}
          >
            CONTACT
          </div>
        </motion.div>
      </div>
      <ContactSection />
    </div>
  );
}
