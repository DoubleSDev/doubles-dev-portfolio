'use client';

import { useEffect, useRef, useState } from 'react';
import { asset } from './asset-path';
import type { PortfolioVideo } from './video-work';

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
}

export function VideoGallery({ entries, featured = false }: { entries: PortfolioVideo[]; featured?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState<PortfolioVideo | null>(null);
  const [source, setSource] = useState('');
  const [failed, setFailed] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function openVideo(entry: PortfolioVideo) {
    setSource('');
    setFailed(false);
    setCurrentTime(0);
    setDuration(0);
    setActive(entry);
    dialog.current?.showModal();
  }

  useEffect(() => {
    if (!active) return;

    const controller = new AbortController();
    let objectUrl: string | undefined;

    async function loadVideo(entry: PortfolioVideo) {
      try {
        const response = await fetch(asset(entry.video), { signal: controller.signal });
        if (!response.ok) throw new Error('Video download failed');
        const blob = await response.blob();
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(blob);
        setSource(objectUrl);
      } catch {
        if (!controller.signal.aborted) setFailed(true);
      }
    }

    void loadVideo(active);
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [active]);

  function seekTo(seconds: number) {
    if (!player.current || !duration) return;
    const target = Math.max(0, Math.min(duration, seconds));
    player.current.currentTime = target;
    setCurrentTime(target);
  }

  return (
    <>
      <div className={featured ? 'videoGrid featuredVideo' : 'videoGrid'}>
        {entries.map((entry) => (
          <article className="modelCard" key={entry.video}>
            <button className="modelButton" type="button" onClick={() => openVideo(entry)} aria-label={`Play ${entry.title} · ${entry.type}`} aria-haspopup="dialog">
              <span className="videoFrame">
                <img src={asset(entry.poster)} alt="" loading="lazy" decoding="async" />
                <span className="videoPlay" aria-hidden="true">▶</span>
              </span>
            </button>
            <div className="videoCaption"><h3>{entry.title}</h3><p>{entry.type}</p></div>
          </article>
        ))}
      </div>
      <dialog className="portfolioDialog videoDialog" ref={dialog} aria-label={active?.title ?? 'Portfolio video'}
        onClose={() => setActive(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
        onKeyDown={(event) => {
          if (event.target instanceof HTMLInputElement || event.target === player.current) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            seekTo((player.current?.currentTime ?? 0) + (event.key === 'ArrowLeft' ? -5 : 5));
          }
        }}
      >
        <div className="dialogInner">
          <div className="dialogHeader">
            <h2>{active?.title}</h2>
            <button className="dialogClose" type="button" onClick={() => dialog.current?.close()} aria-label="Close video">×</button>
          </div>
          {active && (
            <>
              {source && !failed && (
                <video ref={player} src={source} poster={asset(active.poster)} controls autoPlay playsInline
                  onError={() => setFailed(true)}
                  onDurationChange={(event) => {
                    const seconds = event.currentTarget.duration;
                    setDuration(Number.isFinite(seconds) ? seconds : 0);
                  }}
                  onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
                />
              )}
              {!source && !failed && <p className="videoStatus" role="status">Loading video…</p>}
              {failed && <p className="videoStatus" role="alert">The video could not load. Close it and try again.</p>}
              {source && !failed && (
                <div className="seekControls">
                  <button onClick={() => seekTo(currentTime - 10)} disabled={!duration} aria-label="Back 10 seconds">−10s</button>
                  <span>{formatTime(currentTime)}</span>
                  <input type="range" min={0} max={duration} step={0.1} value={Math.min(currentTime, duration)} disabled={!duration}
                    onChange={(event) => seekTo(Number(event.currentTarget.value))} aria-label="Seek video" />
                  <span>{formatTime(duration)}</span>
                  <button onClick={() => seekTo(currentTime + 10)} disabled={!duration} aria-label="Forward 10 seconds">+10s</button>
                </div>
              )}
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
