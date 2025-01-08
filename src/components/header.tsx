import { Text } from "./ui/text";

export const TextCombo = ({ header, sub }: { header: string, sub: string }) => {
    const first = header.substring(0, header.length - 1);
    const last = header.charAt(header.length - 1);
    return (
        <div>
            <Text coloring={"black"} size={"h2"} variant={"tedx"}>
                {first}
                <span class="text-tedx">{last}</span>
            </Text>
            <br />
            <Text coloring={"black"} size={"p"} variant={"tedx-sub"}>{sub}</Text>
        </div>
    );
}