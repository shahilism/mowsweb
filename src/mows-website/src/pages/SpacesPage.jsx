import { useState, useRef, useEffect } from 'react';
import { plans, locations } from '../data';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';

const accent = 'var(--color-amber-gold)';
const textDark = 'var(--color-forest-teal)';
const textLight = 'rgba(23, 79, 80, 0.7)';

const addons = [
  { icon: '🖨️', name: 'Printing credits', desc: '100 pages/mo', price: 300 },
  { icon: '📮', name: 'Mail handling', desc: 'Receive & forward', price: 500 },
  { icon: '🚗', name: 'Reserved parking', desc: 'Covered spot', price: 800 },
  { icon: '🖥️', name: 'Monitor rental', desc: '27" + peripherals', price: 600 },
];

function AnimatedNumber({ value }) {
  const nodeRef = useRef(null);
  
  useEffect(() => {
    const node = nodeRef.current;
    if (node) {
      const currentVal = parseInt(node.textContent.replace(/,/g, '')) || 0;
      const controls = animate(currentVal, value, {
        duration: 0.4,
        ease: "easeOut",
        onUpdate(v) {
          node.textContent = Math.round(v).toLocaleString('en-IN');
        }
      });
      return () => controls.stop();
    }
  }, [value]);

  return <span ref={nodeRef}>{value.toLocaleString('en-IN')}</span>;
}

function TiltCard({ children, className, style, onClick }) {
  const ref = useRef(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 40 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 40 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(30px)", display: "flex", flexDirection: "column", height: "100%" }}>
        {children}
      </div>
    </motion.div>
  );
}

