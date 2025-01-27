import { onMount, createEffect, onCleanup } from "solid-js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DottedGridBackground from "./DottedGridBackground";
import { speakers } from "@/lib/data";

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
    <DottedGridBackground
      class="h-screen"
      gridSize={150}
      dotSize={3.5}
      dashArray="8"
      lineColor="#5d5d5d"
      dotColor="#5d5d5d"
    >
      <section class="flex flex-1 flex-col items-center justify-start md:justify-center md:text-center min-h-screen text-white px-4 sm:px-8 p-5 relative">
        <h1 class="absolute font-bold text-tedx-red/40 inset-0 text-[50rem] flex justify-center items-center pointer-events-none cal-sans blur-lg">
          X
        </h1>
        <div class="mb-12 sm:mb-24 z-10">
          <h1 class="text-4xl sm:text-6xl font-bold cal-sans">
            Speakers<span class="text-red-500">.</span>
          </h1>
          <p class="text-sm sm:text-lg italic mt-2 max-w-screen-md mx-auto cal-sans text-gray-300">
            We present to you some of the most flamboyant and remarkable individuals who epitomize passion and
            perseverance to inspire, uplift, and empower you.
          </p>
        </div>
        <div class="card-container w-full flex flex-wrap justify-center gap-4 max-w-screen-xl">
          {speakers.map((speaker, index) => (
            <div
              class="card flex flex-col bg-[#FBF7ED] text-left text-black p-1 transition-transform duration-500 w-28 md:w-60 gap-2 rounded-lg shadow-lg cal-sans"
              style={{ "will-change": "transform, opacity" }}
            >
              <img
                src={speaker.image}
                alt={speaker.name}
                class="w-full h-full object-cover rounded-md shadow-sm aspect-square"
                draggable={false}
              />
              <p class="text-xs sm:text-xl font-extrabold sm:font-semibold">{speaker.name}</p>
              <p class="text-xs sm:text-sm italic text-gray-600">{speaker.position}</p>
            </div>
          ))}
        </div>
      </section>
      {/* <section class="hidden md:flex flex-1 flex-col items-center justify-center min-h-screen bg-black text-white px-4 sm:px-8 p-5 relative">
        <h1 class="absolute font-bold text-tedx-red/40 inset-0 text-[50rem] flex justify-center items-center pointer-events-none">
          X
        </h1>
        <div class="mb-12 sm:mb-24 z-10 text-center">
          <h1 class="text-4xl sm:text-6xl font-bold">
            Speakers<span class="text-red-500">.</span>
          </h1>
          <p class="text-base sm:text-lg italic mt-4 max-w-screen-md mx-auto">
            We present to you some of the most flamboyant and remarkable individuals who epitomize passion and
            perseverance to inspire, uplift, and empower you.
          </p>
        </div>
        <div class="card-container w-full flex flex-wrap justify-center gap-4 max-w-screen-xl">
          {speakers.map((speaker, index) => (
            <div
              class="card bg-[#FBF7ED] text-black p-1 transition-transform duration-500 aspect-square w-28 md:w-60 space-y-2 rounded-lg shadow-lg"
              style={{ "will-change": "transform, opacity" }}
            >
              <img
                src={speaker.image}
                alt={speaker.name}
                class="w-full h-full object-cover rounded-md shadow-sm"
                draggable={false}
              />
              <p class="text-xs sm:text-xl font-extrabold sm:font-semibold line-clamp-1">{speaker.name}</p>
              <p class="text-xs sm:text-sm italic text-gray-600">{speaker.position}</p>
            </div>
          ))}
        </div>
      </section> */}
    </DottedGridBackground>
  );
}
