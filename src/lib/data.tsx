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

import speaker1 from "@/assets/about2.webp";
import speaker2 from "@/assets/about3.webp";
import { ScrollItem } from "@/components/ScrollSection";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SpeakerSection from "@/components/SpeakerSection";
import SpeakerDetail from "@/components/SpeakerDetail";

export const HeroSectionData = {
  heroImages: [hero1, hero2, hero7],
  smallerImages: [hero3, hero4, hero8],
  tedXImages: [hero5, hero9, hero10],
  bottomTexts: ["Different Perspectives", "5 Speakers", "Join us"],
  stableImage: ocean,
};

export const speakers = [
  {
    id: 1,
    name: "Name of the Guest 1",
    position: "Position 1",
    quote: "Some inspiring quotes by this guest 1",
    image: speaker1,
  },
  {
    id: 2,
    name: "Name of the Guest 2",
    position: "Position 2",
    quote: "Some inspiring quotes by this guest 2",
    image: speaker2,
  },
  {
    id: 3,
    name: "Name of the Guest 3",
    position: "Position 3",
    quote: "Some inspiring quotes by this guest 3",
    image: speaker1,
  },
  {
    id: 4,
    name: "Name of the Guest 4",
    position: "Position 4",
    quote: "Some inspiring quotes by this guest 4",
    image: speaker2,
  },
  {
    id: 5,
    name: "Name of the Guest 5",
    position: "Position 5",
    quote: "Some inspiring quotes by this guest 5",
    image: speaker1,
  },
];

export const verticalItems: ScrollItem[] = speakers.map((speaker) => ({
  id: speaker.id,
  title: speaker.name,
  description: speaker.position,
  content: () => (
    <SpeakerDetail name={speaker.name} position={speaker.position} photo={speaker.image} quote={speaker.quote} />
  ),
}));

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
