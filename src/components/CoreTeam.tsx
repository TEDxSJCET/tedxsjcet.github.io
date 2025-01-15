import { For } from "solid-js";
import org1 from "../assets/org1.svg";
import org2 from "../assets/org2.svg";
import org3 from "../assets/org3.svg";
import DottedGridBackground from "./DottedGridBackground";

const List = [org1, org2, org3];

const CoreTeam = () => {
  return (
    <DottedGridBackground gridSize={180} dashArray="15" lineColor="#373737" dotColor="#373737" dotSize={5}>
      <div class="flex flex-col h-screen overflow-hidden flex-1 justify-center items-center">
        <div class="container mx-auto space-y-5">
          <h1 class="text-7xl font-semibold">
            Organizer<span class="text-tedx-red">.</span>
          </h1>
          <p class="italic text-muted-foreground text-xl">the team behind the scene</p>
          <div class="grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-4">
            <For each={List}>
              {(item, index) => (
                <img src={item} alt="Org" class="aspect-[3/4] object-contain w-full h-full contrast-125 rounded-lg" />
              )}
            </For>
          </div>
        </div>
      </div>
    </DottedGridBackground>
  );
};

export default CoreTeam;
