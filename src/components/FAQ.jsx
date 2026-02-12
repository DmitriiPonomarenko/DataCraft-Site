import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FAQ_ITEMS = [
  { q: 'Как подключиться к серверу?', a: 'Установите Minecraft Java 1.21.8, в мультиплеере добавьте сервер с адресом datacraft.ru-mc.ru и нажмите «Подключиться».', popular: true },
  { q: 'Сервер платный?', a: 'Нет, DataCraft — внутренний корпоративный сервер для команды Data Science, доступ бесплатный для сотрудников.', popular: true },
  { q: 'Какая версия Minecraft нужна?', a: 'Используйте версию 1.21.8 (или актуальную, указанную в блоке статуса на сайте).', popular: false },
  { q: 'Можно ли пригласить друзей?', a: 'Сервер ориентирован на команду Data Science. Вопрос приглашения внешних игроков согласовывается с администрацией.', popular: false },
  { q: 'Есть ли Discord сервер?', a: 'Да, ссылка на Discord чат команды есть в разделе «Подключение» и в подвале сайта.', popular: true },
  { q: 'Как получить приват на постройки?', a: 'Используйте плагин защиты регионов (WorldGuard). Команды и инструкции можно уточнить в Discord.', popular: false },
  { q: 'Делаются ли бэкапы мира?', a: 'Да, бэкапы выполняются регулярно (примерно раз в неделю). Важные постройки сохраняются.', popular: false },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.08 });

  const filtered = useMemo(() => {
    if (!search.trim()) return FAQ_ITEMS;
    const s = search.toLowerCase();
    return FAQ_ITEMS.filter((item) => item.q.toLowerCase().includes(s) || item.a.toLowerCase().includes(s));
  }, [search]);

  return (
    <section id="faq" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-sans">Частые вопросы</h2>
          <p className="text-slate-600 text-lg mb-8">Ответы на популярные вопросы о сервере</p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Поиск по вопросам..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:border-sky-500 outline-none"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
        </motion.div>

        <div className="space-y-3">
          {filtered.map((item, i) => (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.04 }}
              className={`rounded-xl border overflow-hidden ${
                item.popular ? 'border-sky-400 bg-sky-50/80' : 'border-slate-200 bg-slate-50'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-slate-700/30 transition-colors"
              >
                <span className="font-semibold text-slate-800 text-left flex-1">{item.q}</span>
                {item.popular && (
                  <span className="text-xs bg-sky-100 text-sky-600 px-2 py-0.5 rounded">Популярный</span>
                )}
                <motion.span animate={{ rotate: openIndex === i ? 180 : 0 }} className="text-slate-500 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 pt-0 text-slate-600 border-t border-slate-200 pt-4">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="text-center text-slate-500 py-8">По вашему запросу ничего не найдено.</p>
        )}
      </div>
    </section>
  );
}
