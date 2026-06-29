import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LocationsPage from './pages/LocationsPage';
import SpacesPage from './pages/SpacesPage';
import BookingPage from './pages/BookingPage';
import CommunityPage from './pages/CommunityPage';
import ContactPage from './pages/ContactPage';
import EventsPage from './pages/EventsPage';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import AnimatedPage from './components/AnimatedPage';

export default function App() {
  const [page, setPage] = useState('home');
  const [bookingPlan, setBookingPlan] = useState('');

  // Scroll to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

  function navigateTo(target, plan = '') {
    if (target === 'booking' && plan) setBookingPlan(plan);
    else if (target !== 'booking') setBookingPlan('');
    setPage(target);
  }

  function renderPage() {
    switch (page) {
      case 'locations': return <AnimatedPage key="locations"><LocationsPage onNavigate={navigateTo} /></AnimatedPage>;
      case 'spaces': return <AnimatedPage key="spaces"><SpacesPage onNavigate={navigateTo} /></AnimatedPage>;
      case 'booking': return <AnimatedPage key="booking"><BookingPage onNavigate={navigateTo} preselectedPlan={bookingPlan} /></AnimatedPage>;
      case 'community': return <AnimatedPage key="community"><CommunityPage onNavigate={navigateTo} /></AnimatedPage>;
      case 'events': return <AnimatedPage key="events"><EventsPage onNavigate={navigateTo} /></AnimatedPage>;
      case 'contact': return <AnimatedPage key="contact"><ContactPage onNavigate={navigateTo} /></AnimatedPage>;
      default: return <AnimatedPage key="home"><HomePage onNavigate={navigateTo} /></AnimatedPage>;
    }
  }

  const noFooter = ['booking'];

  return (
    <div style={{ minHeight: '100vh', background: 'transparent' }}>
      <CustomCursor />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      <Navbar currentPage={page} onNavigate={navigateTo} />
      <AnimatePresence mode="wait">
        {renderPage()}
      </AnimatePresence>
      {!noFooter.includes(page) && <Footer onNavigate={navigateTo} />}
    </div>
  );
}

