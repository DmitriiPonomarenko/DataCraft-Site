import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const GALLERY_ITEMS = [
  { src: '/img/gallery-1.png', category: 'builds', title: 'База и ферма' },
  { src: '/img/gallery-3.png', category: 'builds', title: 'Добро пожаловать на сервер' },
  { src: '/img/gallery-4.png', category: 'nature', title: 'Исследование мира' },
  { src: '/img/gallery-5.png', category: 'builds', title: 'Спаун сервера' },
  { src: '/img/1.jpg', category: 'nature', title: 'Ландшафт' },
  { src: '/img/2.jpg', category: 'nature', title: 'Пейзаж' },
  { src: '/img/3.jpg', category: 'nature', title: 'Природа' },
  { src: '/img/4.jpg', category: 'nature', title: 'Мир сервера' },
];

const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'builds', label: 'Постройки' },
  { id: 'nature', label: 'Природа' },
];

export default function Gallery() {
  const [filter, setFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.08 });

  const filtered = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === filter);

  const closeLightbox = useCallback(() => setLightbox(null), []);
  const handleKey = useCallback((e) => { if (e.key === 'Escape') closeLightbox(); }, [closeLightbox]);

  React.useEffect(() => {
    if (lightbox !== null) {
      document.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, handleKey]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-slate-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-sans">Галерея</h2>
          <p className="text-slate-600 text-lg mb-8">Скриншоты и моменты с сервера DataCraft</p>
          <div className="flex flex-wrap justify-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === c.id ? 'bg-sky-500 text-white' : 'bg-white text-slate-600 hover:text-sky-600 border border-slate-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="overflow-hidden rounded-xl max-h-[42rem]">
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filtered.map((item, i) => (
            <motion.button
              key={item.src + i}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setLightbox(item)}
              className="aspect-square rounded-xl overflow-hidden border-2 border-slate-200 focus:border-sky-500 outline-none shadow-sm"
            >
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.button>
            ))}
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden bg-slate-900 shadow-2xl"
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
              />
              <p className="absolute bottom-0 left-0 right-0 py-3 px-4 bg-black/60 text-white text-center font-medium">
                {lightbox.title}
              </p>
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
                aria-label="Закрыть"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
