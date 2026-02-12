import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useServer } from '../context/ServerContext';
import { useCopyAddress } from '../hooks/useCopyAddress';

const MAP_URL = 'http://datacraft.ru-mc.ru:18587/#derevnua:93:27:52:296:0:0:0:0:perspective';

const navItems = [
  { to: '#about', label: 'О сервере' },
  { to: '#connect', label: 'Подключение' },
  { to: '#features', label: 'Возможности' },
  { to: '#rules', label: 'Правила' },
  { to: '#plugins', label: 'Плагины' },
  { to: '#gallery', label: 'Галерея' },
  { to: MAP_URL, label: 'Карта', external: true },
  { to: '#faq', label: 'FAQ' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { displayAddress } = useServer();
  const { copy, copied } = useCopyAddress();

  const scrollTo = (e, hash) => {
    e.preventDefault();
    setMenuOpen(false);
    if (hash === '#') return;
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-slate-200 shadow-sm pt-[env(safe-area-inset-top,0px)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-3 group" onClick={(e) => scrollTo(e, '#hero')}>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center overflow-hidden p-1.5"
          >
            <img src="/img/logo.png" alt="DataCraft" className="w-full h-full object-contain" />
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-800 font-sans">DataCraft</h1>
            <p className="text-xs text-slate-500 hidden sm:block">Команда Data Science</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) =>
            item.external ? (
              <a
                key={item.to}
                href={item.to}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 text-slate-600 hover:text-sky-600 font-medium text-sm transition-colors rounded-lg hover:bg-slate-100"
              >
                {item.label}
              </a>
            ) : (
              <a
                key={item.to}
                href={item.to}
                onClick={(e) => scrollTo(e, item.to)}
                className="px-3 py-2 text-slate-600 hover:text-sky-600 font-medium text-sm transition-colors rounded-lg hover:bg-slate-100"
              >
                {item.label}
              </a>
            )
          )}
        </nav>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => copy(displayAddress)}
            className="hidden md:flex items-center gap-2 bg-sky-100 hover:bg-sky-200 border border-sky-200 text-sky-700 px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            <span className="w-8 h-8 rounded-md bg-sky-200 flex items-center justify-center">
              {copied ? (
                <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5z" /></svg>
              )}
            </span>
            {displayAddress}
          </motion.button>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700"
            aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current rounded transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 bg-current rounded transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-current rounded transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-slate-200 bg-white"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.to}
                    href={item.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMenuOpen(false)}
                    className="py-3 px-4 text-slate-600 hover:text-sky-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                ) : (
                  <a
                    key={item.to}
                    href={item.to}
                    onClick={(e) => scrollTo(e, item.to)}
                    className="py-3 px-4 text-slate-600 hover:text-sky-600 hover:bg-slate-50 rounded-lg font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                )
              )}
              <button
                onClick={() => { copy(displayAddress); setMenuOpen(false); }}
                className="mt-2 py-3 px-4 text-left flex items-center gap-2 text-sky-600 font-semibold"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5z" /></svg>
                Подключиться: {displayAddress}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
