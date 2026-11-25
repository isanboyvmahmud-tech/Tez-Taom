import { useState, useEffect } from 'react';

// Toshkent tumanlari bo'yicha tezkor o'tish ro'yxati
const TUMANLAR = [
  { nom: 'Chilonzor', lat: 41.2825, lng: 69.2135, query: 'Chilonzor tumani, Toshkent' },
  { nom: 'Yunusobod', lat: 41.3645, lng: 69.2882, query: 'Yunusobod tumani, Toshkent' },
  { nom: 'Mirzo Ulug‘bek', lat: 41.3275, lng: 69.3245, query: 'Mirzo Ulugbek tumani, Toshkent' },
  { nom: 'Mirobod', lat: 41.2915, lng: 69.2745, query: 'Mirobod tumani, Toshkent' },
  { nom: 'Shayxontohur', lat: 41.3195, lng: 69.2435, query: 'Shayxontohur tumani, Toshkent' },
  { nom: 'Sergeli', lat: 41.2225, lng: 69.2215, query: 'Sergeli tumani, Toshkent' },
  { nom: 'Yakkasaroy', lat: 41.2810, lng: 69.2550, query: 'Yakkasaroy tumani, Toshkent' }
];

function DeliveryMap({ onLocationChange, t }) {
  const [coords, setCoords] = useState({ lat: 41.2825, lng: 69.2135 }); // Standart Chilonzor
  const [qidiruvManzil, setQidiruvManzil] = useState('Chilonzor tumani, Toshkent');
  const [faolTuman, setFaolTuman] = useState('Chilonzor');
  const [isLocating, setIsLocating] = useState(false);
  const [statusXabar, setStatusXabar] = useState('');
  const [isKattaEkran, setIsKattaEkran] = useState(false);

  // Google Maps Embed manzili (100% rasmiy Google Maps ko'rinishi)
  const mapQuery = coords.lat ? `${coords.lat},${coords.lng}` : encodeURIComponent(qidiruvManzil);
  const googleMapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  const googleMapExternalUrl = `https://www.google.com/maps?q=${mapQuery}`;

  // Dastlabki qiymatni uzatamiz
  useEffect(() => {
    if (onLocationChange) {
      onLocationChange({
        lat: coords.lat,
        lng: coords.lng,
        addressName: qidiruvManzil
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escape tugmasi bosilganda katta ekrandan chiqish va orqa fon skrollini to'xtatish
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isKattaEkran) {
        setIsKattaEkran(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (isKattaEkran) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isKattaEkran]);

  // Tuman tanlanganda Google Maps o'sha yerga o'tadi
  const handleTumanTanlash = (tuman) => {
    setFaolTuman(tuman.nom);
    setCoords({ lat: tuman.lat, lng: tuman.lng });
    setQidiruvManzil(tuman.query);
    if (onLocationChange) {
      onLocationChange({
        lat: tuman.lat,
        lng: tuman.lng,
        addressName: tuman.query
      });
    }
  };

  // Qidiruv maydonchasiga yozganda
  const handleQidiruvYuborish = (e) => {
    e.preventDefault();
    if (!qidiruvManzil.trim()) return;
    setFaolTuman('');
    // Google Maps qidiruv matni bo'yicha nuqtani yangilaydi
    if (onLocationChange) {
      onLocationChange({
        lat: coords.lat,
        lng: coords.lng,
        addressName: qidiruvManzil
      });
    }
  };

  // GPS orqali telefon/kompyuter turgan nuqtani aniqlash
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setStatusXabar("Brauzeringiz geolokatsiyani qo‘llab-quvvatlamaydi.");
      setTimeout(() => setStatusXabar(''), 3000);
      return;
    }

    setIsLocating(true);
    setStatusXabar(t.aniqlanmoqda || 'Joylashuvingiz aniqlanmoqda...');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        setStatusXabar('');
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        const gpsAddr = `GPS: ${lat.toFixed(5)}, ${lng.toFixed(5)}`;
        setQidiruvManzil(gpsAddr);
        setFaolTuman('');

        if (onLocationChange) {
          onLocationChange({
            lat,
            lng,
            addressName: gpsAddr
          });
        }
      },
      () => {
        setIsLocating(false);
        setStatusXabar("GPS ruxsati berilmadi. Quyidagi tumanlardan birini tanlang.");
        setTimeout(() => setStatusXabar(''), 4000);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <>
      {/* Katta ekran rejimi uchun yarim shaffof orqa fon (backdrop) */}
      {isKattaEkran && (
        <div 
          className="google-map-backdrop" 
          onClick={() => setIsKattaEkran(false)}
          title="Kichraytirish uchun bosing"
        />
      )}

      <div className={`google-map-card ${isKattaEkran ? 'is-fullscreen-mode' : ''}`}>
        {/* 1. Yuqori qism: Google Maps sarlavhasi, GPS va Katta/Kichik ekran tugmalari */}
        <div className="google-map-header">
          <div className="google-map-branding">
            <span className="google-map-logo-icon">🗺️</span>
            <div>
              <strong className="google-map-title">Google Maps</strong>
              <span className="google-map-badge-official">
                {isKattaEkran ? 'To‘liq Katta Ekran' : 'Metka & Geo Karta'}
              </span>
            </div>
          </div>

          <div className="google-map-header-actions">
            <button
              type="button"
              className="btn-locate-gps"
              onClick={handleGetLocation}
              disabled={isLocating}
              title="GPS orqali joyimni aniqlash"
            >
              {isLocating ? (
                <span>⏳ {t.aniqlanmoqda}</span>
              ) : (
                <span>📍 {t.meningJoyim}</span>
              )}
            </button>

            {/* Katta va Kichkina ekranga almashtirish tugmasi */}
            <button
              type="button"
              className={`btn-screen-toggle ${isKattaEkran ? 'active' : ''}`}
              onClick={() => setIsKattaEkran(!isKattaEkran)}
              title={isKattaEkran ? (t.xaritaniKichraytirish || 'Kichik ekran') : (t.xaritaniKattalashtirish || 'Katta ekran')}
            >
              <span>{isKattaEkran ? (t.kichikEkran || '🗗 Kichik ekran') : (t.kattaEkran || '⛶ Katta ekran')}</span>
            </button>

            {isKattaEkran && (
              <button
                type="button"
                className="btn-close-fullscreen"
                onClick={() => setIsKattaEkran(false)}
                title="Yopish (ESC)"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Holat xabari */}
        {statusXabar && (
          <div className="google-map-status-banner">
            <span>ℹ️ {statusXabar}</span>
          </div>
        )}

        {/* 2. Manzil qidirish qatori */}
        <form onSubmit={handleQidiruvYuborish} className="google-map-search-bar">
          <span className="map-search-icon">🔍</span>
          <input 
            type="text" 
            className="map-search-input"
            placeholder="Ko‘cha yoki mo‘ljalni kiriting..."
            value={qidiruvManzil}
            onChange={(e) => setQidiruvManzil(e.target.value)}
          />
          <button type="submit" className="btn-search-map">
            Xaritadan topish
          </button>
        </form>

        {/* 3. Tumanlar bo'yicha tezkor tugmalar */}
        <div className="google-map-presets-row">
          <span className="presets-heading">Tumanlar:</span>
          <div className="presets-chip-container">
            {TUMANLAR.map((tuman) => (
              <button
                key={tuman.nom}
                type="button"
                className={`chip-tuman-btn ${faolTuman === tuman.nom ? 'active' : ''}`}
                onClick={() => handleTumanTanlash(tuman)}
              >
                📍 {tuman.nom}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Rasmiy Google Maps Ko'rinishi (Iframe Embed) */}
        <div className="google-map-frame-wrapper">
          <iframe
            title="Google Maps Delivery Location"
            src={googleMapEmbedUrl}
            className="google-map-iframe"
            loading="lazy"
            allowFullScreen
          ></iframe>

          {/* Xarita ustidagi tezkor Katta/Kichik ekran tugmasi */}
          <button
            type="button"
            className="map-floating-size-btn"
            onClick={() => setIsKattaEkran(!isKattaEkran)}
            title={isKattaEkran ? (t.xaritaniKichraytirish || 'Kichik ekran') : (t.xaritaniKattalashtirish || 'Katta ekran')}
          >
            {isKattaEkran ? (
              <span>🗗 {t.kichikEkran || 'Kichik ekran'}</span>
            ) : (
              <span>⛶ {t.kattaEkran || 'Katta ekran'}</span>
            )}
          </button>

          {/* Markazdagi yetkazish nishoni (visual pin) */}
          <div className="google-map-center-pin">
            <div className="center-pin-circle">📍</div>
            <span className="center-pin-tag">Yetkazish nuqtasi</span>
          </div>
        </div>

        {/* 5. Xarita ostidagi manzil ko'rsatkichi va havola */}
        <div className="google-map-footer">
          <div className="google-map-footer-info">
            <span className="google-footer-pin">📍</span>
            <div>
              <span className="google-footer-label">{t.kartaKoordinata}</span>
              <strong className="google-footer-address">{qidiruvManzil}</strong>
            </div>
          </div>

          <div className="google-map-footer-actions">
            {isKattaEkran && (
              <button
                type="button"
                className="btn-confirm-return"
                onClick={() => setIsKattaEkran(false)}
              >
                ✓ Tanlash va qaytish
              </button>
            )}

            <a 
              href={googleMapExternalUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="google-map-external-link"
              title="Google Maps ilovasida ochish"
            >
              Google Maps'da ochish ↗
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeliveryMap;
