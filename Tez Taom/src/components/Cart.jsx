import { useState } from 'react';
import DeliveryMap from './DeliveryMap';

function Cart({ 
  savatElementlari, 
  onMiqdorniOshirish, 
  onMiqdorniKamaytirish, 
  onOchirish, 
  onMenyugaQaytish,
  onBuyurtmaTugatish,
  til = 'uz',
  t
}) {
  const [ism, setIsm] = useState('');
  const [telefon, setTelefon] = useState('');
  const [manzil, setManzil] = useState('');
  const [geoManzil, setGeoManzil] = useState({
    lat: 41.2995,
    lng: 69.2401,
    addressName: 'Toshkent sh., Bunyodkor ko‘chasi'
  });
  const [buyurtmaYuborildi, setBuyurtmaYuborildi] = useState(false);

  // Umumiy hisob-kitob
  const taomlarSummasi = savatElementlari.reduce((jam, item) => {
    return jam + (item.narxSon * item.soni);
  }, 0);

  const yetkazibBerishNarxi = taomlarSummasi >= 100000 || taomlarSummasi === 0 ? 0 : 12000;
  const jamiSumma = taomlarSummasi + yetkazibBerishNarxi;
  const bepulYetkazishUchunQoldi = Math.max(0, 100000 - taomlarSummasi);
  const bepulFoiz = Math.min(100, Math.round((taomlarSummasi / 100000) * 100));

  const handleFormYuborish = (e) => {
    e.preventDefault();
    if (savatElementlari.length === 0) return;
    setBuyurtmaYuborildi(true);
    if (onBuyurtmaTugatish) {
      onBuyurtmaTugatish();
    }
  };

  if (buyurtmaYuborildi) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <div className="order-success-card">
            <div className="success-icon-wrapper">
              <span className="success-emoji">🎉</span>
            </div>
            <h2 className="success-title">{t.qabulQilindi}</h2>
            <p className="success-desc">
              {t.rahmat}, <strong>{ism || t.hurmatliMijoz}</strong>! {t.yetkaziladiText}
            </p>
            
            <div className="success-details-card">
              <div className="success-detail-row">
                <span>📍 Xaritadagi manzil:</span>
                <strong>{geoManzil.addressName || 'Toshkent'}</strong>
              </div>
              <div className="success-detail-row">
                <span>🗺️ Geo koordinata:</span>
                <small className="geo-code-tag">{geoManzil.lat.toFixed(5)}, {geoManzil.lng.toFixed(5)}</small>
              </div>
              {manzil && (
                <div className="success-detail-row">
                  <span>🏢 Qo‘shimcha tafsilot:</span>
                  <strong>{manzil}</strong>
                </div>
              )}
              <div className="success-detail-row">
                <span>{t.telefonLabel}</span>
                <strong>{telefon || '+998...'}</strong>
              </div>
              <div className="success-detail-row total-highlight">
                <span>{t.jamiTolovLabel}</span>
                <strong>{jamiSumma.toLocaleString()} {t.som}</strong>
              </div>
            </div>

            <button 
              type="button" 
              className="btn-primary success-btn"
              onClick={() => {
                setBuyurtmaYuborildi(false);
                onMenyugaQaytish();
              }}
            >
              {t.asosiygaQaytish}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Yuqori navigatsiya paneli */}
        <div className="cart-top-bar">
          <button 
            type="button" 
            className="btn-back"
            onClick={onMenyugaQaytish}
          >
            {t.menyugaQaytish}
          </button>
          <div className="cart-header-title-box">
            <h1 className="cart-page-title">{t.savatingiz}</h1>
            <span className="cart-count-pill">{savatElementlari.length} {t.taomSoni}</span>
          </div>
        </div>

        {savatElementlari.length === 0 ? (
          <div className="cart-empty-box">
            <div className="empty-cart-icon-circle">🛒</div>
            <h2>{t.savatingizBosh}</h2>
            <p>{t.boshDesc}</p>
            <button 
              type="button" 
              className="btn-primary btn-go-menu"
              onClick={onMenyugaQaytish}
            >
              {t.taomlarniTanlash}
            </button>
          </div>
        ) : (
          <div className="cart-layout-grid">
            {/* Chap tomon: Tanlangan taomlar ro'yxati */}
            <div className="cart-items-column">
              {/* Bepul yetkazish progress bari */}
              <div className="free-delivery-card">
                <div className="free-delivery-header">
                  <span>🛵 {t.yetkazibBerish}</span>
                  <strong>{yetkazibBerishNarxi === 0 ? t.bepul : `${yetkazibBerishNarxi.toLocaleString()} ${t.som}`}</strong>
                </div>
                {yetkazibBerishNarxi > 0 ? (
                  <>
                    <div className="delivery-progress-track">
                      <div className="delivery-progress-fill" style={{ width: `${bepulFoiz}%` }}></div>
                    </div>
                    <p className="delivery-progress-text">
                      Yana <strong>{bepulYetkazishUchunQoldi.toLocaleString()} {t.som}</strong> qo‘shing va bepul yetkazib berishga ega bo‘ling!
                    </p>
                  </>
                ) : (
                  <p className="delivery-unlocked-text">
                    🎉 Tabriklaymiz! Buyurtmangiz uchun yetkazib berish butunlay <strong>BEPUL</strong>!
                  </p>
                )}
              </div>

              <div className="cart-items-list">
                {savatElementlari.map((item) => {
                  const itemNomi = (typeof item.nom === 'object' && item.nom[til]) ? item.nom[til] : (item.nom.uz || item.nom);
                  return (
                    <div key={item.id} className="cart-item-card">
                      <div className="cart-item-img-wrapper">
                        <img 
                          src={item.rasm} 
                          alt={itemNomi} 
                          className="cart-item-img"
                        />
                      </div>

                      <div className="cart-item-details">
                        <div className="cart-item-title-row">
                          <span className="cart-item-emoji">{item.emoji}</span>
                          <h3 className="cart-item-name">{itemNomi}</h3>
                        </div>
                        <p className="cart-item-price-unit">{item.narxSon.toLocaleString()} {t.som}</p>
                      </div>

                      {/* Miqdor boshqaruvi (+ / -) */}
                      <div className="cart-quantity-control">
                        <button 
                          type="button" 
                          className="btn-qty"
                          onClick={() => onMiqdorniKamaytirish(item.id)}
                          aria-label="Kamaytirish"
                        >
                          -
                        </button>
                        <span className="qty-number">{item.soni}</span>
                        <button 
                          type="button" 
                          className="btn-qty"
                          onClick={() => onMiqdorniOshirish(item.id)}
                          aria-label="Oshirish"
                        >
                          +
                        </button>
                      </div>

                      {/* Jami narxi */}
                      <div className="cart-item-total">
                        <span>{(item.narxSon * item.soni).toLocaleString()} {t.som}</span>
                      </div>

                      {/* O'chirish */}
                      <button 
                        type="button" 
                        className="btn-delete-item"
                        onClick={() => onOchirish(item.id)}
                        title="O'chirish"
                        aria-label="O'chirish"
                      >
                        🗑️
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* O'ng tomon: Buyurtma xulosasi, Geo Xarita va forma */}
            <div className="cart-summary-column">
              <div className="cart-summary-card">
                <h2 className="cart-block-title">{t.buyurtmaXulosasi}</h2>

                <div className="summary-row">
                  <span>{t.taomlarSummasi}</span>
                  <strong>{taomlarSummasi.toLocaleString()} {t.som}</strong>
                </div>

                <div className="summary-row">
                  <span>{t.yetkazibBerish}</span>
                  <span>
                    {yetkazibBerishNarxi === 0 ? (
                      <span className="free-delivery-badge">{t.bepul}</span>
                    ) : (
                      `${yetkazibBerishNarxi.toLocaleString()} ${t.som}`
                    )}
                  </span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total-row">
                  <span>{t.jamiTolov}</span>
                  <span className="total-price-tag">{jamiSumma.toLocaleString()} {t.som}</span>
                </div>

                {/* Forma */}
                <form onSubmit={handleFormYuborish} className="checkout-form">
                  <h3 className="form-title">{t.yetkazishMalumotlari}</h3>
                  
                  <div className="form-group">
                    <label htmlFor="ism">👤 {t.ismingiz}</label>
                    <input 
                      id="ism"
                      type="text" 
                      required 
                      placeholder={t.ismPlaceholder} 
                      value={ism}
                      onChange={(e) => setIsm(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="telefon">📱 {t.telefonRaqam}</label>
                    <input 
                      id="telefon"
                      type="tel" 
                      required 
                      placeholder="+998 (90) 123-45-67" 
                      value={telefon}
                      onChange={(e) => setTelefon(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  {/* INTERAKTIV GEO XARITA (METKA QO'YISHGA KARTA) */}
                  <div className="form-group map-form-group">
                    <DeliveryMap onLocationChange={setGeoManzil} t={t} />
                  </div>

                  {/* Qo'shimcha manzil tafsilotlari (podyezd, qavat, xonadon) */}
                  <div className="form-group">
                    <label htmlFor="manzil">🏢 {t.manzil}</label>
                    <textarea 
                      id="manzil"
                      rows="2"
                      placeholder={t.manzilPlaceholder} 
                      value={manzil}
                      onChange={(e) => setManzil(e.target.value)}
                      className="form-input"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="btn-primary btn-checkout"
                  >
                    <span>{t.tasdiqlash}</span>
                    <span className="checkout-btn-badge">{jamiSumma.toLocaleString()} {t.som}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
