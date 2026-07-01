import type { ReactNode } from "react";
import { HomeIcon, StatsIcon, IncomeIcon } from "./icons";
import styles from "./TabBar.module.css";

export interface TabItem {
  /** Stable key/id for the tab. */
  key: string;
  /** Label under the icon. */
  label: string;
  /** Icon node. */
  icon: ReactNode;
}

export interface TabBarProps {
  /** Tabs to render. Defaults to the 3 ZaloPay tabs (Trang chủ / Thống kê / Thu nhập). */
  items?: TabItem[];
  /** key of the active tab. */
  activeKey: string;
  /** Fires with the tab key when a tab is pressed. */
  onChange?: (key: string) => void;
  /** Disable tab switching (prototype: only the active tab has a screen). Default: false. */
  disabled?: boolean;
  className?: string;
}

/** Default ZaloPay tabs. Figma node 1:2127. */
export const defaultTabs: TabItem[] = [
  { key: "home", label: "Trang chủ", icon: <HomeIcon /> },
  { key: "stats", label: "Thống kê", icon: <StatsIcon /> },
  { key: "income", label: "Thu nhập", icon: <IncomeIcon /> },
];

/**
 * Bottom tab bar. Figma: node 1:2127 ("TabBar"), variants tabbar/active + tabbar/inactive.
 * Active tab shows the blue 2px indicator and blue icon/label; others show the faint indicator.
 */
export function TabBar({ items = defaultTabs, activeKey, onChange, disabled = false, className }: TabBarProps) {
  return (
    <nav className={[styles.tabbar, className].filter(Boolean).join(" ")} data-node-id="1:2127">
      {items.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <button
            type="button"
            key={tab.key}
            className={[styles.item, isActive ? styles.active : styles.inactive].join(" ")}
            aria-current={isActive ? "page" : undefined}
            disabled={disabled && !isActive}
            onClick={() => !disabled && onChange?.(tab.key)}
          >
            <span className={styles.indicator} aria-hidden="true" />
            <span className={styles.content}>
              <span className={styles.icon}>{tab.icon}</span>
              <span className={styles.label}>{tab.label}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default TabBar;
