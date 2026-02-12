import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Rules from './components/Rules';
import Plugins from './components/Plugins';
import FAQ from './components/FAQ';
import HowToConnect from './components/HowToConnect';
import Footer from './components/Footer';

const Gallery = lazy(() => import('./components/Gallery'));

function HomePage() {
  return (
    <>
      <Helmet>
        <title>DataCraft | Корпоративный сервер Minecraft — Data Science</title>
        <meta name="description" content="DataCraft — корпоративный сервер Minecraft команды Data Science. Подключайтесь, стройте и общайтесь вместе. Онлайн 24/7." />
        <link rel="canonical" href="https://datacraft.ru-mc.ru/" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'DataCraft',
            description: 'Корпоративный сервер Minecraft команды Data Science',
            url: 'https://datacraft.ru-mc.ru/',
          })}
        </script>
      </Helmet>
      <Header />
      <main>
        <Hero />
        <About />
        <HowToConnect />
        <Features />
        <Rules />
        <Plugins />
        <Suspense fallback={<section id="gallery" className="py-20 min-h-[400px] flex items-center justify-center"><div className="animate-pulse text-slate-500">Загрузка галереи…</div></section>}>
          <Gallery />
        </Suspense>
        <FAQ />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
}

export default App;
