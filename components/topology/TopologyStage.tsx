"use client";

import { Graph2D } from "@/components/topology/Graph2D";
import { NodeAnnotation } from "@/components/topology/NodeAnnotation";
import { useIsMobile, useIsTablet } from "@/lib/motion";
import { use3DActive } from "@/lib/scroll-scene";
import { useState } from "react";

export function TopologyStage({ compact }: { compact?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const mobile = useIsMobile();
  const tablet = useIsTablet();
  const is3D = use3DActive();

  // If on desktop and 3D layer is active, hide 2D SVG completely
  if (!compact && is3D && !mobile && !tablet) {
    return null;
  }

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0">
        <Graph2D
          compact={compact || mobile || tablet}
          activeId={active}
          onSelect={setActive}
        />
      </div>
      <NodeAnnotation nodeId={active} />
    </div>
  );
}
