import { createSignal, onMount, onCleanup, For, Show, createEffect } from "solid-js";
import { gsap } from "gsap";

// ── Target date ────────────────────────────────────────────────
const TARGET = new Date("2026-10-10T09:00:00+05:30").getTime();

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  };
}

const coordinators = [
  { name: "Ben Jacob Mathew",  role: "Coordinator",  phone: "+91 89212 85756" },
  { name: "Samuel Nixon",    role: "Coordinator",    phone: "+91 88486 13249" },
];

// ─── TEDX LOGO INTRO ──────────────────────────────────────────
function TedxLogoIntro({ onComplete }: { onComplete: () => void }) {
  let containerRef: HTMLDivElement | undefined;
  let logoRef: SVGSVGElement | undefined;
  const pathRefs: Array<SVGPathElement | null> = [];
  let xRef: SVGPathElement | undefined;

  onMount(() => {
    if (logoRef && pathRefs.every((r) => r) && xRef && containerRef) {
      const tl = gsap.timeline({ onComplete });
      gsap.set(pathRefs, { opacity: 0 });
      pathRefs.forEach((path) => {
        if (!path) return;
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1, fill: "none", stroke: "#EE2922" });
        tl.to(path, { strokeDashoffset: 0, duration: 0.7, ease: "power2.inOut" });
        tl.to(path, { fill: "#EE2922", duration: 0.25 }, "-=0.1");
      });
      const xBBox    = xRef.getBBox();
      const zoomScale = 0.4;
      const newW     = xBBox.width  / zoomScale;
      const newH     = xBBox.height / zoomScale;
      const newX     = xBBox.x - (newW - xBBox.width)  / 2;
      const newY     = xBBox.y - (newH - xBBox.height) / 2;
      tl.to(logoRef,     { attr: { viewBox: `${newX} ${newY} ${newW} ${newH}` }, duration: 1.4, ease: "power2.inOut" });
      tl.to(containerRef, { backgroundColor: "#EE2922", duration: 0.45 }, "-=0.5");
      tl.to(xRef,         { fill: "black",  duration: 0.45 }, "-=0.45");
    }
  });

  return (
    <div ref={containerRef} class="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden">
      <svg
        ref={logoRef}
        viewBox="0 0 276 198"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        class="w-full h-auto max-w-screen-lg mx-auto"
      >
        <path ref={(el) => (pathRefs[0] = el)} d="M45.1,83.3H27V66.7h56v16.5H64.9v48H45.1V83.3z" />
        <path ref={(el) => (pathRefs[1] = el)} d="M86.1,66.7h54.4v16.5H106v8h34.5v15.4H106v8h34.5v16.5H86.1V66.7z" />
        <path
          ref={(el) => (pathRefs[2] = el)}
          d="M163.7,114.7h7.8c12.4,0,14.2-10,14.2-16.1c0-4.1-1.3-15.3-15.6-15.3h-6.3V114.7z M143.8,66.7h32.6
          c21.5,0,29.1,15.9,29.1,32.2c0,19.8-10.5,32.3-33,32.3h-28.7V66.7z"
        />
        <path
          ref={(el) => { pathRefs[3] = el; xRef = el; }}
          d="M234.1,106.4L228,96.3l-5.9,10.1h-14.6L221.3,86L208,66.6h14.6l5.4,9.6l5.5-9.6h14.6L234.8,86l13.8,20.3H234.1z"
        />
      </svg>
    </div>
  );
}

