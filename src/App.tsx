import { createSignal, onCleanup, onMount, For } from "solid-js";
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

gsap.registerPlugin(Observer);

const Speakers = speakers.map((speaker) => ({
  content: () => (
    <SpeakerDetail name={speaker.name} position={speaker.position} photo={speaker.image} quote={speaker.quote} />
  ),
}));

const sections = [
  { content: HeroSection },
  { content: AboutSection },
  { content: SpeakersSection },
  ...Speakers,
  { content: CoreTeam },
  { content: Register },
];

const AnimatedSections = () => {
  let sectionRefs: HTMLElement[] = [];
  let headingRefs: HTMLElement[] = [];
  let outerRefs: HTMLElement[] = [];
  let innerRefs: HTMLElement[] = [];
  let bgRefs: HTMLElement[] = [];

  const [currentIndex, setCurrentIndex] = createSignal(-1);
  const [animating, setAnimating] = createSignal(false);

  const wrap = gsap.utils.wrap(0, sections.length);

  const gotoSection = (index: number, direction: number) => {
    if (index < 0 || index >= sections.length || animating()) return;

    index = wrap(index);
    setAnimating(true);

    const fromTop = direction === -1;
    const dFactor = fromTop ? -1 : 1;
    const tl = gsap.timeline({
      defaults: { duration: 1.25, ease: "power1.inOut" },
      onComplete: (): void => {
        setAnimating(false);
      },
    });

    if (currentIndex() >= 0) {
      gsap.set(sectionRefs[currentIndex()], { zIndex: 0 });
      tl.to(bgRefs[currentIndex()], { yPercent: -15 * dFactor }).set(sectionRefs[currentIndex()], { autoAlpha: 0 });
    }

    gsap.set(sectionRefs[index], { autoAlpha: 1, zIndex: 1 });
    tl.fromTo(
      [outerRefs[index], innerRefs[index]],
      { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
      { yPercent: 0 },
      0
    )
      .fromTo(bgRefs[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
      .fromTo(
        headingRefs[index].querySelectorAll(".char"),
        { autoAlpha: 0, yPercent: 150 * dFactor },
        { autoAlpha: 1, yPercent: 0, duration: 1, ease: "power2", stagger: { each: 0.02, from: "random" } },
        0.2
      );

    setCurrentIndex(index);
  };

  onMount(() => {
    gsap.set(outerRefs, { yPercent: 100 });
    gsap.set(innerRefs, { yPercent: -100 });

    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => gotoSection(currentIndex() - 1, -1),
      onUp: () => gotoSection(currentIndex() + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);

    onCleanup(() => {
      gsap.killTweensOf("*");
      observer.kill();
    });
  });

  return (
    <div class="h-screen bg-black text-white overflow-hidden">
      <NavBar />
      <For each={sections}>
        {(section, index) => (
          <section
            id={index().toString()}
            ref={(el) => (sectionRefs[index()] = el)}
            class="h-full w-full top-0 fixed invisible"
          >
            <div ref={(el) => (outerRefs[index()] = el)} class="w-full h-full overflow-y-hidden">
              <div ref={(el) => (innerRefs[index()] = el)} class="w-full h-full overflow-y-hidden">
                <div
                  ref={(el) => (bgRefs[index()] = el)}
                  class="flex absolute h-full w-full top-0 bg-cover bg-center bg-black"
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
  );
};

export default AnimatedSections;
