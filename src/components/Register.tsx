import clg from "@/assets/clg.png";
import logo from "@/assets/clg-logo.svg";
import DottedGridBackground from "./DottedGridBackground";

export default function HeroSection() {
  return (
    <DottedGridBackground
      gridSize={160}
      dashArray="15"
      dotSize={3}
      class="h-screen flex flex-col bg-white text-tedx-black"
    >
      <div class="h-1/4 flex items-center justify-center">
        <img src={logo} alt="TEDxSJCET" class="h-40 w-full object-contain" />
      </div>
      <div class="relative h-full w-full flex items-center justify-center">
        <div class="absolute inset-0 bg-gradient-to-t from-white to-white/50 z-10"></div>
        <img
          src={clg}
          alt="College"
          class="absolute inset-0 w-full h-[80vh] mt-auto md:h-full object-cover filter grayscale"
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
              <a href="/register/index.html" class="bg-red-500 text-white px-6 py-2.5 text-xl rounded hover:bg-red-600 transition-colors">
                Register
              </a>
              <span class="absolute -right-2 -bottom-4 rotate-[-12deg] text-xl font-handwriting text-tedx-black">
                Early Bird
              </span>
            </div>
          </div>
        </div>
      </div>
    </DottedGridBackground>
  );
}
