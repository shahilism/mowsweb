import { useState } from 'react';

const textDark = 'var(--color-forest-teal)';
const textLight = 'rgba(23, 79, 80, 0.7)';
const border = 'rgba(255, 255, 255, 0.4)';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', mobile: '', preferredLocation: '', isFranchise: false, message: '' });
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div style={{ color: textDark, minHeight: '100vh', position: 'relative' }}>
      <section style={{ minHeight: '60vh', padding: '0 2rem', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
          <img src="/contact-bg.png" alt="Mows Contact" className="animate-fade-scale" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(253,253,253,1) 0%, rgba(253,253,253,0) 50%)' }}></div>
        </div>
        <div className="animate-fade-up glass-panel-heavy" style={{ padding: '4rem', maxWidth: 800, width: '100%', margin: '6rem auto 0', textAlign: 'center', borderRadius: 40 }}>
          <p style={{ fontSize: 13, color: 'var(--color-amber-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 800 }}>Investment & Franchise</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', margin: '0 0 1.5rem', color: textDark }}>Let's build together.</h1>
          <p style={{ fontSize: 18, color: textDark, margin: '0 auto', maxWidth: 600, lineHeight: 1.6, fontWeight: 600 }}>Partner with Mows. Whether you're looking for lucrative investment opportunities or wanting to open your own franchise location, our team is ready to help you succeed.</p>
        </div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem 6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '5rem', alignItems: 'flex-start' }}>

        <div className="animate-fade-up delay-100">

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { i: '📍', t: 'Headquarters', d: 'PP TOWER, Bapputty by pass, Manjeri, Kerala 676121' },
              { i: '✉️', t: 'Email us', d: 'info@mows.in' },
              { i: '📞', t: 'Call us', d: '+91 97 78 27 121' }
            ].map((item, i) => (
              <div key={item.t} className="glass-panel" style={{ display: 'flex', gap: 20, animationDelay: `${(i + 1) * 100}ms`, borderRadius: 24, padding: '1.5rem' }}>
                <div className="glass-panel-heavy" style={{ width: 48, height: 48, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                  {item.i}
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 800, margin: '0 0 4px' }}>{item.t}</p>
                  <p style={{ fontSize: 15, color: textLight, margin: 0, fontWeight: 600 }}>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="animate-fade-scale delay-200 glass-panel" style={{ borderRadius: 32, padding: '3rem' }}>
          {sent ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: `2px solid #10b981`, color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 1.5rem' }}>✓</div>
              <h2 style={{ fontSize: 28, margin: '0 0 1rem', fontWeight: 800 }}>Message sent</h2>
              <p style={{ color: textLight, fontSize: 16, margin: '0 0 2rem', fontWeight: 500 }}>Thanks for reaching out. Our team will get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="glass-panel-heavy" style={{ color: textDark, border: 'none', borderRadius: 100, padding: '14px 28px', fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }}>Send another</button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 1rem' }}>Send a message</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>Name <span style={{ color: '#dc2626' }}>*</span></label>
                  <input required type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="glass-input" style={{ width: '100%', borderRadius: 12, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>Company</label>
                  <input type="text" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="glass-input" style={{ width: '100%', borderRadius: 12, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                <div>
                  <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>Email <span style={{ color: '#dc2626' }}>*</span></label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="glass-input" style={{ width: '100%', borderRadius: 12, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>Mobile <span style={{ color: '#dc2626' }}>*</span></label>
                  <input required type="tel" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} className="glass-input" style={{ width: '100%', borderRadius: 12, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>Preferred Location</label>
                <input type="text" placeholder="e.g. Manjeri, Calicut..." value={form.preferredLocation} onChange={e => setForm({ ...form, preferredLocation: e.target.value })} className="glass-input" style={{ width: '100%', borderRadius: 12, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }} />
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0 8px' }}>
                <input 
                  type="checkbox" 
                  id="franchise" 
                  checked={form.isFranchise} 
                  onChange={e => setForm({ ...form, isFranchise: e.target.checked })}
                  style={{ width: 20, height: 20, accentColor: 'var(--color-amber-gold)', cursor: 'pointer' }}
                />
                <label htmlFor="franchise" style={{ fontSize: 15, color: textDark, fontWeight: 700, cursor: 'pointer' }}>
                  I'm interested in Franchise opportunities
                </label>
              </div>
              <div>
                <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>Message</label>
                <textarea rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="glass-input" style={{ width: '100%', borderRadius: 12, padding: '14px 16px', fontSize: 15, color: textDark, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s', resize: 'vertical' }}></textarea>
              </div>
              <button type="submit" style={{ background: textDark, color: '#fff', border: 'none', borderRadius: 100, padding: '18px', fontSize: 16, fontWeight: 800, cursor: 'pointer', transition: 'all 0.2s', marginTop: 10, boxShadow: '0 10px 25px rgba(23, 79, 80,0.2)' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                Send message →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

