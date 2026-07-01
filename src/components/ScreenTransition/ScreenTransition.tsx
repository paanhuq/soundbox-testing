import type { ReactNode } from "react";
import { useMountTransition } from "../../hooks/useMountTransition";
import styles from "./ScreenTransition.module.css";

export type TransitionKind = "push" | "present";

/** Exit duration (ms) each kind animates for — used to keep the layer mounted
 *  until its exit animation finishes. Must match the *exit* motion tokens in
 *  ScreenTransition.module.css (push exit 300, present exit 300). */
const DURATION: Record<TransitionKind, number> = {
  push: 300,
  present: 300,
};

export interface ScreenLayerProps {
  /** Whether this layer is active (mounted + entered). */
  active: boolean;
  /** Transition style: horizontal push or vertical present. */
  kind: TransitionKind;
  children: ReactNode;
}

/**
 * A single animated screen layer. Slides in when it becomes active and slides
 * out (staying mounted for the duration) when it becomes inactive.
 * Stack multiple layers in the router; the top one animates over the rest.
 */
export function ScreenLayer({ active, kind, children }: ScreenLayerProps) {
  const { shouldRender, stage } = useMountTransition(active, DURATION[kind]);

  if (!shouldRender) return null;

  return (
    <div className={[styles.layer, styles[kind], styles[stage]].join(" ")}>{children}</div>
  );
}

export default ScreenLayer;
