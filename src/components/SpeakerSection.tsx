import { onMount, createEffect, onCleanup } from "solid-js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DottedGridBackground from "./DottedGridBackground";
import { speakers } from "@/lib/data";
import { TextCombo } from "./header";
import { SmallPhotoCard } from "./picture";

export default function SpeakersSection() {
  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
  });

  createEffect(() => {
    const cards = gsap.utils.toArray(".card") as HTMLElement[];
    const centerIndex = Math.floor(cards.length / 2);

    const animations = cards.map((card, index) => {
      const rotation = index < centerIndex ? -15 : index > centerIndex ? 15 : 0;
      const translateY = index === centerIndex ? 0 : Math.abs(centerIndex - index) * 15;

      return gsap.fromTo(
        card,
        { opacity: 0, y: 50, scale: 0.9 },
        {
          opacity: 1,
          y: -translateY,
          scale: 1,
          rotation: rotation,
          duration: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".card-container",
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    onCleanup(() => {
      animations.forEach((animation) => animation.kill());
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    });
  });

  return (
    <section class="min-h-screen relative container flex flex-col items-start justify-center gap-10 md:gap-20">
      <h1 class="absolute font-bold text-tedx-red/40 inset-0 -z-10 text-[50rem] text-center pointer-events-none cal-sans blur-lg">
        X
      </h1>
      <TextCombo theme="white" header="Speakers." sub="We present to you some of the most flamboyant and remarkable individuals who epitomize passion and perseverance to inspire, uplift, and empower you." />
      <div class="w-full flex px-2 md:px-0 flex-wrap md:flex-nowrap justify-center gap-2 md:gap-5 max-w-screen-xl">
        {speakers.map((speaker, index) => (
          <SmallPhotoCard className={index === 2 ? "z-10" : "z-0"} {...speaker} />
        ))}
      </div>
    </section>
  );
}
