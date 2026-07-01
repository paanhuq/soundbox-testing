import styles from "./VideoThumbnail.module.css";
import playIcon from "../../../assets/ic-play.svg";

export interface VideoThumbnailProps {
  /** Cover image URL. */
  image: string;
  /** Fires when the play button / thumbnail is pressed. */
  onPlay?: () => void;
  className?: string;
}

/**
 * Video thumbnail with dark overlay + centered play button.
 * Figma: node I0:2243;30735:7535 ("Img").
 */
export function VideoThumbnail({ image, onPlay, className }: VideoThumbnailProps) {
  return (
    <button
      type="button"
      className={[styles.root, className].filter(Boolean).join(" ")}
      onClick={onPlay}
      aria-label="Phát video hướng dẫn"
      data-node-id="30735:7535"
    >
      <img className={styles.image} src={image} alt="" />
      <span className={styles.overlay} aria-hidden="true" />
      <img className={styles.play} src={playIcon} alt="" aria-hidden="true" />
    </button>
  );
}

export default VideoThumbnail;
