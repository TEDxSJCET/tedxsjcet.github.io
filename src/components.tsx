import { TextCombo } from "./components/header";
import { SpeakerQuote } from "./components/quote";
import { Button } from "./components/ui/button";

const Home = () => {
    return (
        <div class="container m-20 flex flex-col items-start gap-20">
            <Button size={"lg"} variant={"tedx"}>
                Previously on TEDxSJCET {">"}
            </Button>
            <Button size={"lg"} class="relative" variant={"tedx"}>
                Register
                <span class="caveat absolute text-tedx-dark -right-5 -bottom-2 text-2xl underline -rotate-[20deg]">Early Bird</span>
            </Button>
            <TextCombo
                header="Speakers."
                sub="We present to you some of the most flamboyant and remarkable individuals who epitomize passion and perseverance to inspire, uplift and empower you. We present to you some of the most flamboyant and remarkable individuals who epitomize passion and perseverance to inspire, uplift and empower you. We present to you some of the most flamboyant and remarkable individuals who epitomize passion and perseverance to inspire, uplift and empower you."
            />
            <SpeakerQuote sub="some subheading">
                Some annoying <span class="text-tedx">philosophical</span> quotes by this guest
            </SpeakerQuote>
        </div>
    );
}

export default Home;