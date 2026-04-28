import { NavLink } from 'react-router-dom';
import { Home, Library, History, Sparkles, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

const links = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/cast', icon: Sparkles, label: '起卦' },
  { to: '/history', icon: History, label: '历史' },
  { to: '/lore', icon: BookOpen, label: '科普' },
];

export default function Navbar() {
  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto">
        <div className="max-w-lg mx-auto px-2">
          <div className="card-mystic rounded-t-2xl md:rounded-b-2xl md:rounded-t-none px-2 py-1 md:py-2 border-b-0 md:border-b md:border-t-0 border-x-0">
            <div className="flex items-center justify-around">
              {links.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-300 ${
                      isActive
                        ? 'text-gold-400'
                        : 'text-ink-500 hover:text-ink-300'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="relative">
                        <Icon size={20} />
                        {isActive && (
                          <motion.div
                            layoutId="nav-indicator"
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-400"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                          />
                        )}
                      </div>
                      <span className="text-[10px] font-serif">{label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-20 md:h-0" />
    </>
  );
}
