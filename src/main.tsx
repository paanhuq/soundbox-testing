import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { HomePage, navBg as homeNavBg } from "./screens/HomePage/HomePage";
import { ProductDetailPage, navBg as detailNavBg } from "./screens/ProductDetailPage/ProductDetailPage";
import { QRCodePage, navBg as qrNavBg } from "./screens/QRCodePage/QRCodePage";
import { ScreenLayer } from "./components/ScreenTransition";
import { StatusBar } from "./components/StatusBar";
import { AppControl } from "./components/AppControl";
import styles from "./App.module.css";
import "./index.css";

type Route =
  | { name: "home" }
  | { name: "detail"; productId: string }
  | { name: "qr"; productId: string };

function App() {
  const [route, setRoute] = useState<Route>({ name: "home" });
  // Remember the last product so Detail keeps rendering while it slides out.
  const [lastProductId, setLastProductId] = useState<string>("");

  const productId = "productId" in route ? route.productId : lastProductId;
  const detailActive = route.name === "detail" || route.name === "qr";
  const qrActive = route.name === "qr";

  // Status bar shares the top nav's background of the current top screen.
  // Each screen exports its own navBg, so this stays correct automatically.
  const navBgByRoute: Record<Route["name"], string> = {
    home: homeNavBg,
    detail: detailNavBg,
    qr: qrNavBg,
  };
  const statusBg = navBgByRoute[route.name];

  const openProduct = (id: string) => {
    setLastProductId(id);
    setRoute({ name: "detail", productId: id });
  };

  return (
    <div className={styles.stack}>
      {/* Base layer: Home is always mounted underneath. */}
      <HomePage onOpenProduct={openProduct} />

      {/* Detail pushes in horizontally over Home. */}
      <ScreenLayer active={detailActive} kind="push">
        <ProductDetailPage
          onBack={() => setRoute({ name: "home" })}
          onDownloadQR={() => setRoute({ name: "qr", productId })}
        />
      </ScreenLayer>

      {/* QR presents in vertically over Detail. */}
      <ScreenLayer active={qrActive} kind="present">
        <QRCodePage onClose={() => setRoute({ name: "detail", productId })} />
      </ScreenLayer>

      {/* OS-style status bar: stays fixed on top while screens transition.
          Its background follows the current top screen's nav background. */}
      <div className={styles.statusBar} style={{ background: statusBg }}>
        <StatusBar />
      </div>

      {/* Mini-app control (••• | ✕): fixed top-right, same on every screen. */}
      <AppControl onMore={() => {}} onClose={() => {}} />
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
