import { Suspense, lazy, useState, useEffect } from "react";

const CyberCanvas = lazy(() => import("./cyber-canvas"));

interface CyberSceneProps {
  className?: string;
}

export function CyberScene({ className }: CyberSceneProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only render on client after hydration
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className} aria-hidden="true" />;
  }

  return (
    <div className={className} aria-hidden="true">
      <Suspense fallback={null}>
        <CyberCanvas />
      </Suspense>
    </div>
  );
}