// ─── Premium Countdown Card ───────────────────────────────────
function CountTile(props: { value: number; label: string; index: number }) {
  const fmt = () => String(props.value).padStart(2, "0");
  let numRef: HTMLSpanElement | undefined;
  let cardRef: HTMLDivElement | undefined;
  let prevValue = props.value;

  createEffect(() => {
    const current = props.value;
    if (numRef && current !== prevValue) {
      // Flip: slide old number out down, bring new number in from top
      gsap.timeline()
        .to(numRef,   { y: 18, opacity: 0, duration: 0.14, ease: "power2.in" })
        .set(numRef,  { y: -22, opacity: 0 })
        .to(numRef,   { y: 0,  opacity: 1, duration: 0.22, ease: "power3.out" });
      // Brief card pulse
      if (cardRef) gsap.to(cardRef, { boxShadow: "0 0 28px rgba(235,0,40,0.45)", duration: 0.18, yoyo: true, repeat: 1 });
      prevValue = current;
    }
  });

  return (
    <div class="count-tile flex flex-col items-center" style={{ "--i": String(props.index) }}>
      {/* Card body */}
      <div
        ref={cardRef}
        class="relative overflow-hidden count-card"
        style={{
          background: "linear-gradient(160deg, rgba(24,24,24,1) 0%, rgba(10,10,10,1) 100%)",
          border: "1px solid rgba(235,0,40,0.22)",
          "box-shadow": "0 0 0 1px rgba(255,255,255,0.03) inset, 0 8px 32px rgba(0,0,0,0.6)",
        }}
      >
        {/* Top red accent bar */}
        <div class="absolute top-0 left-0 right-0 h-[2px]" style={{ background: "linear-gradient(to right, transparent, #eb0028, transparent)" }} />

        {/* Scanline texture */}
        <div class="absolute inset-0 pointer-events-none" style={{ background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,0.008) 3px,rgba(255,255,255,0.008) 6px)" }} />

        {/* Ambient glow bloom at bottom */}
        <div class="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(235,0,40,0.18) 0%, transparent 70%)" }} />

        {/* Top-left corner bracket */}
        <div class="absolute top-[6px] left-[6px] w-[10px] h-[10px] pointer-events-none" style={{ "border-top": "1.5px solid rgba(235,0,40,0.6)", "border-left": "1.5px solid rgba(235,0,40,0.6)" }} />
        {/* Top-right corner bracket */}
        <div class="absolute top-[6px] right-[6px] w-[10px] h-[10px] pointer-events-none" style={{ "border-top": "1.5px solid rgba(235,0,40,0.6)", "border-right": "1.5px solid rgba(235,0,40,0.6)" }} />
        {/* Bottom-left corner bracket */}
        <div class="absolute bottom-[6px] left-[6px] w-[10px] h-[10px] pointer-events-none" style={{ "border-bottom": "1.5px solid rgba(235,0,40,0.6)", "border-left": "1.5px solid rgba(235,0,40,0.6)" }} />
        {/* Bottom-right corner bracket */}
        <div class="absolute bottom-[6px] right-[6px] w-[10px] h-[10px] pointer-events-none" style={{ "border-bottom": "1.5px solid rgba(235,0,40,0.6)", "border-right": "1.5px solid rgba(235,0,40,0.6)" }} />

        {/* The number */}
        <span
          ref={numRef}
          class="relative z-10 flex items-center justify-center w-full h-full font-black text-white tabular-nums select-none tile-num"
          style={{
            "font-family": "'Cal Sans', system-ui, sans-serif",
            "letter-spacing": "-0.03em",
            "line-height": "1",
            "text-shadow": "0 0 40px rgba(255,255,255,0.15), 0 2px 0 rgba(0,0,0,0.5)",
          }}
        >{fmt()}</span>
      </div>

      {/* Label */}
      <span class="tile-label mt-2.5 uppercase font-bold tracking-[0.3em]" style={{ color: "rgba(235,0,40,0.55)" }}>
        {props.label}
      </span>
    </div>
  );
}

// ─── Film grain canvas ─────────────────────────────────────────
function GrainOverlay() {
  let canvas: HTMLCanvasElement | undefined;
  let animId: number;

  onMount(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    function resize() {
      canvas!.width  = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);
    function drawGrain() {
      const w = canvas!.width, h = canvas!.height;
      const imgData = ctx.createImageData(w, h);
      const buf = imgData.data;
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        buf[i] = buf[i+1] = buf[i+2] = v;
        buf[i+3] = 14;
      }
      ctx.putImageData(imgData, 0, 0);
      animId = requestAnimationFrame(drawGrain);
    }
    drawGrain();
    onCleanup(() => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    });
  });

  return <canvas ref={canvas} class="fixed inset-0 pointer-events-none z-[5]" style={{ "mix-blend-mode": "overlay" }} />;
}

