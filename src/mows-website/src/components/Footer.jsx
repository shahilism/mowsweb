import React from 'react';

const textDark = 'var(--color-mist-teal)';
const textLight = 'rgba(232, 244, 244, 0.6)';
const border = 'rgba(255, 255, 255, 0.05)';

const links = {
  SPACES: ['Hot Desk', 'Dedicated Desk', 'Private Cabin', 'Meeting Rooms'],
  COMPANY: ['About us', 'Careers', 'Community', 'Contact'],
};

const linkMap = {
  'Hot Desk': 'spaces', 'Dedicated Desk': 'spaces', 'Private Cabin': 'spaces', 'Meeting Rooms': 'spaces',
  'Community': 'community', 'Contact': 'contact'
};

const socials = [
  { n: 'Facebook', u: 'facebook.com', i: '📘' },
  { n: 'Instagram', u: 'instagram.com', i: '📸' },
  { n: 'LinkedIn', u: 'linkedin.com', i: '💼' },
  { n: 'Dribbble', u: 'dribbble.com', i: '🏀' },
  { n: 'Behance', u: 'behance.net', i: '🎨' },
  { n: 'Pinterest', u: 'pinterest.com', i: '📌' },
];

export default function Footer({ onNavigate }) {
  function handleNav(label) {
    const route = linkMap[label];
    if (route) {
      onNavigate(route);
    }
  }

  return (
    <footer style={{ background: 'var(--color-deep-forest)', color: textDark, position: 'relative', overflow: 'hidden', fontFamily: "'Clash Grotesk', sans-serif" }}>
      {/* Vertical Grid Lines */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', justifyContent: 'space-between', pointerEvents: 'none', zIndex: 0 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ width: 1, height: '100%', background: 'linear-gradient(to bottom, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)' }}></div>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1400, margin: '0 auto', padding: '6rem 4rem 2rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '4rem', marginBottom: '8rem' }}>
          
          {/* Left Column - Branding */}
          <div style={{ flex: '1 1 400px', maxWidth: 500 }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 800, margin: '0 0 1rem', letterSpacing: '-0.03em', color: '#fff' }}>Smarter Workspaces</h2>
            <p style={{ fontSize: 16, color: textLight, lineHeight: 1.6, marginBottom: '2rem', fontWeight: 500 }}>
              PP TOWER, Bapputty by pass,<br />Thurakkal, Manjeri, Kerala 676121
            </p>
            <p style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: '2rem' }}>info@mows.in <br/> +91 97 78 27 121</p>
            <div style={{ display: 'flex', gap: 16 }}>
              {socials.map(s => (
                <a key={s.n} href={`https://${s.u}`} target="_blank" rel="noreferrer" title={s.n}
                  style={{ color: textLight, fontSize: 20, transition: 'color 0.2s', textDecoration: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = textLight}>
                  {s.i}
                </a>
              ))}
            </div>
          </div>

          {/* Right Columns - Links */}
          <div style={{ display: 'flex', gap: '6rem', flexWrap: 'wrap' }}>
            {Object.entries(links).map(([title, items]) => (
              <div key={title}>
                <p style={{ fontSize: 13, fontWeight: 800, marginBottom: 24, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {items.map(item => (
                    <li key={item}>
                      <button onClick={() => handleNav(item)} style={{ background: 'none', border: 'none', padding: 0, fontSize: 15, color: textLight, cursor: linkMap[item] ? 'pointer' : 'default', transition: 'color 0.2s', textAlign: 'left', fontWeight: 500 }}
                        onMouseEnter={e => { if(linkMap[item]) e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { if(linkMap[item]) e.currentTarget.style.color = textLight; }}>
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Massive Bottom Text */}
        <div style={{ textAlign: 'center', width: '100%', overflow: 'hidden', paddingBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
          <img src="/footer-logo.png" alt="MOWS" style={{ width: '100%', maxWidth: 1000, objectFit: 'contain', userSelect: 'none' }} />
        </div>
      </div>
    </footer>
  );
}


