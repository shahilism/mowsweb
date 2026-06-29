import { useState } from 'react';
import { locations, amenities, testimonials } from '../data';
import { motion, AnimatePresence } from 'framer-motion';
import FlowArt, { FlowSection } from '../components/ui/story-scroll';

const accent = 'var(--color-amber-gold)';
const textDark = 'var(--color-forest-teal)';
const textLight = 'rgba(23, 79, 80, 0.7)';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
};

export default function HomePage({ onNavigate }) {
  return (
    <FlowArt className="w-full overflow-x-hidden" aria-label="Mows HomePage Flow">
      
      {/* 1. Hero FlowSection */}
      <FlowSection 
        aria-label="Hero" 
        style={{ 
          backgroundColor: 'var(--color-pure-white)',
          backgroundImage: 'linear-gradient(45deg, rgba(23,79,80,0.02) 25%, transparent 25%, transparent 75%, rgba(23,79,80,0.02) 75%, rgba(23,79,80,0.02)), linear-gradient(45deg, rgba(23,79,80,0.02) 25%, transparent 25%, transparent 75%, rgba(23,79,80,0.02) 75%, rgba(23,79,80,0.02))',
          backgroundSize: '60px 60px',
          backgroundPosition: '0 0, 30px 30px'
        }}
      >
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', margin: 'auto' }}>
          {/* Animated Background Orbs */}
          <motion.div 
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: 'absolute', top: '20%', left: '20%', width: 500, height: 500, background: 'var(--color-amber-gold)', borderRadius: '50%', filter: 'blur(200px)', opacity: 0.15, zIndex: 0 }}
          />
          <motion.div 
            animate={{ 
              y: [0, 20, 0],
              scale: [1, 0.95, 1],
            }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ position: 'absolute', bottom: '15%', right: '10%', width: 600, height: 600, background: 'var(--color-mist-teal)', borderRadius: '50%', filter: 'blur(200px)', opacity: 0.5, zIndex: 0 }}
          />

          {/* Centered Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 50 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', zIndex: 1 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <img src="/logo-icon.png" alt="MOWS Icon" style={{ width: 'clamp(60px, 8vw, 100px)', height: 'clamp(60px, 8vw, 100px)', objectFit: 'contain' }} />
              
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <img src="/logo-wordmark.png" alt="MOWS Wordmark" style={{ height: 'clamp(50px, 6vw, 80px)', objectFit: 'contain', marginBottom: '8px' }} />
                
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  style={{ color: 'var(--color-forest-teal)', fontSize: 'clamp(0.7rem, 1vw, 0.95rem)', letterSpacing: '0.45em', fontWeight: 600, paddingLeft: 8 }}
                >
                  MY OWN WORK SPACE
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </FlowSection>

      {/* 2. Amenities FlowSection */}
      <FlowSection aria-label="Amenities" style={{ backgroundColor: 'var(--color-pure-white)' }}>
        <div style={{ maxWidth: 1100, margin: 'auto', width: '100%' }}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 3rem' }}
          >
            <motion.p variants={itemVariants} style={{ fontSize: 13, color: 'var(--color-amber-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700 }}>Enterprise-grade infrastructure</motion.p>
            <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', margin: '0 0 1.5rem' }}>Everything you need.</motion.h2>
            <motion.p variants={itemVariants} style={{ fontSize: 18, color: textLight, lineHeight: 1.6 }}>We handle the logistics so you can focus on building. Every membership includes unlimited access to our premium amenities.</motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24 }}
          >
            {amenities.map((a, i) => (
              <motion.div 
                key={a.label} 
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="glass-panel" 
                style={{ display: 'flex', flexDirection: 'column', padding: '24px', borderRadius: 24, transition: 'background 0.3s', cursor: 'default' }}
              >
                <div className="glass-panel-heavy" style={{ width: 48, height: 48, borderRadius: 16, color: 'var(--color-amber-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 20 }}>✓</span>
                </div>
                <p style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px' }}>{a.label}</p>
                <p style={{ fontSize: 14, color: textLight, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>{a.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FlowSection>

      {/* 3. Locations FlowSection */}
      <FlowSection aria-label="Locations" style={{ backgroundColor: 'var(--color-pure-white)' }}>
        <div style={{ maxWidth: 1100, margin: 'auto', width: '100%' }}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: 20 }}
          >
            <div style={{ maxWidth: 500 }}>
              <motion.p variants={itemVariants} style={{ fontSize: 13, color: 'var(--color-amber-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 700 }}>Our network</motion.p>
              <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', margin: '0 0 1rem' }}>Spaces near you</motion.h2>
              <motion.p variants={itemVariants} style={{ fontSize: 16, color: textLight, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>Strategically located in Kerala's top business districts. Seamlessly move between our spaces.</motion.p>
            </div>
            <motion.button 
              variants={itemVariants}
              onClick={() => onNavigate('locations')} 
              className="glass-panel interactive" 
              whileHover={{ y: -2, backgroundColor: 'rgba(255,255,255,0.8)' }}
              style={{ color: textDark, borderRadius: 12, padding: '14px 24px', fontSize: 15, fontWeight: 700, cursor: 'pointer', border: 'none' }}
            >
              View all locations →
            </motion.button>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}
          >
            {locations.slice(0, 3).map((loc, i) => (
              <motion.div 
                key={loc.id} 
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => onNavigate('locations')} 
                className="glass-panel interactive" 
                style={{ padding: '16px', borderRadius: 24, overflow: 'hidden', cursor: 'pointer' }}
              >
                <div style={{ height: 180, borderRadius: 16, background: '#e2e8f0', overflow: 'hidden' }}>
                  <img src={`https://img.youtube.com/vi/${loc.videoId}/hqdefault.jpg`} alt={loc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.2rem 0.2rem 0.2rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <p style={{ fontSize: 18, fontWeight: 800, margin: 0 }}>{loc.name}</p>
                    <span className="glass-panel-heavy" style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 20, color: loc.avail === 'open' ? '#059669' : '#d97706' }}>
                      {loc.avail === 'open' ? 'Available' : 'Limited'}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: textLight, margin: '0 0 16px', fontWeight: 500 }}>📍 {loc.area}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {loc.tags.map(t => <span key={t} className="glass-panel-heavy" style={{ fontSize: 11, padding: '4px 10px', borderRadius: 12, color: textLight, fontWeight: 600 }}>{t}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FlowSection>

      {/* 4. Franchise FlowSection */}
      <FlowSection aria-label="Franchise Segment" style={{ backgroundColor: textDark, color: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: 'auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p style={{ fontSize: 13, color: accent, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 700 }}>Partner with Mows</p>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', margin: '0 0 1.2rem', lineHeight: 1.15 }}>Build the future of work.</h2>
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.6, margin: '0 0 2rem' }}>
              We are expanding across India. Partnering with MOWS means gaining access to our proven operational playbook and enterprise-grade tech.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Turnkey operational model', 'Integrated ERP & Booking software', 'National marketing support', 'Architectural & design blueprints'].map((item, i) => (
                <motion.li 
                  key={item} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 15, fontWeight: 600 }}
                >
                  <span style={{ color: accent, fontSize: 18 }}>✓</span> {item}
                </motion.li>
              ))}
            </ul>
            <motion.button 
              onClick={() => onNavigate('contact')} 
              className="interactive"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ background: accent, color: textDark, border: 'none', borderRadius: 12, padding: '16px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 25px rgba(216, 159, 62,0.2)' }}
            >
              Connect with Franchise Team →
            </motion.button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.4)', height: '420px', position: 'relative' }}
          >
            <img src="/franchise-bg.png" alt="Mows Franchise Partner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </div>
      </FlowSection>

      {/* 5. Testimonials FlowSection */}
      <FlowSection aria-label="Testimonials" style={{ backgroundColor: 'var(--color-pure-white)' }}>
        <div style={{ maxWidth: 1100, margin: 'auto', width: '100%' }}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.p variants={itemVariants} style={{ fontSize: 13, color: 'var(--color-amber-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, textAlign: 'center', fontWeight: 700 }}>Member stories</motion.p>
            <motion.h2 variants={itemVariants} style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', margin: '0 0 3rem', textAlign: 'center' }}>Loved by builders</motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}
          >
            {testimonials.map((t, i) => (
              <motion.div 
                key={t.name} 
                variants={itemVariants}
                className="glass-panel" 
                style={{ borderRadius: 24, padding: '2rem' }}
              >
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {[...Array(t.rating)].map((_, i) => <span key={i} style={{ color: '#fbbf24', fontSize: 16 }}>★</span>)}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: textDark, margin: '0 0 24px', fontWeight: 500 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div className="glass-panel-heavy" style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 800, color: textDark }}>
                    {t.name.split(' ').map(w => w[0]).join('')}
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 800, margin: '0 0 2px' }}>{t.name}</p>
                    <p style={{ fontSize: 12, color: textLight, margin: 0, fontWeight: 600 }}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </FlowSection>

      {/* 6. CTA FlowSection */}
      <FlowSection aria-label="CTA Banner" style={{ backgroundColor: 'var(--color-pure-white)' }}>
        <div style={{ width: '100%', maxWidth: 1100, margin: 'auto' }}>
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass-panel" 
            style={{ borderRadius: 32, padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
          >
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'var(--color-amber-gold)', borderRadius: '50%', filter: 'blur(150px)', opacity: 0.4 }}
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ position: 'absolute', bottom: -100, left: -100, width: 300, height: 300, background: accent, borderRadius: '50%', filter: 'blur(150px)', opacity: 0.2 }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: textDark, margin: '0 0 1.5rem' }}>Ready to find your space?</h2>
              <p style={{ fontSize: 18, color: 'rgba(23, 79, 80, 0.8)', margin: '0 auto 2.5rem', maxWidth: 540, lineHeight: 1.6, fontWeight: 600 }}>Book a free tour at any Mows location. No commitment needed. Experience the environment firsthand.</p>
              <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button 
                  onClick={() => onNavigate('booking')} 
                  className="interactive"
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ background: textDark, color: '#fff', border: 'none', borderRadius: 100, padding: '16px 32px', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 10px 25px rgba(23, 79, 80,0.2)' }}
                >
                  Book a desk now
                </motion.button>
                <motion.button 
                  onClick={() => onNavigate('contact')} 
                  className="glass-panel interactive" 
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.8)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{ color: textDark, border: 'none', borderRadius: 100, padding: '16px 32px', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}
                >
                  Request a tour
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </FlowSection>

    </FlowArt>
  );
}
