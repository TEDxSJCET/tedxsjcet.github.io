import { speakers } from "@/lib/data";
import DottedGridBackground from "./DottedGridBackground";
import { SpeakerQuote } from "./quote";
import { TextCombo } from "./header";

export default function QutesSection() {
  return (
    <DottedGridBackground
      gridSize={100}
      dashArray="15"
      dotSize={2}
      class="min-h-screen bg-white text-tedx-black"
    >
      {/* <div class="container py-20">
        <TextCombo theme="black" header="Speakers." sub="We present to you some of the most flamboyant and remarkable individuals who epitomize passion and perseverance to inspire, uplift, and empower you." />
      </div> */}
      <div class="flex flex-col gap-32 md:gap-20">
        {speakers.map((speaker, index) => (
          <SpeakerQuote position={index % 2 ? "right" : "left"} data={speaker} sub={speaker.sub}>
            {speaker.quote}
          </SpeakerQuote>
        ))}
      </div>
    </DottedGridBackground>
  );
}
