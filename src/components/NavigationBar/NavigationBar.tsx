import { BackIcon } from "./icons";
import styles from "./NavigationBar.module.css";

export interface NavigationBarProps {
  /** Title text shown next to the back button. */
  title?: string;
  /** Center the title instead of left-aligning. Default: left (matches Figma). */
  centerTitle?: boolean;
  /** Show the back arrow. Default: true. */
  showBack?: boolean;
  /** Back arrow handler. */
  onBack?: () => void;
  className?: string;
}

/**
 * Top navigation bar. Figma: node 1:1893 ("Navigation Bar").
 *
 * The mini-app control chip (••• | ✕) is NOT part of this component — it lives
 * at the App level (see AppControl) so it stays fixed across screens. The nav
 * reserves room on the right (--nav-control-inset) so the title always keeps a
 * 16px gap from that fixed control.
 */
export function NavigationBar({
  title,
  centerTitle = false,
  showBack = true,
  onBack,
  className,
}: NavigationBarProps) {
  return (
    <nav className={[styles.navbar, className].filter(Boolean).join(" ")} data-node-id="1:1893">
      <div className={styles.container}>
        <div className={styles.leading}>
          {showBack && (
            <button
              type="button"
              className={styles.iconButton}
              onClick={onBack}
              aria-label="Quay lại"
            >
              <BackIcon />
            </button>
          )}
          {title !== undefined && (
            <span className={[styles.title, centerTitle ? styles.centered : ""].join(" ")}>
              {title}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
