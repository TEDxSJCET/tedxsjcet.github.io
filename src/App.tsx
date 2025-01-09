import type { Component } from "solid-js";
import { onMount } from "solid-js";
import gsap from "gsap";
import NavBar from "@/components/NavBar";

import hero1 from "@/assets/hero1.png";
import hero2 from "@/assets/hero2.webp";
import hero7 from "@/assets/hero7.webp";

import hero3 from "@/assets/hero3.webp";
import hero4 from "@/assets/hero4.webp";
import hero8 from "@/assets/hero8.webp";

import hero5 from "@/assets/hero5.webp";
import hero9 from "@/assets/hero9.webp";
import hero10 from "@/assets/hero10.webp";

import ocean from "@/assets/ocean.webp";

import about from "@/assets/about.png";
import { Button } from "./components/ui/button";

const App: Component = () => {
  onMount(() => {
    const timeline = gsap.timeline({ repeat: -1 });
    const images = document.querySelectorAll(".hero1, .hero2, .hero7");
    const smallerImages = document.querySelectorAll(".hero3, .hero4, .hero8");
    const tedXImages = document.querySelectorAll(".hero5, .hero9, .hero10");
    const bottomText = document.querySelectorAll(".bottom-text");

    for (let i = 0; i < images.length - 1; i++) {
      timeline
        .to([images[i], smallerImages[i], tedXImages[i], bottomText[i]], {
          opacity: 0,
          duration: 1,
          delay: 2,
        })
        .to(
          [
            images[i + 1],
            smallerImages[i + 1],
            tedXImages[i + 1],
            bottomText[i + 1],
          ],
          { opacity: 1, duration: 1 },
          "<"
        );
    }

    timeline
      .to(
        [
          images[images.length - 1],
          smallerImages[images.length - 1],
          tedXImages[images.length - 1],
          bottomText[images.length - 1],
        ],
        { opacity: 0, duration: 1, delay: 2 }
      )
      .to(
        [images[0], smallerImages[0], tedXImages[0], bottomText[0]],
        { opacity: 1, duration: 1 },
        "<"
      );
  });

  return (
    <div class="flex flex-col w-full min-h-screen bg-black overflow-auto text-white relative scroll-smooth">
      <NavBar />
      {/* Hero Section */}
      <div id="home"></div>
      <div class="flex flex-col w-full h-screen md:flex-row-reverse">
        <div class="relative h-1/2 md:h-full md:w-1/2 flex bg-slate-300">
          <img src={hero5} class="hero5 absolute w-full h-full object-cover" />
          <img
            src={hero9}
            class="hero9 opacity-0 absolute w-full h-full object-cover"
          />
          <img
            src={hero10}
            class="hero10 opacity-0 absolute w-full h-full object-cover"
          />
        </div>
        <div class="h-1/2 md:h-full md:w-1/2">
          <div class="h-2/3 flex flex-row">
            <div class="relative flex w-1/2 bg-slate-200 z-10">
              <img
                src={hero1}
                class="hero1 absolute w-full h-full object-cover"
              />
              <img
                src={hero2}
                class="hero2 opacity-0 absolute w-full h-full object-cover"
              />
              <img
                src={hero7}
                class="hero7 opacity-0 absolute w-full h-full object-cover"
              />
            </div>
            <div class="relative flex w-1/2 bg-slate-700 justify-center items-center">
              <img
                src={ocean}
                class="ocean absolute w-full h-full object-cover"
              />
              <h1 class="-rotate-90 w-fit h-fit text-3xl md:text-4xl font-bold">
                Excellence
                <br />
                beyond notice
              </h1>
            </div>
          </div>
          <div class="h-1/3 flex flex-row">
            <div class="relative flex w-1/2 bg-white justify-center items-center">
              <h2 class="bottom-text text-black text-2xl md:text-3xl w-fit h-fit font-bold absolute">
                Different
                <br /> Perspectives
              </h2>
              <h2 class="bottom-text text-black text-2xl md:text-3xl w-fit h-fit font-bold absolute opacity-0">
                5 Speakers
              </h2>
              <h2 class="bottom-text text-black text-2xl md:text-3xl w-fit h-fit font-bold absolute opacity-0">
                Join us
              </h2>
            </div>
            <div class="flex w-1/2 relative">
              <img
                src={hero3}
                class="hero3 absolute w-full h-full object-cover"
              />
              <img
                src={hero4}
                class="hero4 opacity-0 absolute w-full h-full object-cover"
              />
              <img
                src={hero8}
                class="hero8 opacity-0 absolute w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      <div id="about">
        <div class="flex flex-col md:flex-row w-full h-screen bg-black">
          <div class="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <h1 class="text-3xl md:text-5xl font-bold mb-6">
              So what is <span class="text-red-600">TEDx</span> and
              <br />
              how is it different from
              <br />
              Ted Talks?
            </h1>
            <p class="text-sm md:text-base text-gray-300 max-w-2xl">
              TEDx is a program of independently organized events licensed by
              TED, bringing local communities together to share ideas through
              live talks, performances, and TED Talk videos. These events follow
              TED's mission of "ideas worth spreading," featuring diverse topics
              like technology, education, and social issues. Talks are recorded
              and shared online to reach a global audience.
            </p>
          </div>
          <div class="w-full md:w-1/2 h-[300px] md:h-auto relative">
            <img
              src={about}
              alt="TEDx Event"
              class="md:w-full md:h-full object-cover rounded-[40px] p-4"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col w-full h-screen"></div>
    </div>
  );
};

export default App;
