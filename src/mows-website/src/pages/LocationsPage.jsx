import { useState } from 'react';
import { locations } from '../data';

const textDark = 'var(--color-forest-teal)';
const textLight = 'rgba(23, 79, 80, 0.7)';

function dotColor(avail) {
  if (avail === 'open') return '#059669';
  if (avail === 'limited') return '#d97706';
  return '#dc2626';
}
function availLabel(avail) {
  if (avail === 'open') return 'Available';
  if (avail === 'limited') return 'Limited';
  return 'Full';
}

export default function LocationsPage({ onNavigate }) {
  const [view, setView] = useState('list');
  const [activeId, setActiveId] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [search, setSearch] = useState('');
  const [cityFilter, setCityFilter] = useState('all');
  const [imgErrors, setImgErrors] = useState({});

  const cities = ['all', ...Array.from(new Set(locations.map(l => l.city)))];

  const filtered = locations.filter(l => {
    const matchCity = cityFilter === 'all' || l.city === cityFilter;
    const matchSearch = !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.area.toLowerCase().includes(search.toLowerCase());
    return matchCity && matchSearch;
  });

  const selected = locations.find(l => l.id === activeId);

  function selectLoc(id) {
    setPlaying(false);
    setActiveId(prev => prev === id ? null : id);
  }

  function thumbUrl(videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  return (
    <div style={{ color: textDark, minHeight: '100vh', position: 'relative' }}>
      
      {/* Header */}
      <section style={{ minHeight: '60vh', padding: '0 2rem', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
          <img src="/locations-bg.png" alt="Mows Locations" className="animate-fade-scale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(253,253,253,1) 0%, rgba(253,253,253,0) 50%)' }}></div>
        </div>
        <div className="animate-fade-up glass-panel-heavy" style={{ padding: '4rem', maxWidth: 800, width: '100%', margin: '6rem auto 0', textAlign: 'center', borderRadius: 40 }}>
          <p style={{ fontSize: 13, color: 'var(--color-amber-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 800 }}>Our network</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', margin: '0 0 1rem', color: textDark }}>Find your Mows</h1>
          <p style={{ fontSize: 18, color: textDark, margin: '0 auto', maxWidth: 600, lineHeight: 1.6, fontWeight: 600 }}>6 locations across Kerala — each designed to provide an inspiring, distraction-free environment for professionals.</p>
        </div>
      </section>

      {/* Stats */}
      <div className="animate-fade-up delay-100" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 2rem', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {[['6', 'Locations'], ['3', 'Cities'], ['480+', 'Seats'], ['24/7', 'At select spaces']].map(([n, l]) => (
          <div key={l} className="glass-panel" style={{ borderRadius: 24, padding: '1.5rem 2rem', flex: 1, minWidth: 120 }}>
            <p style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>{n}</p>
            <p style={{ fontSize: 13, color: textLight, margin: '4px 0 0', fontWeight: 600 }}>{l}</p>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="animate-fade-up delay-200" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 2rem', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search locations…"
          className="glass-input"
          style={{ flex: 1, minWidth: 200, borderRadius: 100, padding: '14px 24px', fontSize: 15, outline: 'none' }} />
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {cities.map(c => (
            <button key={c} onClick={() => setCityFilter(c)} className={cityFilter === c ? 'glass-panel-heavy' : 'glass-panel'} style={{
              color: textDark, borderRadius: 100, padding: '10px 20px', fontSize: 14, fontWeight: cityFilter === c ? 800 : 600, cursor: 'pointer', transition: 'all 0.2s',
              border: cityFilter === c ? '1px solid rgba(23, 79, 80,0.3) !important' : undefined
            }}>{c === 'all' ? 'All cities' : c}</button>
          ))}
        </div>
        <div className="glass-panel" style={{ display: 'flex', borderRadius: 100, overflow: 'hidden' }}>
          {['list', 'grid'].map(v => (
            <button key={v} onClick={() => { setView(v); setActiveId(null); setPlaying(false); }} style={{
              background: view === v ? 'rgba(23, 79, 80, 0.08)' : 'transparent',
              color: textDark, border: 'none', padding: '12px 20px', cursor: 'pointer', fontSize: 18, transition: 'background 0.2s'
            }}>{v === 'list' ? '☰' : '⊞'}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="animate-fade-up delay-300" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 2rem 6rem' }}>
        {view === 'list' ? (
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* List */}
            <div style={{ flex: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filtered.length === 0 && (
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: textLight, borderRadius: 24 }}>No locations match your search.</div>
              )}
              {filtered.map(loc => (
                <div key={loc.id} onClick={() => selectLoc(loc.id)}
                  className={activeId === loc.id ? 'glass-panel-heavy' : 'glass-panel'}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', borderRadius: 24, cursor: 'pointer', transition: 'all 0.2s', border: activeId === loc.id ? '1px solid rgba(23, 79, 80,0.2) !important' : undefined }}
                  onMouseEnter={e => { if (activeId !== loc.id) e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { if (activeId !== loc.id) e.currentTarget.style.transform = 'none'; }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, overflow: 'hidden', flexShrink: 0, background: 'rgba(255,255,255,0.5)' }}>
                    {!imgErrors[loc.id] ? (
                      <img src={loc.image || thumbUrl(loc.videoId)} alt={loc.name}
                        onError={() => setImgErrors(p => ({ ...p, [loc.id]: true }))}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🏢</div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 16, fontWeight: 800, margin: '0 0 4px', color: textDark }}>{loc.name}</p>
                    <p style={{ fontSize: 14, color: textLight, margin: 0, fontWeight: 500 }}>📍 {loc.area}</p>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: textDark, fontWeight: 700 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: dotColor(loc.avail) }}></span>
                      {availLabel(loc.avail)}
                    </span>
                    <span style={{ fontSize: 12, color: textLight, fontWeight: 500 }}>{loc.seats} seats</span>
                    {activeId !== loc.id && <span style={{ fontSize: 11, color: 'var(--color-amber-gold)', fontWeight: 800, marginTop: 2, textTransform: 'uppercase' }}>▶ Preview</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Video panel */}
            <div style={{ width: 360, flexShrink: 0 }}>
              {!selected ? (
                <div className="glass-panel" style={{ borderRadius: 32, padding: '6rem 2rem', textAlign: 'center', color: textLight }}>
                  <p className="animate-float" style={{ fontSize: 48, margin: '0 0 20px', opacity: 0.2 }}>▶</p>
                  <p style={{ fontSize: 15, margin: 0, lineHeight: 1.6, fontWeight: 500 }}>Select a location to preview its space</p>
                </div>
              ) : (
                <div className="glass-panel-heavy animate-fade-scale" style={{ borderRadius: 32, overflow: 'hidden' }}>
                  <div onClick={() => setPlaying(p => !p)} style={{ position: 'relative', height: 200, background: 'rgba(0,0,0,0.1)', cursor: 'pointer', overflow: 'hidden' }}>
                    {playing ? (
                      <iframe src={`https://www.youtube.com/embed/${selected.videoId}?autoplay=1&mute=1`} style={{ width: '100%', height: '100%', border: 'none' }} allow="autoplay; encrypted-media" allowFullScreen title={selected.name} />
                    ) : (
                      <>
                        <img src={selected.image || thumbUrl(selected.videoId)} alt={selected.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12, background: 'rgba(0,0,0,0.2)' }}>
                          <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#fff', border: '1px solid rgba(255,255,255,0.5)' }}>▶</div>
                          <span style={{ fontSize: 13, color: '#fff', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Watch preview</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div style={{ padding: '2rem' }}>
                    <p style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px', color: textDark }}>{selected.name}</p>
                    <p style={{ fontSize: 15, color: textLight, margin: '0 0 20px', fontWeight: 500 }}>📍 {selected.area} · {selected.seats} seats</p>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                      {selected.tags.map(t => <span key={t} className="glass-panel" style={{ fontSize: 12, padding: '6px 12px', borderRadius: 100, color: textDark, fontWeight: 600 }}>{t}</span>)}
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                      <button onClick={() => onNavigate('booking')} style={{ flex: 1, background: textDark, color: '#fff', border: 'none', borderRadius: 100, padding: '14px', fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'transform 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'none'}>Book desk</button>
                      <button onClick={() => onNavigate('contact')} className="glass-panel" style={{ flex: 1, color: textDark, borderRadius: 100, padding: '14px', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}>Book tour</button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {selected.amenities.map(a => (
                        <span key={a} style={{ fontSize: 12, padding: '6px 12px', borderRadius: 8, background: 'rgba(255,255,255,0.5)', color: textDark, border: `1px solid rgba(255,255,255,0.6)`, fontWeight: 500 }}>✓ {a}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Mobile query */}
            <style>{`@media(max-width:800px){div[style*="width: 360px"]{width:100% !important;}}`}</style>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 32 }}>
            {filtered.map((loc, i) => (
              <div key={loc.id} onClick={() => onNavigate('booking')} className="animate-fade-up glass-panel" style={{ animationDelay: `${i * 100}ms`, borderRadius: 32, overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.querySelector('img').style.transform = 'scale(1.05)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.querySelector('img').style.transform = 'scale(1)'; }}>
                <div style={{ height: 200, background: 'rgba(0,0,0,0.05)', overflow: 'hidden', position: 'relative' }}>
                  {!imgErrors[`g${loc.id}`] ? (
                    <img src={loc.image || thumbUrl(loc.videoId)} alt={loc.name}
                      onError={() => setImgErrors(p => ({ ...p, [`g${loc.id}`]: true }))}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🏢</div>
                  )}
                  <span className="glass-panel-heavy" style={{ position: 'absolute', top: 16, right: 16, padding: '6px 14px', borderRadius: 100, fontSize: 12, fontWeight: 800, color: dotColor(loc.avail) }}>{availLabel(loc.avail)}</span>
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <p style={{ fontSize: 20, fontWeight: 800, margin: 0 }}>{loc.name}</p>
                    <span style={{ fontSize: 13, color: textLight, fontWeight: 600 }}>{loc.seats} seats</span>
                  </div>
                  <p style={{ fontSize: 15, color: textLight, margin: '0 0 20px', fontWeight: 500 }}>📍 {loc.area}</p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {loc.tags.map(t => <span key={t} className="glass-panel" style={{ fontSize: 12, padding: '6px 12px', borderRadius: 100, color: textDark, fontWeight: 600 }}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

