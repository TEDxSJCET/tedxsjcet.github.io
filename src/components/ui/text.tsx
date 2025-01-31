import type { JSX, ValidComponent } from "solid-js"
import { splitProps } from "solid-js"
import type { PolymorphicProps } from "@kobalte/core/polymorphic"
import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"
import { Dynamic } from "solid-js/web";

import { cn } from "@/lib/utils";

const textVariants = cva("", {
    variants: {
        variant: {
            default: "scroll-m-20 font-extrabold tracking-tight",
            tedx: "cal-sans",
            "tedx-sub": "caveat"
        },
        size: {
            h1: "font-extrabold text-7xl md:text-9xl",
            h2: "font-bold text-2xl md:text-4xl lg:text-5xl xl:text-6xl",
            h3: "font-bold text-xl md:text-3xl",
            h4: "font-bold text-xs sm:text-xl",
            p: "text-balance text-md sm:text-xl md:text-2xl",
            span: "text-sm md:text-lg",
        },
        coloring: {
            white: "text-tedx-milky",
            black: "text-tedx-dark",
        },
    },
    defaultVariants: {
        coloring: "white",
        variant: "default",
        size: "h1",
    },
});

type TextProps<T extends ValidComponent = "h1"> =
    VariantProps<typeof textVariants> & { class?: string | undefined; children?: JSX.Element }


const Text = <T extends ValidComponent = "h1">(props: PolymorphicProps<T, TextProps<T>>
) => {
    const [local, others] = splitProps(props as TextProps, ["variant", "size", "class", "coloring"])
    const slot = local.size ?? "h1";
    return (
        <Dynamic component={slot}
            class={cn(
                textVariants({
                    variant: local.variant,
                    size: local.size,
                    coloring: local.coloring,
                })
                , local.class)}
            {...others}
        />
    );
}

export type { TextProps }
export { Text, textVariants }
