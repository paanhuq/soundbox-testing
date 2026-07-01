import { QRTicket } from "../../components/QRTicket";
import { NavigationBar } from "../../components/NavigationBar";
import styles from "./QRCodePage.module.css";

import cornerTop from "../../../assets/decor-corner-tl.svg";
import cornerBottom from "../../../assets/decor-corner-br.svg";
import sparkle from "../../../assets/decor-sparkle.svg";
import swirl from "../../../assets/decor-swirl-2.svg";

/** Nav background for this screen — the App status bar matches it.
 *  QR has no nav bar; it sits over the gradient, so transparent. */
export const navBg = "transparent";

export interface QRCodePageProps {
  /** Referral code shown on the ticket. Default: "ZPL-ABCDEF". */
  code?: string;
  /** Optional handler for dismissing the QR screen (e.g. tap outside). */
  onClose?: () => void;
}

/**
 * QR referral screen. Figma node 0:2256. Shown when "Tải mã QR" is pressed.
 * Green-wash background with a centered QR ticket and corner decorations.
 */
export function QRCodePage({ code = "ZPL-ABCDEF", onClose }: QRCodePageProps) {
  return (
    <div className={styles.screen} data-node-id="0:2256" onClick={onClose}>
      {/* Top nav: back button only, no title — returns to the product detail. */}
      <div className={styles.nav} onClick={(e) => e.stopPropagation()}>
        <NavigationBar onBack={onClose} />
      </div>

      <img className={[styles.decor, styles.cornerTop].join(" ")} src={cornerTop} alt="" aria-hidden="true" />
      <img className={[styles.decor, styles.sparkle].join(" ")} src={sparkle} alt="" aria-hidden="true" />
      <img className={[styles.decor, styles.swirl].join(" ")} src={swirl} alt="" aria-hidden="true" />
      <img className={[styles.decor, styles.cornerBottom].join(" ")} src={cornerBottom} alt="" aria-hidden="true" />

      <div className={styles.ticket} onClick={(e) => e.stopPropagation()}>
        <QRTicket code={code} />
      </div>
    </div>
  );
}

export default QRCodePage;
