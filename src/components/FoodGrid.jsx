import FoodCard from './FoodCard';

function FoodGrid({ 
  taomlar, 
  onSavatga, 
  layklar = [], 
  onLayk, 
  til = 'uz', 
  t,
  onClearSearch,
  aiRejimFaol = false
}) {
  return (
    <section id="taomlar-grid" className="food-grid-section">
      <div className="food-grid-container">
        <div className="section-header-centered">
          <span className="section-pill-tag">🔥 Tavsiya</span>
          <h2 className="section-title">{t.taomlarMenyusi}</h2>
          <p className="section-subtitle">{t.taomlarSubtitle}</p>
        </div>
        
        {taomlar.length === 0 ? (
          <div className="empty-search-state">
            <span className="empty-search-icon">🔍</span>
            <h3>{t.hechNarsaTopilmadi}</h3>
            {onClearSearch && (
              <button 
                type="button" 
                className="btn-primary btn-clear-filter"
                onClick={onClearSearch}
              >
                {t.qidiruvniTozalash}
              </button>
            )}
          </div>
        ) : (
          <div className="food-grid">
            {taomlar.map((taom) => (
              <FoodCard 
                key={taom.id} 
                taom={taom} 
                onSavatga={onSavatga}
                isLiked={layklar.includes(taom.id)}
                onLayk={onLayk}
                til={til}
                t={t}
                aiRejimFaol={aiRejimFaol}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default FoodGrid;
