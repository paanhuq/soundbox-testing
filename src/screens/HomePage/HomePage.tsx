import { useState } from "react";
import { ProgressStepper } from "../../components/ProgressStepper";
import { SectionTitle } from "../../components/SectionTitle";
import { ProductCard } from "../../components/ProductCard";
import { TabBar } from "../../components/TabBar";
import styles from "./HomePage.module.css";

import decorSwirl from "../../../assets/decor-swirl.svg";
import decorHighlight from "../../../assets/decor-highlight-line.svg";
import productImg from "../../../assets/product-mat-trai.png";
import productImg2 from "../../../assets/product-mat-trai-2.png";

interface Product {
  id: string;
  name: string;
  price: string;
  commission: string;
  image: string;
}

const PRODUCTS: Product[] = [
  { id: "1", name: "Zalopay Box 1", price: "350.000đ", commission: "90.000đ", image: productImg },
  { id: "2", name: "Zalopay Box 1", price: "350.000đ", commission: "90.000đ", image: productImg2 },
];

/**
 * "Homepage - 1st time" referral screen. Figma node 1:2085.
 * Assembles existing NavigationBar / ProductCard / TabBar with the new
 * ProgressStepper + SectionTitle into the full 375x812 mobile layout.
 */
/** Nav background for this screen — the App status bar matches it. */
export const navBg = "transparent";

export interface HomePageProps {
  /** Fires with the product id when a product card is opened. */
  onOpenProduct?: (id: string) => void;
}

export function HomePage({ onOpenProduct }: HomePageProps) {
  const [tab, setTab] = useState("home");

  return (
    <div className={styles.screen} data-node-id="1:2085">
      <img className={styles.decorSwirl} src={decorSwirl} alt="" aria-hidden="true" />

      {/* Spacer for the nav row height so content sits below the fixed
          App-level control chip (Home has no title/back of its own). */}
      <div className={styles.navSpacer} aria-hidden="true" />

      <div className={styles.container} data-node-id="1:2088">
        <h1 className={styles.heading} data-node-id="1:2089">
          Giới thiệu bạn bè loa <span className={styles.brandZalo}>Zalo</span>
          <span className={styles.brandPay}>pay</span>
        </h1>

        <div className={styles.stepperWrap}>
          <ProgressStepper current={1} />
          <img className={styles.decorHighlight} src={decorHighlight} alt="" aria-hidden="true" />
        </div>
      </div>

      <section className={styles.sheet} data-node-id="1:2122">
        <SectionTitle>Các loại sản phẩm</SectionTitle>
        {PRODUCTS.map((p) => (
          <ProductCard
            key={p.id}
            image={p.image}
            name={p.name}
            price={p.price}
            commission={p.commission}
            onShare={() => {}}
            onClick={() => onOpenProduct?.(p.id)}
          />
        ))}
      </section>

      <div className={styles.bottom} data-node-id="1:2126">
        <TabBar activeKey={tab} onChange={setTab} />
        <div className={styles.homeIndicator} data-node-id="1:2128">
          <span className={styles.homeIndicatorBar} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
