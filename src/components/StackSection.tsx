import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/AppContext';
import { translations } from '../data/translations';

const StackCard = ({ 
  category, 
  index, 
  isOpen, 
  onToggle 
}: { 
  category: any; 
  index: number; 
  isOpen: boolean; 
  onToggle: () => void; 
}) => {
  return (
    <motion.div
      className="glass-card"
      onClick={onToggle}
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      style={{ cursor: 'pointer', overflow: 'hidden' }}
    >
      {/* Card header — always visible */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '24px' }}>{category.icon}</span>
          <div>
            <h3 style={{ color: 'var(--text-primary)', fontSize: '15px', fontWeight: 600 }}>
              {category.title}
            </h3>
            <span style={{ 
              fontSize: '11px', 
              color: category.color,
              background: `${category.color}18`,
              padding: '2px 8px',
              borderRadius: '100px',
              border: `1px solid ${category.color}30`
            }}>
              {category.skills.length} skills
            </span>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
          <ChevronDown size={18} color="var(--text-muted)" />
        </motion.div>
      </div>

      {/* Expandable skills list */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div style={{ 
              padding: '0 20px 20px', 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '8px',
              borderTop: '1px solid rgba(255,255,255,0.06)'
            }}>
              {category.skills.map((skill: string) => (
                <span key={skill} style={{
                  padding: '4px 12px',
                  borderRadius: '100px',
                  fontSize: '12px',
                  fontWeight: 500,
                  color: category.color,
                  background: `${category.color}12`,
                  border: `1px solid ${category.color}25`,
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export function StackSection() {
  const lang = useLanguage();
  const tr = translations[lang] as any;
  const [openCard, setOpenCard] = useState<string | null>(null);

  const toggleCard = (id: string) => {
    setOpenCard(prev => prev === id ? null : id);
  };

  const categories = [
    {
      id: 'core',
      icon: '⚡',
      title: tr.stack.categories.core,
      color: '#4F8EF7',
      skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'Python', 'Java']
    },
    {
      id: 'data',
      icon: '🗄️',
      title: tr.stack.categories.data,
      color: '#34D399',
      skills: ['PostgreSQL', 'MySQL', 'REST APIs', 'Power BI', 'Data Analysis']
    },
    {
      id: 'devtools',
      icon: '🛠️',
      title: tr.stack.categories.devtools,
      color: '#A78BFA',
      skills: ['Git', 'GitLab', 'GitHub', 'CI/CD Pipelines', 'Agile/Scrum', 'VS Code']
    },
    {
      id: 'design',
      icon: '🎨',
      title: tr.stack.categories.design,
      color: '#F59E0B',
      skills: ['CSS', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Photoshop CS6', 'Responsive Design']
    },
    {
      id: 'soft',
      icon: '🤝',
      title: tr.stack.categories.soft,
      color: '#EC4899',
      skills: ['Communication', 'Teamwork', 'Problem Solving', 'Punctuality', 'Adaptability', 'Fast Learner']
    },
    {
      id: 'workspace',
      icon: '💼',
      title: tr.stack.categories.workspace,
      color: '#06B6D4',
      skills: ['Google Workspace', 'Excel', 'Word', 'Power BI', 'Spanish (Native)', 'English (C2)']
    },
  ];

  return (
    <section id="stack" className="relative py-24 md:py-32 px-6 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-6xl z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="glass-chip mb-6">{tr.stack.sectionLabel}</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-8 text-glass">
            {lang === 'en' ? (
              <>What I <span className="gradient-text">bring</span> to the table.</>
            ) : (
              <>Lo que <span className="gradient-text">traigo</span> a la mesa.</>
            )}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <StackCard 
              key={category.id} 
              category={category} 
              index={index} 
              isOpen={openCard === category.id} 
              onToggle={() => toggleCard(category.id)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
