import { useState } from "react";
import { NavigationBar } from "../../components/NavigationBar";
import { ProductGallery } from "../../components/ProductGallery";
import { ProductInfo } from "../../components/ProductInfo";
import { SectionTitle } from "../../components/SectionTitle";
import { AffiliateFlow } from "../../components/AffiliateFlow";
import { VideoThumbnail } from "../../components/VideoThumbnail";
import { ActionButtonGroup } from "../../components/ActionButtonGroup";
import { ImageViewerSheet } from "../../components/ImageViewerSheet";
import styles from "./ProductDetailPage.module.css";

import productFront from "../../../assets/product-mat-trai.png";
import productAlt from "../../../assets/product-mat-phai.png";
import productDetailLarge from "../../../assets/product-detail-large.png";
import guideVideoThumb from "../../../assets/guide-video-thumb.png";

/** Nav background for this screen — the App status bar matches it. */
export const navBg = "var(--color-primary-white)";

export interface ProductDetailPageProps {
  /** Back handler (nav arrow). */
  onBack?: () => void;
  /** Fires when "Tải mã QR" is pressed. */
  onDownloadQR?: () => void;
}

/**
 * "Chi tiết sản phẩm" screen. Figma node 0:2243.
 * Fixed nav (top) + fixed action bar (bottom); the middle scrolls.
 */
export function ProductDetailPage({ onBack, onDownloadQR }: ProductDetailPageProps) {
  const [viewerSrc, setViewerSrc] = useState<string | null>(null);

  const galleryImages = [
    { src: productFront },
    { src: productAlt, muted: true },
    { src: productAlt, muted: true },
    { src: productAlt, muted: true },
  ];

  return (
    <div className={styles.screen} data-node-id="0:2243">
      <div className={styles.nav}>
        <NavigationBar title="Chi tiết sản phẩm" showBack onBack={onBack} />
      </div>

      <div className={styles.scroll}>
        <div className={styles.content}>
          <div className={styles.containment}>
            <ProductGallery images={galleryImages} onViewImage={() => setViewerSrc(productDetailLarge)} />
            <ProductInfo name="Zalopay Box 1" price="350.000đ" commission="90.000đ" />
          </div>

          <div className={styles.section}>
            <SectionTitle>Quy trình tiếp thị liên kết</SectionTitle>
            <AffiliateFlow />
          </div>

          <div className={styles.section}>
            <SectionTitle>Hướng dẫn kích hoạt sản phẩm</SectionTitle>
            <VideoThumbnail image={guideVideoThumb} onPlay={() => {}} />
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <ActionButtonGroup onDownloadQR={onDownloadQR} onShare={() => {}} />
      </div>

      {viewerSrc && (
        <ImageViewerSheet src={viewerSrc} alt="Zalopay Box 1" onClose={() => setViewerSrc(null)} />
      )}
    </div>
  );
}

export default ProductDetailPage;
