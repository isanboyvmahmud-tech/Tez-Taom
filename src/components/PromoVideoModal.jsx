import { useEffect, useRef, useState } from 'react';

function PromoVideoModal({ 
  isOpen, 
  onClose, 
  t, 
  onBuyurtmaClick,
  videoRoyxat = [],
  tanlanganVideoIndex = 0,
  onTanlashVideo,
  til = 'uz'
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const joriyVideo = (videoRoyxat && videoRoyxat[tanlanganVideoIndex]) || {
    nom: { uz: '🥩 Shef-Povar Steyki (Grilda)', ru: '🥩 Стейк от шеф-повара на гриле', en: '🥩 Chef Grilled Ribeye Steak' },
    videoSrc: '/steak_slice.webm',
    videoType: 'video/webm',
    altVideoSrc: '/steak_720p.webm',
    altVideoType: 'video/webm',
    fallbackMp4: '/steak.mp4',
    poster: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=1200&q=80'
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="promo-video-backdrop" onClick={onClose}>
      <div className="promo-video-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Yuqori panel */}
        <div className="promo-video-header">
          <div className="promo-video-branding">
            <span className="promo-video-sparkle">🎬</span>
            <div>
              <strong className="promo-video-title">{joriyVideo.nom?.[til] || joriyVideo.nom?.uz || t.promoVideoTitle}</strong>
              <span className="promo-video-tag">Ultra HD 4K</span>
            </div>
          </div>

          <button 
            type="button" 
            className="promo-video-close-btn"
            onClick={onClose}
            title="Yopish (ESC)"
          >
            ✕
          </button>
        </div>

        {/* Video tanlash paneli (Playlist tabs) */}
        {videoRoyxat && videoRoyxat.length > 0 && (
          <div className="promo-video-tabs">
            {videoRoyxat.map((v, index) => (
              <button
                key={v.id}
                type="button"
                className={`promo-video-tab-btn ${index === tanlanganVideoIndex ? 'active' : ''}`}
                onClick={() => {
                  if (onTanlashVideo) onTanlashVideo(index);
                  setIsPlaying(true);
                }}
              >
                {v.nom?.[til] || v.nom?.uz || v.id}
              </button>
            ))}
          </div>
        )}

        {/* Video Player */}
        <div className="promo-video-player-box">
          <video
            key={joriyVideo.videoSrc}
            ref={videoRef}
            className="promo-video-element"
            autoPlay
            loop
            playsInline
            muted={isMuted}
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
            Brauzeringiz videoni qo‘llab-quvvatlamaydi.
          </video>

          {/* Video ustidagi boshqaruv paneli */}
          <div className="promo-video-controls-overlay">
            <button 
              type="button" 
              className="btn-video-control" 
              onClick={togglePlay}
              title={isPlaying ? "To‘xtatish" : "Ijro etish"}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>

            <button 
              type="button" 
              className="btn-video-control" 
              onClick={toggleMute}
              title={isMuted ? "Ovozni yoqish" : "Ovozni o‘chirish"}
            >
              {isMuted ? '🔇' : '🔊'}
            </button>
          </div>
        </div>

        {/* Pastki tugma */}
        <div className="promo-video-footer">
          <div className="promo-footer-text">
            <span>{joriyVideo.tavsif?.[til] || joriyVideo.tavsif?.uz || "🔥 30 daqiqada yetkazib berish xizmati"}</span>
          </div>

          <button
            type="button"
            className="btn-primary promo-buyurtma-btn"
            onClick={() => {
              onClose();
              if (onBuyurtmaClick) onBuyurtmaClick();
            }}
          >
            <span>{t.buyurtmaBerish}</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromoVideoModal;
