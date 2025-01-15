import { Component } from "solid-js";

export interface DashedDottedGridProps {
  className?: string;
  style?: Record<string, string | number>;
  gridSize?: number;
  dotSize?: number;
  lineColor?: string;
  dotColor?: string;
  dashArray?: string;
}

const DashedDottedGrid: Component<DashedDottedGridProps> = ({
  className = "",
  style = {},
  gridSize = 40,
  dotSize = 2,
  lineColor = "#e5e7eb",
  dotColor = "#9ca3af",
  dashArray = "2,2",
}) => {
  const svgSize = gridSize * 2; // 2x2 grid pattern

  return (
    <div
      class={`absolute inset-0 ${className}`}
      style={{
        "background-image": `url("data:image/svg+xml,${encodeURIComponent(`
          <svg width="${svgSize}" height="${svgSize}" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="${gridSize}" height="${gridSize}" patternUnits="userSpaceOnUse">
                <path d="M ${gridSize} 0 L 0 0 0 ${gridSize}" fill="none" stroke="${lineColor}" stroke-width="1" stroke-dasharray="${dashArray}" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="0" cy="0" r="${dotSize}" fill="${dotColor}" />
            <circle cx="${gridSize}" cy="0" r="${dotSize}" fill="${dotColor}" />
            <circle cx="0" cy="${gridSize}" r="${dotSize}" fill="${dotColor}" />
            <circle cx="${gridSize}" cy="${gridSize}" r="${dotSize}" fill="${dotColor}" />
          </svg>
        `)}"), radial-gradient(${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        "background-size": `${svgSize}px ${svgSize}px, ${gridSize}px ${gridSize}px`,
        "background-position": `0 0, ${gridSize / 2}px ${gridSize / 2}px`,
        ...style,
      }}
    />
  );
};

export default DashedDottedGrid;
