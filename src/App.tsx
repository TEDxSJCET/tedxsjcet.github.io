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
import { TailwindIndicator } from "./lib/tailwind";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";

gsap.registerPlugin(Observer);

const AnimatedSections = () => {
  const [showTedxLogo, setShowTedxLogo] = createSignal(true);
  const search = new URLSearchParams(window.location.search)

  switch(search.get("speaker")){
    case "sabarinath":
      window.location.href = "https://youtu.be/TDCajX39uXM?si=Se6ZC0gk_ODst2n1";
      break;
  }

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
          <QutesSection />
          <CoreTeam />
          <Register />
          {/* <NavBar /> */}
          <Footer />
          <TailwindIndicator />
        </>
      )}
    </div>
  );
};

export default AnimatedSections;
