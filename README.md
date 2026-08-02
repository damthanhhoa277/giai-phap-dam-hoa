# Quà tặng — Đàm Thanh Hoa

Trang quà tặng miễn phí cho chủ spa. Thương hiệu cá nhân **Đàm Thanh Hoa** — chuyên gia xây hệ thống vận hành spa.

🌐 **Tên miền chính thức: https://quatang.damthanhhoa.com**

| Trang | Đường dẫn | Vai trò |
|---|---|---|
| 🎁 QT-001 · Kiểm Tra Nhanh Sức Khỏe Dòng Tiền Spa | `/kiem-tra-dong-tien/` | **Trang thu lead** — form → email xác nhận → gửi quà |
| 🎁 QT-002 · Checklist 3 Lỗ Thủng Đang Rút Cạn Tiền Spa | `/checklist-3-lo-thung/` | Quà tương tác (web app) |

## Tên miền
- File `CNAME` = `quatang.damthanhhoa.com`. DNS ở **Cloudflare**: bản ghi `CNAME quatang → damthanhhoa277.github.io`, **Proxy = DNS only (mây xám)**.
- Link cũ `damthanhhoa277.github.io/giai-phap-dam-hoa/...` **tự chuyển hướng** sang tên miền mới — link đã gửi khách không chết.

## Trang thu lead `/kiem-tra-dong-tien/`
- Form gửi về **Google Apps Script Web App** (double opt-in): khách điền → nhận email xác nhận → bấm xác nhận → nhận link quà.
- Ai không bấm xác nhận thì **không vào danh sách gửi** (tránh bị đánh dấu spam).
- Sổ lead: Google Sheet `DANH SÁCH LEAD — Đàm Thanh Hoa`.
- Đổi endpoint: sửa `CONFIG.apiUrl` trong `kiem-tra-dong-tien/index.html`.
- **Đổi ảnh phải đổi tên file** (`-v2`, `-v3`…) — ghi đè cùng tên sẽ dính cache, người xem vẫn thấy ảnh cũ.

> ⚠️ **Nguồn chân lý (canonical)** của mỗi công cụ nằm trong vault KHO-TRI-THUC
> (`wiki/03-Marketing/qua-tang/`). Repo này chỉ là bản DEPLOY.
