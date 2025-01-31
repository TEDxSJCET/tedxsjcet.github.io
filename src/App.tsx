import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { createSignal } from "solid-js";
import AboutSection from "./components/AboutSection";
import CoreTeam from "./components/CoreTeam";
import HeroSection from "./components/HeroSection";
import Register from "./components/Register";
import QutesSection from "./components/SpeakerScroll";
import SpeakersSection from "./components/SpeakerSection";
import TedxLogo from "./components/TedxLogo";

gsap.registerPlugin(Observer);

const AnimatedSections = () => {
  const [showTedxLogo, setShowTedxLogo] = createSignal(true);

  return (
    <div class="h-screen w-screen bg-black text-white overflow-y-auto overflow-x-hidden">
      {showTedxLogo() ? (
        <div class="h-full w-full top-0 fixed">
          <TedxLogo
            onComplete={() => {
              setShowTedxLogo(false);
            }}
          />
        </div>
      ) : (
        <>
          <HeroSection />
          <AboutSection />
          <SpeakersSection />
          {/* <QutesSection /> */}
          <CoreTeam />
          <Register />
        </>
      )}
    </div>
  );
};

export default AnimatedSections;
