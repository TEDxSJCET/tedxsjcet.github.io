import { Text } from "./ui/text";

export const TextCombo = ({ header, sub, theme }: { header: string, sub: string, theme: "black" | "white" }) => {
    const first = header.substring(0, header.length - 1);
    const last = header.charAt(header.length - 1);
    return (
        <div class="text-start">
            <Text coloring={theme} size={"h2"} variant={"tedx"}>
                {first}
                <span class="text-tedx">{last}</span>
            </Text>
            <Text class="text-balance opacity-75" coloring={theme} size={"p"} variant={"tedx-sub"}>{sub}</Text>
        </div>
    );
}