import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import FoodGrid from './components/FoodGrid';
import Cart from './components/Cart';
import Footer from './components/Footer';
import AiAssistantModal from './components/AiAssistantModal';
import PromoVideoModal from './components/PromoVideoModal';
import { TRANSLATIONS } from './translations';
import './App.css';

// Saytdagi yuqori sifatli jonli taom videolari (Shef-Povar Steyki birinchi o'rinda)
const VIDEO_RO_YXAT = [
  {
    id: 'shef-steyk',
    nom: { 
      uz: '🥩 Shef-Povar Steyki (Grilda)', 
      ru: '🥩 Стейк от шеф-повара на гриле', 
      en: '🥩 Chef Grilled Ribeye Steak' 
    },
    tavsif: {
      uz: '🔥 Shef-povar tomonidan olovda pishirilgan va kesilgan sersuv lazzatli go‘sht steyki',
      ru: '🔥 Нежнейший сочный стейк, приготовленный шеф-поваром на открытом огне',
      en: '🔥 Premium juicy ribeye steak cooked to perfection by master chef'
    },
    videoSrc: '/steak_slice.webm',
    videoType: 'video/webm',
    altVideoSrc: '/steak_720p.webm',
    altVideoType: 'video/webm',
    fallbackMp4: '/steak.mp4',
    poster: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'gosht',
    nom: { 
      uz: '🍖 Olovli Qovurma & Qozon Kabob', 
      ru: '🍖 Сочное жаркое и казан-кабоб', 
      en: '🍖 Sizzling Hot Meat & Skillet' 
    },
    tavsif: {
      uz: 'Qaynoq tovada ziravorlar bilan qovurilgan sara mol go‘shti',
      ru: 'Отборная говядина, обжаренная на раскаленной сковороде со специями',
      en: 'Prime beef sizzling in hot pan with fresh herbs and spices'
    },
    videoSrc: '/steak_720p.webm',
    videoType: 'video/webm',
    altVideoSrc: '/steak.webm',
    altVideoType: 'video/webm',
    fallbackMp4: '/cooking.mp4',
    poster: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'pitsa',
    nom: { 
      uz: '🍕 Pishloqli Issiq Pitsa', 
      ru: '🍕 Горячая сырная пицца', 
      en: '🍕 Cheesy Hot Pizza' 
    },
    tavsif: {
      uz: 'Pechdan yangi uzilgan pishloqli qarsildoq pitsa',
      ru: 'Хрустящая пицца с тягучим сыром прямо из печи',
      en: 'Crispy crust pizza with melted mozzarella straight from oven'
    },
    videoSrc: '/pizza.mp4',
    videoType: 'video/mp4',
    altVideoSrc: '/steak_slice.webm',
    altVideoType: 'video/webm',
    fallbackMp4: '/pizza.mp4',
    poster: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 'ziravor',
    nom: { 
      uz: '🌶️ Oshpaz Ziravorlari & Sous', 
      ru: '🌶️ Острые пряности и соусы шефа', 
      en: '🌶️ Chef Spices & Secret Sauce' 
    },
    tavsif: {
      uz: 'Taomlarga betakror ta’m beruvchi maxsus sharqona ziravorlar',
      ru: 'Восточные пряности, придающие блюдам неповторимый вкус',
      en: 'Authentic spices that give each dish its unforgettable aroma'
    },
    videoSrc: '/steak_slice.webm',
    videoType: 'video/webm',
    altVideoSrc: '/steak_720p.webm',
    altVideoType: 'video/webm',
    fallbackMp4: '/steak.mp4',
    poster: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80'
  }
];

// 5 ta kategoriya kalitlari bilan
const KATEGORIYALAR = [
  { id: 1, key: 'barchasi', nom: 'Barchasi', emoji: '🍽️' },
  { id: 2, key: 'milliy', nom: 'Milliy taomlar', emoji: '🍛' },
  { id: 3, key: 'fastfood', nom: 'Fast Food', emoji: '🍔' },
  { id: 4, key: 'ichimliklar', nom: 'Ichimliklar', emoji: '🍹' },
  { id: 5, key: 'shirinliklar', nom: 'Shirinliklar', emoji: '🍰' }
];

