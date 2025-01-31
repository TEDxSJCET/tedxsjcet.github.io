import { speakers } from "@/lib/data";
import DottedGridBackground from "./DottedGridBackground";
import { SpeakerQuote } from "./quote";

export default function QutesSection() {
  return (
    <DottedGridBackground
      gridSize={100}
      dashArray="15"
      dotSize={2}
      class="min-h-screen flex flex-col bg-white text-tedx-black"
    >
      <div class="container min-h-svh flex flex-col gap-20">
        {speakers.map((speaker, index) => (
          <SpeakerQuote position={index % 2 ? "left" : "right"} data={speaker} sub="some subheading">
            {speaker.quote}
          </SpeakerQuote>
        ))}
      </div>
    </DottedGridBackground>
  );
}
