import { For, onCleanup, onMount } from "solid-js";
import { gsap } from "gsap";
import org1 from "../assets/org1.svg";
import org2 from "../assets/org2.svg";
import org3 from "../assets/org3.svg";
import { TextCombo } from "./header";

const List = [
  {
    image: org1,
    link: ""
  }, {
    image: org2,
    link: ""
  }, {
    image: org3,
    link: ""
  }
];

const CoreTeam = () => {
  let containerRef: HTMLDivElement | undefined;
  let headingRef: HTMLHeadingElement | undefined;
  let subheadingRef: HTMLParagraphElement | undefined;
  let imageRefs: HTMLImageElement[] = [];

  onMount(() => {
    const tl = gsap.timeline({ defaults: { duration: 1, ease: "power3.out" } });
    tl.fromTo([headingRef, subheadingRef], { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.2 });
    tl.fromTo(imageRefs, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.1 }, "-=0.5");
    onCleanup(() => {
      tl.kill();
    });
  });

  return (
    <section ref={containerRef!} class="min-h-screen relative container flex flex-col items-start justify-center gap-10">
      <h1 class="absolute text-tedx-red/40 inset-0 text-[50rem] text-center pointer-events-none cal-sans blur-lg">
        !
      </h1>
      <TextCombo theme="white" header="Organizer." sub="The team behind the scene" />
      <div class="flex flex-wrap ms:gap-4 justify-center items-center mx-auto z-0">
        <For each={List}>
          {(item, index) => (
            <a href={item.link}>
              <div class="flex-1 max-w-[50px] min-w-[200px] sm:max-w-[300px]">
                <img
                  ref={(el) => (imageRefs[index()] = el)}
                  src={item.image}
                  alt={`Organizer ${index() + 1}`}
                  class="w-full h-auto aspect-square sm:aspect-auto object-contain sm:object-cover shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </div>
            </a>
          )}
        </For>
      </div>
    </section>
  );
};

export default CoreTeam;