// Haqiqiy sifatli rasmlar va 3 ta tilda (UZ, RU, EN) taom nomlariga 100% mos rasmlar (32 ta taom)
const TAOMLAR = [
  // ================= MILLIY TAOMLAR (8 ta) =================
  {
    id: 1,
    nom: {
      uz: "Toshkent To‘y Palovi (Osh)",
      ru: "Ташкентский праздничный плов",
      en: "Tashkent Festive Pilaf (Plov)"
    },
    narxSon: 38000,
    emoji: "🍛",
    kategoriyaKey: "milliy",
    rasm: "https://images.unsplash.com/photo-1634324092536-74480096b939?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    nom: {
      uz: "Mol go‘shti Qiyma Shashlik",
      ru: "Шашлык из говяжьего фарша",
      en: "Minced Beef Shish Kebab"
    },
    narxSon: 18000,
    emoji: "🍢",
    kategoriyaKey: "milliy",
    rasm: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    nom: {
      uz: "Issiq Mastava Sho‘rva",
      ru: "Горячий суп Мастава",
      en: "Hot Mastava Rice Soup"
    },
    narxSon: 28000,
    emoji: "🍲",
    kategoriyaKey: "milliy",
    rasm: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    nom: {
      uz: "Qozon Somsa & Xonim",
      ru: "Казан-самса и ханум",
      en: "Crispy Samsa & Khanum"
    },
    narxSon: 22000,
    emoji: "🥟",
    kategoriyaKey: "milliy",
    rasm: "https://images.unsplash.com/photo-1601050690294-397f3c324515?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    nom: {
      uz: "Uyg‘ur Cho‘zma Lag‘mon",
      ru: "Уйгурский тянутый лагман",
      en: "Hand-pulled Uyghur Lagman"
    },
    narxSon: 36000,
    emoji: "🍜",
    kategoriyaKey: "milliy",
    rasm: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    nom: {
      uz: "Qozon Kabob (Go‘sht & Qovurilgan Kartoshka)",
      ru: "Казан-кабоб с мясом и картофелем",
      en: "Kazan Kebab with Crispy Potatoes"
    },
    narxSon: 48000,
    emoji: "🍖",
    kategoriyaKey: "milliy",
    rasm: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    nom: {
      uz: "Issiq Tandir Somsa (Go‘shtli)",
      ru: "Горячая тандырная самса с мясом",
      en: "Tandoori Meat Samsa"
    },
    narxSon: 12000,
    emoji: "🥟",
    kategoriyaKey: "milliy",
    rasm: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    nom: {
      uz: "Milliy Chuchvara Sho‘rva",
      ru: "Национальные чучвара в бульоне",
      en: "Traditional Chuchvara Dumpling Soup"
    },
    narxSon: 30000,
    emoji: "🥣",
    kategoriyaKey: "milliy",
    rasm: "https://images.unsplash.com/photo-1559948271-7d5c98d2e951?auto=format&fit=crop&w=600&q=80"
  },

  // ================= FAST FOOD (8 ta) =================
  {
    id: 9,
    nom: {
      uz: "Klassik Juicy Chizburger",
      ru: "Классический сочный чизбургер",
      en: "Classic Juicy Cheeseburger"
    },
    narxSon: 32000,
    emoji: "🍔",
    kategoriyaKey: "fastfood",
    rasm: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 10,
    nom: {
      uz: "Peperoni Pitsa (Qizil sous & Pishloq)",
      ru: "Пицца Пепперони с сыром",
      en: "Pepperoni Pizza with Mozzarella"
    },
    narxSon: 65000,
    emoji: "🍕",
    kategoriyaKey: "fastfood",
    rasm: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 11,
    nom: {
      uz: "Sirli Go‘shtli Lavash Max",
      ru: "Сырный мясной лаваш Макс",
      en: "Cheesy Beef Shawarma Wrap"
    },
    narxSon: 34000,
    emoji: "🌯",
    kategoriyaKey: "fastfood",
    rasm: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 12,
    nom: {
      uz: "Fransuz Fri Kartoshkasi (Ketchup bilan)",
      ru: "Картофель фри с кетчупом",
      en: "French Fries with Sauce"
    },
    narxSon: 16000,
    emoji: "🍟",
    kategoriyaKey: "fastfood",
    rasm: "https://images.unsplash.com/photo-1593507369837-9adcc0c0bdc6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 13,
    nom: {
      uz: "Dabl Monster Burger (2x Kotlet)",
      ru: "Дабл Монстр Бургер (2 котлеты)",
      en: "Double Beef Monster Burger"
    },
    narxSon: 45000,
    emoji: "🍔",
    kategoriyaKey: "fastfood",
    rasm: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 14,
    nom: {
      uz: "Klassik Margarita Pitsa",
      ru: "Классическая пицца Маргарита",
      en: "Classic Margherita Pizza"
    },
    narxSon: 58000,
    emoji: "🍕",
    kategoriyaKey: "fastfood",
    rasm: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 15,
    nom: {
      uz: "Qarsildoq Tovuqli Naggets (8 dona)",
      ru: "Хрустящие куриные наггетсы (8 шт)",
      en: "Crispy Chicken Nuggets (8 pcs)"
    },
    narxSon: 24000,
    emoji: "🍗",
    kategoriyaKey: "fastfood",
    rasm: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 16,
    nom: {
      uz: "Grill Hot-Dog Max (Xantal & Ketchup)",
      ru: "Гриль Хот-дог Макс с соусом",
      en: "Max Grilled Hot Dog"
    },
    narxSon: 20000,
    emoji: "🌭",
    kategoriyaKey: "fastfood",
    rasm: "https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=600&q=80"
  },

  // ================= ICHIMLIKLAR (8 ta) =================
  {
    id: 17,
    nom: {
      uz: "Muzdek Coca-Cola 1.5L",
      ru: "Ледяная Кока-Кола 1.5л",
      en: "Ice Cold Coca-Cola 1.5L"
    },
    narxSon: 14000,
    emoji: "🥤",
    kategoriyaKey: "ichimliklar",
    rasm: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 18,
    nom: {
      uz: "Yalpizli Yangi Moxito Fresh",
      ru: "Освежающий мятный Мохито",
      en: "Refreshing Mint Mojito Fresh"
    },
    narxSon: 16000,
    emoji: "🍹",
    kategoriyaKey: "ichimliklar",
    rasm: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 19,
    nom: {
      uz: "Yangi Siqilgan Apelsin Sharbati (Fresh)",
      ru: "Свежевыжатый апельсиновый сок",
      en: "Fresh Squeezed Orange Juice"
    },
    narxSon: 22000,
    emoji: "🍊",
    kategoriyaKey: "ichimliklar",
    rasm: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 20,
    nom: {
      uz: "Muzdek Fanta Orange 1.5L",
      ru: "Ледяная Фанта Апельсин 1.5л",
      en: "Ice Cold Fanta Orange 1.5L"
    },
    narxSon: 14000,
    emoji: "🥤",
    kategoriyaKey: "ichimliklar",
    rasm: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 21,
    nom: {
      uz: "Muzdek Rezavorli Berry Limonad",
      ru: "Ягодный освежающий лимонад",
      en: "Fresh Mixed Berry Lemonade"
    },
    narxSon: 18000,
    emoji: "🍹",
    kategoriyaKey: "ichimliklar",
    rasm: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 22,
    nom: {
      uz: "Muzdek Milliy Ayron (Ko‘katlar bilan)",
      ru: "Холодный айран с зеленью",
      en: "Cold Herbal Ayran Drink"
    },
    narxSon: 8000,
    emoji: "🥛",
    kategoriyaKey: "ichimliklar",
    rasm: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 23,
    nom: {
      uz: "Issiq Qahva Kapuchino / Latte",
      ru: "Горячий кофе Капучино / Латте",
      en: "Hot Coffee Cappuccino / Latte"
    },
    narxSon: 18000,
    emoji: "☕",
    kategoriyaKey: "ichimliklar",
    rasm: "https://images.unsplash.com/photo-1546123291-b784739f020f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 24,
    nom: {
      uz: "Qulupnayli Qaymoqli Milkshake",
      ru: "Клубничный сливочный милкшейк",
      en: "Creamy Strawberry Milkshake"
    },
    narxSon: 20000,
    emoji: "🥤",
    kategoriyaKey: "ichimliklar",
    rasm: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80"
  },

  // ================= SHIRINLIKLAR (8 ta) =================
  {
    id: 25,
    nom: {
      uz: "Shokoladli Nyu-York Chizkeyki",
      ru: "Шоколадный чизкейк Нью-Йорк",
      en: "Chocolate New York Cheesecake"
    },
    narxSon: 26000,
    emoji: "🍰",
    kategoriyaKey: "shirinliklar",
    rasm: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 26,
    nom: {
      uz: "Rang-barang Donat Ponchiklar Assorti",
      ru: "Пончики Донатс ассорти",
      en: "Colorful Glazed Donut Assortment"
    },
    narxSon: 18000,
    emoji: "🍩",
    kategoriyaKey: "shirinliklar",
    rasm: "https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 27,
    nom: {
      uz: "Klassik Asalli Medovik Torti",
      ru: "Классический торт Медовик",
      en: "Classic Honey Cake (Medovik)"
    },
    narxSon: 24000,
    emoji: "🍰",
    kategoriyaKey: "shirinliklar",
    rasm: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 28,
    nom: {
      uz: "Italiya Tiramisu Deserti",
      ru: "Итальянский десерт Тирамису",
      en: "Italian Tiramisu Dessert"
    },
    narxSon: 28000,
    emoji: "🍮",
    kategoriyaKey: "shirinliklar",
    rasm: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 29,
    nom: {
      uz: "Qaymoqli Muzqaymoq Assorti (3 xil sharik)",
      ru: "Сливочное мороженое ассорти",
      en: "Creamy Ice Cream Trio Sundae"
    },
    narxSon: 16000,
    emoji: "🍨",
    kategoriyaKey: "shirinliklar",
    rasm: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 30,
    nom: {
      uz: "Sharqona Yong‘oqli Asalli Pahlava",
      ru: "Восточная ореховая пахлава с медом",
      en: "Oriental Honey Walnut Baklava"
    },
    narxSon: 25000,
    emoji: "🍯",
    kategoriyaKey: "shirinliklar",
    rasm: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 31,
    nom: {
      uz: "Belgiya Vaflisi rezavorlar bilan",
      ru: "Бельгийские вафли с ягодами",
      en: "Belgian Waffles with Fresh Berries"
    },
    narxSon: 22000,
    emoji: "🧇",
    kategoriyaKey: "shirinliklar",
    rasm: "https://images.unsplash.com/photo-1558584724-0e4d32ca55a4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 32,
    nom: {
      uz: "Issiq Shokoladli Brauni",
      ru: "Горячий шоколадный брауни",
      en: "Warm Chocolate Fudge Brownie"
    },
    narxSon: 24000,
    emoji: "🍫",
    kategoriyaKey: "shirinliklar",
    rasm: "https://images.unsplash.com/photo-1564355768016-1c9f9dc1b381?auto=format&fit=crop&w=600&q=80"
  }
];

