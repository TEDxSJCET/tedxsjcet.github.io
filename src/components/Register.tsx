import clg from "@/assets/clg.png";
import logo from "@/assets/clg-logo.svg";
import tedxsjcet from "@/assets/tedxsjcet.svg";
import DottedGridBackground from "./DottedGridBackground";
import { Button } from "./ui/button";

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
              {/* <a
                href="/register/index.html">
                <Button size={"lg"} class="relative" variant={"tedx"}>
                  Register
                  <span class="caveat absolute text-tedx-dark -right-5 -bottom-2 text-2xl underline -rotate-[20deg]">Early Bird</span>
                </Button>
              </a> */}
              <h2 class="cal-sans font-bold text-tedx-red text-3xl">Coming soon</h2>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div class="z-50 bottom-0 h-44 md:h-72 left-0 w-full bg-black text-white py-6 hidden">
        <div class="container mx-auto px-4 flex gap-10 flex-col-reverse  md:flex-row justify-between">
          {/* Logo and License Text Section */}
          <div class="flex flex-col gap-7 items-start mb-8">
            <div class=" flex items-center justify-center">
              <img src={tedxsjcet} alt="TEDxSJCET" class="h-28 m-auto  w-full object-contain" />
            </div>
            <p>This independent TEDx event is operated under license from TED.</p>
            <div class="flex gap-6 mb-4">
              <a href="#" class="text-white hover:text-[#FF2B06]">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
              <a href="#" class="text-white hover:text-[#FF2B06]">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" class="text-white hover:text-[#FF2B06]">
                <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </div>
          </div>

          {/* Contact Info - Right Aligned */}
          <div class="flex flex-col items-end gap-4">
            <div class="flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-[#FF2B06]"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span class="text-md text-white">tedx@sjcetpalai.ac.in</span>
            </div>

            <div class="flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-[#FF2B06]"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span class="textmd text-white">9876543210</span>
            </div>

            <div class="flex items-start gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-[#FF2B06]"
              >
                <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <div class="textmd text-white text-left">
                <p>St.Joseph's College of Engineering</p>
                <p>and Technology, Palai</p>
                <br />
                <p>Choondacherry P.O</p>
                <p>Palai, Kottayam 686 579</p>
                <p>Kerala,India.</p>
              </div>
            </div>
          </div>
        </div>
        {/* Social Links and Made with Love */}
        <div class="m-auto mt-10 w-screen flex flex-col items-center">
          <div class="text-sm text-gray-400">
            make with <span class="text-[#FF2B06]">❤</span> nexus
          </div>
        </div>
      </div>
    </DottedGridBackground>
  );
}
