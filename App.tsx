import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MeetTheTeamPage from './pages/MeetTheTeamPage';
import BookLessonPage from './pages/BookLessonPage';
import DonatePage from './pages/DonatePage';
import RegisterTutorPage from './pages/RegisterTutorPage';
import Chatbot from './components/chatbot/Chatbot';

const App: React.FC = () => {
  const location = useLocation();
  const [pageKey, setPageKey] = useState(location.pathname);

  // Remove loading screen on mount
  useEffect(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      // Let the CSS animation handle fade-out, then remove
      const timer = setTimeout(() => loader.remove(), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPageKey(location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-navy">
      <Header />
      <main className="flex-grow page-enter" key={pageKey}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/team" element={<MeetTheTeamPage />} />
          <Route path="/book" element={<BookLessonPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/join" element={<RegisterTutorPage />} />
        </Routes>
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
};

export default App;
