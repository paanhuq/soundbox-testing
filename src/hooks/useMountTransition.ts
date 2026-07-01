import { useEffect, useRef, useState } from "react";

export type TransitionStage = "enter" | "exit";

export interface MountTransition {
  /** Whether the element should be in the DOM (stays true during exit). */
  shouldRender: boolean;
  /** Current stage — drives the enter/exit CSS class. */
  stage: TransitionStage;
}

/**
 * Keep a component mounted for `duration`ms after it becomes inactive so its
 * exit animation can play before it unmounts. Motion itself is CSS-driven
 * (via motion tokens); this hook only orchestrates mount/unmount timing.
 */
export function useMountTransition(isActive: boolean, duration: number): MountTransition {
  const [shouldRender, setShouldRender] = useState(isActive);
  const [stage, setStage] = useState<TransitionStage>(isActive ? "enter" : "exit");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (isActive) {
      setShouldRender(true);
      // next frame so the element mounts in its "from" state before entering
      const raf = requestAnimationFrame(() => setStage("enter"));
      return () => cancelAnimationFrame(raf);
    }

    // becoming inactive: play exit, then unmount after duration
    setStage("exit");
    timer.current = setTimeout(() => setShouldRender(false), duration);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [isActive, duration]);

  return { shouldRender, stage };
}

export default useMountTransition;
