import { createSignal, For, Show, createEffect, onCleanup, type Component } from "solid-js";
import { Motion, Presence } from "solid-motionone";
import { gsap } from "gsap";
import { HeroSectionData } from "@/lib/data";

const HeroSection: Component = () => {
  const [activeIndex, setActiveIndex] = createSignal(0);
  const { bottomTexts, heroImages, smallerImages, stableImage, tedXImages } = HeroSectionData;

  createEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 3000);

    onCleanup(() => clearInterval(interval));
  });

  createEffect(() => {
    gsap.fromTo(
      ".hero-image, .tedx-image, .bottom-text, .smaller-image",
      { opacity: 0 },
      { opacity: 1, duration: 1, stagger: 0.2, ease: "power2.inOut" }
    );
  });

  return (
    <div id="home" class="flex flex-col w-full h-full md:flex-row-reverse">
      <div class="relative h-1/2 md:h-full md:w-1/2 flex bg-slate-300">
        <For each={tedXImages}>
          {(img, index) => (
            <Presence>
              <Show when={index() === activeIndex()}>
                <Motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  class="tedx-image absolute w-full h-full"
                >
                  <img src={img} class="w-full h-full object-cover" alt={`TedX Image ${index() + 1}`} />
                </Motion.div>
              </Show>
            </Presence>
          )}
        </For>
      </div>
      <div class="h-1/2 md:h-full md:w-1/2">
        <div class="h-2/3 flex flex-row">
          <div class="relative flex w-1/2 bg-slate-200 z-10">
            <For each={heroImages}>
              {(img, index) => (
                <Presence>
                  <Show when={index() === activeIndex()}>
                    <Motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      class="hero-image absolute w-full h-full"
                    >
                      <img src={img} class="w-full h-full object-cover" alt={`Hero Image ${index() + 1}`} />
                    </Motion.div>
                  </Show>
                </Presence>
              )}
            </For>
          </div>
          <div class="relative flex w-1/2 bg-slate-700 justify-center items-center text-white">
            <img src={stableImage} class="ocean absolute w-full h-full object-cover" alt="Ocean" />
            <h1 class="-rotate-90 w-fit h-fit text-3xl md:text-4xl font-bold">
              Excellence
              <br />
              beyond notice
            </h1>
          </div>
        </div>
        <div class="h-1/3 flex flex-row">
          <div class="relative flex w-1/2 bg-white justify-center items-center">
            <For each={bottomTexts}>
              {(text, index) => (
                <Presence>
                  <Show when={index() === activeIndex()}>
                    <Motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      class="bottom-text text-black text-2xl md:text-3xl w-fit h-fit font-bold absolute"
                    >
                      {text}
                    </Motion.h2>
                  </Show>
                </Presence>
              )}
            </For>
          </div>
          <div class="flex w-1/2 relative">
            <For each={smallerImages}>
              {(img, index) => (
                <Presence>
                  <Show when={index() === activeIndex()}>
                    <Motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1 }}
                      class="smaller-image absolute w-full h-full"
                    >
                      <img src={img} class="w-full h-full object-cover" alt={`Smaller Image ${index() + 1}`} />
                    </Motion.div>
                  </Show>
                </Presence>
              )}
            </For>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
