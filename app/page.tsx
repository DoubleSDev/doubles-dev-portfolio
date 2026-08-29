'use client';

import { useEffect, useRef, useState } from 'react';

const projects = [
  { id: '01', title: 'World & Weather Systems', type: 'Lighting · Weather · Items', year: 'Showcase', tone: 'blue', poster: './posters/world-weather.jpg', video: './videos/world-weather-systems.mp4' },
  { id: '02', title: 'Gameplay Systems', type: 'Fishing · NPC Dialogue', year: 'Showcase', tone: 'orange', poster: './posters/gameplay.jpg', video: './videos/gameplay-systems.mp4' },
  { id: '03', title: 'UI & Inventory Systems', type: 'Inventory · Store · Settings', year: 'Showcase', tone: 'acid', poster: './posters/ui-inventory.jpg', video: './videos/ui-inventory-systems.mp4' },
  { id: '04', title: 'Live Ops & Admin Tools', type: 'Game Management', year: 'Showcase', tone: 'violet', poster: './posters/live-ops.jpg', video: './videos/live-ops-admin.mp4' },
  { id: '05', title: 'Social Interaction Systems', type: 'Hold Hands · Carry Animations', year: 'Showcase', tone: 'orange', poster: './posters/social-interaction.jpg', video: './videos/social-interaction-systems.mp4' },
  { id: '06', title: 'Interactive Item Systems', type: 'Custom Text · Drawing Trail · Furniture', year: 'Showcase', tone: 'acid', poster: './posters/interactive-item-systems.jpg', video: './videos/interactive-item-systems.mp4' },
  { id: '07', title: 'World Canvas Placement', type: 'Pixel Art · Placeable Display', year: 'Showcase', tone: 'blue', poster: './posters/world-canvas-placement.jpg', video: './videos/world-canvas-placement.mp4' },
  { id: '08', title: 'Sword Travel & Food Shop', type: 'Sword Flight · NPC Food Shop', year: 'Showcase', tone: 'violet', poster: './posters/sword-travel-food-shop.jpg', video: './videos/sword-travel-food-shop.mp4' },
  { id: '09', title: 'Avatar Scale Customization', type: 'Body Scale · Live Preview', year: 'Showcase', tone: 'orange', poster: './posters/avatar-scale-customization.jpg', video: './videos/avatar-scale-customization.mp4' },
];

const currentCollaboration = {
  id: 'NOW',
  title: 'The Journey Ends, The Memories Remain',
  type: 'Current Collaboration',
  year: 'กำลังร่วมพัฒนา',
  tone: 'violet',
  poster: './posters/current-journey-memories.jpg',
  video: './videos/current-journey-memories.mp4',
};

const pastCollaborations = [
  { id: '01', title: 'Bizblox Adventure', type: 'Update 3.1 · Trailer 1', year: 'Past Project', tone: 'blue', poster: './posters/bizblox-31-trailer-1.jpg', video: './videos/bizblox-31-trailer-1.mp4' },
  { id: '02', title: 'Bizblox Adventure', type: 'Update 3.1 · Trailer 2', year: 'Past Project', tone: 'orange', poster: './posters/bizblox-31-trailer-2.jpg', video: './videos/bizblox-31-trailer-2.mp4' },
  { id: '03', title: 'Bizblox Adventure', type: 'Update 3.1 · Final Trailer', year: 'Past Project', tone: 'acid', poster: './posters/bizblox-31-final.jpg', video: './videos/bizblox-31-final.mp4' },
  { id: '04', title: 'Bizblox Adventure', type: 'Update 3.2.9 · Trailer 2', year: 'Past Project', tone: 'violet', poster: './posters/bizblox-329-trailer-2.jpg', video: './videos/bizblox-329-trailer-2.mp4' },
  { id: '05', title: 'Bizblox Adventure', type: 'Update 3.2.9 · Trailer 3', year: 'Past Project', tone: 'blue', poster: './posters/bizblox-329-trailer-3.jpg', video: './videos/bizblox-329-trailer-3.mp4' },
];

type PortfolioVideo = (typeof projects)[number] | typeof currentCollaboration | (typeof pastCollaborations)[number];

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
};

