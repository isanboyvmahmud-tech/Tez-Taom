function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brend va qisqa tavsif */}
        <div className="footer-box brand-box">
          <div className="footer-logo">
            <span className="logo-badge">⚡</span>
            <span className="logo-title">Tez<span className="text-orange">Taom</span></span>
          </div>
          <p className="footer-text">
            {t.footerDesc}
          </p>
          <div className="footer-status-pill">
            <span className="status-indicator-green"></span>
            <span>{t.ishVaqti}</span>
          </div>
        </div>

        {/* Manzil */}
        <div className="footer-box">
          <h4 className="footer-subtitle">{t.manzilTitle}</h4>
          <p className="footer-text">
            {t.manzilText}
          </p>
          <p className="footer-subtext">
            🏢 Mo‘ljal: Mirzo Ulug‘bek metro bekati yonida
          </p>
        </div>

        {/* Telefon va Ijtimoiy tarmoqlar */}
        <div className="footer-box">
          <h4 className="footer-subtitle">{t.telefonTitle}</h4>
          <p className="footer-text">
            <a href="tel:+998712000505" className="footer-link">📞 +998 (71) 200-05-05</a>
          </p>
          <p className="footer-text">
            <a href="tel:+998901234567" className="footer-link">📱 +998 (90) 123-45-67</a>
          </p>

          <div className="footer-social-row">
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="social-pill" title="Telegram">
              ✈️ Telegram
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-pill" title="Instagram">
              📸 Instagram
            </a>
          </div>
        </div>
      </div>

      <div className="footer-copyright-bar">
        <div className="footer-copyright-container">
          <p>© {new Date().getFullYear()} TezTaom. {t.barchaHuquqlar}</p>
          <p className="footer-badge-made">🧡 Mazali & Tez yetkazib berish</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
