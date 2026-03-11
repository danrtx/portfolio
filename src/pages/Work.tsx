import { motion } from 'framer-motion';
import { WorkSection } from '../components/WorkSection';

export function Work() {
  return (
    <div className="min-h-screen pt-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div
            className="inline-block mb-4"
            style={{
              background: 'rgba(167,139,250,0.08)',
              border: '1px solid rgba(167,139,250,0.2)',
              borderRadius: '100px',
              padding: '4px 16px',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: '#A78BFA',
            }}
          >
            WORK
          </div>
        </motion.div>
      </div>
      <WorkSection />
    </div>
  );
}
