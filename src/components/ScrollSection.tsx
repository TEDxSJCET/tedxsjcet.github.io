import { Component, JSX, onMount } from "solid-js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

export interface ScrollItem {
  id: number;
  title: string;
  description: string;
  content: () => JSX.Element;
}

interface ScrollSectionProps {
  items: ScrollItem[];
  direction: "vertical" | "horizontal";
  title: string;
}

const ScrollSection: Component<ScrollSectionProps> = (props) => {
  let sectionRef: HTMLDivElement | undefined;

  onMount(() => {
    gsap.registerPlugin(ScrollTrigger);
    const items = sectionRef?.querySelectorAll(".item");

    if (items) {
      items.forEach((item, index) => {
        if (index !== 0) {
          props.direction === "horizontal" ? gsap.set(item, { xPercent: 100 }) : gsap.set(item, { yPercent: 100 });
        }
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef,
          pin: true,
          start: "top top",
          end: () => `+=${items.length * 100}%`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "none" },
      });

      items.forEach((item, index) => {
        timeline.to(item, {
          scale: 0.9,
          borderRadius: "10px",
        });

        props.direction === "horizontal"
          ? timeline.to(
              items[index + 1],
              {
                xPercent: 0,
              },
              "<"
            )
          : timeline.to(
              items[index + 1],
              {
                yPercent: 0,
              },
              "<"
            );
      });
    }
  });

  return (
    <div
      ref={sectionRef}
      class={`scroll-section ${
        props.direction === "vertical" ? "vertical-section" : "horizontal-section"
      } section overflow-hidden`}
    >
      <div class="wrapper h-screen">
        <div role="list" class="list flex h-full relative">
          {props.items.map((item) => (
            <div role="listitem" class="item w-screen h-full absolute inset-0 shadow-lg overflow-hidden flex">
              {item.content()}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollSection;
