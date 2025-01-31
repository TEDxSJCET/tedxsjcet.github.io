import { Text } from "./ui/text"

export default function NavBar() {
    return (
        <nav class="w-fit flex flex-row gap-2 fixed z-30 bg-tedx-red bg-opacity-75 backdrop-blur-xl text-white px-1 py-1 left-[20%] md:right-[15%] md:left-auto bottom-4 font-bold  border border-opacity-50">
            <a href="#register">
                <div class="p-2 md:px-4 md:py-2 cursor-pointer" >
                    <Text size={"span"}>
                    Register Now
                    </Text>
                </div>
            </a>
        </nav>
    )
}