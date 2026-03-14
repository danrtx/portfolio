import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SettingsOnboarding() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('settings-onboarding')
    if (seen) return

    const t1 = setTimeout(() => setVisible(true), 2000)
    const t2 = setTimeout(() => {
      setVisible(false)
      localStorage.setItem('settings-onboarding', 'true')
    }, 6000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Pulse ring 1 */}
          <motion.div
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid #4F8EF7',
              zIndex: 999999,
              pointerEvents: 'none',
            }}
          />

          {/* Pulse ring 2 — offset */}
          <motion.div
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.4 }}
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid #A78BFA',
              zIndex: 999999,
              pointerEvents: 'none',
            }}
          />

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, x: 16, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 16, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28, delay: 0.3 }}
            style={{
              position: 'fixed',
              bottom: '26px',
              right: '80px',
              zIndex: 999999,
              background: 'rgba(10,10,20,0.96)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '14px',
              padding: '12px 16px',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 8px 40px rgba(0,0,0,0.5)',
            }}
          >
            {/* Arrow pointing right */}
            <div style={{
              position: 'absolute',
              right: '-5px',
              top: '50%',
              transform: 'translateY(-50%) rotate(45deg)',
              width: '10px',
              height: '10px',
              background: 'rgba(10,10,20,0.96)',
              borderTop: '1px solid rgba(255,255,255,0.15)',
              borderRight: '1px solid rgba(255,255,255,0.15)',
            }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '20px' }}>⚙️</span>
              <div>
                <div style={{
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  marginBottom: '3px',
                }}>
                  Theme & Language
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px' }}>
                  Dark/Light mode · EN / ES
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
