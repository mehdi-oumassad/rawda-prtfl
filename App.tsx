import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SelectedWork from './pages/SelectedWork';
import Motion from './pages/Motion';
import Shop from './pages/Shop';
import Contact from './pages/Contact';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow flex flex-col relative">
        {children}
      </main>
    </div>
  );
};

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
          <Route path="/" element={<SelectedWork />} />
          <Route path="/motion" element={<Motion />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<AboutPlaceholder />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;