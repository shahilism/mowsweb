import { useState } from 'react';

const textDark = 'var(--color-forest-teal)';
const textLight = 'rgba(23, 79, 80, 0.7)';

const events = [
  { id: 1, date: 'May 14', title: 'Founder Fireside: Scaling in Kerala', loc: 'Kochi Central', type: 'Networking', spots: 12 },
  { id: 2, date: 'May 18', title: 'Design Sprint Workshop', loc: 'Infopark', type: 'Workshop', spots: 8 },
  { id: 3, date: 'May 22', title: 'AI & Automation for SMBs', loc: 'Thrissur Hub', type: 'Talk', spots: 30 },
  { id: 4, date: 'May 28', title: 'Monthly Member Mixer', loc: 'Kozhikode Bay', type: 'Social', spots: 50 },
  { id: 5, date: 'Jun 5', title: 'Product Demo Day', loc: 'Kochi Central', type: 'Showcase', spots: 40 },
  { id: 6, date: 'Jun 12', title: 'Freelancer Fundamentals', loc: 'Kakkanad', type: 'Workshop', spots: 15 },
];

const typeColors = { Networking: '#059669', Workshop: '#2563eb', Talk: 'var(--color-amber-gold)', Social: '#7c3aed', Showcase: '#0d9488' };

const blog = [
  { date: 'Apr 28', title: "Why Kochi is becoming South India's startup hub", tag: 'Ecosystem', read: '4 min' },
  { date: 'Apr 15', title: 'How 3 Mows members landed their first clients from the common area', tag: 'Member stories', read: '3 min' },
  { date: 'Apr 2', title: 'Hot desk vs dedicated desk: which is right for you?', tag: 'Guide', read: '5 min' },
];

