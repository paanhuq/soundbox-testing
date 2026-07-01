# Soundbox — ZaloPay referral prototype

Mobile UI prototype (React + TypeScript + Vite, CSS Modules) dựng từ thiết kế Figma,
theo hệ **Design System 3.0** của ZaloPay.

## Màn hình

- **HomePage** — trang giới thiệu bạn bè + danh sách sản phẩm
- **ProductDetailPage** — chi tiết sản phẩm (gallery, quy trình, video hướng dẫn)
- **QRCodePage** — mã QR giới thiệu (present từ Detail)
- **ImageViewerSheet** — xem ảnh phóng to

Điều hướng có transition kiểu iOS (push ngang + present dọc).

## Kiến trúc

- **Design tokens** (`design-tokens.json` + `src/index.css`): color, spacing, radius,
  typography, motion — tất cả qua CSS variables, không hardcode.
- **Responsive**: mobile full-viewport (fluid 320→430+), desktop render khung
  iPhone 393×852 căn giữa; dùng `100dvh` + safe-area.
- **Chrome cố định tầng App**: status bar (Dynamic Island) + control chip (••• | ✕)
  đứng yên khi các màn hình transition bên dưới.
- **Motion**: thuần CSS/tween cubic-bezier (không dùng thư viện), easing align theo
  `@zpi/z-taste`.

## Chạy

```bash
npm install
npm run dev        # dev server
npm run build      # production build
npm run typecheck  # tsc --noEmit
```

## Cấu trúc

```
src/
  components/   # UI components (CSS Modules)
  screens/      # HomePage, ProductDetailPage, QRCodePage
  hooks/        # useMountTransition (page transition timing)
  index.css     # design tokens (:root) + global reset
  main.tsx      # App: routing + screen stack + fixed chrome
assets/         # exported Figma assets (icons, images)
design-tokens.json  # token source of truth
```
