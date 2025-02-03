import { For, onMount, type Component, createMemo } from "solid-js";
import gsap from "gsap";
import DottedGridBackground from "./DottedGridBackground";

import about from "@/assets/about.jpeg";
import about1 from "@/assets/about1.webp";
import about2 from "@/assets/about2.jpeg";
import about3 from "@/assets/about3.jpeg";
import about4 from "@/assets/about4.jpeg";
import about5 from "@/assets/about5.jpg";
import about6 from "@/assets/about6.webp";
import { TextCombo } from "./header";

const cardData = createMemo(() => [
  { title: "History", color: "bg-[#090806]", textColor: "text-[#D3D3CB]", img: about5 },
  { title: "Business", color: "bg-[#97AEBC]", textColor: "text-[#497689]", img: about2 },
  { title: "Culture", color: "bg-[#090806]", textColor: "text-[#D3D3CB]", img: about3 },
  { title: "Education", color: "bg-[#C45D4E]", textColor: "text-[#D3D3CB]", img: about4 },
  { title: "Technology", color: "bg-[#532901]", textColor: "text-[#CABDA8]", img: about },
  { title: "Entertainment", color: "bg-[#C785A0]", textColor: "text-[#A75576]", img: about6 },
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
        scrollTrigger: ".about"
      }
    );
  });

  return (
    <section class="h-screen about bg-white text-tedx-black">
      <div class="grid grid-cols-1 lg:grid-cols-2 h-full max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 z-10">
        <div class="flex flex-col justify-center h-full -space-y-3">
          <div class="grid grid-cols-3 gap-6 justify-center">
            <For each={cardData().slice(3)}>{(card, index) => <Card {...card} index={index() + 3} />}</For>
          </div>
          <div class="grid grid-cols-3 gap-6">
            <For each={cardData().slice(0, 3)}>{(card, index) => <Card {...card} index={index()} />}</For>
          </div>
        </div>
        <div class="flex flex-col justify-center h-full">
          <TextCombo className="text-end " theme="black" header="What is Ted X?" sub="Unlike TED itself, which hosts annual global conferences, TEDx events are local and community-driven,
            allowing for a wide range of topics, from technology and entertainment to education, personal development,
            and social issues. Each TEDx event follows guidelines set by TED but has its own unique theme and
            speakers, making every event distinct and relevant to its specific audience." />
        </div>
      </div>
    </section>
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
      class={`about-card ${color} shadow-md w-full aspect-auto h-full flex flex-col justify-between p-2 motion-rotate-loop-1 hover:motion-paused hover:z-10 hover:zoom-in-110 motion-delay-2000`}
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
        class="w-full object-cover shadow-sm aspect-square"
        draggable={false}
      />
    </div>
  );
}
