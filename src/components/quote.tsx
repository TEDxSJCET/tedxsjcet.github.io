// import { Linkedin, Twitter, Youtube } from "lucide-solid";
import type { JSX } from "solid-js";
import { PhotoPic } from "./picture";
import { Text } from "./ui/text";
import { cn } from "@/lib/utils";

export const SpeakerQuote = ({ children, data, sub, position = "left", className }: {
    children: JSX.Element, className?: string, sub: string, data: Parameters<typeof PhotoPic>[0], position: "left" | "right"
}) => {
    return (
        <div class={cn("flex flex-col gap-10 md:gap-20 group items-center w-full justify-center", position === "left" ? "md:flex-row-reverse" : "md:flex-row", className)}>
            <PhotoPic className={cn("w-64 md:w-96 group-hover:scale-105 transition-all duration-500", position === "right" ? "md:ms-20 -rotate-12 group-hover:-rotate-6" : "md:me-20 rotate-12 group-hover:rotate-6")} {...data} />
            <div class={cn("w-full md:w-3/4 lg:w-3/5 px-3 md:px-0 flex flex-col gap-3", position === "left" ? "items-end text-end" : "items-start text-start")}>
                <Text class="opacity-75 w-8/12" coloring={"black"} size={"h3"} variant={"tedx-sub"}>{sub}</Text>
                <br />
                <Text coloring={"black"} size={"h2"} variant={"tedx"}>
                    <q>{children}</q>
                </Text>
                <div class="flex flex-row gap-5">
                    <div>
                        {/* <Twitter />
                        <Linkedin />
                        <Youtube /> */}
                    </div>
                    {/* <Signature /> */}
                </div>
            </div>
        </div>
    );
}

const Signature = () => {
    return (<svg class="stroke-black stroke-1 w-60" viewBox="0 0 712 470" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.08984 213.461C41.8537 206.249 73.4044 178.019 111.51 166.956C183.803 145.968 276.466 175.973 332.137 113.422C348.248 95.3187 386.769 23.9752 350.252 3.10852C347.852 1.73687 344.126 3.64364 342.411 5.81228C327.734 24.3741 322.351 48.6812 311.859 69.8913C284.531 125.133 254.596 182.998 215.064 230.765C172.159 282.608 162.539 202.9 160.448 171.282C160.156 166.864 155.09 97.9538 170.182 97.1992C193.086 96.054 238.427 210.131 239.939 213.19C269.48 272.943 287.64 311.701 318.888 370.549C329.862 391.215 340.719 411.98 352.956 431.924C361.157 445.29 377.066 476.484 387.023 464.369C392.732 457.423 401.869 344.333 403.246 345.404C415.441 354.889 412.432 405.167 429.202 406.509C455.362 408.602 442.77 308.728 453.806 296.466C455.735 294.322 466.191 336.199 476.247 324.315C485.325 313.586 496.323 235.897 509.774 255.639C517.509 266.993 539.57 328.5 557.089 326.748C574.296 325.027 566.179 206.246 591.427 219.139C611.46 229.368 642.794 330.812 672.54 315.122C705.303 297.84 704.083 202.466 708.77 169.66" stroke-width="5.17196" stroke-linecap="round" />
    </svg>);
}