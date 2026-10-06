import type { ArchitectureGraph } from "@/content/types";

export function ArchitectureSvg({ graph }: { graph: ArchitectureGraph }) {
  const byId = Object.fromEntries(graph.nodes.map((node) => [node.id, node]));
  return (
    <svg
      viewBox="0 0 620 280"
      className="w-full"
      role="img"
      aria-label="Architecture"
    >
      {graph.edges.map((edge) => {
        const a = byId[edge.from];
        const b = byId[edge.to];
        if (!a || !b) return null;
        return (
          <line
            key={`${edge.from}-${edge.to}`}
            x1={a.x + 70}
            y1={a.y + 16}
            x2={b.x + 70}
            y2={b.y + 16}
            stroke="rgba(236,233,225,0.25)"
            strokeWidth="1"
          />
        );
      })}
      {graph.nodes.map((node) => (
        <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
          <rect
            width="140"
            height="32"
            fill="#111114"
            stroke="rgba(255,255,255,0.08)"
          />
          <text
            x="10"
            y="20"
            fill="#ece9e1"
            fontSize="11"
            fontFamily="var(--font-jetbrains), monospace"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
