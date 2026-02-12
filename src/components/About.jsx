import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const features = [
  { icon: '💬', title: 'Общение', desc: 'Неформальная обстановка помогает лучше узнать коллег' },
  { icon: '🧠', title: 'Креатив', desc: 'Стройте и экспериментируйте без ограничений' },
  { icon: '👥', title: 'Команда', desc: 'Совместные проекты для сплочения коллектива' },
  { icon: '🌿', title: 'Отдых', desc: 'Отвлекитесь от работы в виртуальном мире' },
];

export default function About() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="bg-slate-50 rounded-2xl p-8 md:p-10 border-l-4 border-sky-500 border border-slate-200"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 font-sans">
              Пространство для отдыха и творчества
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-4">
              DataCraft — корпоративный сервер Minecraft для команды Data Science. Здесь можно отвлечься от работы, пообщаться и проявить креативность в виртуальном мире.
            </p>
            <p className="text-slate-500 leading-relaxed">
              Дружелюбная атмосфера без строгих дедлайнов. Только свобода творчества и командное общение.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl h-80 lg:h-96"
          >
            <img
              src="/img/1.jpg"
              alt="Мир сервера DataCraft"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <h3 className="text-2xl font-bold mb-2 text-white">Наш виртуальный мир</h3>
              <p className="text-slate-200">Исследуйте ландшафты и постройки команды</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              whileHover={{ y: -4 }}
              className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 transition-colors"
            >
              <span className="text-3xl flex-shrink-0">{f.icon}</span>
              <div>
                <h3 className="font-bold text-slate-800 mb-1">{f.title}</h3>
                <p className="text-slate-500 text-sm">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
