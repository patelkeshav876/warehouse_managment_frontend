// src/components/ThemeEditor.jsx
import React, { useState, useEffect } from 'react';

/*
  ThemeEditor - lightweight, dependency-free component.
  Drop it in App or Landing page; it updates CSS variables on document.documentElement.
*/

const PRESETS = {
  Airbnb: 'preset-airbnb',
  Stripe: 'preset-stripe',
  Shopify: 'preset-shopify',
  Apple: 'preset-apple',
  Earthy: 'preset-earthy'
};

export default function ThemeEditor({ startOpen = false }) {
  const [open, setOpen] = useState(startOpen);
  const [selectedPreset, setSelectedPreset] = useState(null);
  const [singleTone, setSingleTone] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [customPrimary, setCustomPrimary] = useState('');

  useEffect(() => {
    // ensure CSS file has been injected/loaded
    // initial: no preset, use existing document styles
  }, []);

  function applyPreset(presetClass) {
    // remove existing preset classes first
    Object.values(PRESETS).forEach(c => document.documentElement.classList.remove(c));
    if (presetClass) {
      document.documentElement.classList.add(presetClass);
      setSelectedPreset(presetClass);
    } else {
      setSelectedPreset(null);
    }
  }

  function applySingleTone(enable) {
    if (enable) document.documentElement.classList.add('single-tone');
    else document.documentElement.classList.remove('single-tone');
    setSingleTone(enable);
  }

  function setPrimaryHex(hex) {
    // Set a few primary tokens derived from this color (simple scale)
    try {
      if (!hex || hex.length < 4) return;
      document.documentElement.style.setProperty('--primary-500', hex);
      // generate a lighter / darker variant quickly (naive)
      const mapped = hexToRgb(hex);
      if (mapped) {
        const lighter = `rgb(${Math.min(255, mapped.r + 30)}, ${Math.min(255, mapped.g + 20)}, ${Math.min(255, mapped.b + 10)})`;
        const darker = `rgb(${Math.max(0, mapped.r - 30)}, ${Math.max(0, mapped.g - 20)}, ${Math.max(0, mapped.b - 10)})`;
        document.documentElement.style.setProperty('--primary-400', lighter);
        document.documentElement.style.setProperty('--primary-600', darker);
        document.documentElement.style.setProperty('--grad-a', `linear-gradient(90deg, ${hex}, ${darker})`);
      }
      setCustomPrimary(hex);
    } catch (e) {
      console.error(e);
    }
  }

  function hexToRgb(hex) {
    // supports #RGB and #RRGGBB
    hex = hex.replace('#','');
    if (hex.length === 3) {
      hex = hex.split('').map(h => h+h).join('');
    }
    if (hex.length !== 6) return null;
    const r = parseInt(hex.substring(0,2),16);
    const g = parseInt(hex.substring(2,4),16);
    const b = parseInt(hex.substring(4,6),16);
    return { r,g,b };
  }

  function toggleAnimations(enable) {
    // Simple approach: add/remove a CSS class that you can use to pause animations in CSS.
    if (!enable) document.documentElement.classList.add('no-animations');
    else document.documentElement.classList.remove('no-animations');
    setAnimationsEnabled(enable);
  }

  return (
    <>
      {/* Floating gear */}
      <div style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 9999 }}>
        <button onClick={() => setOpen(v => !v)} title="Theme settings" style={{ padding: 10, borderRadius: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', border: 'none' }}>
          ⚙️
        </button>
      </div>

      {open && (
        <div style={{ position:'fixed', right: 18, bottom: 70, zIndex:9999, width: 360, background: 'rgba(10,10,12,0.95)', color:'#fff', borderRadius:12, padding:14, boxShadow:'0 8px 40px rgba(2,6,23,0.6)'}}>
          <h4 style={{ margin:0, marginBottom:8 }}>Theme Editor</h4>

          <div style={{ display:'flex', gap:8, marginBottom:10, flexWrap:'wrap' }}>
            {Object.keys(PRESETS).map(key => (
              <button key={key} onClick={() => applyPreset(PRESETS[key])} className="theme-button" style={{opacity: selectedPreset===PRESETS[key]?1:0.88}}>
                {key}
              </button>
            ))}
            <button onClick={() => applyPreset(null)} className="theme-button" style={{ background: 'transparent', border: '1px dashed rgba(255,255,255,0.06)' }}>Reset</button>
          </div>

          <div style={{ display:'flex', gap:8, marginBottom:10 }}>
            <input value={customPrimary} placeholder="#ff9360" onChange={e=>setPrimaryHex(e.target.value)} style={{flex:1, padding:8, borderRadius:8, border:'1px solid rgba(255,255,255,0.06)', background:'rgba(255,255,255,0.03)', color:'#fff'}} />
            <button className="theme-button" onClick={()=>setPrimaryHex(customPrimary)}>Apply</button>
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <label style={{fontSize:13}}>Single-color mode</label>
            <input type="checkbox" checked={singleTone} onChange={e=>applySingleTone(e.target.checked)} />
          </div>

          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
            <label style={{fontSize:13}}>Animations</label>
            <input type="checkbox" checked={animationsEnabled} onChange={e=>toggleAnimations(e.target.checked)} />
          </div>

          <div style={{ fontSize:12, opacity:0.8, marginTop:8 }}>
            Tip: use presets first, then tweak the primary hex for single-color branding.
          </div>
        </div>
      )}
    </>
  );
}
