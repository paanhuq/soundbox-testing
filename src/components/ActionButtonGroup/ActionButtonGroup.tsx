import styles from "./ActionButtonGroup.module.css";
import qrIcon from "../../../assets/ic-qr-scan.svg";

/** Share icon (inherits currentColor so it can be white on the primary button). */
function ShareIcon() {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.0656 4.66805C14.0656 4.07385 14.7842 3.7765 15.204 4.19692C15.8332 4.82696 18.0725 7.14212 19.3377 8.45188C20.0244 9.16273 20.0234 10.2869 19.3355 10.9966C18.078 12.2938 15.8605 14.5786 15.204 15.2359C14.7842 15.6563 14.0656 15.359 14.0656 14.7648V12.6151C12.0434 12.4013 10.6374 12.71 9.58992 13.2108C8.45897 13.7515 7.70209 14.5344 7.00082 15.2646C6.91967 15.3491 6.83842 15.4337 6.75831 15.516C6.61392 15.6644 6.39305 15.7084 6.20282 15.6268C6.01258 15.5451 5.89233 15.3547 5.90038 15.1478C6.04737 11.3722 7.47293 9.09045 9.28827 7.81082C10.8606 6.70249 12.6716 6.38383 14.0656 6.4334V4.66805Z"
        fill="currentColor"
      />
    </svg>
  );
}

export interface ActionButtonGroupProps {
  /** Secondary button label. Default: "Tải mã QR". */
  qrLabel?: string;
  /** Primary button label. Default: "Chia sẻ". */
  shareLabel?: string;
  onDownloadQR?: () => void;
  onShare?: () => void;
  /** Show the home indicator below the buttons. Default: true. */
  showHomeIndicator?: boolean;
  className?: string;
}

/**
 * Bottom action bar. Figma: node I0:2243;30735:7537 ("Bottom").
 * Secondary "Tải mã QR" + primary "Chia sẻ", with the home indicator below.
 * Positioning (fixed) is handled by the parent screen.
 */
export function ActionButtonGroup({
  qrLabel = "Tải mã QR",
  shareLabel = "Chia sẻ",
  onDownloadQR,
  onShare,
  showHomeIndicator = true,
  className,
}: ActionButtonGroupProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} data-node-id="30735:7537">
      <div className={styles.buttons}>
        <button type="button" className={[styles.button, styles.secondary].join(" ")} onClick={onDownloadQR}>
          <img className={styles.icon} src={qrIcon} alt="" aria-hidden="true" />
          {qrLabel}
        </button>
        <button type="button" className={[styles.button, styles.primary].join(" ")} onClick={onShare}>
          <ShareIcon />
          {shareLabel}
        </button>
      </div>
      {showHomeIndicator && (
        <div className={styles.homeIndicator}>
          <span className={styles.homeIndicatorBar} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

export default ActionButtonGroup;
