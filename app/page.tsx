'use client';

import { useEffect, useRef, useState } from 'react';

const models = [
  { title: 'Halloween Throne', category: 'FANTASY PROP', image: './models/halloween-throne.png', description: 'บัลลังก์ธีมฮาโลวีนโทนม่วง–ทอง ประดับฟักทอง แมว และมงกุฎ พร้อมมุมมองด้านหน้าและด้านหลัง', detail: 'Front / Back · Throne & decorations' },
  { title: 'Void Dragon Armor', category: 'FANTASY ARMOR', image: './models/void-dragon.png', description: 'เกราะแฟนตาซีโทนดำ–ม่วง พร้อมปีกและรายละเอียดคริสตัล', detail: 'Front / Back · Character armor' },
  { title: 'Crimson Knight', category: 'CHARACTER ARMOR', image: './models/crimson-knight.png', description: 'ชุดเกราะอัศวินโทนแดง พร้อมผ้าคลุมและลวดลายเรืองแสง', detail: 'Front / Back · Armor & cape' },
  { title: 'Silver Knight', category: 'ARMOR & WEAPON', image: './models/silver-knight.png', description: 'ชุดเกราะโลหะสีเงินและดาบ พร้อมมุมมองด้านหน้าและด้านหลัง', detail: 'Front / Back · Armor & sword' },
  { title: 'Crystal Fan', category: 'WEAPON DESIGN', image: './models/crystal-fan.png', description: 'อาวุธพัดประดับคริสตัลสีม่วง พร้อมภาพโมเดลและการจัดวาง UV ใน Blender', detail: 'Blender · Model & UV layout' },
  { title: 'Blue & Gold Character', category: 'CHARACTER DESIGN', image: './models/blue-character.png', description: 'โมเดลตัวละครสไตล์อนิเมะ เสื้อผ้าโทนน้ำเงินและรายละเอียดสีทอง', detail: 'Front / Back · Character outfit' },
];

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
  const [selectedModel, setSelectedModel] = useState(0);
  const [activeModel, setActiveModel] = useState<(typeof models)[number] | null>(null);
  const modelDialogRef = useRef<HTMLDialogElement>(null);
  const [activeProject, setActiveProject] = useState<PortfolioVideo | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [videoSource, setVideoSource] = useState<string | null>(null);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const openProject = (project: PortfolioVideo) => {
    setCurrentTime(0);
    setDuration(0);
    setVideoSource(null);
    setVideoLoading(true);
    setVideoError(false);
    setActiveProject(project);
  };

  useEffect(() => {
    if (activeModel) modelDialogRef.current?.showModal();
    else modelDialogRef.current?.close();
  }, [activeModel]);

  useEffect(() => {
    if (!activeModel && !activeProject) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [activeModel, activeProject]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setActiveProject(null);
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);

  useEffect(() => {
    if (!activeProject) return;

    const controller = new AbortController();
    let objectUrl: string | null = null;

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
      <nav className="nav" aria-label="เมนูหลัก">
        <a className="brand" href="#top"><span className="brandSigil">DS</span><span>DoubleS Dev<small>ROBLOX DEVELOPER</small></span></a>
        <div className="navLinks">
          <a href="#models">3D Models</a>
          <a href="#work">Work</a>
          <a href="#collaborations">Projects</a>
          <a href="#about">About</a>
        </div>
        <a className="navContact" href="#contact">ติดต่อร่วมงาน</a>
      </nav>

      <section className="hero" id="top">
        <img className="cosmicBackdrop" src="./theme/aemeath-starlight.png" alt="" />
        <div className="heroContent shell">
          <p className="eyebrow">GAME VISION · SCRIPTING · 3D CREATION</p>
          <h1>DoubleS <i>Dev</i></h1>
          <p className="heroSubtitle">จากภาพรวมของเกม<br /><span>สู่โลกที่เล่นได้จริง</span></p>
          <p className="lead">วางทิศทางเกม พัฒนาระบบด้วย Script<br />และสร้างงาน 3D สำหรับโลกของ Roblox</p>
          <div className="heroActions">
            <a className="primaryButton" href="#models">สำรวจงาน 3D</a>
            <a className="ghostButton" href="#work">ดูระบบเกม</a>
          </div>
        </div>
        <div className="heroFooter shell"><span className="heroEdition">DOUBLES DEV / PORTFOLIO 2026</span><p>Theme artwork © KURO GAMES<br />ผลงาน DoubleS Dev อยู่ในส่วนด้านล่าง</p><a href="#models">EXPLORE THE WORK</a></div>
      </section>

      <section className="models shell" id="models">
        <div className="sectionTitle">
          <div><p className="eyebrow">01 / THE CREATION ARCHIVE</p><h2>Characters &amp; <i>artifacts.</i></h2></div>
          <p>โมเดลตัวละคร ชุดเกราะ และอาวุธ<br />รายละเอียดที่ทำให้โลกของเกมมีเอกลักษณ์</p>
        </div>
        <div className="modelGallery">
          <article className="galleryMain" aria-live="polite">
            <button className="galleryVisual" onClick={() => setActiveModel(models[selectedModel])} aria-label={`ดูภาพเต็ม ${models[selectedModel].title}`}>
              <span className="modelLabel"><span>DOUBLES DEV / ORIGINAL WORK</span><span>{String(selectedModel + 1).padStart(2, '0')} / {String(models.length).padStart(2, '0')}</span></span>
              <img src={models[selectedModel].image} alt={models[selectedModel].description} loading="lazy" />
            </button>
            <div className="galleryDetail">
              <p className="modelCategory">{models[selectedModel].category}</p>
              <h3>{models[selectedModel].title}</h3>
              <p>{models[selectedModel].description}</p>
              <p className="modelDetail">{models[selectedModel].detail}</p>
              <button onClick={() => setActiveModel(models[selectedModel])}>ดูภาพเต็ม</button>
            </div>
          </article>
          <div className="modelThumbnails" aria-label="เลือกผลงาน 3D">
            {models.map((model, index) => (
              <button className="modelThumb" key={model.title} aria-pressed={selectedModel === index} onClick={() => setSelectedModel(index)}>
                <img src={model.image} alt="" loading="lazy" />
                <span>{model.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="work shell" id="work">
        <div className="sectionTitle">
          <div><p className="eyebrow">02 / SCRIPT &amp; GAMEPLAY</p><h2>Systems in <i>motion.</i></h2></div>
          <p>ระบบเกมที่ลงมือพัฒนา<br />กดดูวิดีโอผลงานแต่ละระบบได้เลย</p>
        </div>
        <div className="projectGrid">
          {projects.map((project) => (
            <article className="project" key={project.id}>
              <button className={`projectVisual ${project.tone}`} onClick={() => openProject(project)} aria-label={`เล่นวิดีโอ ${project.title}`}>
                <img className="projectPoster" src={project.poster} alt="" loading="lazy" />
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
          <div><p className="eyebrow">03 / SHARED WORLDS</p><h2>A journey <i>together.</i></h2></div>
          <p>โปรเจกต์ที่กำลังร่วมพัฒนา<br />และผลงานที่เคยเข้าร่วม</p>
        </div>

        <div className="collaborationLayout">
        <div>
        <div className="currentLabel"><span className="liveDot" /> CURRENT PROJECT</div>
        <article className="currentProject">
          <button className="currentVisual" onClick={() => openProject(currentCollaboration)} aria-label={`เล่นวิดีโอ ${currentCollaboration.title}`}>
            <img className="projectPoster" src={currentCollaboration.poster} alt="" loading="lazy" />
            <span className="projectIndex">NOW</span>
            <span className="play">▶</span>
            <span className="visualType">CURRENT COLLABORATION</span>
          </button>
          <div className="currentInfo">
            <div><p>กำลังร่วมพัฒนาอยู่ในขณะนี้</p><h3>{currentCollaboration.title}</h3></div>
            <button onClick={() => openProject(currentCollaboration)}>ชมตัวอย่างโปรเจกต์</button>
          </div>
        </article>
        </div>

        <div>
        <div className="pastHeader"><p className="eyebrow">PAST PROJECT · BIZBLOX ADVENTURE</p><span>5 TRAILERS</span></div>
        <div className="collabGrid">
          {pastCollaborations.map((project) => (
            <article className="project" key={`${project.title}-${project.type}`}>
              <button className={`projectVisual ${project.tone}`} onClick={() => openProject(project)} aria-label={`เล่นวิดีโอ ${project.title} ${project.type}`}>
                <img className="projectPoster" src={project.poster} alt="" loading="lazy" />
                <span className="projectIndex">{project.id}</span>
                <span className="play">▶</span>
                <span className="visualType">{project.type}</span>
              </button>
              <div className="projectInfo"><h3>{project.title}</h3><p>{project.type}</p></div>
            </article>
          ))}
        </div>
        </div>
        </div>
      </section>

      <section className="services shell" id="services">
        <p className="eyebrow">04 / CAPABILITIES</p>
        <div className="serviceRows">
          <div><span>01</span><h3>Game Overview &amp; Consulting</h3><p>วิเคราะห์ภาพรวม ให้คำแนะนำ และวางแนวทางบริหารเกม</p></div>
          <div><span>02</span><h3>Roblox Scripting</h3><p>เขียนระบบ Gameplay และแก้ปัญหาโค้ดใน Roblox Studio</p></div>
          <div><span>03</span><h3>Animation &amp; UI</h3><p>สร้างอนิเมชันและ UI ที่พร้อมใช้งานจริงในเกม</p></div>
          <div><span>04</span><h3>3D Models &amp; Assets</h3><p>โมเดลตัวละคร ชุดเกราะ และอาวุธสำหรับโลกของเกม</p></div>
        </div>
      </section>

      <section className="about shell" id="about">
        <div><p className="eyebrow">05 / BEHIND THE WORLDS</p><h2>Vision first.<br /><i>Creation follows.</i></h2></div>
        <div className="aboutCopy">
          <p>ผม DoubleS Dev — จุดแข็งที่สุดคือการมองภาพรวมของเกม เห็นทั้งระบบ ประสบการณ์ผู้เล่น และทิศทางการบริหาร เพื่อนำไปสู่คำแนะนำที่ใช้งานได้จริง รองลงมาคือ Scripting และยังทำงาน 3D Model รวมถึง Animation และ UI ในระดับทั่วไป เพื่อช่วยเชื่อมภาพที่คิดไว้ให้กลายเป็นเกม</p>
          <div className="stats">
            <div><strong>01</strong><span>GAME VISION</span></div>
            <div><strong>02</strong><span>SCRIPTING</span></div>
            <div><strong>03</strong><span>ANIMATION &amp; UI</span></div>
          </div>
        </div>
      </section>

      <footer className="footer" id="contact">
        <div className="shell">
          <p className="eyebrow">LET&apos;S CREATE YOUR NEXT WORLD</p>
          <a className="contactLink" href="mailto:godapd059@gamil.com">godapd059@gamil.com</a>
          <div className="footerMeta"><span>© 2026 DOUBLES DEV</span><span>THAILAND / ROBLOX DEVELOPER</span><div><a href="#work">Work</a><a href="#services">Skills</a><a href="#top">Back to top</a></div></div>
        </div>
      </footer>

      <dialog className="modelDialog" ref={modelDialogRef} onCancel={() => setActiveModel(null)} onClose={() => setActiveModel(null)} onClick={(event) => { if (event.target === event.currentTarget) setActiveModel(null); }} aria-label={activeModel?.title || 'ภาพผลงานโมเดล'}>
        {activeModel && <div className="modelDialogInner">
          <div className="imageDialogHeader"><span>{activeModel.category}</span><button className="modalClose" onClick={() => setActiveModel(null)} aria-label="ปิดภาพ">CLOSE ×</button></div>
          <img src={activeModel.image} alt={activeModel.description} />
          <div className="modalMeta"><strong>{activeModel.title}</strong><span>{activeModel.description}</span></div>
        </div>}
      </dialog>

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
                  const time = Number(event.currentTarget.value);
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