export default function Home() {
  const [activeProject, setActiveProject] = useState<PortfolioVideo | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoSource, setVideoSource] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setActiveProject(null);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [activeProject]);

  useEffect(() => {
    if (!activeProject) {
      setVideoSource(null);
      setVideoLoading(false);
      setVideoError(false);
      return;
    }

    const controller = new AbortController();
    let objectUrl: string | null = null;
    setVideoSource(null);
    setVideoLoading(true);
    setVideoError(false);

    const prepareSeekableVideo = async () => {
      try {
        const response = await fetch(activeProject.video, { signal: controller.signal });
        if (!response.ok) throw new Error('Video download failed');
        const blob = await response.blob();
        if (controller.signal.aborted) return;
        objectUrl = URL.createObjectURL(blob);
        setVideoSource(objectUrl);
      } catch {
        if (!controller.signal.aborted) setVideoError(true);
      } finally {
        if (!controller.signal.aborted) setVideoLoading(false);
      }
    };

    prepareSeekableVideo();
    return () => {
      controller.abort();
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [activeProject]);

  useEffect(() => {
    const seekWithKeyboard = (event: KeyboardEvent) => {
      if (!activeProject || !videoRef.current) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        const offset = event.key === 'ArrowLeft' ? -5 : 5;
        videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + offset));
      }
    };
    window.addEventListener('keydown', seekWithKeyboard);
    return () => window.removeEventListener('keydown', seekWithKeyboard);
  }, [activeProject]);

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const target = Math.max(0, Math.min(video.duration || 0, seconds));
    video.currentTime = target;
    setCurrentTime(target);
  };

  const seekBy = (seconds: number) => seekTo((videoRef.current?.currentTime || 0) + seconds);

  return (
    <main>
      <nav className="nav shell" aria-label="เมนูหลัก">
        <a className="brand" href="#top">DOUBLES DEV</a>
        <div className="navLinks">
          <a href="#work">Work</a>
          <a href="#collaborations">Projects</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="heroContent">
          <p className="eyebrow">ROBLOX DEVELOPER · SCRIPT · GAME CONSULTING</p>
          <h1>DoubleS<br />Dev</h1>
          <p className="lead">นักพัฒนา Roblox ที่ถนัดการมอง <em>ภาพรวมของเกม</em> วางทิศทาง และให้คำแนะนำด้านการบริหารเกม พร้อมพัฒนาระบบด้วย Script ใน Roblox Studio</p>
          <div className="heroActions">
            <a className="primaryButton" href="#work">ดูผลงาน</a>
            <a className="ghostButton" href="mailto:godapd059@gamil.com">คุยเรื่องโปรเจกต์ ↗</a>
          </div>
        </div>
        <div className="heroArt" aria-hidden="true">
          <img className="heroPoster" src="./posters/world-weather.jpg" alt="" />
          <div className="lightBeam" />
          <span>NF</span>
          <small>ROBLOX SHOWREEL / 2026</small>
        </div>
        <span className="scrollMark">SCROLL</span>
      </section>

      <section className="work shell" id="work">
        <div className="sectionTitle">
          <div><p className="eyebrow">SELECTED WORK</p><h2>Games that work.</h2></div>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <article className="project" key={project.id}>
              <button className={`projectVisual ${project.tone}`} onClick={() => setActiveProject(project)} aria-label={`เล่นวิดีโอ ${project.title}`}>
                <img className="projectPoster" src={project.poster} alt="" />
                <span className="projectIndex">{project.id}</span>
                <span className="play">▶</span>
                <span className="visualType">{project.type}</span>
              </button>
              <div className="projectInfo">
                <h3>{project.title}</h3>
                <p>{project.type} · {project.year}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="collaborations shell" id="collaborations">
        <div className="sectionTitle">
          <div><p className="eyebrow">PROJECT COLLABORATIONS</p><h2>Built together.</h2></div>
          <p>โปรเจกต์ที่กำลังร่วมพัฒนา<br />และผลงานที่เคยเข้าร่วม</p>
        </div>

        <div className="currentLabel"><span className="liveDot" /> CURRENT PROJECT</div>
        <article className="currentProject">
          <button className="currentVisual" onClick={() => setActiveProject(currentCollaboration)} aria-label={`เล่นวิดีโอ ${currentCollaboration.title}`}>
            <img className="projectPoster" src={currentCollaboration.poster} alt="" />
            <span className="projectIndex">NOW</span>
            <span className="play">▶</span>
            <span className="visualType">CURRENT COLLABORATION</span>
          </button>
          <div className="currentInfo">
            <div><p>กำลังร่วมพัฒนาอยู่ในขณะนี้</p><h3>{currentCollaboration.title}</h3></div>
            <button onClick={() => setActiveProject(currentCollaboration)}>WATCH TRAILER ↗</button>
          </div>
        </article>

        <div className="pastHeader"><p className="eyebrow">PAST PROJECT · BIZBLOX ADVENTURE</p><span>5 TRAILERS</span></div>
        <div className="collabGrid">
          {pastCollaborations.map((project) => (
            <article className="project" key={`${project.title}-${project.type}`}>
              <button className={`projectVisual ${project.tone}`} onClick={() => setActiveProject(project)} aria-label={`เล่นวิดีโอ ${project.title} ${project.type}`}>
                <img className="projectPoster" src={project.poster} alt="" />
                <span className="projectIndex">{project.id}</span>
                <span className="play">▶</span>
                <span className="visualType">{project.type}</span>
              </button>
              <div className="projectInfo"><h3>{project.title}</h3><p>{project.type}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="services shell" id="services">
        <p className="eyebrow">WHAT I DO</p>
        <div className="serviceRows">
          <div><span>01</span><h3>Game Overview &amp; Consulting</h3><p>วิเคราะห์ภาพรวม ให้คำแนะนำ และวางแนวทางบริหารเกม</p></div>
          <div><span>02</span><h3>Roblox Scripting</h3><p>เขียนระบบ Gameplay และแก้ปัญหาโค้ดใน Roblox Studio</p></div>
          <div><span>03</span><h3>Animation &amp; UI</h3><p>สร้างอนิเมชันและ UI ที่พร้อมใช้งานจริงในเกม</p></div>
        </div>
      </section>

      <section className="about shell" id="about">
        <div><p className="eyebrow">ABOUT</p><h2>I see the<br />whole game.</h2></div>
        <div className="aboutCopy">
          <p>จุดแข็งที่สุดของผมคือการมองภาพรวมของเกม เห็นทั้งระบบ ประสบการณ์ผู้เล่น และทิศทางการบริหาร เพื่อนำไปสู่คำแนะนำที่ใช้งานได้จริง รองลงมาคือ Scripting ส่วน Animation และ UI สามารถทำได้ในระดับทั่วไปเพื่อให้งานครบจบในคนเดียว</p>
          <div className="stats">
            <div><strong>01</strong><span>GAME VISION</span></div>
            <div><strong>02</strong><span>SCRIPTING</span></div>
            <div><strong>03</strong><span>ANIMATION &amp; UI</span></div>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="shell">
          <p className="eyebrow">LET&apos;S BUILD A BETTER GAME</p>
          <a className="contactLink" href="mailto:godapd059@gamil.com">godapd059@gamil.com ↗</a>
          <div className="footerMeta"><span>© 2026 DOUBLES DEV</span><span>THAILAND</span><div><a href="#work">Work</a><a href="#services">Skills</a><a href="#top">Top ↑</a></div></div>
        </div>
      </footer>

      {activeProject && (
        <div className="modal" role="dialog" aria-modal="true" aria-label={activeProject.title} onClick={() => setActiveProject(null)}>
          <div className="modalInner" onClick={(event) => event.stopPropagation()}>
            <button className="modalClose" onClick={() => setActiveProject(null)} aria-label="ปิดวิดีโอ">CLOSE ×</button>
            {videoLoading && <div className="videoPreparing"><span />กำลังเตรียมวิดีโอสำหรับการกรอ...</div>}
            {videoError && <div className="videoPreparing videoFailed">โหลดวิดีโอไม่สำเร็จ กรุณาปิดแล้วเปิดคลิปอีกครั้ง</div>}
            {videoSource && <video
              key={videoSource}
              ref={videoRef}
              src={videoSource}
              poster={activeProject.poster}
              controls
              autoPlay
              playsInline
              preload="auto"
              onLoadedMetadata={(event) => setDuration(event.currentTarget.duration || 0)}
              onDurationChange={(event) => setDuration(event.currentTarget.duration || 0)}
              onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
              onSeeked={(event) => setCurrentTime(event.currentTarget.currentTime)}
            >เบราว์เซอร์นี้ไม่รองรับวิดีโอ</video>}
            <div className={`seekControls ${videoSource ? '' : 'isDisabled'}`} aria-label="ตัวควบคุมการกรอวิดีโอ">
              <button type="button" onClick={() => seekBy(-10)} aria-label="ย้อนกลับ 10 วินาที">−10s</button>
              <span>{formatTime(currentTime)}</span>
              <input
                className="seekBar"
                type="range"
                min="0"
                max={duration || 0}
                step="0.1"
                value={Math.min(currentTime, duration || 0)}
                disabled={!videoSource}
                onInput={(event) => {
                  const time = Number(event.target.value);
                  seekTo(time);
                }}
                aria-label="กรอวิดีโอ"
              />
              <span>{formatTime(duration)}</span>
              <button type="button" onClick={() => seekBy(10)} aria-label="เดินหน้า 10 วินาที">+10s</button>
            </div>
            <div className="modalMeta"><strong>{activeProject.title}</strong><span>{activeProject.type} / {activeProject.year}</span></div>
          </div>
        </div>
      )}
    </main>
  );
}
