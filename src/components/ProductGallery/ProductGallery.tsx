import { useState } from "react";
import styles from "./ProductGallery.module.css";

export interface GalleryImage {
  /** Image URL. */
  src: string;
  /** Render at 50% opacity (Figma shows the alt angles faded). */
  muted?: boolean;
}

export interface ProductGalleryProps {
  /** Images; the first is shown large by default. */
  images: GalleryImage[];
  /** Fires with the current image src when the large preview is tapped. */
  onViewImage?: (src: string) => void;
  className?: string;
}

/**
 * Product image gallery. Figma: node I0:2243;30735:7444 ("Img").
 * Large preview on top, a row of selectable thumbnails below.
 * The selected thumbnail gets a blue border. Tapping the large preview
 * fires onViewImage (used to open the full-screen viewer).
 */
export function ProductGallery({ images, onViewImage, className }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className={[styles.root, className].filter(Boolean).join(" ")} data-node-id="30735:7444">
      <button
        type="button"
        className={styles.main}
        onClick={() => onViewImage?.(main.src)}
        aria-label="Xem ảnh lớn"
      >
        <img className={styles.mainImg} src={main.src} alt="" />
      </button>
      <div className={styles.thumbs}>
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            className={[styles.thumb, i === active ? styles.thumbActive : ""].join(" ")}
            onClick={() => setActive(i)}
            aria-label={`Ảnh ${i + 1}`}
            aria-current={i === active}
          >
            <img
              className={[styles.thumbImg, img.muted && i !== active ? styles.thumbMuted : ""].join(" ")}
              src={img.src}
              alt=""
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProductGallery;
