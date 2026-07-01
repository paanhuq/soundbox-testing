import styles from "./ProductInfo.module.css";

export interface ProductInfoProps {
  /** Product name, e.g. "Zalopay Box 1". */
  name: string;
  /** Formatted price, e.g. "350.000đ". */
  price: string;
  /** Commission amount only, e.g. "90.000đ" — rendered green. */
  commission: string;
  /** Prefix before the commission value. Default: "Hoa hồng ". */
  commissionPrefix?: string;
  /** Suffix after the commission value. Default: " / sản phẩm". */
  commissionSuffix?: string;
  className?: string;
}

/**
 * Product name + price + commission line. Figma: node I0:2243;30735:7456.
 */
export function ProductInfo({
  name,
  price,
  commission,
  commissionPrefix = "Hoa hồng ",
  commissionSuffix = " / sản phẩm",
  className,
}: ProductInfoProps) {
  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} data-node-id="30735:7456">
      <p className={styles.name}>{name}</p>
      <div className={styles.priceBlock}>
        <p className={styles.price}>{price}</p>
        <p className={styles.commission}>
          {commissionPrefix}
          <span className={styles.commissionValue}>{commission}</span>
          {commissionSuffix}
        </p>
      </div>
    </div>
  );
}

export default ProductInfo;
