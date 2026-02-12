import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const MAP_URL = 'http://datacraft.ru-mc.ru:18587/#derevnua:93:27:52:296:0:0:0:0:perspective';

const PLUGINS = [
  { name: 'BlueMap', desc: 'Веб-карта мира в реальном времени', icon: '🗺️', url: MAP_URL },
  { name: 'WorldEdit', desc: 'Редактирование мира и построек', icon: '⛏️' },
  { name: 'TAB', desc: 'Таблист, префиксы и отображение игроков', icon: '📋' },
  { name: 'DecentHolograms', desc: 'Голограммы в мире', icon: '💫' },
  { name: 'Essentials', desc: 'Базовые команды: дом, тп, инвентарь', icon: '📦' },
  { name: 'EssentialsSpawn', desc: 'Точки спавна и телепорты', icon: '🏠' },
];

export default function Plugins() {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.08 });

  return (
    <section id="plugins" className="py-20 md:py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-sans">Плагины</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Установленные плагины на сервере DataCraft
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          animate={isVisible ? 'animate' : 'initial'}
          variants={{ animate: { transition: { staggerChildren: 0.06 } } }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {PLUGINS.map((plugin) => {
            const cardClass = 'p-5 rounded-xl bg-slate-50 border border-slate-200 hover:border-sky-300 flex gap-4 transition-colors';
            const content = (
              <>
                <div className="text-2xl w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                  {plugin.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-slate-800">{plugin.name}</h3>
                  <p className="text-slate-600 text-sm mt-1">{plugin.desc}</p>
                </div>
              </>
            );
            return plugin.url ? (
              <motion.a
                key={plugin.name}
                href={plugin.url}
                target="_blank"
                rel="noopener noreferrer"
                variants={{ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } }}
                whileHover={{ y: -4 }}
                className={cardClass + ' cursor-pointer block'}
              >
                {content}
              </motion.a>
            ) : (
              <motion.div
                key={plugin.name}
                variants={{ initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 } }}
                whileHover={{ y: -4 }}
                className={cardClass}
              >
                {content}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
