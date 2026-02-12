import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { staggerContainer, staggerItem } from '../utils/animations';

const features = [
  { icon: '⛏️', title: 'Ванильный геймплей', desc: 'Классический Minecraft 1.21 с минимальными изменениями' },
  { icon: '🔨', title: 'Крафт и прогресс', desc: 'Собирайте ресурсы, крафтите и развивайтесь в игре' },
  { icon: '🗺️', title: 'Карта мира', desc: 'Онлайн-карта сервера для навигации и планирования' },
  { icon: '🌍', title: 'Исследование мира', desc: 'Исследуйте карту, находите биомы и стройте в любом месте' },
  { icon: '🤝', title: 'Совместная игра', desc: 'Кооператив, общие постройки и помощь друг другу' },
  { icon: '🎉', title: 'Ивенты', desc: 'Совместные мероприятия и челленджи от команды' },
];

export default function Features() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.08 });

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-sans">Возможности сервера</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Всё необходимое для комфортной игры и творчества в стиле Minecraft
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={isVisible ? 'animate' : 'initial'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
              className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 transition-all shadow-sm"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-slate-600">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
