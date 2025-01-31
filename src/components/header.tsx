import { cn } from "@/lib/utils";
import { Text } from "./ui/text";

export const TextCombo = ({ header, sub, theme, className }: { header: string, sub: string, theme: "black" | "white", className?: string }) => {
    const first = header.substring(0, header.length - 1);
    const last = header.charAt(header.length - 1);
    return (
        <div class={cn("text-start", className)}>
            <Text coloring={theme} size={"h2"} variant={"tedx"}>
                {first}
                <span class="text-tedx">{last}</span>
            </Text>
            <Text class="text-balance opacity-75 max-w-2xl" coloring={theme} size={"p"} variant={"tedx-sub"}>{sub}</Text>
        </div>
    );
}