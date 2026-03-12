import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Mail } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { translations } from '../data/translations';

export function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useAppContext();
  const tr = translations[lang];
  const [active, setActive] = useState(location.pathname);

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  const items = [
    { path: '/', label: tr.nav_home, icon: Home },
    { path: '/about', label: tr.nav_about, icon: User },
    { path: '/work', label: tr.nav_work, icon: Briefcase },
    { path: '/contact', label: tr.nav_contact, icon: Mail },
  ];

  return (
    <nav className="mobile-nav md:hidden">
      {items.map(({ path, label, icon: Icon }) => (
        <button
          key={path}
          className={`nav-item ${active === path ? 'active' : ''}`}
          onClick={() => navigate(path)}
        >
          {active === path ? (
            <motion.div
              layoutId="active-bubble"
              className="active-bubble"
              transition={{
                type: 'spring',
                stiffness: 400,
                damping: 30
              }}
            >
              <Icon />
              <span>{label}</span>
            </motion.div>
          ) : (
            <div className="inactive-item">
              <Icon />
              <span>{label}</span>
            </div>
          )}
        </button>
      ))}
    </nav>
  );
}
