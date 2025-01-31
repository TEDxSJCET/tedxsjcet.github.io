import { cn } from "@/lib/utils";
import { Text } from "./ui/text";

type X = {
    image: string;
    name: string;
    position: string;
    className?: string;
}

export const PhotoPic = ({ image, name, position, className }: X) => {
    return (
        <div class={cn("flex flex-col rounded-none p-2 md:p-4 bg-tedx-milky shadow-lg shadow-tedx-dark/20 gap-2 md:gap-4", className)}>
            <img src={image} alt={name} class="rounded-none" />
            <div class="p-1 py-0">
                <Text coloring={"black"} size={"h3"} variant={"tedx"}>
                    {name}
                </Text>
                <Text coloring={"black"} size={"p"} variant={"tedx-sub"}>{position}</Text>
            </div>
        </div>
    );
}

export const SmallPhotoCard = ({ image, name, position, className }: X) => (
    <div
        class={cn("card flex flex-col bg-tedx-milky shadow-2xl shadow-tedx-dark/20] md:p-4 p-2 transition-transform duration-500 w-28 md:w-60 gap-2 rounded-none  group", className)}
        style={{ "will-change": "transform, opacity" }}
    >
        <img
            src={image}
            alt={name}
            class="w-full h-full object-cover rounded-none shadow-sm aspect-square transition duration-300"
            draggable={false}
        />
        <div>
            <Text coloring={"black"} size={"h4"} variant={"tedx"}>
                {name}
            </Text>
            <Text class="opacity-75 text-base/3 leading-3" coloring={"black"} size={"span"} variant={"tedx-sub"}>{position}</Text>
        </div>
    </div>
)