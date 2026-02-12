import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const rules = [
  { title: 'Уважение', body: 'Не ломайте и не крадите постройки коллег без разрешения.', icon: '🤝' },
  { title: 'Территория', body: 'Стройте в отведённых зонах или согласовывайте с соседями.', icon: '🗺️' },
  { title: 'Без вреда', body: 'Не наносите ущерб чужим постройкам. Griefing запрещён.', icon: '🚫' },
  { title: 'Коммуникация', body: 'Используйте чат по назначению. Оскорбления не допускаются.', icon: '💬' },
  { title: 'PvP', body: 'Атакуйте других игроков только с их согласия.', icon: '⚔️' },
  { title: 'Бэкапы', body: 'Сохраняйте важные постройки. Бэкапы выполняются раз в неделю.', icon: '💾' },
];

export default function Rules() {
  const [openIndex, setOpenIndex] = useState(null);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.08 });

  return (
    <section id="rules" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-sans">Основные правила</h2>
          <p className="text-slate-600 text-lg">Соблюдайте правила для комфортной игры всех участников</p>
        </motion.div>

        <div className="space-y-3">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              initial={{ opacity: 0, x: -20 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.06 }}
              className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-100 transition-colors"
              >
                <span className="text-2xl">{rule.icon}</span>
                <span className="font-bold text-slate-800 text-lg flex-1">{rule.title}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  className="text-slate-500"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pt-0 text-slate-600 border-t border-slate-200 pt-4">
                      {rule.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
