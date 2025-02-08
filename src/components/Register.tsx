import clg from "@/assets/clg.png";
import sjcet from "@/assets/clg-logo.svg";
import makemypass from "@/assets/makemypass.png";
import tedxsjcet from "@/assets/tedxsjcet.svg";
import DottedGridBackground from "./DottedGridBackground";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <DottedGridBackground
      gridSize={100}
      dashArray="15"
      dotSize={2}
      class="h-screen flex flex-col overflow-hidden bg-white text-tedx-black"
    >
      <div class="h-1/4 flex items-center justify-center">
        <img src={sjcet} alt="TEDxSJCET" class="h-40 w-full object-contain" />
      </div>
      <div class="relative h-full w-full flex items-center justify-center">
        <div class="absolute inset-0 bg-gradient-to-t from-white to-white/50 z-10" />
        <img
          src={clg}
          alt="College"
          class="absolute inset-0 w-full h-[80vh] mt-auto md:h-full object-cover filter grayscale"
        />
        <img
          src={tedxsjcet}
          alt="tedxsjcet"
          class="absolute w-36 md:w-52 -translate-x-3 top-[40vh] z-30"
        />
        <div class="absolute z-20 text-center text-tedx-black p-4 top-0 w-full max-w-screen-lg gap-14 items-center flex flex-col md:flex-row justify-between container">
          <div class="space-y-1">
            <div class="text-4xl md:text-6xl font-bold text-left flex-col flex">
              <span class="text-tedx-red">Excellence</span>
              <span class="text-tedx-red/60">beyond</span>
              <span class="text-tedx-red/40">notice</span>
            </div>
          </div>
          <div class="flex items-start">
            <div class="relative">
              <a
                id="register"
                href="/register/">
                <Button size={"lg"} class="relative px-4" variant={"tedx"}>
                  <img src={makemypass} class="w-12" alt="makemypass logo" />
                  Registration Closed
                  <span class="caveat absolute text-tedx-dark -right-5 -bottom-2 text-2xl underline -rotate-[20deg]">08-02-2025</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </DottedGridBackground>
  );
}