// ─── Ember particles ──────────────────────────────────────────
function Embers() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 9,
    dur: 7 + Math.random() * 8,
    size: 1.5 + Math.random() * 2.5,
    opacity: 0.1 + Math.random() * 0.28,
  }));
  return (
    <div class="fixed inset-0 pointer-events-none z-[2] overflow-hidden">
      <For each={particles}>
        {(p) => (
          <div class="ember absolute rounded-full bg-[#eb0028]" style={{
            left: `${p.x}%`,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            animation: `riseUp ${p.dur}s ${p.delay}s infinite linear`,
            filter: "blur(0.4px)",
            "box-shadow": `0 0 ${p.size * 2}px rgba(235,0,40,0.6)`,
          }} />
        )}
      </For>
    </div>
  );
}

// ─── Marquee ──────────────────────────────────────────────────
function Marquee() {
  const text = "TEDxSJCETPalai 2026  ·  Before the Record  ·  October 10  ·  Ideas Worth Spreading  ·  SJCET Palai  ·  ";
  const rep = text.repeat(4);
  return (
    <div class="relative overflow-hidden border-t border-[#eb0028]/10 py-3" style={{ background: "rgba(5,5,5,0.98)" }}>
      <div class="marquee-track flex whitespace-nowrap">
        <span class="marquee-content flex-shrink-0 text-[9px] uppercase tracking-[0.35em] text-white/14 font-bold" style={{ "padding-right": "4rem" }}>{rep}</span>
        <span class="marquee-content flex-shrink-0 text-[9px] uppercase tracking-[0.35em] text-white/14 font-bold" aria-hidden="true" style={{ "padding-right": "4rem" }}>{rep}</span>
      </div>
    </div>
  );
}

// ─── Contact Card ─────────────────────────────────────────────
function ContactCard(props: { c: typeof coordinators[0]; delay: number }) {
  return (
    <div
      class="contact-card group relative border border-white/[0.06] p-5 sm:p-6 overflow-hidden transition-all duration-500 hover:border-[#eb0028]/60"
      style={{ background: "rgba(10,10,10,0.98)", "transition-delay": `${props.delay}ms` }}
    >
      {/* Red bar left */}
      <div class="absolute left-0 top-0 bottom-0 w-[2px] bg-[#eb0028] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
      {/* Hover glow */}
      <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: "radial-gradient(ellipse at top left, rgba(235,0,40,0.09) 0%, transparent 60%)" }} />
      <p class="text-[9px] uppercase tracking-[0.28em] text-[#eb0028]/60 font-bold mb-2">{props.c.role}</p>
      <p class="text-white font-bold text-[15px] mb-5 leading-tight">{props.c.name}</p>
      <a href={`tel:${props.c.phone.replace(/\s/g,"")}`} class="flex items-center gap-2.5 text-[11px] text-white/30 hover:text-white/75 transition-colors group/link">
        <svg class="w-3 h-3 shrink-0 text-[#eb0028]/50 group-hover/link:text-[#eb0028] transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
        {props.c.phone}
      </a>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────