export default function SpacesPage({ onNavigate }) {
  const [annual, setAnnual] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState(new Set());
  const [selectedLocId, setSelectedLocId] = useState(null);

  const loc = locations.find(l => l.id === selectedLocId);
  const multiplier = loc ? loc.priceMultiplier : 1;

  function toggleAddon(name) {
    setSelectedAddons(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }

  const addonTotal = addons.filter(a => selectedAddons.has(a.name)).reduce((s, a) => s + a.price, 0);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', color: textDark }}>
      <section style={{ minHeight: '60vh', padding: '0 2rem', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            src="/spaces-bg.png" 
            alt="Mows Spaces" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(253,253,253,1) 0%, rgba(253,253,253,0) 50%)' }}></div>
        </div>
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-panel-heavy" 
          style={{ maxWidth: 800, width: '100%', borderRadius: 40, padding: '4rem', textAlign: 'center', marginTop: '6rem' }}
        >
          <p style={{ fontSize: 13, color: 'var(--color-amber-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10, fontWeight: 800 }}>Plans & pricing</p>
          <h1 style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', margin: '0 0 1.5rem', color: textDark }}>Find your fit</h1>
          <p style={{ fontSize: 18, color: textDark, margin: '0 auto 3rem', maxWidth: 600, fontWeight: 600 }}>All plans include premium Wi-Fi, unlimited tea & coffee, and access to all common areas.</p>

          {/* Billing toggle */}
          <div className="glass-panel interactive" style={{ display: 'inline-flex', alignItems: 'center', gap: 16, borderRadius: 100, padding: '8px 24px', background: 'rgba(255,255,255,0.8) !important' }}>
            <span style={{ fontSize: 15, fontWeight: !annual ? 800 : 600, color: !annual ? textDark : textLight, cursor: 'pointer', transition: 'color 0.2s' }} onClick={() => setAnnual(false)}>Monthly</span>
            <div onClick={() => setAnnual(a => !a)} style={{ width: 48, height: 26, background: annual ? 'var(--color-amber-gold)' : 'rgba(23, 79, 80,0.1)', borderRadius: 13, position: 'relative', cursor: 'pointer', transition: 'background 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}>
              <motion.div 
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{ position: 'absolute', top: 3, left: annual ? 25 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} 
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setAnnual(true)}>
              <span style={{ fontSize: 15, fontWeight: annual ? 800 : 600, color: annual ? textDark : textLight, transition: 'color 0.2s' }}>Annual</span>
              <motion.span 
                animate={{ y: [0, -4, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="glass-panel-heavy" style={{ fontSize: 12, color: '#059669', padding: '4px 12px', borderRadius: 20, fontWeight: 800 }}
              >
                Save 20%
              </motion.span>
            </div>
          </div>
        </motion.div>
      </section>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '4rem 2rem 6rem' }}>
        
        {/* Location Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontSize: 16, fontWeight: 800, margin: '0 0 1rem', color: textDark }}>Where do you want to work?</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 800, margin: '0 auto' }}>
            {locations.map(l => (
              <motion.button 
                key={l.id} 
                onClick={() => setSelectedLocId(l.id)} 
                className={`interactive ${selectedLocId === l.id ? 'glass-panel-heavy' : 'glass-panel'}`} 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{ border: selectedLocId === l.id ? '2px solid var(--color-amber-gold)' : 'none', borderRadius: 100, padding: '12px 24px', fontSize: 14, fontWeight: selectedLocId === l.id ? 800 : 600, color: textDark, cursor: 'pointer' }}
              >
                {l.name}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Plan cards */}
        {!selectedLocId ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: 32, marginBottom: '6rem' }}>
            <p style={{ fontSize: 48, margin: '0 0 1rem' }}>📍</p>
            <p style={{ fontSize: 20, fontWeight: 700, margin: '0 0 8px', color: textDark }}>Select a location</p>
            <p style={{ fontSize: 16, color: textLight, margin: 0, fontWeight: 500 }}>Pricing varies by building and city. Choose a location above to see available plans.</p>
          </motion.div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginBottom: '6rem', perspective: 1000 }}>
            {plans.map((plan, i) => {
              const mPrice = plan.monthlyPrice ? Math.round(plan.monthlyPrice * multiplier) : null;
              const aPrice = plan.annualPrice ? Math.round(plan.annualPrice * multiplier) : null;
              const currentPrice = annual ? aPrice : mPrice;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
                  style={{ display: "flex" }}
                >
                  <TiltCard 
                    className={`${plan.popular ? 'glass-panel-heavy' : 'glass-panel'}`} 
                    style={{ flex: 1, border: plan.popular ? `2px solid rgba(216, 159, 62,0.5)` : undefined, borderRadius: 32, padding: '2.5rem', display: 'flex', flexDirection: 'column', position: 'relative' }}
                  >
                    {plan.popular && (
                      <div style={{ position: 'absolute', top: -16, left: '50%', transform: 'translateX(-50%)', background: 'var(--color-amber-gold)', color: '#fff', fontSize: 12, fontWeight: 800, padding: '8px 20px', borderRadius: 24, letterSpacing: '0.05em', boxShadow: '0 8px 16px rgba(216, 159, 62,0.3)' }}>
                        MOST POPULAR
                      </div>
                    )}
                    <div style={{ fontSize: 40, marginBottom: 20 }}>{plan.icon}</div>
                    <p style={{ fontSize: 24, fontWeight: 800, margin: '0 0 8px', color: textDark }}>{plan.name}</p>
                    <div style={{ marginBottom: 20, minHeight: 64 }}>
                      {currentPrice ? (
                        <>
                          <span style={{ fontSize: 42, fontWeight: 800, color: textDark }}>
                            ₹<AnimatedNumber value={currentPrice} />
                          </span>
                          <span style={{ fontSize: 16, color: textLight, fontWeight: 600 }}>/mo</span>
                          {annual && (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              style={{ fontSize: 13, color: '#059669', marginTop: 4, fontWeight: 700 }}
                            >
                              Save ₹{((mPrice - aPrice) * 12).toLocaleString('en-IN')}/yr
                            </motion.div>
                          )}
                        </>
                      ) : (
                        <span style={{ fontSize: 36, fontWeight: 800, color: textDark }}>Custom</span>
                      )}
                    </div>
                    <p style={{ fontSize: 15, color: textLight, lineHeight: 1.6, margin: '0 0 32px', fontWeight: 500 }}>{plan.desc}</p>
                    <div style={{ borderTop: `1px solid rgba(23, 79, 80, 0.1)`, paddingTop: 32, marginBottom: 32, flex: 1 }}>
                      {plan.features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                          <span style={{ color: 'var(--color-amber-gold)', fontSize: 16, fontWeight: 800, marginTop: 2 }}>✓</span>
                          <span style={{ fontSize: 15, color: textDark, fontWeight: 600 }}>{f}</span>
                        </div>
                      ))}
                      {plan.missing.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16, opacity: 0.4 }}>
                          <span style={{ fontSize: 16, fontWeight: 800, marginTop: 2, color: textLight }}>–</span>
                          <span style={{ fontSize: 15, color: textLight, textDecoration: 'line-through', fontWeight: 600 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                    <motion.button
                      className="interactive"
                      onClick={() => onNavigate(plan.id === 'team' ? 'contact' : 'booking', plan.name)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ background: plan.popular ? 'var(--color-amber-gold)' : 'rgba(255,255,255,0.5)', color: plan.popular ? '#fff' : textDark, border: 'none', borderRadius: 100, padding: '16px', fontSize: 15, fontWeight: 800, cursor: 'pointer', width: '100%', boxShadow: plan.popular ? '0 8px 24px rgba(216, 159, 62,0.25)' : 'none' }}
                    >
                      {plan.id === 'team' ? 'Contact us →' : 'Choose plan →'}
                    </motion.button>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Add-ons */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ maxWidth: 850, margin: '0 auto' }}
        >
          <p style={{ fontSize: 13, color: 'var(--color-amber-gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 8, textAlign: 'center', fontWeight: 800 }}>Optional add-ons</p>
          <p style={{ fontSize: 24, color: textDark, textAlign: 'center', marginBottom: 32, fontWeight: 800 }}>Customize your membership</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 20 }}>
            {addons.map(a => {
              const active = selectedAddons.has(a.name);
              return (
                <motion.div 
                  key={a.name} 
                  onClick={() => toggleAddon(a.name)} 
                  className={`interactive ${active ? 'glass-panel-heavy' : 'glass-panel'}`} 
                  whileHover={{ y: -4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderRadius: 24, padding: '1.5rem', cursor: 'pointer', userSelect: 'none', border: active ? '1px solid var(--color-amber-gold) !important' : undefined }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div className="glass-panel" style={{ fontSize: 28, width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a.icon}</div>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 800, margin: 0, color: textDark }}>{a.name}</p>
                      <p style={{ fontSize: 14, color: textLight, margin: '4px 0 0', fontWeight: 500 }}>{a.desc}</p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{ fontSize: 18, fontWeight: 800, margin: 0, color: textDark }}>₹{a.price}<span style={{ fontSize: 13, fontWeight: 600, color: textLight }}>/mo</span></p>
                    <motion.div 
                      animate={{ backgroundColor: active ? 'var(--color-amber-gold)' : 'rgba(255,255,255,0.5)', color: active ? '#fff' : textDark }}
                      style={{ display: 'inline-block', marginTop: 8, padding: '6px 12px', borderRadius: 12, fontSize: 12, fontWeight: 800 }}
                    >
                      {active ? '✓ Added' : '+ Add'}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Add-on total */}
          {addonTotal > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="glass-panel-heavy" style={{ marginTop: 32, padding: '2rem 2.5rem', borderRadius: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: textDark }}>
              <div>
                <p style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>Selected add-ons</p>
                <p style={{ fontSize: 14, color: textLight, margin: '6px 0 0', fontWeight: 600 }}>{selectedAddons.size} item{selectedAddons.size > 1 ? 's' : ''} selected</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
                <div style={{ textAlign: 'right' }}>
                  <motion.p 
                    key={addonTotal}
                    initial={{ scale: 1.2, color: 'var(--color-amber-gold)' }}
                    animate={{ scale: 1, color: textDark }}
                    style={{ fontSize: 28, fontWeight: 800, margin: 0 }}
                  >
                    +₹<AnimatedNumber value={addonTotal} /><span style={{ fontSize: 15, color: textLight, fontWeight: 600 }}>/mo</span>
                  </motion.p>
                </div>
                <motion.button 
                  onClick={() => onNavigate('booking')} 
                  className="interactive"
                  whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(23, 79, 80,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  style={{ background: textDark, color: '#fff', border: 'none', borderRadius: 100, padding: '16px 28px', fontSize: 15, fontWeight: 800, cursor: 'pointer', boxShadow: '0 8px 24px rgba(23, 79, 80,0.2)' }}
                >
                  Book with add-ons →
                </motion.button>
              </div>
            </motion.div>
          )}
        </motion.div>

      </div>
    </div>
  );
}
