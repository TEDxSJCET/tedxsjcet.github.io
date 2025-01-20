import { createSignal, onCleanup, createEffect, JSX } from "solid-js";
import { Motion, } from "solid-motionone";
import { mergeProps } from "solid-js";
import { cn } from "@/lib/utils";

interface ParallaxProps {
  children: JSX.Element | string;
  class?: string;
  baseVelocity?: number;
  direction: "left" | "right";
}

// Helper function to wrap a number between min and max
function wrap(min: number, max: number, v: number) {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

export function ParallaxText(props: ParallaxProps) {
  const merged = mergeProps({ baseVelocity: props.direction === "left" ? -10 : 10 }, props);

  const [baseX, setBaseX] = createSignal(0);
  const [scrollY, setScrollY] = createSignal(0);
  const [scrollVelocity, setScrollVelocity] = createSignal(0);
  const [directionFactor, setDirectionFactor] = createSignal(1);

  // Track scroll position
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - scrollY();
    setScrollY(currentScrollY);
    setScrollVelocity(delta);
  };

  window.addEventListener("scroll", handleScroll);
  onCleanup(() => window.removeEventListener("scroll", handleScroll));

  // Animation frame loop
  let lastTime = performance.now();
  const animate = (time: number) => {
    const delta = time - lastTime;
    lastTime = time;

    let moveBy = directionFactor() * merged.baseVelocity * (delta / 1000);

    // Update direction based on scroll velocity
    if (scrollVelocity() < 0) {
      setDirectionFactor(-1);
    } else if (scrollVelocity() > 0) {
      setDirectionFactor(1);
    }

    // Apply velocity factor
    // const velocityFactor = 
    // spring(scrollVelocity(), {
    //   damping: 50,
    //   stiffness: 400,
    // });

    moveBy += directionFactor() * moveBy * 0.5;

    setBaseX(prev => prev + moveBy);
    requestAnimationFrame(animate);
  };

  requestAnimationFrame(animate);
  onCleanup(() => cancelAnimationFrame(requestAnimationFrame(animate)));

  // Transform baseX to percentage
  const getTransform = () => `translateX(${wrap(-20, -45, baseX())}%)`;

  return (
    <div class={cn("overflow-hidden m-0 whitespace-nowrap flex flex-nowrap text-7xl md:text-8xl lg:text-9xl !leading-[0.89] cal-sans", props.class)}>
      <Motion.div
        class="flex gap-10"
        // transition={{duration: 10, easing: "linear"}}
        style={{ transform: getTransform() }}
      >
        <span>{props.children}</span>
        <span>{props.children}</span>
        <span>{props.children}</span>
        <span>{props.children}</span>
        <span>{props.children}</span>
        <span>{props.children}</span>
        <span>{props.children}</span>
      </Motion.div>
    </div>
  );
}