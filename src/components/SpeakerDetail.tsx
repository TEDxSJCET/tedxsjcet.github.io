import { Component, onMount } from "solid-js";
import gsap from "gsap";
import DottedGridBackground from "./DottedGridBackground";
import linkedin from "@/assets/linkedin.png";
import x from "@/assets/x.png";
import signature from "@/assets/signature.svg";

interface SpeakerDetailProps {
  name: string;
  position: string;
  photo: string;
  quote: string;
}

const SpeakerDetail: Component<SpeakerDetailProps> = (props) => {
  onMount(() => {
    gsap.fromTo(".speaker-container", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power2.out" });
    gsap.fromTo(
      ".quote-text",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );
  });

  return (
    <DottedGridBackground
      class="h-screen "
      gridSize={150}
      dotSize={3.5}
      dashArray="8"
      lineColor="#5d5d5d"
      dotColor="#5d5d5d"
    >
      <div class="speaker-container h-full  grid grid-cols-1 md:grid-cols-2 items-center justify-center py-16 px-8 md:px-20 text-white">
        <div class="relative mx-auto">
          <div class="bg-white text-black rounded-lg shadow-lg w-60 md:w-96 p-2 transform -rotate-12">
            <img
              src={props.photo}
              alt={`${props.name}'s photo`}
              class="w-full h-full object-cover rounded-md aspect-square filter grayscale"
            />
            <p class="mt-2 text-xl font-semibold">{props.name}</p>
            <p class="text-sm italic text-gray-600">{props.position}</p>
          </div>
        </div>
        <div class="quote-text space-y-3 md:space-y-6 text-left mx-auto">
          <p class="text-sm italic text-gray-400">some subheading</p>
          <h2 class="text-3xl md:text-4xl font-bold">
            <span class="text-white">“Some </span>
            <span class="text-red-500">annoying</span>
            <span class="text-white"> philosophical quotes by this guest”</span>
          </h2>
          <div class="flex items-center gap-4 mt-4">
            <a href="#" class="text-gray-300 hover:text-red-500 transition duration-300">
              <img src={linkedin} alt="LinkedIn" class="w-6 h-6" />
            </a>
            <a href="#" class="text-gray-300 hover:text-red-500 transition duration-300">
              <img src={x} alt="X" class="w-6 h-6" />
            </a>
            <img src={signature} alt="Signature" class="w-40 h-auto mx-auto md:mx-0" />
          </div>
        </div>
      </div>
    </DottedGridBackground>
  );
};

export default SpeakerDetail;