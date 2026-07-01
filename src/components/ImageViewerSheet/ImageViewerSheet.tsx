import { useEffect } from "react";
import styles from "./ImageViewerSheet.module.css";
import closeIcon from "../../../assets/ic-close.svg";

export interface ImageViewerSheetProps {
  /** Image URL to display enlarged. */
  src: string;
  /** Alt text for the image. */
  alt?: string;
  /** Close handler (X button, overlay tap, or Esc). */
  onClose: () => void;
}

/**
 * Full-screen image viewer bottom sheet. Figma: node 12:1667 ("Tray").
 * Dark overlay + close button + image that slides up from the bottom.
 * Tapping the overlay or pressing Esc closes it.
 */
export function ImageViewerSheet({ src, alt = "", onClose }: ImageViewerSheetProps) {
  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      data-node-id="12:1667"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <button type="button" className={styles.close} onClick={onClose} aria-label="Đóng">
        <img className={styles.closeIcon} src={closeIcon} alt="" aria-hidden="true" />
      </button>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <img className={styles.image} src={src} alt={alt} />
      </div>
    </div>
  );
}

export default ImageViewerSheet;
