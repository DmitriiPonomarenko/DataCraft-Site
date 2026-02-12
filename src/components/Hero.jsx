import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useServer } from '../context/ServerContext';
import { useCopyAddress } from '../hooks/useCopyAddress';

function AnimatedCounter({ value }) {
  const str = String(value);
  return (
    <span className="inline-flex tabular-nums">
      {str.split('').map((digit, i) => (
        <motion.span
          key={`${i}-${digit}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          className="inline-block min-w-[1ch] text-center"
        >
          {digit}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const { players, loading, displayAddress, online } = useServer();
  const { copy } = useCopyAddress();
  const [count, setCount] = useState(0);
  const [playersModalOpen, setPlayersModalOpen] = useState(false);

  useEffect(() => {
    const target = players.online;
    if (target === count) return;
    const step = target > count ? 1 : -1;
    const t = setInterval(() => {
      setCount((c) => {
        const next = c + step;
        if (step > 0 && next >= target) return target;
        if (step < 0 && next <= target) return target;
        return next;
      });
    }, 80);
    return () => clearInterval(t);
  }, [players.online, count]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-100"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-55"
        style={{ backgroundImage: 'url(/img/1.jpg)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-slate-100/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center pt-20">
        <div className="flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-800 mb-4 md:mb-6 font-sans"
          >
            Добро пожаловать на сервер
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 md:mb-10"
          >
            Место, где команда становится ближе, а отдых после работы — веселее. Играйте вместе и заряжайтесь энергией.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.65, ease: [0.22, 0.61, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-10"
          >
            <motion.a
              href="#connect"
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-400 hover:to-cyan-400 text-white font-bold rounded-xl shadow-lg animate-glow-pulse hover:shadow-[0_0_35px_rgba(14,165,233,0.6),0_0_60px_rgba(6,182,212,0.3)] transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[linear-gradient(110deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:200%_100%] group-hover:animate-shimmer" aria-hidden />
              <svg className="w-5 h-5 relative z-10 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
              <span className="relative z-10">Начать играть</span>
            </motion.a>
            <motion.button
              onClick={() => copy(displayAddress)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 shadow-sm transition-colors"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
              Подключиться
            </motion.button>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => setPlayersModalOpen(true)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
            className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-slate-200 shadow-sm w-[14rem] min-h-[4rem] hover:border-sky-300 transition-colors ${online ? 'text-left' : 'justify-center'}`}
          >
            <span
              className={`w-2 h-2 rounded-full shadow flex-shrink-0 ${online ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`}
              aria-hidden
            />
            <span className="text-slate-500 text-sm font-medium uppercase tracking-wider flex-shrink-0 min-w-[4.5rem] text-left">
              {loading ? '…' : online ? 'Онлайн' : 'Офлайн'}
            </span>
            {online && (
              <span className="text-2xl font-bold text-slate-800 tabular-nums w-[5.5rem] text-center flex-shrink-0">
                {loading ? (
                  <span className="inline-flex gap-0.5">
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse [animation-delay:75ms]" />
                    <span className="w-2 h-2 rounded-full bg-slate-400 animate-pulse [animation-delay:150ms]" />
                  </span>
                ) : (
                  <>
                    <AnimatedCounter value={count} />
                    <span className="text-slate-400 font-normal">/{players.max}</span>
                  </>
                )}
              </span>
            )}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {playersModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlayersModalOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden border border-slate-200"
            >
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <span>👥</span> Игроки онлайн
                </h3>
                <button
                  type="button"
                  onClick={() => setPlayersModalOpen(false)}
                  className="p-2 rounded-lg hover:bg-slate-200 text-slate-600"
                  aria-label="Закрыть"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[60vh]">
                {!online ? (
                  <p className="text-slate-500 text-center py-8">Сервер офлайн</p>
                ) : players.list.length === 0 ? (
                  <p className="text-slate-500 text-center py-8">Сейчас никого нет</p>
                ) : (
                  <ul className="space-y-2">
                    {players.list.map((name) => (
                      <li key={name} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100">
                        <img
                          src={`https://mc-heads.net/avatar/${encodeURIComponent(name)}/40`}
                          alt=""
                          className="w-10 h-10 rounded-lg"
                          loading="lazy"
                        />
                        <span className="font-medium text-slate-800">{name}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
