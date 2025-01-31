import { TextCombo } from "./components/header";
import { ParallaxText } from "./components/parallax";
import { SpeakerQuote } from "./components/quote";
import { Button } from "./components/ui/button";
import { speakers } from "@/lib/data";

const Home = () => {
    return (
        <div class="container flex flex-col items-start gap-20">
            <Button size={"lg"} variant={"tedx"}>
                Previously on TEDxSJCET {">"}
            </Button>
            <Button size={"lg"} class="relative" variant={"tedx"}>
                Register
                <span class="caveat absolute text-tedx-dark -right-5 -bottom-2 text-2xl underline -rotate-[20deg]">Early Bird</span>
            </Button>
            <TextCombo
                theme="black"
                header="Speakers."
                sub="We present to you some of the most flamboyant and remarkable individuals who epitomize passion and perseverance to inspire, uplift and empower you. We present to you some of the most flamboyant and remarkable individuals who epitomize passion and perseverance to inspire, uplift and empower you. We present to you some of the most flamboyant and remarkable individuals who epitomize passion and perseverance to inspire, uplift and empower you."
            />

            {/* <div class="-rotate-12 w-[150vw] -translate-x-1/3">
                <ParallaxText direction="left">
                    TED<span class="text-tedx">x</span>SJCET
                </ParallaxText>
                <ParallaxText direction="right">
                    08 <span class="text-tedx">Feb</span> 20<span class="text-tedx">25</span>
                </ParallaxText>
                <ParallaxText direction="left">
                    Excellence <span class="text-tedx">beyond</span> notice<span class="text-tedx">.</span>
                </ParallaxText>
            </div> */}
            <SpeakerQuote position="left" data={
                speakers[0]
            } sub="some subheading">
                Some annoying <span class="text-tedx">philosophical</span> quotes by this guest
            </SpeakerQuote>

            <SpeakerQuote position="right" data={
                speakers[0]
            } sub="some subheading">
                Some annoying <span class="text-tedx">philosophical</span> quotes by this guest
            </SpeakerQuote>
        </div>
    );
}

export default Home;