export default function ComingSoon() {
  const [showIntro,    setShowIntro]    = createSignal(true);
  const [showContacts, setShowContacts] = createSignal(false);
  const [tl,           setTl]           = createSignal(getTimeLeft());

  let mainRef:     HTMLDivElement | undefined;
  let headerRef:   HTMLElement | undefined;
  let eyebrowRef:  HTMLDivElement | undefined;
  let themeRef:    HTMLDivElement | undefined;
  let tagRef:      HTMLParagraphElement | undefined;
  let countRef:    HTMLDivElement | undefined;
  let ctaRef:      HTMLDivElement | undefined;
  let rightColRef: HTMLDivElement | undefined;
  let footRef:     HTMLElement | undefined;
  let intervalId:  ReturnType<typeof setInterval>;

  const photos = [
    "/hero1.webp", "/hero2.webp", "/hero3.webp",
    "/hero4.webp", "/hero7.webp", "/hero8.webp",
  ];

  function startPage() {
    setShowIntro(false);
    intervalId = setInterval(() => setTl(getTimeLeft()), 1000);

    gsap.context(() => {
      const els = [headerRef, eyebrowRef, themeRef, tagRef, countRef, ctaRef, rightColRef, footRef];
      gsap.set(els, { opacity: 0 });
      const entrance = gsap.timeline({ delay: 0.15 });
      entrance
        .to(headerRef!,  { opacity: 1, duration: 0.5, ease: "power2.out" })
        .fromTo(eyebrowRef!,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.7, ease: "power3.out" }, "-=0.2")
        .fromTo(themeRef!,
          { opacity: 0, y: 60, skewY: 2 },
          { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: "power4.out" }, "-=0.4")
        .fromTo(tagRef!,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
        .fromTo(countRef!,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
        .fromTo(ctaRef!,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
        .fromTo(rightColRef!,
          { opacity: 0, clipPath: "inset(0 100% 0 0)" },
          { opacity: 1, clipPath: "inset(0 0% 0 0)", duration: 1.2, ease: "power3.inOut" }, 0.3)
        .to(footRef!, { opacity: 1, duration: 0.5 }, "-=0.2");
      gsap.fromTo(".photo-tile",
        { scale: 1.12, filter: "brightness(0)" },
        { scale: 1, filter: "brightness(1)", duration: 1.2, stagger: 0.1, ease: "power2.out", delay: 0.8 }
      );
    }, mainRef);
  }

  onCleanup(() => clearInterval(intervalId));

  return (
    <>
      <Show when={showIntro()}>
        <TedxLogoIntro onComplete={startPage} />
      </Show>

      <Show when={!showIntro()}>
        {/* Global styles for keyframes */}
        <style>{`
          @keyframes riseUp {
            0%   { transform: translateY(0) translateX(0); opacity: var(--op, 0.25); }
            25%  { transform: translateY(-25vh) translateX(10px); }
            50%  { transform: translateY(-50vh) translateX(-8px); opacity: var(--op, 0.25); }
            75%  { transform: translateY(-75vh) translateX(5px); opacity: calc(var(--op, 0.25) * 0.4); }
            100% { transform: translateY(-105vh) translateX(0); opacity: 0; }
          }
          @keyframes marqueeTick {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track { animation: marqueeTick 32s linear infinite; }
          .marquee-track:hover { animation-play-state: paused; }

          /* Glitch effect on "Record" */
          @keyframes glitchFlicker {
            0%,90%,96%,100% { clip-path: none; transform: none; }
            91% { clip-path: polygon(0 15%,100% 15%,100% 42%,0 42%); transform: translateX(-5px); }
            92% { clip-path: polygon(0 58%,100% 58%,100% 82%,0 82%); transform: translateX(5px); }
            93% { clip-path: none; transform: translateX(-2px); }
          }
          .glitch-word { position: relative; animation: glitchFlicker 6s ease-in-out infinite; }
          .glitch-word::before {
            content: attr(data-text);
            position: absolute; inset: 0;
            color: #eb0028;
            -webkit-text-stroke: 0px;
            clip-path: polygon(0 28%,100% 28%,100% 52%,0 52%);
            animation: glitchSlice 6s ease-in-out infinite;
          }
          @keyframes glitchSlice {
            0%,89%,100% { transform: none; opacity: 0; }
            90% { transform: translateX(7px); opacity: 1; }
            91% { transform: translateX(-7px); opacity: 1; }
            92% { transform: none; opacity: 0; }
          }

          /* Tile entrance */
          .count-tile {
            animation: tileIn 0.55s calc(var(--i, 0) * 80ms + 900ms) both cubic-bezier(0.34,1.56,0.64,1);
          }
          @keyframes tileIn {
            from { opacity:0; transform: translateY(28px) scale(0.82); }
            to   { opacity:1; transform: translateY(0) scale(1); }
          }

          /* Ruled line */
          .ruled { height:1px; background: linear-gradient(to right, transparent, rgba(235,0,40,0.6) 20%, rgba(235,0,40,0.6) 80%, transparent); }
          .photo-tile { will-change: transform, filter; }

          /* Responsive card sizing */
          .count-card {
            width: clamp(68px, 18vw, 96px);
            height: clamp(72px, 19vw, 100px);
          }
          .tile-num {
            font-size: clamp(2rem, 9vw, 4.2rem);
          }
          .tile-label {
            font-size: clamp(6px, 2.2vw, 8px);
          }

          @media (min-width: 480px) {
            .count-card {
              width: clamp(72px, 14vw, 96px);
              height: clamp(76px, 15vw, 100px);
            }
            .tile-num {
              font-size: clamp(2.2rem, 6.5vw, 4.2rem);
            }
            .tile-label {
              font-size: clamp(7px, 1.8vw, 8px);
            }
          }

          @media (min-width: 1024px) {
            .count-card {
              width: clamp(80px, 9.5vw, 96px);
              height: clamp(84px, 10vw, 100px);
            }
            .tile-num {
              font-size: clamp(2.4rem, 5.5vw, 4.2rem);
            }
            .tile-label {
              font-size: clamp(6px, 1vw, 8px);
            }
          }

          /* Contact cards animation */
          .contacts-panel {
            display: grid;
            grid-template-rows: 0fr;
            opacity: 0;
            transition: grid-template-rows 0.55s cubic-bezier(0.4,0,0.2,1),
                        opacity 0.4s ease,
                        padding 0.55s cubic-bezier(0.4,0,0.2,1);
          }
          .contacts-panel.open {
            grid-template-rows: 1fr;
            opacity: 1;
          }
          .contacts-inner { overflow: hidden; }

          /* Scanline ambient on body */
          @keyframes scanPulse {
            0%, 100% { opacity: 0.015; }
            50%       { opacity: 0.035; }
          }
          .scanlines {
            background-image: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,1) 2px,
              rgba(255,255,255,1) 4px
            );
            animation: scanPulse 4s ease-in-out infinite;
          }

          /* Mobile photo strip sits ABOVE text on small screens */
          @media (max-width: 1023px) {
            .mobile-layout {
              display: flex;
              flex-direction: column;
            }
            .mobile-photo-strip {
              order: 1;
            }
            .mobile-text-col {
              order: 2;
            }
          }
        `}</style>

        <div ref={mainRef} class="min-h-screen w-full bg-[#060606] text-white overflow-x-hidden relative">
          {/* Film grain */}
          <GrainOverlay />
          {/* Embers */}
          <Embers />

          {/* Scanlines overlay */}
          <div class="fixed inset-0 pointer-events-none z-[3] scanlines" />

          {/* Ambient glow top */}
          <div class="fixed inset-0 pointer-events-none z-[1]" style={{ background: "radial-gradient(ellipse 80% 45% at 50% -2%, rgba(235,0,40,0.18) 0%, transparent 65%)" }} />
          {/* Dot grid */}
          <div class="fixed inset-0 pointer-events-none z-[1]" style={{
            "background-image": "radial-gradient(circle, rgba(235,0,40,0.065) 1px, transparent 1px)",
            "background-size": "48px 48px",
          }} />
          {/* Ambient side glow */}
          <div class="fixed inset-0 pointer-events-none z-[1]" style={{ background: "radial-gradient(ellipse 40% 80% at 100% 50%, rgba(235,0,40,0.04) 0%, transparent 70%)" }} />

          {/* Top accent */}
          <div class="relative z-10 w-full h-[3px]" style={{ background: "linear-gradient(to right, #eb0028, #ff4d4d, #eb0028)", "box-shadow": "0 0 12px rgba(235,0,40,0.5)" }} />

          {/* Header */}
          <header ref={headerRef} class="relative z-10 flex items-center justify-between px-5 sm:px-10 lg:px-16 py-4 sm:py-5">
            <div class="flex items-baseline gap-0 select-none">
              <span class="text-[#eb0028] font-black text-2xl sm:text-[1.8rem] tracking-tight leading-none" style={{ "font-family": "'Cal Sans', system-ui" }}>TED</span>
              <span class="text-[#eb0028] font-black text-2xl sm:text-[1.8rem] tracking-tight leading-none italic" style={{ "font-family": "'Cal Sans', system-ui" }}>x</span>
              <span class="text-white font-semibold text-xl sm:text-[1.35rem] tracking-wider ml-1.5" style={{ opacity: "0.82" }}>SJCET</span>
              <span class="ml-3 hidden sm:inline text-[9px] text-white/18 uppercase tracking-[0.3em] font-bold self-center">Palai</span>
            </div>
            <div class="flex items-center gap-4 sm:gap-6">
              <span class="hidden sm:block text-[9px] text-white/20 uppercase tracking-[0.28em] font-bold border border-white/10 px-3 py-1.5" style={{ "letter-spacing": "0.28em" }}>2026</span>
              <a href="https://instagram.com/tedxsjcetpalai" target="_blank" rel="noopener noreferrer"
                class="flex items-center gap-2 text-xs text-white/25 hover:text-white/80 transition-colors duration-300 group">
                <svg class="w-[15px] h-[15px] group-hover:text-[#eb0028] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span class="hidden sm:inline tracking-widest text-[10px]">@tedxsjcetpalai</span>
              </a>
            </div>
          </header>

          {/* Main body: mobile stacks photo on top, desktop is side-by-side */}
          <main class="relative z-10 mobile-layout lg:flex lg:flex-row min-h-[calc(100svh-60px)]">

            {/* Mobile photo strip (order: 1 on mobile) */}
            <div class="mobile-photo-strip lg:hidden relative" style={{ height: "52vw" }}>
              <div class="grid grid-cols-3 gap-[3px] h-full">
                <For each={photos.slice(0, 6)}>
                  {(src, i) => (
                    <div class="photo-tile relative overflow-hidden">
                      <img src={src} alt={`TEDx moment ${i() + 1}`}
                        class="w-full h-full object-cover" loading="lazy" />
                      <div class="absolute inset-0 bg-[#eb0028]/0 hover:bg-[#eb0028]/12 transition-colors duration-300" />
                    </div>
                  )}
                </For>
              </div>
              {/* Gradient overlay blending into background */}
              <div class="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(6,6,6,0.35) 0%, transparent 30%, transparent 70%, rgba(6,6,6,0.9) 100%)" }} />
            </div>

            {/* LEFT: Text + Countdown (order: 2 on mobile) */}
            <div class="mobile-text-col flex-1 flex flex-col justify-center px-5 sm:px-10 lg:px-16 py-8 sm:py-10 lg:py-0 lg:max-w-[56%]">

              {/* Eyebrow with ruled line */}
              <div ref={eyebrowRef} class="flex items-center gap-4 mb-6 sm:mb-8">
                <div class="ruled w-8 flex-shrink-0" />
                <span class="text-[9px] uppercase tracking-[0.35em] text-[#eb0028] font-bold">
                  TEDxSJCETPalai · 2026 · Theme Reveal
                </span>
              </div>

              {/* Hero title */}
              <div ref={themeRef} class="mb-6 sm:mb-8 relative">
                {/* Ghost x behind */}
                <div
                  class="absolute -left-4 -top-8 text-[#eb0028]/[0.04] font-black select-none pointer-events-none leading-none hidden lg:block"
                  style={{ "font-size": "clamp(10rem,22vw,20rem)", "font-family": "'Cal Sans',system-ui" }}
                  aria-hidden="true"
                >x</div>

                <p class="text-white/18 text-[10px] uppercase tracking-[0.32em] font-bold mb-3 sm:mb-4">This Year's Theme</p>

                <h1
                  class="font-black leading-[0.83] tracking-tight"
                  style={{ "font-size": "clamp(3.5rem, 13vw, 9.5rem)", "font-family": "'Cal Sans',system-ui,sans-serif" }}
                >
                  <span class="block text-white">Before</span>
                  <span class="block text-white/85">the</span>
                  <span
                    class="block glitch-word"
                    data-text="Record"
                    style={{ color: "transparent", "-webkit-text-stroke": "2px #eb0028" }}
                  >Record</span>
                </h1>
              </div>

              {/* Separator */}
              <div class="ruled mb-6 sm:mb-8" />

              {/* Tagline */}
              <p ref={tagRef} class="text-white/28 text-sm sm:text-[15px] max-w-[40ch] mb-8 sm:mb-10 leading-[1.8] font-light tracking-wide">
                Every great moment begins before the cameras roll —<br />
                in silence, in struggle, in the story not yet told.
              </p>

              {/* Countdown */}
              <div ref={countRef} class="mb-8 sm:mb-10">
                <div class="flex items-center gap-2 sm:gap-3">
                  <CountTile value={tl().days}    label="Days"    index={0} />
                  {/* Separator dot-pair */}
                  <div class="flex flex-col items-center gap-[6px] pb-5 flex-shrink-0">
                    <span class="w-[5px] h-[5px] rounded-full bg-[#eb0028]" style={{ "box-shadow": "0 0 6px rgba(235,0,40,0.8)" }} />
                    <span class="w-[5px] h-[5px] rounded-full bg-[#eb0028]" style={{ "box-shadow": "0 0 6px rgba(235,0,40,0.8)" }} />
                  </div>
                  <CountTile value={tl().hours}   label="Hours"   index={1} />
                  <div class="flex flex-col items-center gap-[6px] pb-5 flex-shrink-0">
                    <span class="w-[5px] h-[5px] rounded-full bg-[#eb0028]" style={{ "box-shadow": "0 0 6px rgba(235,0,40,0.8)" }} />
                    <span class="w-[5px] h-[5px] rounded-full bg-[#eb0028]" style={{ "box-shadow": "0 0 6px rgba(235,0,40,0.8)" }} />
                  </div>
                  <CountTile value={tl().minutes} label="Minutes" index={2} />
                  <div class="flex flex-col items-center gap-[6px] pb-5 flex-shrink-0">
                    <span class="w-[5px] h-[5px] rounded-full bg-[#eb0028]" style={{ "box-shadow": "0 0 6px rgba(235,0,40,0.8)" }} />
                    <span class="w-[5px] h-[5px] rounded-full bg-[#eb0028]" style={{ "box-shadow": "0 0 6px rgba(235,0,40,0.8)" }} />
                  </div>
                  <CountTile value={tl().seconds} label="Seconds" index={3} />
                </div>
                <div class="mt-5 flex items-center gap-3">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#eb0028] animate-pulse flex-shrink-0" style={{ "box-shadow": "0 0 6px rgba(235,0,40,0.7)" }} />
                  <span class="text-[10px] text-white/22 uppercase tracking-[0.28em] font-semibold">
                    October 10, 2026  ·  SJCET Palai, Kerala
                  </span>
                </div>
              </div>

              {/* CTA */}
              <div ref={ctaRef} class="flex items-center gap-5 flex-wrap">
                <button
                  id="contact-toggle-btn"
                  onClick={() => setShowContacts(!showContacts())}
                  class="group relative inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white overflow-hidden transition-all duration-300"
                  style={{ background: "#eb0028", padding: "14px 28px", "box-shadow": "0 0 20px rgba(235,0,40,0.35)" }}
                >
                  <span class="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  <svg class="relative z-10 w-3.5 h-3.5 group-hover:text-[#eb0028] transition-colors" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span class="relative z-10 group-hover:text-[#eb0028] transition-colors">{showContacts() ? "Hide Contacts" : "Get in Touch"}</span>
                </button>
                <a href="https://instagram.com/tedxsjcetpalai" target="_blank" rel="noopener noreferrer"
                  class="group flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-white/28 hover:text-white transition-colors duration-300"
                  style={{ padding: "14px 0" }}
                >
                  Follow Us
                  <svg class="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>

              {/* Contact cards — inline inside left column for BOTH mobile & desktop */}
              <div
                class={`contacts-panel mt-6 ${showContacts() ? "open" : ""}`}
                style={{
                  "padding-top": showContacts() ? "0.25rem" : "0",
                }}
              >
                <div class="contacts-inner">
                  <div class="ruled mb-5 max-w-3xl" />
                  <p class="text-[9px] uppercase tracking-[0.32em] text-white/18 font-bold mb-4">Reach the team</p>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-px max-w-3xl bg-[#eb0028]/8 mb-2">
                    <For each={coordinators}>
                      {(c, i) => <ContactCard c={c} delay={i() * 80} />}
                    </For>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Desktop photo mosaic only */}
            <div ref={rightColRef} class="relative hidden lg:block lg:w-[44%] lg:min-h-full">

              {/* Desktop: asymmetric spanning mosaic */}
              <div
                class="absolute inset-0 gap-[3px]"
                style={{
                  display: "grid",
                  "grid-template-columns": "1fr 1fr 1fr",
                  "grid-template-rows": "1fr 1fr 1fr",
                }}
              >
                <For each={photos}>
                  {(src, i) => (
                    <div
                      class="photo-tile relative overflow-hidden"
                      style={{
                        "grid-column": i() === 0 ? "1 / 3" : i() === 5 ? "2 / 4" : "auto",
                        "grid-row":    i() === 0 ? "1 / 3" : "auto",
                      }}
                    >
                      <img src={src} alt={`TEDx moment ${i() + 1}`}
                        class="w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy" />
                      <div class="absolute inset-0 bg-[#eb0028]/0 hover:bg-[#eb0028]/12 transition-colors duration-400" />
                    </div>
                  )}
                </For>
              </div>

              {/* Left blend fade */}
              <div class="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(6,6,6,0.88) 0%, rgba(6,6,6,0.2) 28%, transparent 55%)" }} />
              {/* Top/bottom fade */}
              <div class="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(6,6,6,0.65) 0%, transparent 18%, transparent 82%, rgba(6,6,6,0.95) 100%)" }} />

              {/* Vertical text */}
              <div class="absolute bottom-8 right-4 pointer-events-none select-none flex">
                <span class="text-[8px] uppercase tracking-[0.45em] text-white/14 font-bold"
                  style={{ "writing-mode": "vertical-rl", "text-orientation": "mixed" }}>SJCET PALAI · 2026</span>
              </div>
              {/* Right edge accent */}
              <div class="absolute top-0 right-0 w-[3px] h-full" style={{ background: "linear-gradient(to bottom, transparent, rgba(235,0,40,0.3) 30%, rgba(235,0,40,0.3) 70%, transparent)" }} />
            </div>
          </main>

          {/* Marquee */}
          <div class="relative z-10"><Marquee /></div>

          {/* Footer */}
          <footer ref={footRef}
            class="relative z-10 flex flex-col sm:flex-row items-center justify-between px-5 sm:px-10 lg:px-16 py-5 gap-4 border-t border-white/[0.04]">
            <div class="flex items-center gap-3">
              <div class="w-1 h-1 rounded-full bg-[#eb0028]" style={{ "box-shadow": "0 0 4px rgba(235,0,40,0.8)" }} />
              <span class="text-[10px] text-white/14 uppercase tracking-[0.22em]">TEDxSJCETPalai · Independently Organized TED Event</span>
            </div>
          </footer>

          {/* Bottom accent */}
          <div class="w-full h-[3px]" style={{ background: "linear-gradient(to right, #eb0028, #ff4d4d, #eb0028)", "box-shadow": "0 0 12px rgba(235,0,40,0.5)" }} />
        </div>
      </Show>
    </>
  );
}
