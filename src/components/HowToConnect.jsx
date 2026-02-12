import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useServer } from '../context/ServerContext';
import { useCopyAddress } from '../hooks/useCopyAddress';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const LAUNCHERS = [
  { name: 'PolyMC', url: 'https://polymc.org/', desc: 'Open Source лаунчер', logo: '/img/polymc.png' },
  { name: 'TLauncher', url: 'https://tlauncher.ru/', desc: 'Популярный лаунчер', logo: '/img/tlauncher.png' },
];

const STEPS = [
  { num: 1, title: 'Установите Minecraft', desc: 'Версия 1.21.8. Скачайте лаунчер и установите игру, если ещё не установлено.', icon: '📥' },
  { num: 2, title: 'Настройте клиент', desc: 'Запустите игру и в лаунчере выберите версию 1.21.8.', icon: '⚙️' },
  { num: 3, title: 'Добавьте сервер', desc: 'Мультиплеер → Добавить сервер. Вставьте адрес сервера (кнопка ниже).', icon: '➕' },
  { num: 4, title: 'Подключайтесь', desc: 'Выберите сервер в списке и нажмите «Подключиться».', icon: '▶️' },
];

export default function HowToConnect() {
  const { displayAddress, version } = useServer();
  const { copy, copied } = useCopyAddress();
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.08 });
  const [launcherModalOpen, setLauncherModalOpen] = useState(false);

  const closeLauncherModal = useCallback(() => setLauncherModalOpen(false), []);
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeLauncherModal(); };
    if (launcherModalOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [launcherModalOpen, closeLauncherModal]);

  return (
    <section id="connect" className="py-20 md:py-28 bg-slate-100 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-slate-100" />
      <div className="absolute inset-0 bg-[url('/img/3.jpg')] bg-cover bg-center opacity-10" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-sans">Как подключиться</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Четыре простых шага до первого входа на сервер DataCraft
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            {STEPS.map((step, i) => {
              const isStep1 = step.num === 1;
              const Wrapper = isStep1 ? motion.button : motion.div;
              const wrapperProps = isStep1
                ? {
                    type: 'button',
                    onClick: () => setLauncherModalOpen(true),
                    initial: { opacity: 0, x: -20 },
                    animate: isVisible
                      ? { opacity: 1, x: 0, boxShadow: ['0 4px 14px -2px rgba(14,165,233,0.15)', '0 8px 28px -4px rgba(14,165,233,0.22)', '0 4px 14px -2px rgba(14,165,233,0.15)'] }
                      : {},
                    transition: {
                      opacity: { delay: i * 0.1 },
                      x: { delay: i * 0.1 },
                      boxShadow: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' },
                    },
                    className: 'w-full text-left flex gap-4 p-5 rounded-2xl bg-white border-2 border-sky-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2',
                    whileHover: { x: 4, scale: 1.01, boxShadow: '0 10px 40px -10px rgba(14, 165, 233, 0.3)' },
                    whileTap: { scale: 0.99 },
                  }
                : {
                    initial: { opacity: 0, x: -20 },
                    animate: isVisible ? { opacity: 1, x: 0 } : {},
                    transition: { delay: i * 0.1 },
                    whileHover: { x: 4 },
                    className: 'flex gap-4 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm',
                  };
              return (
                <Wrapper key={step.num} {...wrapperProps}>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${isStep1 ? 'bg-sky-200' : 'bg-sky-100'}`}>
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Шаг {step.num}</span>
                    <h3 className="text-xl font-bold text-slate-800 mt-1 mb-2">{step.title}</h3>
                    <p className="text-slate-600">{step.desc}</p>
                    {isStep1 && (
                      <span className="inline-block mt-2 text-sm text-sky-600 font-medium">Выбрать лаунчер →</span>
                    )}
                  </div>
                </Wrapper>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <p className="text-slate-500 text-sm uppercase tracking-wider mb-2">Адрес сервера</p>
              <motion.button
                type="button"
                onClick={() => copy(displayAddress)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-slate-50 border-2 border-dashed border-slate-300 hover:border-sky-400 text-slate-800 font-mono text-lg"
              >
                {copied ? (
                  <>
                    <svg className="w-6 h-6 text-emerald-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Скопировано!
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" /><path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H6z" /></svg>
                    {displayAddress}
                  </>
                )}
              </motion.button>
              <p className="text-slate-500 text-sm mt-2 text-center">Нажмите, чтобы скопировать</p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
              <p className="text-slate-500 text-sm uppercase tracking-wider mb-3">Версия</p>
              <p className="text-2xl font-bold text-sky-600">{version}</p>
              <p className="text-slate-500 text-sm mt-1">Minecraft Java Edition</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://discord.gg/XQTUKWjFjj"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z" /></svg>
                Discord
              </a>
              <a
                href="https://t.me/ponomarenko_dmitrii"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" /></svg>
                Telegram
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {launcherModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLauncherModal}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200"
            >
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-lg">Выберите лаунчер</h3>
                <button
                  type="button"
                  onClick={closeLauncherModal}
                  className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
                  aria-label="Закрыть"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-5 grid grid-cols-2 gap-4">
                {LAUNCHERS.map((launcher) => (
                  <motion.a
                    key={launcher.name}
                    href={launcher.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex flex-col items-center justify-center p-6 rounded-xl bg-slate-50 border-2 border-slate-200 hover:border-sky-400 hover:bg-sky-50/50 transition-colors text-center no-underline"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden mb-3 shadow-sm p-1">
                      {launcher.logo ? (
                        <img src={launcher.logo} alt="" className="w-full h-full object-contain" />
                      ) : (
                        <span className="text-3xl font-bold text-sky-600">{launcher.name.charAt(0)}</span>
                      )}
                    </div>
                    <span className="font-bold text-slate-800 text-lg">{launcher.name}</span>
                    <span className="text-slate-500 text-sm mt-0.5">{launcher.desc}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