export default function CommunityPage({ onNavigate }) {
  const [rsvpd, setRsvpd] = useState(new Set());
  const [spotCounts, setSpotCounts] = useState(() => Object.fromEntries(events.map(e => [e.id, e.spots])));

  function toggleRsvp(id) {
    setRsvpd(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setSpotCounts(s => ({ ...s, [id]: s[id] + 1 }));
      } else {
        next.add(id);
        setSpotCounts(s => ({ ...s, [id]: Math.max(0, s[id] - 1) }));
      }
      return next;
    });
  }

  return (
    <div style={{ color: textDark, minHeight: '100vh', position: 'relative' }}>
      <section style={{ minHeight: '60vh', padding: '0 2rem', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
          <img src="/community-bg.png" alt="Mows Community" className="animate-fade-scale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(253,253,253,1) 0%, rgba(253,253,253,0) 50%)' }}></div>
        </div>
        <div className="animate-fade-up glass-panel-heavy" style={{ padding: '4rem', maxWidth: 800, width: '100%', margin: '6rem auto 0', textAlign: 'center', borderRadius: 40 }}>
          <p style={{ fontSize: 13, color: 'var(--color-amber-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 800 }}>Mows community</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', margin: '0 0 1.5rem', color: textDark }}>More than a desk</h1>
          <p style={{ fontSize: 18, color: textDark, margin: '0 auto', maxWidth: 600, lineHeight: 1.6, fontWeight: 600 }}>Events, workshops, and connections that help you grow — included with every membership. Join a network of ambitious builders.</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem 6rem' }}>

        {/* Stat strip */}
        <div className="animate-fade-up delay-100" style={{ display: 'flex', gap: 20, marginBottom: '5rem', flexWrap: 'wrap' }}>
          {[['1,200+', 'Active members'], ['40+', 'Events per year'], ['18', 'Community partners'], ['₹2Cr+', 'Deals made here']].map(([n, l]) => (
            <div key={l} className="glass-panel" style={{ borderRadius: 24, padding: '2rem', flex: 1, minWidth: 150 }}>
              <p style={{ fontSize: 36, fontWeight: 800, margin: 0, color: textDark }}>{n}</p>
              <p style={{ fontSize: 14, color: textLight, margin: '8px 0 0', fontWeight: 600 }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Events */}
        <div className="animate-fade-up delay-200" style={{ marginBottom: '6rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>Upcoming events</h2>
            <span className="glass-panel" style={{ fontSize: 13, padding: '8px 16px', borderRadius: 100, color: textDark, fontWeight: 700 }}>Open to all members</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {events.map((e, i) => {
              const isRsvpd = rsvpd.has(e.id);
              const spots = spotCounts[e.id];
              const full = spots === 0;
              return (
                <div key={e.id} className={`animate-fade-up ${isRsvpd ? 'glass-panel-heavy' : 'glass-panel'}`} style={{ animationDelay: `${i * 100}ms`, display: 'flex', alignItems: 'center', gap: 24, borderRadius: 24, padding: '1.5rem 2rem', transition: 'all 0.3s', border: isRsvpd ? '1px solid var(--color-amber-gold) !important' : undefined }}>
                  {/* Date badge */}
                  <div style={{ width: 80, textAlign: 'center', flexShrink: 0, borderRight: `1px solid rgba(23, 79, 80,0.1)`, paddingRight: 24 }}>
                    <p style={{ fontSize: 13, color: textLight, margin: 0, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 800 }}>{e.date.split(' ')[0]}</p>
                    <p style={{ fontSize: 32, fontWeight: 800, margin: 0, color: textDark }}>{e.date.split(' ')[1]}</p>
                  </div>
                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 18, fontWeight: 800, margin: '0 0 6px', color: textDark }}>{e.title}</p>
                    <p style={{ fontSize: 14, color: textLight, margin: 0, fontWeight: 600 }}>📍 {e.loc}</p>
                  </div>
                  {/* Type + spots + RSVP */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10, flexShrink: 0 }}>
                    <span style={{ fontSize: 12, padding: '4px 12px', borderRadius: 20, background: 'rgba(255,255,255,0.7)', color: typeColors[e.type], fontWeight: 800 }}>{e.type}</span>
                    <span style={{ fontSize: 13, color: full ? '#dc2626' : textLight, fontWeight: 600 }}>{full ? 'Full' : `${spots} spots left`}</span>
                    <button
                      onClick={() => !full && toggleRsvp(e.id)}
                      disabled={full && !isRsvpd}
                      style={{
                        background: isRsvpd ? 'var(--color-amber-gold)' : 'rgba(255,255,255,0.5)',
                        color: isRsvpd ? '#fff' : full ? '#9ca3af' : textDark,
                        border: 'none',
                        borderRadius: 100, padding: '8px 20px', fontSize: 14, fontWeight: 800,
                        cursor: full && !isRsvpd ? 'default' : 'pointer', transition: 'all 0.2s',
                        boxShadow: isRsvpd ? '0 4px 12px rgba(216, 159, 62,0.3)' : 'none'
                      }}
                      onMouseEnter={e => { if (!isRsvpd && !full) { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                      onMouseLeave={e => { if (!isRsvpd && !full) { e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; e.currentTarget.style.transform = 'none'; } }}
                    >
                      {isRsvpd ? '✓ Registered' : full ? 'Waitlist' : 'RSVP'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          {rsvpd.size > 0 && (
            <div className="animate-fade-up glass-panel-heavy" style={{ marginTop: 32, padding: '1.5rem 2rem', borderRadius: 20, fontSize: 15, color: '#065f46', display: 'flex', alignItems: 'center', gap: 12, fontWeight: 600 }}>
              <span style={{ color: '#10b981', fontWeight: 800, fontSize: 20 }}>✓</span>
              You're registered for <strong style={{ color: '#065f46' }}>{rsvpd.size}</strong> event{rsvpd.size > 1 ? 's' : ''}. See you there!
            </div>
          )}
        </div>

        {/* Blog */}
        <div className="animate-fade-up delay-300" style={{ marginBottom: '6rem' }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: '0 0 2.5rem', letterSpacing: '-0.02em' }}>From the blog</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
            {blog.map((b, i) => (
              <div key={b.title} className="animate-fade-up glass-panel" style={{ animationDelay: `${i * 150}ms`, borderRadius: 32, padding: '2.5rem', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <span className="glass-panel-heavy" style={{ fontSize: 12, padding: '6px 14px', borderRadius: 100, color: textDark, fontWeight: 800 }}>{b.tag}</span>
                  <span style={{ fontSize: 13, color: textLight, fontWeight: 600 }}>{b.read} read</span>
                </div>
                <p style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.5, margin: '0 0 20px', color: textDark }}>{b.title}</p>
                <p style={{ fontSize: 14, color: textLight, margin: 0, fontWeight: 600 }}>{b.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="animate-fade-scale glass-panel-heavy" style={{ borderRadius: 40, padding: '6rem 2rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', margin: '0 0 1.5rem', letterSpacing: '-0.02em', color: textDark }}>Join a space, join a community</h2>
          <p style={{ fontSize: 18, color: textLight, margin: '0 auto 3rem', maxWidth: 540, lineHeight: 1.6, fontWeight: 500 }}>Every Mows membership includes access to all events and the member network.</p>
          <button onClick={() => onNavigate('booking')} style={{ background: textDark, color: '#fff', border: 'none', borderRadius: 100, padding: '18px 36px', fontSize: 16, fontWeight: 800, cursor: 'pointer', transition: 'transform 0.2s', boxShadow: '0 10px 25px rgba(23, 79, 80,0.2)' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>Get a membership →</button>
        </div>
      </div>
    </div>
  );
}

