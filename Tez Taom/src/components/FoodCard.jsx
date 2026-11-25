function FoodCard({ taom, onSavatga, isLiked = false, onLayk, til = 'uz', t, aiRejimFaol = false }) {
  const { id, nom, narxSon, emoji, rasm } = taom;

  // Taom nomi tanlangan tilga qarab
  const taomNomi = (typeof nom === 'object' && nom[til]) ? nom[til] : (nom.uz || nom);
  const formattedNarx = `${narxSon.toLocaleString()} ${t.som}`;

  return (
    <div className={`food-card ${aiRejimFaol ? 'is-ai-highlight' : ''}`}>
      {/* Rasm va ustki nishonlar */}
      <div className="food-card-img-box">
        <img 
          src={rasm} 
          alt={taomNomi} 
          className="food-card-img" 
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80";
          }}
        />

        {/* AI Rejimi faol bo'lganda maxsus nishon */}
        {aiRejimFaol && (
          <div className="food-ai-smart-badge">
            <span>✨ AI Tavsiya</span>
          </div>
        )}

        {/* Chap tomondagi vaqt nishoni */}
        <div className="food-time-badge">
          <span>⏱️ {t.yetkazishVaqti}</span>
        </div>

        {/* O'ng tomondagi doiradagi Layk tugmasi */}
        <button
          type="button"
          className={`btn-like-circle ${isLiked ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onLayk(id);
          }}
          title={isLiked ? "❤️" : "🤍"}
          aria-label="Layk"
        >
          <span className="like-icon">{isLiked ? '❤️' : '🤍'}</span>
        </button>
      </div>

      {/* Kartochka ma'lumotlari */}
      <div className="food-card-body">
        <div className="food-name-row">
          <span className="food-inline-emoji">{emoji}</span>
          <h3 className="food-name" title={taomNomi}>{taomNomi}</h3>
        </div>

        <div className="food-card-footer">
          <div className="food-price-box">
            <span className="price-tag">{t.narxi}</span>
            <span className="food-price">{formattedNarx}</span>
          </div>

          <button 
            type="button" 
            className="btn-primary btn-add-cart"
            onClick={() => onSavatga(taom)}
            aria-label={`${taomNomi} savatga qo'shish`}
          >
            <span className="btn-cart-icon">🛒</span>
            <span>{t.savatga}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
