function Hero({ 
  onBuyurtmaClick, 
  t, 
  qidiruv = '', 
  onQidiruvOzgardi, 
  onWatchVideo,
  tanlanganVideo,
  onKeyingiVideo,
  til = 'uz'
}) {
  const joriyVideo = tanlanganVideo || {
    nom: { uz: '🥩 Shef-Povar Steyki (Grilda)', ru: '🥩 Стейк от шеф-повара на гриле', en: '🥩 Chef Grilled Ribeye Steak' },
    videoSrc: '/steak_slice.webm',
    videoType: 'video/webm',
    altVideoSrc: '/steak_720p.webm',
    altVideoType: 'video/webm',
    fallbackMp4: '/steak.mp4',
    poster: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80'
  };
  return (
    <section className="hero">
      <div className="hero-glow-sphere"></div>
      <div className="hero-container">
        {/* Chap tomon: Matn va qidiruv */}
        <div className="hero-text-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            <span>{t.heroBadge}</span>
          </div>

          <h1 className="hero-title">
            {t.heroTitle1} <br />
            <span className="text-gradient">{t.heroTitleHighlight}</span> {t.heroTitle2}
          </h1>

          <p className="hero-desc">
            {t.heroDesc}
          </p>

          {/* Tezkor qidiruv qatori */}
          <div className="hero-search-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="hero-search-input"
              placeholder={t.qidiruvPlaceholder}
              value={qidiruv}
              onChange={(e) => onQidiruvOzgardi(e.target.value)}
            />
            {qidiruv && (
              <button 
                type="button" 
                className="btn-clear-search"
                onClick={() => onQidiruvOzgardi('')}
                title="Tozalash"
              >
                ✕
              </button>
            )}
          </div>

          {/* Harakat tugmasi va kafolatlar */}
          <div className="hero-action-row">
            <button 
              type="button" 
              className="btn-primary hero-btn"
              onClick={onBuyurtmaClick}
            >
              <span>{t.buyurtmaBerish}</span>
              <span className="btn-arrow-icon">→</span>
            </button>

            <button
              type="button"
              className="btn-hero-video-play"
              onClick={onWatchVideo}
              title={t.videoniKorish || "Videoni ko‘rish"}
            >
              <span className="play-triangle">▶</span>
              <span>{t.videoniKorish || "Videoni ko‘rish"}</span>
            </button>

            <div className="hero-trust-chips">
              <span className="trust-chip">⏱️ {t.yetkazishVaqti}</span>
              <span className="trust-chip">🛵 {t.bepulYetkazish}</span>
            </div>
          </div>
        </div>

        {/* O'ng tomon: Chiroyli ko'p qatlamli jonli video banner */}
        <div className="hero-visual">
          <div className="hero-image-backdrop"></div>
          <div 
            className="hero-image-card hero-video-card" 
            onClick={onWatchVideo} 
            title="Videoni to‘liq ekranda ko‘rish (bosing)"
            role="button" 
            tabIndex={0}
          >
            <video
              key={joriyVideo.videoSrc}
              className="hero-main-video"
              autoPlay
              loop
              muted
              playsInline
              poster={joriyVideo.poster}
            >
              <source 
                src={joriyVideo.videoSrc} 
                type={joriyVideo.videoType || (joriyVideo.videoSrc?.endsWith('.webm') ? 'video/webm' : 'video/mp4')} 
              />
              {joriyVideo.altVideoSrc && (
                <source 
                  src={joriyVideo.altVideoSrc} 
                  type={joriyVideo.altVideoType || (joriyVideo.altVideoSrc?.endsWith('.webm') ? 'video/webm' : 'video/mp4')} 
                />
              )}
              {joriyVideo.fallbackMp4 && joriyVideo.fallbackMp4 !== joriyVideo.videoSrc && (
                <source src={joriyVideo.fallbackMp4} type="video/mp4" />
              )}
              <img 
                src={joriyVideo.poster} 
                alt="Delicious Food Spread" 
                className="hero-main-img"
              />
            </video>

            {/* HD Video jonli nishoni */}
            <div className="hero-video-live-tag">
              <span className="live-dot-blink"></span>
              <span>{joriyVideo.nom?.[til] || joriyVideo.nom?.uz || 'HD VIDEO'}</span>
            </div>

            {/* Videoni almashtirish tugmasi */}
            {onKeyingiVideo && (
              <button
                type="button"
                className="btn-switch-video"
                onClick={(e) => {
                  e.stopPropagation();
                  onKeyingiVideo();
                }}
                title="Boshqa videoga almashtirish"
              >
                <span>🔄</span>
                <span>{t.videoAlmashtirish || 'Videoni o‘zgartirish'}</span>
              </button>
            )}

            {/* Markaziy video tugmasi */}
            <div className="hero-video-center-play">
              <span className="hero-play-circle">▶</span>
              <span className="hero-play-text">{t.videoniKorish || "Videoni ko‘rish"}</span>
            </div>
            
            {/* Suzuvchi nishonlar */}
            <div className="hero-floating-badge badge-top">
              <span className="badge-icon">🔥</span>
              <span>{t.engYangiTaomlar}</span>
            </div>

            <div className="hero-floating-badge badge-bottom">
              <span className="badge-star">⭐</span>
              <div className="badge-text-stack">
                <strong>4.9 / 5.0</strong>
                <small>{t.reyting}</small>
              </div>
            </div>

            <div className="hero-floating-pill badge-corner">
              <span>🥩 Shef Steyki</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
