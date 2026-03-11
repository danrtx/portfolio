import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';

export function ProjectDetail() {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const navigate = useNavigate();

  const project = projects.find((p) => p.slug === projectSlug);
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p style={{ color: 'rgba(240,244,255,0.4)', marginBottom: 16 }}>Project not found</p>
          <Link to="/work" style={{ color: '#4F8EF7' }}>← Back to Work</Link>
        </div>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.slug === projectSlug);
  const prevProject = projects[currentIndex - 1];
  const nextProject = projects[currentIndex + 1];

  return (
    <div className="min-h-screen pt-24 pb-32">
      {/* Hero */}
      <div className="relative w-full overflow-hidden" style={{ height: '60vh', minHeight: 400 }}>
        <motion.img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #050508 15%, rgba(5,5,8,0.5) 60%, transparent 100%)' }}
        />

        {/* Back button */}
        <motion.button
          onClick={() => navigate(-1)}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-btn absolute top-6 left-6 px-4 py-2 flex items-center gap-2"
          style={{ color: '#F0F4FF', fontSize: '0.85rem' }}
          whileHover={{ x: -3 }}
        >
          ← Back
        </motion.button>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2 mb-4"
            >
              {project.tags.map((tag) => (
                <span key={tag} className="glass-chip" style={{ fontSize: '0.65rem' }}>{tag}</span>
              ))}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="font-heading text-glass"
              style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 800, color: '#F0F4FF' }}
            >
              {project.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              style={{ color: 'rgba(240,244,255,0.6)', fontSize: '1.1rem', fontStyle: 'italic' }}
            >
              {project.subtitle}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Context */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div style={{ color: '#4F8EF7', fontSize: '0.65rem', letterSpacing: '0.2em', marginBottom: 8 }}>ROLE</div>
            <div style={{ color: '#F0F4FF', fontWeight: 500 }}>{project.role}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <div style={{ color: '#A78BFA', fontSize: '0.65rem', letterSpacing: '0.2em', marginBottom: 8 }}>YEAR</div>
            <div style={{ color: '#F0F4FF', fontWeight: 500 }}>{project.year}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="glass-card p-6"
          >
            <div style={{ color: '#34D399', fontSize: '0.65rem', letterSpacing: '0.2em', marginBottom: 8 }}>LINKS</div>
            <div className="flex gap-3">
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  style={{ color: '#4F8EF7', fontSize: '0.85rem' }}>Live ↗</a>
              )}
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  style={{ color: '#4F8EF7', fontSize: '0.85rem' }}>GitHub ↗</a>
              )}
            </div>
          </motion.div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="font-heading mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', color: '#F0F4FF' }}>
            Overview
          </h2>
          <p style={{ color: 'rgba(240,244,255,0.65)', lineHeight: 1.8 }}>{project.longDescription}</p>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-card p-8 mb-8"
        >
          <h2 className="font-heading mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', color: '#F0F4FF' }}>
            Technologies
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className="glass-chip">{tech}</span>
            ))}
          </div>
        </motion.div>

        {/* Gallery */}
        {project.images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-8"
          >
            <h2 className="font-heading mb-4" style={{ fontFamily: 'Syne, sans-serif', fontSize: '1.5rem', color: '#F0F4FF' }}>
              Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.slice(1).map((img, i) => (
                <motion.div
                  key={i}
                  className="glass-card overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <img src={img} alt={`${project.title} ${i + 2}`} className="w-full object-cover" style={{ height: 220 }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Prev/Next navigation */}
        <div
          className="flex justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          {prevProject ? (
            <Link to={`/work/${prevProject.slug}`} className="flex-1">
              <motion.div
                className="glass-card p-5"
                whileHover={{ x: -4 }}
                style={{ cursor: 'none' }}
              >
                <div style={{ color: 'rgba(240,244,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.15em', marginBottom: 6 }}>← PREVIOUS</div>
                <div style={{ color: '#F0F4FF', fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>{prevProject.title}</div>
              </motion.div>
            </Link>
          ) : <div className="flex-1" />}

          {nextProject ? (
            <Link to={`/work/${nextProject.slug}`} className="flex-1">
              <motion.div
                className="glass-card p-5 text-right"
                whileHover={{ x: 4 }}
                style={{ cursor: 'none' }}
              >
                <div style={{ color: 'rgba(240,244,255,0.35)', fontSize: '0.65rem', letterSpacing: '0.15em', marginBottom: 6 }}>NEXT →</div>
                <div style={{ color: '#F0F4FF', fontFamily: 'Syne, sans-serif', fontWeight: 600 }}>{nextProject.title}</div>
              </motion.div>
            </Link>
          ) : <div className="flex-1" />}
        </div>
      </div>
    </div>
  );
}
