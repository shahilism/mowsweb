import { useState } from 'react';
import { events } from '../data';

const accent = 'var(--color-amber-gold)';
const textDark = 'var(--color-forest-teal)';
const textLight = 'rgba(23, 79, 80, 0.7)';

export default function EventsPage({ onNavigate }) {
  const [filter, setFilter] = useState('All');
  
  // Get unique categories including 'All'
  const categories = ['All', ...new Set(events.map(e => e.type))];

  const filteredEvents = filter === 'All' 
    ? events 
    : events.filter(e => e.type === filter);

  return (
    <div style={{ color: textDark, paddingTop: '120px', paddingBottom: '8rem', minHeight: '100vh' }}>
      
      {/* Header */}
      <section style={{ padding: '0 2rem', maxWidth: 1200, margin: '0 auto', textAlign: 'center', marginBottom: '4rem' }}>
        <p className="animate-fade-up" style={{ fontSize: 13, color: 'var(--color-amber-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 800 }}>
          Community & Growth
        </p>
        <h1 className="animate-fade-up delay-100" style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 900, letterSpacing: '-0.03em', margin: '0 0 1.5rem', lineHeight: 1.1 }}>
          Upcoming Events
        </h1>
        <p className="animate-fade-up delay-200" style={{ fontSize: '1.2rem', color: textLight, maxWidth: 600, margin: '0 auto', lineHeight: 1.6, fontWeight: 500 }}>
          Join workshops, pitch clinics, and networking mixers designed to help you connect, learn, and grow.
        </p>
      </section>

      {/* Filters */}
      <section className="animate-fade-up delay-300" style={{ padding: '0 2rem', maxWidth: 1200, margin: '0 auto 3rem', display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat)}
            style={{
              background: filter === cat ? textDark : 'rgba(255, 255, 255, 0.4)',
              color: filter === cat ? '#fff' : textDark,
              border: filter === cat ? 'none' : '1px solid rgba(23, 79, 80, 0.1)',
              padding: '10px 24px',
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s',
              backdropFilter: 'blur(10px)'
            }}
            onMouseEnter={e => { if (filter !== cat) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)' }}
            onMouseLeave={e => { if (filter !== cat) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.4)' }}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Events Grid */}
      <section style={{ padding: '0 2rem', maxWidth: 1200, margin: '0 auto' }}>
        {filteredEvents.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: textLight }}>
            <p style={{ fontSize: 18, fontWeight: 600 }}>No events found for this category.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
            {filteredEvents.map((event, i) => (
              <div 
                key={event.id} 
                className="animate-fade-up glass-panel" 
                style={{ animationDelay: `${i * 100}ms`, borderRadius: 24, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                {/* Image */}
                <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                  <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', padding: '6px 12px', borderRadius: 100, fontSize: 12, fontWeight: 800, color: textDark }}>
                    {event.type}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                    <div style={{ background: '#f8fafc', borderRadius: 12, padding: '8px 12px', textAlign: 'center', minWidth: 60, border: '1px solid #e2e8f0' }}>
                      <p style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-amber-gold)', margin: 0, textTransform: 'uppercase' }}>{event.date.split(' ')[0]}</p>
                      <p style={{ fontSize: 20, fontWeight: 900, color: textDark, margin: '-2px 0 0', lineHeight: 1.2 }}>{event.date.split(' ')[1].replace(',', '')}</p>
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: textLight, margin: '0 0 4px' }}>
                        🕒 {event.time}
                      </p>
                      <p style={{ fontSize: 14, fontWeight: 700, color: textLight, margin: 0 }}>
                        📍 {event.location}
                      </p>
                    </div>
                  </div>

                  <h3 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 12px', lineHeight: 1.3 }}>{event.title}</h3>
                  <p style={{ fontSize: 15, color: textLight, margin: '0 0 24px', lineHeight: 1.6, flex: 1 }}>{event.desc}</p>

                  <button 
                    onClick={() => {
                      alert('Registration for ' + event.title + ' is coming soon!');
                    }}
                    style={{
                      width: '100%',
                      padding: '14px',
                      background: 'transparent',
                      border: '2px solid #e2e8f0',
                      borderRadius: 100,
                      fontSize: 15,
                      fontWeight: 800,
                      color: textDark,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = textDark; e.currentTarget.style.background = '#fff'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.background = 'transparent'; }}
                  >
                    RSVP Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

