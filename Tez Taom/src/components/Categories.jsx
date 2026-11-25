function Categories({ kategoriyalar, tanlanganKategoriyaKey, onKategoriyaTanlash, t }) {
  return (
    <section className="categories-section">
      <div className="categories-container">
        <div className="section-header-centered">
          <span className="section-pill-tag">🍽️ Menyu</span>
          <h2 className="section-title">{t.kategoriyalarTitle}</h2>
          <p className="section-subtitle">{t.kategoriyalarSubtitle}</p>
        </div>

        <div className="categories-list">
          {kategoriyalar.map((kat) => {
            const isActive = tanlanganKategoriyaKey === kat.key;
            const translatedName = t.kategoriyalar[kat.key] || kat.nom;
            return (
              <button
                key={kat.id}
                type="button"
                className={`category-item-btn ${isActive ? 'active' : ''}`}
                onClick={() => onKategoriyaTanlash(kat.key)}
              >
                <span className="category-btn-icon-wrapper">
                  <span className="category-btn-emoji">{kat.emoji}</span>
                </span>
                <span className="category-btn-label">{translatedName}</span>
                {isActive && <span className="category-active-dot"></span>}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Categories;
