import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useServer } from '../context/ServerContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Stats() {
  const { players, online, version, loading } = useServer();
  const [uptime] = useState('24/7');
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  const stats = [
    { label: 'Онлайн', value: loading ? '—' : `${players.online}/${players.max}`, sub: online ? 'Сервер онлайн' : 'Сервер офлайн', color: 'text-emerald-600' },
    { label: 'Аптайм', value: uptime, sub: 'Работает всегда', color: 'text-sky-600' },
    { label: 'Версия', value: version, sub: 'Minecraft Java', color: 'text-sky-600' },
  ];

  return (
    <section id="stats" className="py-20 md:py-28 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-sans">Статистика сервера</h2>
          <p className="text-slate-600 text-lg">Актуальные данные в реальном времени</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-2xl bg-white border border-slate-200 text-center shadow-sm"
            >
              <p className="text-slate-500 text-sm uppercase tracking-wider mb-1">{s.label}</p>
              <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-slate-500 text-sm mt-1">{s.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
