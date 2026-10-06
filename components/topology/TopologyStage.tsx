"use client";

import { Graph2D } from "@/components/topology/Graph2D";
import { NodeAnnotation } from "@/components/topology/NodeAnnotation";
import { useIsMobile, useIsTablet } from "@/lib/motion";
import { useState } from "react";

export function TopologyStage({ compact }: { compact?: boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const mobile = useIsMobile();
  const tablet = useIsTablet();

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
