import { useState } from 'react';

const textDark = 'var(--color-forest-teal)';
const textLight = 'rgba(23, 79, 80, 0.7)';
const border = 'rgba(255, 255, 255, 0.4)';

const spaceTypes = ['Hot Desk', 'Dedicated Desk', 'Private Cabin', 'Meeting Room'];
const locationNames = ['Kochi Central', 'Infopark', 'Kakkanad', 'Thrissur Hub', 'Kozhikode Bay', 'Calicut Tech'];
const durations = ['Day pass', '1 week', '1 month', '3 months', '6 months', '1 year'];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function MiniCalendar({ selected, onSelect }) {
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array(firstDay).fill(null).concat([...Array(daysInMonth)].map((_, i) => i + 1));
  while (cells.length % 7 !== 0) cells.push(null);

  function isPast(d) {
    if (!d) return true;
    const date = new Date(year, month, d);
    date.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return date < t;
  }

  function isSelected(d) {
    if (!d || !selected) return false;
    return selected.getDate() === d && selected.getMonth() === month && selected.getFullYear() === year;
  }

  function prevMonth() {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
  }

  return (
    <div className="glass-panel" style={{ borderRadius: 16, padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button onClick={prevMonth} className="glass-panel-heavy" style={{ border: 'none', color: textDark, cursor: 'pointer', fontSize: 18, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>‹</button>
        <span style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Georgia, serif', color: textDark }}>{MONTHS[month]} {year}</span>
        <button onClick={nextMonth} className="glass-panel-heavy" style={{ border: 'none', color: textDark, cursor: 'pointer', fontSize: 18, width: 36, height: 36, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {DAYS.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, color: textLight, padding: '4px 0', fontWeight: 600, textTransform: 'uppercase' }}>{d}</div>)}
        {cells.map((d, i) => (
          <div key={i} onClick={() => { if (d && !isPast(d)) onSelect(new Date(year, month, d)); }}
            style={{ textAlign: 'center', padding: '8px 4px', fontSize: 14, borderRadius: 10, cursor: d && !isPast(d) ? 'pointer' : 'default', background: isSelected(d) ? textDark : 'transparent', color: isSelected(d) ? '#fff' : isPast(d) ? 'rgba(23, 79, 80,0.2)' : textDark, fontWeight: isSelected(d) ? 700 : 500, transition: 'background 0.15s' }}
            onMouseEnter={e => { if (d && !isPast(d) && !isSelected(d)) e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; }}
            onMouseLeave={e => { if (!isSelected(d)) e.currentTarget.style.background = 'transparent'; }}>
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BookingPage({ onNavigate, preselectedPlan = '' }) {
  const [isEnquiry, setIsEnquiry] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    space: preselectedPlan,
    location: '',
    duration: '',
    date: null,
    name: '',
    email: '',
    phone: '',
    company: '',
  });
  const [done, setDone] = useState(false);

  function update(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function canNext() {
    if (isEnquiry) return form.name && form.email && form.phone;
    if (step === 1) return form.space && form.location && form.duration;
    if (step === 2) return form.date;
    if (step === 3) return form.name && form.email && form.phone;
    return true;
  }

  function reset() {
    setDone(false);
    setStep(1);
    setForm({ space: '', location: '', duration: '', date: null, name: '', email: '', phone: '', company: '' });
  }

  const steps = ['Choose space', 'Pick a date', 'Your details', 'Confirm'];

  if (done) return (
    <div style={{ color: textDark, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <div className="glass-panel" style={{ textAlign: 'center', maxWidth: 440, padding: '3rem', animation: 'fadeUp 0.4s ease both', borderRadius: 32 }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(16,185,129,0.1)', border: `2px solid #10b981`, color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 1.5rem' }}>✓</div>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 32, marginBottom: 10, letterSpacing: '-0.02em', color: textDark }}>{isEnquiry ? 'Enquiry sent!' : "You're booked!"}</h2>
        <p style={{ color: textLight, lineHeight: 1.7, marginBottom: 28, fontSize: 15, fontWeight: 500 }}>
          {isEnquiry ? (
            <>Thanks for reaching out! We will contact you at <strong style={{ color: textDark }}>{form.email}</strong> shortly.</>
          ) : (
            <>
              Confirmation sent to <strong style={{ color: textDark }}>{form.email}</strong>.<br />
              We'll send your access details 24 hours before your visit.
            </>
          )}
        </p>
        {!isEnquiry && (
          <div className="glass-panel-heavy" style={{ borderRadius: 16, padding: '1.5rem', textAlign: 'left', marginBottom: 24 }}>
            {[['Space', form.space], ['Location', 'Mows ' + form.location], ['Duration', form.duration], ['Start date', form.date?.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.4)' }}>
                <span style={{ fontSize: 13, color: textLight, fontWeight: 600 }}>{k}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: textDark }}>{v}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} style={{ background: textDark, color: '#fff', border: 'none', borderRadius: 100, padding: '14px 28px', fontSize: 14, fontWeight: 800, cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={e => e.currentTarget.style.transform = 'none'}>{isEnquiry ? 'New enquiry' : 'Book another'}</button>
          <button className="glass-panel" onClick={() => onNavigate('home')} style={{ color: textDark, borderRadius: 100, padding: '14px 28px', fontSize: 14, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.8)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.4)'}>Back to home</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ color: textDark, minHeight: '100vh', position: 'relative' }}>
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '8rem 2rem 4rem' }}>

        <div className="animate-fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p style={{ fontSize: 13, color: 'var(--color-amber-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 800 }}>Get started</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, margin: '0 0 1.5rem', fontFamily: 'Georgia, serif', letterSpacing: '-0.02em' }}>
            {isEnquiry ? 'Make an Enquiry' : 'Book your desk'}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: '2rem' }}>
            <span style={{ fontSize: 14, fontWeight: !isEnquiry ? 800 : 500, color: textDark }}>Booking</span>
            <div 
              onClick={() => { setIsEnquiry(!isEnquiry); setStep(1); }}
              style={{ width: 50, height: 28, borderRadius: 20, background: 'rgba(255,255,255,0.4)', border: `1px solid ${border}`, position: 'relative', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: 2 }}
            >
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: textDark, position: 'absolute', left: isEnquiry ? 24 : 4, transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)' }} />
            </div>
            <span style={{ fontSize: 14, fontWeight: isEnquiry ? 800 : 500, color: textDark }}>Enquiry</span>
          </div>

          {/* Step progress */}
          {!isEnquiry && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              {steps.map((label, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                    <div className={step > i + 1 ? "" : "glass-panel"} style={{ width: 32, height: 32, borderRadius: '50%', background: step > i + 1 ? textDark : 'rgba(255,255,255,0.4)', border: `1px solid ${step >= i + 1 ? textDark : border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: step > i + 1 ? '#fff' : step === i + 1 ? textDark : textLight, fontWeight: 700, transition: 'all 0.3s' }}>
                      {step > i + 1 ? '✓' : i + 1}
                    </div>
                    <span style={{ fontSize: 11, color: step === i + 1 ? textDark : textLight, whiteSpace: 'nowrap', fontWeight: step === i + 1 ? 700 : 600 }}>{label}</span>
                  </div>
                  {i < 3 && <div style={{ width: 40, height: 2, background: step > i + 1 ? textDark : border, marginBottom: 20, transition: 'background 0.3s' }}></div>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="glass-panel animate-fade-up delay-100" style={{ borderRadius: 32, padding: '3rem', marginBottom: '2rem' }}>

          {isEnquiry ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeUp 0.3s ease' }}>
              <p style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: textDark }}>Enquiry details</p>
              {[['Name', 'name', 'Full name', 'text'], ['Email', 'email', 'you@example.com', 'email'], ['Phone', 'phone', '+91 98765 43210', 'tel']].map(([label, key, ph, type]) => (
                <div key={key}>
                  <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>{label} <span style={{ color: '#dc2626' }}>*</span></label>
                  <input type={type} value={form[key]} onChange={e => update(key, e.target.value)} placeholder={ph}
                    className="glass-input"
                    style={{ width: '100%', borderRadius: 16, padding: '16px 20px', fontSize: 16, color: textDark, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>How can we help?</label>
                <textarea rows="4" value={form.company} onChange={e => update('company', e.target.value)} placeholder="Tell us about your requirements..." className="glass-input" style={{ width: '100%', borderRadius: 16, padding: '16px 20px', fontSize: 16, color: textDark, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s', resize: 'vertical' }}></textarea>
              </div>
            </div>
          ) : step === 1 && (
            <div style={{ animation: 'fadeUp 0.3s ease' }}>
              <p style={{ fontSize: 16, fontWeight: 800, margin: '0 0 1rem', color: textDark }}>What type of space?</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: '2rem' }}>
                {spaceTypes.map(s => (
                  <button key={s} onClick={() => update('space', s)} className={form.space === s ? '' : 'glass-panel'} style={{ background: form.space === s ? textDark : undefined, border: form.space === s ? 'none' : undefined, borderRadius: 16, padding: '16px', fontSize: 14, fontWeight: form.space === s ? 700 : 600, color: form.space === s ? '#fff' : textDark, cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}>{s}</button>
                ))}
              </div>
              <p style={{ fontSize: 16, fontWeight: 800, margin: '0 0 1rem', color: textDark }}>Which location?</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginBottom: '2rem' }}>
                {locationNames.map(l => (
                  <button key={l} onClick={() => update('location', l)} className={form.location === l ? '' : 'glass-panel'} style={{ background: form.location === l ? textDark : undefined, border: form.location === l ? 'none' : undefined, borderRadius: 16, padding: '14px', fontSize: 13, fontWeight: form.location === l ? 700 : 600, color: form.location === l ? '#fff' : textDark, cursor: 'pointer', transition: 'all 0.15s', textAlign: 'left' }}>{l}</button>
                ))}
              </div>
              <p style={{ fontSize: 16, fontWeight: 800, margin: '0 0 1rem', color: textDark }}>How long?</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {durations.map(d => (
                  <button key={d} onClick={() => update('duration', d)} className={form.duration === d ? '' : 'glass-panel'} style={{ background: form.duration === d ? textDark : undefined, border: form.duration === d ? 'none' : undefined, borderRadius: 100, padding: '10px 20px', fontSize: 13, color: form.duration === d ? '#fff' : textDark, cursor: 'pointer', fontWeight: form.duration === d ? 700 : 600, transition: 'all 0.15s' }}>{d}</button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: 'fadeUp 0.3s ease' }}>
              <p style={{ fontSize: 16, fontWeight: 800, margin: '0 0 1.5rem', color: textDark }}>When do you want to start?</p>
              <MiniCalendar selected={form.date} onSelect={d => update('date', d)} />
              {form.date && <p className="glass-panel-heavy" style={{ fontSize: 14, color: textDark, marginTop: 24, textAlign: 'center', fontWeight: 700, padding: '12px', borderRadius: 100 }}>📅 {form.date.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>}
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeUp 0.3s ease' }}>
              <p style={{ fontSize: 18, fontWeight: 800, margin: '0 0 8px', color: textDark }}>Your details</p>
              {[['Name', 'name', 'Full name', 'text'], ['Email', 'email', 'you@example.com', 'email'], ['Phone', 'phone', '+91 98765 43210', 'tel'], ['Company', 'company', 'Optional', 'text']].map(([label, key, ph, type]) => (
                <div key={key}>
                  <label style={{ fontSize: 12, color: textDark, display: 'block', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 800 }}>{label}{key !== 'company' && <span style={{ color: '#dc2626' }}> *</span>}</label>
                  <input type={type} value={form[key]} onChange={e => update(key, e.target.value)} placeholder={ph}
                    className="glass-input"
                    style={{ width: '100%', borderRadius: 16, padding: '16px 20px', fontSize: 16, color: textDark, outline: 'none', boxSizing: 'border-box', transition: 'all 0.2s' }}
                  />
                </div>
              ))}
            </div>
          )}

          {step === 4 && (
            <div style={{ animation: 'fadeUp 0.3s ease' }}>
              <p style={{ fontSize: 18, fontWeight: 800, margin: '0 0 1.5rem', color: textDark }}>Review your booking</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['Space type', form.space], ['Location', 'Mows ' + form.location], ['Duration', form.duration], ['Start date', form.date?.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })], ['Name', form.name], ['Email', form.email], ['Phone', form.phone], form.company && ['Company', form.company]].filter(Boolean).map(([k, v]) => v && (
                  <div key={k} className="glass-panel-heavy" style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 20px', borderRadius: 16 }}>
                    <span style={{ fontSize: 14, color: textLight, fontWeight: 600 }}>{k}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: textDark, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 12, color: textLight, marginTop: 24, textAlign: 'center', fontWeight: 500 }}>By confirming, you agree to our Terms & Cancellation Policy.</p>
            </div>
          )}
        </div>

        <div className="animate-fade-up delay-200" style={{ display: 'flex', gap: 16 }}>
          {!isEnquiry && step > 1 && <button onClick={() => setStep(s => s - 1)} className="glass-panel" style={{ flex: 1, color: textDark, borderRadius: 100, padding: '18px', fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.8)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.4)'; e.currentTarget.style.transform = 'none'; }}
          >← Back</button>}
          <button
            onClick={() => {
              if (isEnquiry) {
                setDone(true);
              } else {
                step < 4 ? setStep(s => s + 1) : setDone(true)
              }
            }}
            disabled={!canNext()}
            style={{ flex: 2, background: canNext() ? textDark : 'rgba(23, 79, 80,0.1)', color: canNext() ? '#fff' : 'rgba(23, 79, 80,0.4)', border: 'none', borderRadius: 100, padding: '18px', fontSize: 16, fontWeight: 800, cursor: canNext() ? 'pointer' : 'default', transition: 'all 0.2s', boxShadow: canNext() ? '0 10px 25px rgba(23, 79, 80,0.2)' : 'none' }}
            onMouseEnter={e => { if(canNext()) e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { if(canNext()) e.currentTarget.style.transform = 'none' }}
          >
            {isEnquiry ? 'Send Enquiry →' : step === 4 ? 'Confirm booking →' : 'Continue →'}
          </button>
        </div>
      </div>
    </div>
  );
}

