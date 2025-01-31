import gsap from "gsap"
import { onMount } from "solid-js"

export default function NavBar({
    goToSection
}: {
    goToSection: (index: number, direction: number) => void
}){
    onMount(() => {
        const pill = document.querySelector('.pill')
        const links = document.querySelectorAll('nav div')
        
        // Set initial position
        movePill(document.querySelector('#home')!)
        
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                // Update text colors
                links.forEach(l => l.querySelector('h2')!.style.color = 'white');
                (e.currentTarget as HTMLDivElement)!.querySelector('h2')!.style.color = 'black'
                
                // Animate pill
                movePill(e.currentTarget as HTMLDivElement)
            })
        })
    })
    
    function movePill(target: HTMLDivElement) {
        gsap.to('.pill', {
            x: target.offsetLeft - 4,
            duration: 0.5,
            ease: 'power2.out'
        });
        (document.querySelector(".pill>h2") as HTMLHeadingElement)!.innerText = target.querySelector("h2")?.innerText!;
    }

    return (
        <nav class="w-fit flex flex-row gap-2 fixed z-10 bg-black bg-opacity-75 backdrop-blur-xl text-white px-1 py-1 left-[20%] md:right-[15%] md:left-auto bottom-4 font-bold  border border-opacity-50">
            {/* <div id="home" class="z-20" onClick={() => goToSection(0, 1)}>
                <h2 class="p-2 md:p-3 text-black">Home</h2>
            </div>
            <div class="z-20" onClick={() => goToSection(1, 1)}>
                <h2 class="p-2 md:p-3">About</h2>
            </div> */}
            <div class="z-20 p-2 md:px-4 md:py-2 cursor-pointer" onClick={() => goToSection(4, 1)}>
                <h2 class="">Register Now</h2>
            </div>
            {/* <div class="pill h-fit w-fit bg-white rounded-full absolute">
                <h2 class="p-2 md:p-3 opacity-0">Home</h2>
            </div> */}
        </nav>
    )
}