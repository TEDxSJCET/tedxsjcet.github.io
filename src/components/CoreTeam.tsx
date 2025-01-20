import { For, onCleanup, onMount } from "solid-js";
import { gsap } from "gsap";
import org1 from "../assets/org1.svg";
import org2 from "../assets/org2.svg";
import org3 from "../assets/org3.svg";
import DottedGridBackground from "./DottedGridBackground";

const List = [org1, org2, org3];

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
    <DottedGridBackground gridSize={180} dashArray="15" lineColor="#373737" dotColor="#373737" dotSize={5}>
      <div ref={containerRef!} class="flex flex-col min-h-screen items-center sm:justify-center py-10 px-5">
        <div>
          <div class="text-left">
            <h1 ref={headingRef!} class="text-4xl md:text-6xl font-bold mb-4">
              Organizer<span class="text-tedx-red">.</span>
            </h1>
            <p ref={subheadingRef!} class="text-lg text-muted-foreground mb-4 sm:mb-8 font-handwriting">
              the team behind the scene
            </p>
          </div>
          <div class="flex flex-wrap ms:gap-4 justify-center items-center max-w-4xl mx-auto">
            <For each={List}>
              {(item, index) => (
                <div class="flex-1 max-w-[50px] min-w-[200px] sm:max-w-[300px]">
                  <img
                    ref={(el) => (imageRefs[index()] = el)}
                    src={item}
                    alt={`Organizer ${index() + 1}`}
                    class="w-full h-auto aspect-square sm:aspect-auto object-contain sm:object-cover rounded-md shadow-lg hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </For>
          </div>
        </div>
      </div>
    </DottedGridBackground>
  );
};

export default CoreTeam;
