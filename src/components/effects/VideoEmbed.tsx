import { useState } from "react";

/**
 * Video de YouTube que solo se carga al hacer clic (no ralentiza la página ni instala
 * cookies de terceros antes de tiempo). Usa el dominio youtube-nocookie.
 */
export default function VideoEmbed({ videoId, title, poster }: { videoId: string; title: string; poster: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="video-embed">
      {playing ? (
        <iframe src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`} title={title} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />
      ) : (
        <button onClick={() => setPlaying(true)} aria-label={`Reproducir video: ${title}`}>
          <img src={poster} alt="" loading="lazy" decoding="async" />
          <span className="video-play" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg></span>
          <span className="video-label">{title}</span>
        </button>
      )}
    </div>
  );
}
