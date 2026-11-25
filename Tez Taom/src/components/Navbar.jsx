function Navbar({ 
  savatSoni = 0, 
  layklarSoni = 0, 
  tungiRejim = false,
  onToggleTheme,
  til = 'uz',
  onTilOzgartirish,
  t,
  onSavatClick, 
  onHomeClick, 
  hozirgiSahifa = 'bosh',
  aiRejimFaol = false,
  onOpenAiModal,
  onWatchVideo
}) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo - Zamonaviy va chiroyli brend nishoni */}
        <div className="navbar-logo" onClick={onHomeClick} role="button" tabIndex={0} title="TezTaom Bosh sahifa">
          <div className="logo-badge-box">
            <span className="logo-badge-icon">⚡</span>
          </div>
          <span className="logo-title">Tez<span className="text-orange">Taom</span></span>
        </div>

        {/* Havolalar */}
        <div className="navbar-links">
          <button 
            type="button" 
            className={`nav-link-btn ${hozirgiSahifa === 'bosh' ? 'active' : ''}`}
            onClick={onHomeClick}
          >
            {t.boshSahifa}
          </button>
          <button 
            type="button" 
            className={`nav-link-btn ${hozirgiSahifa === 'savat' ? 'active' : ''}`}
            onClick={onSavatClick}
          >
            {t.savat}
          </button>
          <button 
            type="button" 
            className="nav-link-btn nav-video-btn"
            onClick={onWatchVideo}
            title={t.videoniKorish || "Videoni ko‘rish"}
          >
            <span className="nav-video-icon">🎬</span>
            <span>{t.videoLabel || 'Video'}</span>
          </button>
        </div>

        {/* O'ng tomon: Til tanlash, Tungi rejim, Layklar va Savat */}
        <div className="navbar-actions">
          {/* Til almashtirgich (UZ / RU / EN) */}
          <div className="lang-switcher-box" title="Tilni tanlang / Выберите язык / Select language">
            <button
              type="button"
              className={`btn-lang ${til === 'uz' ? 'active' : ''}`}
              onClick={() => onTilOzgartirish('uz')}
            >
              🇺🇿 UZ
            </button>
            <button
              type="button"
              className={`btn-lang ${til === 'ru' ? 'active' : ''}`}
              onClick={() => onTilOzgartirish('ru')}
            >
              🇷🇺 RU
            </button>
            <button
              type="button"
              className={`btn-lang ${til === 'en' ? 'active' : ''}`}
              onClick={() => onTilOzgartirish('en')}
            >
              🇬🇧 EN
            </button>
          </div>

          {/* AI Rejim tugmasi (Kompyuter va Telefonda) */}
          <button
            type="button"
            className={`btn-ai-nav-toggle ${aiRejimFaol ? 'active' : ''}`}
            onClick={onOpenAiModal}
            title={t.aiSubtitle || "AI Oshpaz Maslahatchisi"}
            aria-label="AI Rejim"
          >
            <span className="ai-nav-sparkle">✨</span>
            <span className="ai-nav-text">{t.aiRejim}</span>
          </button>

          {/* Tungi / Kunduzgi rejim tugmasi */}
          <button
            type="button"
            className="btn-theme-toggle"
            onClick={onToggleTheme}
            title={tungiRejim ? `${t.kunduzgi} rejim` : `${t.tungi} rejim`}
            aria-label="Rejimni almashtirish"
          >
            <span className="theme-toggle-icon">{tungiRejim ? '☀️' : '🌙'}</span>
            <span className="theme-toggle-text">{tungiRejim ? t.kunduzgi : t.tungi}</span>
          </button>

          {/* Yoqtirilgan taomlar hisoblagichi */}
          {layklarSoni > 0 && (
            <div className="nav-likes-badge" title="Yoqtirilgan taomlar">
              <span className="nav-like-heart">❤️</span>
              <span className="nav-like-count">{layklarSoni}</span>
            </div>
          )}

          {/* Savat tugmasi */}
          <button 
            type="button" 
            className="btn-savat" 
            onClick={onSavatClick}
            aria-label="Savatga o'tish"
          >
            <span className="cart-icon">🛒</span>
            <span className="cart-label">{t.savat}</span>
            <span className="cart-count">{savatSoni}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
