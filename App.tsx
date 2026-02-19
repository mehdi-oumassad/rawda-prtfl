import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Gardé pour les autres pages
import SelectedWork from './pages/SelectedWork';
import Motion from './pages/Motion';
import Shop from './pages/Shop';
import Contact from './pages/Contact';

// On simplifie le Layout : il ne doit plus contenir la Navbar par défaut
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow flex flex-col relative">
        {children}
      </main>
    </div>
  );
};

// Pour les pages simples qui n'ont pas de Navbar interne, on crée un composant wrapper
const PageWithNavbar: React.FC<{ title: string; component: React.ReactNode }> = ({ component }) => (
  <>
    <Navbar /> {/* Navbar standard pour Motion, Shop, Contact */}
    {component}
  </>
);

const AboutPlaceholder: React.FC = () => (
  <div className="flex-grow flex items-center justify-center text-sm text-gray-400 tracking-widest uppercase">
    About Page
  </div>
);

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          {/* SelectedWork gère SA PROPRE Navbar (déjà incluse dans le fichier SelectedWork.tsx) */}
          <Route path="/" element={<SelectedWork />} />

          {/* Les autres pages utilisent la Navbar standard via le wrapper */}
          <Route path="/motion" element={<PageWithNavbar component={<Motion />} title="Motion" />} />
          <Route path="/shop" element={<PageWithNavbar component={<Shop />} title="Shop" />} />
          <Route path="/about" element={<PageWithNavbar component={<AboutPlaceholder />} title="About" />} />
          <Route path="/contact" element={<PageWithNavbar component={<Contact />} title="Contact" />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;