import { motion } from 'framer-motion';
import { AboutSection } from '../components/AboutSection';

export function About() {
  return (
    <div className="min-h-screen pt-24">
      {/* Page header */}
      <div className="max-w-6xl mx-auto px-6 mb-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-block mb-4"
            style={{
              background: 'linear-gradient(135deg, #050508 0%, rgba(79,142,247,0.08) 100%)',
              border: '1px solid rgba(79,142,247,0.2)',
              borderRadius: '100px',
              padding: '4px 16px',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: '#4F8EF7',
            }}
          >
            ABOUT
          </div>
        </motion.div>
      </div>
      <AboutSection />
    </div>
  );
}
