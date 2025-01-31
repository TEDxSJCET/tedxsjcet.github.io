import { onMount, createEffect, onCleanup } from "solid-js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DottedGridBackground from "./DottedGridBackground";
import { speakers } from "@/lib/data";
import { TextCombo } from "./header";
import { SmallPhotoCard } from "./picture";
import { cn } from "@/lib/utils";

export default function SpeakersSection() {
  const centerIndex = Math.floor(speakers.length / 2);
  // onMount(() => {
  //   gsap.registerPlugin(ScrollTrigger);
  // });

  // createEffect(() => {
  //   const cards = gsap.utils.toArray(".speakerCards") as HTMLElement[];
  //   const centerIndex = Math.floor(cards.length / 2);

  //   const animations = cards.map((card, index) => {
  //     const rotation = index < centerIndex ? -15 : index > centerIndex ? (15 + centerIndex - index) : 0;
  //     const translateY = index === centerIndex ? 0 : Math.abs(centerIndex - index) * 15;

  //     return gsap.fromTo(
  //       card,
  //       { opacity: 0, y: 50, scale: 0.9 },
  //       {
  //         opacity: 1,
  //         y: -translateY,
  //         scale: 1,
  //         rotation: rotation,
  //         duration: 0.3,
  //         ease: "power3.out",
  //         scrollTrigger: ".card-container"
  //       }
  //     );
  //   });

  //   onCleanup(() => {
  //     animations.forEach((animation) => animation.kill());
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //   });
  // });

  return (
    <section class="min-h-screen relative flex flex-col justify-center gap-10 md:gap-20 my-20 card-container">
      <h1 class="absolute text-tedx-red/40 inset-0 text-[50rem] text-center pointer-events-none cal-sans blur-lg">
        X
      </h1>
      <div class="container">
        <TextCombo theme="white" header="Speakers." sub="We present to you some of the most flamboyant and remarkable individuals who epitomize passion and perseverance to inspire, uplift, and empower you." />
      </div>
      <div class="flex flex-wrap justify-center gap-4">
        {speakers.map((speaker, index) => {
          const rotation = index < centerIndex ? -15 : index >= centerIndex ? (15 + centerIndex - index) : 0;
          return (<SmallPhotoCard style={{
            rotate: `${rotation}deg`
          }} className={cn("w-64 speakerCards hover:z-20 group", index === 3 ? "z-10" : "z-0")} {...speaker} />)
        }
        )}
      </div>
    </section>
  );
}
