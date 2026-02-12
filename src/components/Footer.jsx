import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MAP_URL = 'http://datacraft.ru-mc.ru:18587/#derevnua:93:27:52:296:0:0:0:0:perspective';

const FOOTER_LINKS = [
  { to: '#about', label: 'О сервере' },
  { to: '#connect', label: 'Подключение' },
  { to: '#features', label: 'Возможности' },
  { to: '#rules', label: 'Правила' },
  { to: '#plugins', label: 'Плагины' },
  { to: '#gallery', label: 'Галерея' },
  { to: MAP_URL, label: 'Карта', external: true },
  { to: '#faq', label: 'FAQ' },
];

function scrollTo(hash) {
  const el = document.querySelector(hash);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-4" onClick={() => scrollTo('#hero')}>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden p-1.5">
                <img src="/img/logo.png" alt="DataCraft" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">DataCraft</h3>
                <p className="text-sm">Команда Data Science</p>
              </div>
            </Link>
            <p className="text-slate-500 max-w-md text-sm leading-relaxed">
              Корпоративный сервер Minecraft для команды по анализу данных. Работаем вместе — отдыхаем вместе.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Карта сайта</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.map((link) => (
                <li key={link.to}>
                  {link.external ? (
                    <a
                      href={link.to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-sky-600 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.to}
                      onClick={(e) => { e.preventDefault(); scrollTo(link.to); }}
                      className="text-slate-600 hover:text-sky-600 transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-sky-500 flex-shrink-0" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <a href="mailto:ds-team@company.com" className="hover:text-slate-800 transition-colors">ds-team@company.com</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-sky-500 flex-shrink-0" aria-hidden>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028 14.09 14.09 0 001.226-1.994.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03z" /></svg>
                </span>
                <a href="https://discord.gg/XQTUKWjFjj" target="_blank" rel="noopener noreferrer" className="hover:text-slate-800 transition-colors">Discord: ds-team-chat</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-sky-500 flex-shrink-0" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                </span>
                <span>datacraft.ru-mc.ru</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-sky-500 flex-shrink-0" aria-hidden>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </span>
                <span>Режим работы: 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-slate-200 text-center text-slate-500 text-sm"
        >
          <p>© {new Date().getFullYear()} DataCraft — Команда Data Science</p>
        </motion.div>
      </div>
    </footer>
  );
}
