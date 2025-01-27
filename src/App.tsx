import { createSignal, createEffect, onCleanup, For, createMemo } from "solid-js";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import HeroSection from "./components/HeroSection";
import NavBar from "./components/NavBar";
import AboutSection from "./components/AboutSection";
import SpeakersSection from "./components/SpeakerSection";
import { speakers } from "./lib/data";
import SpeakerDetail from "./components/SpeakerDetail";
import Register from "./components/Register";
import CoreTeam from "./components/CoreTeam";
import TedxLogo from "./components/TedxLogo";
import Lenis from "lenis";

gsap.registerPlugin(Observer);

const AnimatedSections = () => {
  const [currentIndex, setCurrentIndex] = createSignal(-1);
  const [animating, setAnimating] = createSignal(false);
  const [showTedxLogo, setShowTedxLogo] = createSignal(true);

  let lenis: Lenis | null = null;
  let sectionRefs: HTMLElement[] = [];
  let headingRefs: HTMLElement[] = [];
  let outerRefs: HTMLElement[] = [];
  let innerRefs: HTMLElement[] = [];
  let bgRefs: HTMLElement[] = [];

  const sections = createMemo(() => [
    { content: HeroSection },
    { content: AboutSection },
    { content: SpeakersSection },
    // ...speakers.map((speaker) => ({
    //   content: () => (
    //     <SpeakerDetail name={speaker.name} position={speaker.position} photo={speaker.image} quote={speaker.quote} />
    //   ),
    // })),
    { content: CoreTeam },
    { content: Register },
  ]);

  const wrap = gsap.utils.wrap(0, sections().length);

  const initLenis = () => {
    if (typeof window !== "undefined" && !lenis) {
      lenis = new Lenis({
        wrapper: window,
        content: document.documentElement,
        smoothWheel: true,
        syncTouch: true,
        lerp: 0.1,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        infinite: false,
        orientation: "vertical",
        gestureOrientation: "vertical",
        wheelMultiplier: 1.2,
        touchMultiplier: 2,
        autoResize: true,
        prevent: (node: HTMLElement) => true,
        autoRaf: true,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  };

  const destroyLenis = () => {
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }
  };

  const gotoSection = (index: number, direction: number) => {
    if (index < 0 || index >= sections().length || animating()) return;

    index = wrap(index);
    setAnimating(true);

    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;
    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power3.inOut" },
      onComplete: () => {
        setAnimating(false);
      },
    });

    if (currentIndex() >= 0) {
      gsap.set(sectionRefs[currentIndex()], { zIndex: 0 });
      tl.to(bgRefs[currentIndex()], { yPercent: -15 * dFactor, ease: "power3.out" }).set(sectionRefs[currentIndex()], {
        autoAlpha: 0,
      });
    }

    gsap.set(sectionRefs[index], { autoAlpha: 1, zIndex: 1 });
    tl.fromTo(
      [outerRefs[index], innerRefs[index]],
      { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
      { yPercent: 0, ease: "power3.out" },
      0
    ).fromTo(bgRefs[index], { yPercent: 15 * dFactor }, { yPercent: 0, ease: "power3.out" }, 0);

    setCurrentIndex(index);
    lenis?.scrollTo(sectionRefs[index], { duration: 1.2, lerp: 0.1 });
  };

  createEffect(() => {
    gsap.set(outerRefs, { yPercent: 100 });
    gsap.set(innerRefs, { yPercent: -100 });

    initLenis();

    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !showTedxLogo() && gotoSection(currentIndex() - 1, -1),
      onUp: () => !showTedxLogo() && gotoSection(currentIndex() + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    onCleanup(() => {
      gsap.killTweensOf("*");
      observer.kill();
      destroyLenis();
    });
  });

  return (
    <div class="h-screen bg-black text-white overflow-hidden">
      {!showTedxLogo() && <NavBar goToSection={gotoSection} />}
      {showTedxLogo() ? (
        <div class="h-full w-full top-0 fixed">
          <TedxLogo
            onComplete={() => {
              setShowTedxLogo(false);
              gotoSection(0, 1);
            }}
          />
        </div>
      ) : (
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <For each={sections()}>
              {(section, index) => (
                <section
                  ref={(el) => (sectionRefs[index()] = el)}
                  class="h-screen w-full top-0 fixed invisible"
                  style={{ "will-change": "transform, opacity" }}
                >
                  <div ref={(el) => (outerRefs[index()] = el)} class="w-full h-full overflow-y-hidden">
                    <div ref={(el) => (innerRefs[index()] = el)} class="w-full h-full overflow-y-hidden">
                      <div
                        ref={(el) => (bgRefs[index()] = el)}
                        class="flex absolute h-full w-full top-0 bg-cover bg-center bg-black"
                        style={{ "will-change": "transform" }}
                      >
                        <div ref={(el) => (headingRefs[index()] = el)} class="w-full">
                          <section.content />
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </For>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimatedSections;
