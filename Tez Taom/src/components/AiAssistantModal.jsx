import { useState } from 'react';

function AiAssistantModal({
  isOpen,
  onClose,
  taomlar = [],
  onSavatga,
  til = 'uz',
  t,
  aiRejimFaol = false,
  onToggleAiRejim
}) {
  const [inputMatn, setInputMatn] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [javobMatni, setJavobMatni] = useState('');
  const [tavsiyaTaomlar, setTavsiyaTaomlar] = useState([]);

  if (!isOpen) return null;

  // AI tahlil qilish mantiqi
  const bajarishTahlil = (sorov) => {
    const q = (sorov || inputMatn || '').toLowerCase();
    if (!q.trim()) return;

    setIsThinking(true);
    setTavsiyaTaomlar([]);
    setJavobMatni('');

    setTimeout(() => {
      let saralangan;
      let sabab;

      if (q.includes('arzon') || q.includes('30') || q.includes('byudjet') || q.includes('cheap')) {
        saralangan = taomlar.filter((item) => item.narxSon <= 30000).slice(0, 3);
        sabab = til === 'ru' 
          ? 'Бюджетный и очень вкусный выбор стоимостью до 30 000 сум.' 
          : til === 'en' 
          ? 'Budget-friendly and delicious picks under 30,000 UZS.' 
          : 'Hamyonbop va to‘yimli: 30 000 so‘mgacha bo‘lgan eng sara taomlar.';
      } else if (q.includes('milliy') || q.includes('osh') || q.includes('go\'sht') || q.includes('gosht') || q.includes('shashlik')) {
        saralangan = taomlar.filter((item) => item.kategoriyaKey === 'milliy').slice(0, 3);
        sabab = til === 'ru'
          ? 'Традиционные сочные мясные блюда, приготовленные по классическим рецептам.'
          : til === 'en'
          ? 'Hearty traditional meat dishes cooked with authentic spices.'
          : 'Haqiqiy to‘yimli milliy go‘shtli taomlar — tushlik yoki kechki ovqat uchun mukammal.';
      } else if (q.includes('fast') || q.includes('burger') || q.includes('pitsa') || q.includes('pizza') || q.includes('lavash')) {
        saralangan = taomlar.filter((item) => item.kategoriyaKey === 'fastfood').slice(0, 3);
        sabab = til === 'ru'
          ? 'Хрустящий и сочный фастфуд для быстрого перекуса или компании друзей.'
          : til === 'en'
          ? 'Crispy & juicy fast food favorites, perfect for a quick bite or friends gathering.'
          : 'Issiq va qarsildoq fastfood — do‘stlar bilan birga yeyish uchun ayni muddao.';
      } else if (q.includes('shirin') || q.includes('choy') || q.includes('desert') || q.includes('tort') || q.includes('sweet')) {
        saralangan = taomlar.filter((item) => item.kategoriyaKey === 'shirinliklar').slice(0, 3);
        sabab = til === 'ru'
          ? 'Нежные десерты и сладости, которые идеально поднимут настроение.'
          : til === 'en'
          ? 'Delightful desserts and pastries to brighten your mood.'
          : 'Kayfiyatni ko‘taruvchi eng sara shirinliklar va pishiriqlar.';
      } else if (q.includes('ichimlik') || q.includes('salqin') || q.includes('ayron') || q.includes('drink') || q.includes('cola')) {
        saralangan = taomlar.filter((item) => item.kategoriyaKey === 'ichimliklar').slice(0, 3);
        sabab = til === 'ru'
          ? 'Освежающие холодные напитки, утоляющие жажду.'
          : til === 'en'
          ? 'Refreshing cold drinks to quench your thirst.'
          : 'Muzdek tetiklashtiruvchi va chanqoqbosdi ichimliklar.';
      } else if (q.includes('omad') || q.includes('tasodifiy') || q.includes('random')) {
        const shuff = [...taomlar].sort(() => 0.5 - Math.random());
        saralangan = shuff.slice(0, 3);
        sabab = til === 'ru'
          ? 'Счастливый выбор дня от нашего AI шеф-повара!'
          : til === 'en'
          ? 'Lucky recommendation of the day picked randomly by AI!'
          : 'AI Oshpazimiz tomonidan bugungi kun uchun maxsus tanlangan omadli taomlar!';
      } else {
        // Umumiy aqlli qidiruv
        saralangan = taomlar.slice(0, 3);
        sabab = til === 'ru'
          ? 'Топ самых популярных и заказываемых блюд по оценкам клиентов.'
          : til === 'en'
          ? 'Top popular and highest-rated dishes recommended by AI.'
          : 'Mijozlarimiz tomonidan eng ko‘p tanlanadigan va yuqori baholangan sara taomlar.';
      }

      setJavobMatni(sabab);
      setTavsiyaTaomlar(saralangan);
      setIsThinking(false);
    }, 450);
  };

  const handleChipClick = (matn) => {
    setInputMatn(matn);
    bajarishTahlil(matn);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    bajarishTahlil(inputMatn);
  };

  return (
    <div className="ai-modal-backdrop" onClick={onClose}>
      <div className="ai-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Yuqori sarlavha */}
        <div className="ai-modal-header">
          <div className="ai-branding">
            <span className="ai-sparkle-icon">✨</span>
            <div>
              <h2 className="ai-modal-title">{t.aiOshpaz}</h2>
              <p className="ai-modal-subtitle">{t.aiSubtitle}</p>
            </div>
          </div>
          <button 
            type="button" 
            className="ai-modal-close" 
            onClick={onClose}
            title={t.aiYopish || "Yopish"}
          >
            ✕
          </button>
        </div>

        {/* AI Rejimi Switch (Ikkala qurilmada ham AI rejimini yoqish) */}
        <div className="ai-mode-toggle-bar">
          <div className="ai-toggle-info">
            <span className="ai-toggle-icon">🤖</span>
            <div>
              <strong>{t.aiRejimToggle}</strong>
              <small>
                {aiRejimFaol 
                  ? '✨ Rejim yoqilgan (Saytda AI belgilari ko‘rinadi)' 
                  : 'Sayt bo‘ylab aqlli AI belgilarini faollashtiring'}
              </small>
            </div>
          </div>
          <button
            type="button"
            className={`ai-switch-btn ${aiRejimFaol ? 'active' : ''}`}
            onClick={onToggleAiRejim}
          >
            {aiRejimFaol ? 'Yoqilgan ✓' : 'Yoqish'}
          </button>
        </div>

        {/* Qidiruv / So'rov kiritish formasi */}
        <form onSubmit={handleSubmit} className="ai-input-form">
          <div className="ai-input-wrapper">
            <span className="ai-input-icon">💬</span>
            <input 
              type="text" 
              className="ai-text-input"
              placeholder={t.aiPlaceholder}
              value={inputMatn}
              onChange={(e) => setInputMatn(e.target.value)}
            />
            <button type="submit" className="ai-submit-btn" disabled={isThinking}>
              {isThinking ? '⏳...' : t.aiSorash}
            </button>
          </div>
        </form>

        {/* Tezkor AI savollari (chiplar) */}
        <div className="ai-quick-chips-section">
          <span className="ai-chips-label">{t.aiTezkorSavollar}</span>
          <div className="ai-chips-grid">
            <button 
              type="button" 
              className="ai-chip-btn"
              onClick={() => handleChipClick('30 000 so‘mgacha arzon')}
            >
              ⚡ 30 000 so‘mgacha
            </button>
            <button 
              type="button" 
              className="ai-chip-btn"
              onClick={() => handleChipClick('To‘yimli go‘shtli milliy taom')}
            >
              🍛 To‘yimli go‘shtli
            </button>
            <button 
              type="button" 
              className="ai-chip-btn"
              onClick={() => handleChipClick('Do‘stlar bilan Fast Food')}
            >
              🍔 Do‘stlar bilan Fast Food
            </button>
            <button 
              type="button" 
              className="ai-chip-btn"
              onClick={() => handleChipClick('Shirinlik va qahva')}
            >
              🍰 Shirinlik & Qahva
            </button>
            <button 
              type="button" 
              className="ai-chip-btn"
              onClick={() => handleChipClick('Menga omadli taom tanla')}
            >
              🎲 Omadli tanlov (Random)
            </button>
          </div>
        </div>

        {/* Yuklanish holati */}
        {isThinking && (
          <div className="ai-thinking-state">
            <span className="ai-thinking-spinner">⚡</span>
            <p>AI sizning so‘rovingizni tahlil qilib, eng mos taomlarni saralamoqda...</p>
          </div>
        )}

        {/* AI Natijalari */}
        {javobMatni && !isThinking && (
          <div className="ai-results-area">
            <div className="ai-explanation-box">
              <span className="ai-badge-tag">💡 {t.aiNatijaSababi}</span>
              <p className="ai-explanation-text">{javobMatni}</p>
            </div>

            <div className="ai-recommendations-grid">
              {tavsiyaTaomlar.map((taom, idx) => {
                const nomMatni = (typeof taom.nom === 'object' && taom.nom[til]) ? taom.nom[til] : taom.nom.uz;
                const matchPercent = 98 - (idx * 3);
                return (
                  <div key={taom.id} className="ai-recommend-card">
                    <div className="ai-card-img-box">
                      <img src={taom.rasm} alt={nomMatni} className="ai-card-img" />
                      <span className="ai-match-badge">✨ {matchPercent}% Mos</span>
                    </div>
                    <div className="ai-card-content">
                      <strong className="ai-card-name">{nomMatni}</strong>
                      <span className="ai-card-price">{taom.narxSon.toLocaleString()} {t.som}</span>
                      <button
                        type="button"
                        className="btn-primary ai-card-add-btn"
                        onClick={() => {
                          onSavatga(taom);
                          onClose();
                        }}
                      >
                        🛒 {t.savatga}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AiAssistantModal;
