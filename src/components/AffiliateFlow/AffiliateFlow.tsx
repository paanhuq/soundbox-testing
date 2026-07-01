import styles from "./AffiliateFlow.module.css";
import flowImg from "../../../assets/affiliate-flow.png";

export interface AffiliateFlowProps {
  className?: string;
}

/**
 * "Quy trình tiếp thị liên kết" diagram. Figma: node I0:2243;30735:7466.
 * A decorative 4-step composite (numbers + curved connectors + illustrations)
 * exported flat as a single image (approach A). The PNG already includes the
 * green tint background and border.
 */
export function AffiliateFlow({ className }: AffiliateFlowProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} data-node-id="30735:7466">
      <img className={styles.image} src={flowImg} alt="Quy trình tiếp thị liên kết" />
    </div>
  );
}

export default AffiliateFlow;
