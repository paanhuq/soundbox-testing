import styles from "./ProgressStepper.module.css";

export interface ProgressStep {
  /** Number shown in the circle (or any short label). */
  label: string;
  /** Caption under the circle. Use "\n" to force a line break. */
  caption: string;
}

export interface ProgressStepperProps {
  /** Ordered steps. Defaults to the 3 referral steps from Figma. */
  steps?: ProgressStep[];
  /** 1-based index of the current step (controls connector styling). Default: 1. */
  current?: number;
  className?: string;
}

/** Default 3 steps. Figma node 1:2090 ("Progress"). */
export const defaultSteps: ProgressStep[] = [
  { label: "1", caption: "Chia sẻ, giới thiệu\nsản phẩm" },
  { label: "2", caption: "Hướng dẫn KH\nkích hoạt sản phẩm" },
  { label: "3", caption: "Nhận tiền\nhoa hồng" },
];

/**
 * Horizontal 3-step progress indicator. Figma: node 1:2090 ("Progress"),
 * states `Start` / `Range` (`_States Progress`). Each step is a numbered
 * circle with connector lines on either side and a caption below.
 *
 * The first step omits its left connector and the last omits its right one.
 */
export function ProgressStepper({
  steps = defaultSteps,
  current = 1,
  className,
}: ProgressStepperProps) {
  return (
    <div className={[styles.stepper, className].filter(Boolean).join(" ")} data-node-id="1:2090">
      {steps.map((step, i) => {
        const isFirst = i === 0;
        const isLast = i === steps.length - 1;
        // connector before this number is "completed" up to the current step
        const leftActive = i < current;
        const rightActive = i + 1 < current;
        return (
          <div key={step.label} className={styles.step}>
            <div className={styles.row}>
              <span
                className={[
                  styles.line,
                  isFirst ? styles.lineHidden : leftActive ? styles.lineActive : styles.lineMuted,
                ].join(" ")}
                aria-hidden="true"
              />
              <span className={styles.number}>{step.label}</span>
              <span
                className={[
                  styles.line,
                  isLast ? styles.lineHidden : rightActive ? styles.lineActive : styles.lineMuted,
                ].join(" ")}
                aria-hidden="true"
              />
            </div>
            <span className={styles.label}>
              {step.caption.split("\n").map((line, j) => (
                <span key={j} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ProgressStepper;
