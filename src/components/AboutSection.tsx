import { For, onMount, type Component, createMemo } from "solid-js";
import gsap from "gsap";
import DottedGridBackground from "./DottedGridBackground";

import about from "@/assets/about.jpeg";
import about1 from "@/assets/about1.webp";
import about2 from "@/assets/about2.webp";
import about3 from "@/assets/about3.webp";
import about4 from "@/assets/about4.jpeg";

const cardData = createMemo(() => [
  { title: "History", color: "bg-[#090806]", textColor: "text-[#D3D3CB]", img: about3 },
  { title: "Business", color: "bg-[#97AEBC]", textColor: "text-[#497689]", img: about1 },
  { title: "Culture", color: "bg-[#090806]", textColor: "text-[#D3D3CB]", img: about3 },
  { title: "Education", color: "bg-[#C45D4E]", textColor: "text-[#D3D3CB]", img: about4 },
  { title: "Technology", color: "bg-[#532901]", textColor: "text-[#CABDA8]", img: about },
  { title: "Entertainment", color: "bg-[#C785A0]", textColor: "text-[#A75576]", img: about2 },
]);

const AboutSection: Component = () => {
  onMount(() => {
    gsap.fromTo(
      ".about-card",
      { rotate: 0 },
      {
        rotate: (index: number) => (index % 2 === 0 ? -6 : 6),
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      }
    );
  });

  return (
    <DottedGridBackground
      gridSize={100}
      dashArray="15"
      dotSize={2}
      class="h-screen flex flex-col bg-white text-tedx-black"
    >
      <div class="grid grid-cols-1 lg:grid-cols-2 h-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 z-10">
        <div class="flex flex-col justify-center h-full -space-y-8 p-3">
          <div class="grid grid-cols-3 gap-6 justify-center">
            <For each={cardData().slice(3)}>{(card, index) => <Card {...card} index={index() + 3} />}</For>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <For each={cardData().slice(0, 3)}>{(card, index) => <Card {...card} index={index()} />}</For>
          </div>
        </div>
        <div class="flex flex-col justify-center text-center h-full space-y-4 md:space-y-8">
          <div class="max-w-lg mx-auto space-y-10">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-tedx-dark cal-sans">
              What is Ted X<span class="text-tedx-red">?</span>
            </h2>
            <p class="text-gray-800 font-medium text-sm md:text-lg leading-relaxed">
              Unlike TED itself, which hosts annual global conferences, TEDx events are local and community-driven,
              allowing for a wide range of topics, from technology and entertainment to education, personal development,
              and social issues. Each TEDx event follows guidelines set by TED but has its own unique theme and
              speakers, making every event distinct and relevant to its specific audience.
            </p>
          </div>
        </div>
      </div>
    </DottedGridBackground>
  );
};

export default AboutSection;

function Card({
  title,
  color,
  textColor,
  img,
  index,
}: {
  title: string;
  color: string;
  textColor: string;
  img: string;
  index: number;
}) {
  return (
    <div
      class={`about-card ${color} shadow-md w-full aspect-auto h-full flex flex-col justify-between p-2`}
      data-index={index}
    >
      <h3
        class={`${textColor} text-base md:text-lg lg:text-xl xl:text-2xl font-extrabold md:font-semibold max-w-[30%] text-balance`}
      >
        {title}
      </h3>
      <img
        src={img}
        alt={title}
        class="w-full object-cover rounded-md shadow-sm aspect-square"
        draggable={false}
      />
    </div>
  );
}
