import { JSX, ParentComponent } from "solid-js";
import DashedDottedGrid, { DashedDottedGridProps } from "./DashedDottedGrid";

interface DottedGridBackgroundProps extends DashedDottedGridProps {
  children: JSX.Element;
  class?: string;
}

const DottedGridBackground: ParentComponent<DottedGridBackgroundProps> = ({
  children,
  class: className = "",
  ...gridProps
}) => {
  return (
    <div class={`relative ${className}`}>
      <DashedDottedGrid {...gridProps} />
      <div class="relative z-10 h-full">{children}</div>
    </div>
  );
};

export default DottedGridBackground;
