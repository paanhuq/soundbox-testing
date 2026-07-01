import styles from "./QRTicket.module.css";
import qrImage from "../../../assets/qr-referral.png";
import divider from "../../../assets/qr-ticket-divider.svg";

export interface QRTicketProps {
  /** QR image URL. Defaults to the referral QR. */
  qrSrc?: string;
  /** Caption title. Default: "Giới thiệu bạn bè loa". */
  title?: string;
  /** Referral code shown below the title, e.g. "ZPL-ABCDEF". */
  code: string;
  /** Prefix before the code. Default: "Mã giới thiệu: ". */
  codePrefix?: string;
  className?: string;
}

/**
 * QR ticket card. Figma: node 0:2261.
 * QR panel + perforated divider + caption (title + referral code).
 */
export function QRTicket({
  qrSrc = qrImage,
  title = "Giới thiệu bạn bè loa",
  code,
  codePrefix = "Mã giới thiệu: ",
  className,
}: QRTicketProps) {
  return (
    <div className={[styles.ticket, className].filter(Boolean).join(" ")} data-node-id="0:2261">
      <div className={styles.qrPanel}>
        <img className={styles.qrImage} src={qrSrc} alt="Mã QR giới thiệu" />
      </div>
      <img className={styles.divider} src={divider} alt="" aria-hidden="true" />
      <div className={styles.caption}>
        <p className={styles.title}>{title}</p>
        <p className={styles.code}>
          {codePrefix}
          {code}
        </p>
      </div>
    </div>
  );
}

export default QRTicket;
