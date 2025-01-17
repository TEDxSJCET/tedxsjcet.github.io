import { cn } from "@/lib/utils";
import { Text } from "./ui/text";

export const PhotoPic = ({ url, name, position, className }: { url: string, name: string, position: string, className?:string }) => {
    return (
        <div class={cn("flex flex-col rounded-sm p-6 bg-tedx-milky shadow-lg shadow-tedx-dark/20 gap-6", className)}>
            <img src={url} alt={name} class="rounded-sm" />
            <div class="p-1 py-0">
                <Text coloring={"black"} size={"h3"} variant={"tedx"}>
                    {name}
                </Text>
                <br />
                <Text coloring={"black"} size={"p"} variant={"tedx-sub"}>{position}</Text>
            </div>
        </div>
    );
}