function App() {
  // 1. Til tanlash (uz, ru, en) - localStorage da saqlanadi
  const [til, setTil] = useState(() => {
    try {
      const saqlanganTil = localStorage.getItem('teztaom_til');
      return saqlanganTil && ['uz', 'ru', 'en'].includes(saqlanganTil) ? saqlanganTil : 'uz';
    } catch {
      return 'uz';
    }
  });

  const t = TRANSLATIONS[til] || TRANSLATIONS.uz;

  // 2. Savatni localStorage dan o'qish
  const [savat, setSavat] = useState(() => {
    try {
      const saqlanganSavat = localStorage.getItem('teztaom_savat');
      return saqlanganSavat ? JSON.parse(saqlanganSavat) : [];
    } catch (e) {
      console.error("Savatni o'qishda xatolik:", e);
      return [];
    }
  });

  // 3. Layklar (yoqtirilgan taomlar id lari)
  const [layklar, setLayklar] = useState(() => {
    try {
      const saqlanganLayklar = localStorage.getItem('teztaom_layklar');
      return saqlanganLayklar ? JSON.parse(saqlanganLayklar) : [];
    } catch (e) {
      console.error("Layklarni o'qishda xatolik:", e);
      return [];
    }
  });

  // 4. Tungi rejim (Dark Mode)
  const [tungiRejim, setTungiRejim] = useState(() => {
    try {
      const saqlanganRejim = localStorage.getItem('teztaom_theme');
      return saqlanganRejim === 'dark';
    } catch {
      return false;
    }
  });

  // 5. AI Rejim (Kompyuter va Telefonda to'liq ishlaydi)
  const [aiRejimFaol, setAiRejimFaol] = useState(() => {
    try {
      return localStorage.getItem('teztaom_ai_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [tanlanganVideoIndex, setTanlanganVideoIndex] = useState(0);

  const tanlanganVideo = VIDEO_RO_YXAT[tanlanganVideoIndex] || VIDEO_RO_YXAT[0];
  const handleKeyingiVideo = () => {
    setTanlanganVideoIndex((prev) => (prev + 1) % VIDEO_RO_YXAT.length);
  };

  const [hozirgiSahifa, setHozirgiSahifa] = useState('bosh'); // 'bosh' yoki 'savat'
  const [tanlanganKategoriyaKey, setTanlanganKategoriyaKey] = useState('barchasi');
  const [qidiruv, setQidiruv] = useState('');

  // Til o'zgarganda saqlash
  useEffect(() => {
    try {
      localStorage.setItem('teztaom_til', til);
    } catch (e) {
      console.error(e);
    }
  }, [til]);

  // Savat o'zgarganda saqlash
  useEffect(() => {
    try {
      localStorage.setItem('teztaom_savat', JSON.stringify(savat));
    } catch (e) {
      console.error(e);
    }
  }, [savat]);

  // Layklar o'zgarganda saqlash
  useEffect(() => {
    try {
      localStorage.setItem('teztaom_layklar', JSON.stringify(layklar));
    } catch (e) {
      console.error(e);
    }
  }, [layklar]);

  // Tungi rejim o'zgarganda saqlash
  useEffect(() => {
    try {
      localStorage.setItem('teztaom_theme', tungiRejim ? 'dark' : 'light');
    } catch (e) {
      console.error(e);
    }
  }, [tungiRejim]);

  // AI rejim o'zgarganda saqlash
  useEffect(() => {
    try {
      localStorage.setItem('teztaom_ai_mode', aiRejimFaol ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }, [aiRejimFaol]);

  const handleToggleTheme = () => {
    setTungiRejim((prev) => !prev);
  };

  const handleToggleAiRejim = () => {
    setAiRejimFaol((prev) => !prev);
  };

  const jamiSavatSoni = savat.reduce((sum, item) => sum + item.soni, 0);

  // Layk bosish / bekor qilish
  const handleLaykToggle = (taomId) => {
    setLayklar((oldLayklar) => {
      if (oldLayklar.includes(taomId)) {
        return oldLayklar.filter((id) => id !== taomId);
      } else {
        return [...oldLayklar, taomId];
      }
    });
  };

  // «Savatga» bosilganda taom qo'shiladi va savat sahifasiga o'tadi
  const handleSavatgaQoshish = (taom) => {
    setSavat((oldSavat) => {
      const mavjudIndex = oldSavat.findIndex((item) => item.id === taom.id);
      if (mavjudIndex !== -1) {
        const yangi = [...oldSavat];
        yangi[mavjudIndex].soni += 1;
        return yangi;
      } else {
        return [...oldSavat, { ...taom, soni: 1 }];
      }
    });

    setHozirgiSahifa('savat');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMiqdorniOshirish = (id) => {
    setSavat((old) =>
      old.map((item) =>
        item.id === id ? { ...item, soni: item.soni + 1 } : item
      )
    );
  };

  const handleMiqdorniKamaytirish = (id) => {
    setSavat((old) =>
      old
        .map((item) =>
          item.id === id ? { ...item, soni: item.soni - 1 } : item
        )
        .filter((item) => item.soni > 0)
    );
  };

  const handleOchirish = (id) => {
    setSavat((old) => old.filter((item) => item.id !== id));
  };

  const handleBuyurtmaTugatish = () => {
    setSavat([]);
    try {
      localStorage.removeItem('teztaom_savat');
    } catch (e) {
      console.error(e);
    }
  };

  const handleHeroBuyurtmaClick = () => {
    if (hozirgiSahifa !== 'bosh') {
      setHozirgiSahifa('bosh');
      setTimeout(() => {
        const el = document.getElementById('taomlar-grid');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('taomlar-grid');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Ham kategoriya, ham jonli qidiruv so'zi bo'yicha saralash
  const korsatiladiganTaomlar = TAOMLAR.filter((taom) => {
    const mosKategoriya =
      tanlanganKategoriyaKey === 'barchasi' ||
      taom.kategoriyaKey === tanlanganKategoriyaKey;

    if (!qidiruv.trim()) return mosKategoriya;

    const q = qidiruv.toLowerCase();
    const nomUz = (taom.nom.uz || '').toLowerCase();
    const nomRu = (taom.nom.ru || '').toLowerCase();
    const nomEn = (taom.nom.en || '').toLowerCase();

    const mosNom = nomUz.includes(q) || nomRu.includes(q) || nomEn.includes(q);
    return mosKategoriya && mosNom;
  });

  return (
    <div className={`app ${tungiRejim ? 'dark-mode' : ''} ${aiRejimFaol ? 'ai-mode-active' : ''}`}>
      {/* 1. Navbar */}
      <Navbar
        savatSoni={jamiSavatSoni}
        layklarSoni={layklar.length}
        tungiRejim={tungiRejim}
        onToggleTheme={handleToggleTheme}
        til={til}
        onTilOzgartirish={setTil}
        t={t}
        hozirgiSahifa={hozirgiSahifa}
        aiRejimFaol={aiRejimFaol}
        onOpenAiModal={() => setIsAiModalOpen(true)}
        onWatchVideo={() => setIsVideoModalOpen(true)}
        onSavatClick={() => {
          setHozirgiSahifa('savat');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onHomeClick={() => {
          setHozirgiSahifa('bosh');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* AI Rejimi yoqilgan bo'lsa xabar paneli */}
      {aiRejimFaol && hozirgiSahifa === 'bosh' && (
        <div className="ai-active-status-bar">
          <div className="ai-status-container">
            <span className="ai-sparkle-dot">✨</span>
            <span>
              <strong>AI Rejimi faollashtirilgan:</strong> Siz uchun eng ommabop va mos taomlar saralandi.
            </span>
            <button 
              type="button" 
              className="btn-ai-manage"
              onClick={() => setIsAiModalOpen(true)}
            >
              AI bilan so‘rash →
            </button>
          </div>
        </div>
      )}

      {/* Asosiy sahifa */}
      {hozirgiSahifa === 'bosh' && (
        <main>
          {/* 2. Hero */}
          <Hero 
            onBuyurtmaClick={handleHeroBuyurtmaClick} 
            t={t}
            qidiruv={qidiruv}
            onQidiruvOzgardi={setQidiruv}
            onWatchVideo={() => setIsVideoModalOpen(true)}
            tanlanganVideo={tanlanganVideo}
            onKeyingiVideo={handleKeyingiVideo}
            til={til}
          />

          {/* 3. Kategoriyalar (5 ta tugma) */}
          <Categories
            kategoriyalar={KATEGORIYALAR}
            tanlanganKategoriyaKey={tanlanganKategoriyaKey}
            onKategoriyaTanlash={setTanlanganKategoriyaKey}
            t={t}
          />

          {/* 4. Taomlar grid (kompyuterda 4 ustun, telefonda 2 ustun) */}
          <FoodGrid
            taomlar={korsatiladiganTaomlar}
            layklar={layklar}
            onLayk={handleLaykToggle}
            onSavatga={handleSavatgaQoshish}
            til={til}
            t={t}
            onClearSearch={() => setQidiruv('')}
            aiRejimFaol={aiRejimFaol}
          />
        </main>
      )}

      {/* Savat sahifasi */}
      {hozirgiSahifa === 'savat' && (
        <main>
          <Cart
            savatElementlari={savat}
            onMiqdorniOshirish={handleMiqdorniOshirish}
            onMiqdorniKamaytirish={handleMiqdorniKamaytirish}
            onOchirish={handleOchirish}
            onMenyugaQaytish={() => {
              setHozirgiSahifa('bosh');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBuyurtmaTugatish={handleBuyurtmaTugatish}
            til={til}
            t={t}
          />
        </main>
      )}

      {/* 5. Footer */}
      <Footer t={t} />

      {/* Har ikkala qurilmada (Kompyuter va Telefon) pastki burchakdagi suzuvchi AI tugmasi */}
      <button
        type="button"
        className={`floating-ai-fab ${aiRejimFaol ? 'active' : ''}`}
        onClick={() => setIsAiModalOpen(true)}
        title="TezTaom AI Oshpaz"
        aria-label="AI Oshpaz"
      >
        <span className="fab-ai-icon">✨</span>
        <span className="fab-ai-label">{t.aiRejim}</span>
      </button>

      {/* AI Yordamchi Modali */}
      <AiAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        taomlar={TAOMLAR}
        onSavatga={handleSavatgaQoshish}
        til={til}
        t={t}
        aiRejimFaol={aiRejimFaol}
        onToggleAiRejim={handleToggleAiRejim}
      />

      {/* Promo Video Modal (Kompyuter va Telefonda to'liq ekranli video) */}
      <PromoVideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        t={t}
        onBuyurtmaClick={handleHeroBuyurtmaClick}
        videoRoyxat={VIDEO_RO_YXAT}
        tanlanganVideoIndex={tanlanganVideoIndex}
        onTanlashVideo={(idx) => setTanlanganVideoIndex(idx)}
        til={til}
      />
    </div>
  );
}

export default App;
