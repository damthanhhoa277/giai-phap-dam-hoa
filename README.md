# Giải Pháp Đàm Hoa — Công cụ miễn phí cho chủ spa

Trang công cụ (GitHub Pages) của thương hiệu **Giải Pháp Đàm Hoa** · Đàm Thanh Hoa.

| Trang | Đường dẫn | Vai trò |
|---|---|---|
| 🎁 QT-002 · Checklist 3 Lỗ Thủng Đang Rút Cạn Tiền Spa | `/checklist-3-lo-thung/` | Quà tương tác (web app) |
| 🎁 QT-001 · Trang lead magnet Kiểm Tra Sức Khỏe Dòng Tiền Spa | `/kiem-tra-dong-tien/` | **Trang thu lead** — form → email xác nhận → gửi quà |

## Trang thu lead `/kiem-tra-dong-tien/`
- Form gửi về **Google Apps Script Web App** (double opt-in): khách điền → nhận email xác nhận → bấm xác nhận → nhận link quà.
- Ai không bấm xác nhận thì **không vào danh sách gửi** (tránh bị đánh dấu spam).
- Sổ lead: Google Sheet `DANH SÁCH LEAD — Giải Pháp Đàm Hoa` (Drive của Hoa).
- Đổi endpoint: sửa `CONFIG.apiUrl` trong `kiem-tra-dong-tien/index.html`.
- Ảnh quà tạo bằng **Gemini**, tông cream–olive–gold theo bảng màu thương hiệu.

> ⚠️ **Nguồn chân lý (canonical)** của mỗi công cụ nằm trong vault KHO-TRI-THUC
> (`wiki/03-Marketing/qua-tang/`). Repo này chỉ là bản DEPLOY.
> Cập nhật: sửa file canonical trong vault → copy đè vào đây → push.
