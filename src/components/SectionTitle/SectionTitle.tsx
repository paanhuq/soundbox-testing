import styles from "./SectionTitle.module.css";

export interface SectionTitleProps {
  /** Heading text, e.g. "Các loại sản phẩm". */
  children: string;
  className?: string;
}

/**
 * Section heading with a green accent bar. Figma: node 1:2123 ("Title Name").
 * Label uses the Bold/S16 style.
 */
export function SectionTitle({ children, className }: SectionTitleProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} data-node-id="1:2123">
      <span className={styles.bar} aria-hidden="true" />
      <span className={styles.text}>{children}</span>
    </div>
  );
}

export default SectionTitle;
