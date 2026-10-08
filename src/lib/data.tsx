import type { JSX } from "solid-js"

import hero1 from "@/assets/hero1.webp";
import hero2 from "@/assets/hero2.webp";
import hero7 from "@/assets/hero7.webp";
import hero3 from "@/assets/hero3.webp";
import hero4 from "@/assets/hero4.webp";
import hero8 from "@/assets/hero8.webp";
import hero5 from "@/assets/hero5.webp";
import hero9 from "@/assets/hero9.webp";
import hero10 from "@/assets/hero10.webp";
import ocean from "@/assets/ocean.webp";

import speaker1 from "@/assets/speakers/Deepu S Nath.webp";
import speaker2 from "@/assets/speakers/Dr.Anup R Warrier.webp";
import speaker3 from "@/assets/speakers/Issa Joshy.webp";
import speaker4 from "@/assets/speakers/Neethu Naduvathettu.webp";
import speaker5 from "@/assets/speakers/Pranav Sasidharan.webp";
import speaker6 from "@/assets/speakers/Prof. Rajesh Baby.webp";
import { ScrollItem } from "@/components/ScrollSection";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SpeakerSection from "@/components/SpeakerSection";
import SpeakerDetail from "@/components/SpeakerDetail";

export const HeroSectionData = {
  heroImages: ["/hero1.webp", "/hero2.webp", "/hero7.webp"],
  smallerImages: ["/hero3.webp", "/hero4.webp", "/hero8.webp"],
  tedXImages: [hero5, hero10],
  bottomTexts: ["6 Speakers", "Join us", "Different Perspectives",],
  stableImage: "/ocean.webp",
};

type Speaker = {
  id: number;
  name: string;
  position: string;
  quote: JSX.Element;
  sub: JSX.Element;
  image: string;
};

export const speakers: Speaker[] = [
  {
    id: 1,
    name: "Deepu S Nath",
    position: "Founder of µLearn & MD of FAYA India",
    quote: <>Pioneering <span class="text-tedx">Peer-to-Peer, Gamified Learning</span> that builds real <span class="underline decoration-tedx-red decoration-dashed">proof of work.</span></>,
    sub: "Technology entrepreneur, community builder & educator.",
    image: speaker1,
  },
  {
    id: 2,
    name: "Dr. Anup R Warrier",
    position: "Group Chief of Medical Services, BMH Group of Hospitals",
    quote: <>Leading <span class="text-tedx">Infection Control & Healthcare Excellence</span> as Kerala's first <span class="underline decoration-tedx-red decoration-dashed">Infectious Diseases</span> pioneer.</>,
    sub: "An ID physician turned healthcare executive, and forever a dreamer.",
    image: speaker2,
  },
  {
    id: 3,
    name: "Pranav Sasidharan",
    position: "Director, Writer & Producer",
    quote: <>Creating <span class="text-tedx">Iconic Music Videos & Live Concerts</span> from Kerala to <span class="underline decoration-tedx-red decoration-dashed">Cannes.</span></>,
    sub: "Director of Ballaatha Jaathi, a Rolling Stone India Top 10 Music Video of 2024.",
    image: speaker5,
  },
  
  {
    id: 4,
    name: "Neethu Naduvathettu",
    position: "Co-founder of ReelTribe & Playback Singer",
    quote: <>Blending <span class="text-tedx">Engineering, Strategy & Music</span> to create <span class="underline decoration-tedx-red decoration-dashed">meaningful and distinctive work.</span></>,
    sub: "Brand & campaign strategist, Editor-in-Chief of The Copyroom.",
    image: speaker4,
  },
  
  {
    id: 5,
    name: "Issa Joshy",
    position: "Founder & CEO of Lawtus Edu Pvt. Ltd.",
    quote: <>Bringing together <span class="text-tedx">Education, Fitness & Entrepreneurship</span> while mentoring <span class="underline decoration-tedx-red decoration-dashed">500+ law students.</span></>,
    sub: "Law student, content creator & licensed Zumba instructor.",
    image: speaker3,
  },
  {
    id: 6,
    name: "Dr. Rajesh Baby",
    position: "Professor & Dean (Academics-I), SJCET Palai",
    quote: <>Turning ideas into <span class="text-tedx">Meaningful Innovations</span> as an <span class="underline decoration-tedx-red decoration-dashed">educator, researcher & mentor.</span></>,
    sub: "Ph.D. from IIT Madras, 22+ years of experience and Coordinator of the AICTE IDEA Lab.",
    image: speaker6,
  },
];

// export const verticalItems: ScrollItem[] = speakers.map((speaker) => ({
//   id: speaker.id,
//   title: speaker.name,
//   description: speaker.position,
//   content: () => (
//     <SpeakerDetail name={speaker.name} position={speaker.position} photo={speaker.image} quote={speaker.quote} />
//   ),
// }));

export const horizontalItems: ScrollItem[] = [
  {
    id: 1,
    title: "Wildlife in Action: A Glimpse into Nature's Daily Drama",
    description:
      "Explore the untouched beauty of forests, mountains, and rivers as we uncover the hidden secrets of nature's most breathtaking landscapes.",
    content: () => <HeroSection />,
  },
  {
    id: 2,
    title: "Nature's Symphony: The Sounds That Heal the Soul",
    description:
      "Immerse yourself in the soothing sounds of chirping birds, rustling leaves, and flowing streams – nature's music for peace and tranquility.",
    content: () => <AboutSection />,
  },
  {
    id: 3,
    title: "Nature's Masterpieces: Landscapes That Take Your Breath Away",
    description:
      "Discover stunning views of majestic mountains, endless oceans, and golden sunsets that remind us of nature's artistic brilliance.",
    content: () => <SpeakerSection />,
  },
];
