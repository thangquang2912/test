# ⚡ Zen TaskFlow Pro | Quản lý Công việc & Pomodoro Dashboarddđddd

[![CI/CD - 5 Bước Kiểm Thử & Đóng Gói](https://github.com/thangquang2912/test/actions/workflows/ci.yml/badge.svg)](https://github.com/thangquang2912/test/actions/workflows/ci.yml)

**Zen TaskFlow Pro** là một đồ án web ứng dụng quản lý công việc kết hợp bộ đếm thời gian Pomodoro hiện đại. Đồ án được thiết kế theo phong cách **Glassmorphism**, chế độ Dark Mode tinh tế, cùng hệ thống tự động kiểm thử và triển khai **CI/CD GitHub Actions 5 bước**.........
aaa
---
aha
## 🌟 Tính Năng Nổi Bậttttt

1. **⏱️ Pomodoro Timer Thông Minh:**
   - Hỗ trợ 3 chế độ: Làm việc tập trung (25 phút), Nghỉ ngắn (5 phút), Nghỉ dài (15 phút).
   - Giao diện đồng hồ đếm ngược với hiệu ứng phát sáng mượt mà.
2. **📋 Quản Lý Danh Sách Công Việc (Task Manager):**
   - Thêm, xóa, đánh dấu hoàn thành công việc.
   - Phân loại theo mức độ ưu tiên: **🔥 Cao**, **⚡ Trung bình**, **🌱 Thấp**.
   - Lọc nhanh theo trạng thái: Tất cả / Đang làm / Đã xong / Ưu tiên cao.
   - Tự động lưu trữ dữ liệu vào `localStorage` của trình duyệt.
3. **📊 Thống Kê & Tiến Độ:**
   - Tính toán tỷ lệ hoàn thành theo thời gian thực và hiển thị thanh tiến độ sinh động.
4. **🎨 Giao Diện Đẳng Cấp (Rich Aesthetics):**
   - Sử dụng font chữ hiện đại (`Outfit` & `Plus Jakarta Sans`).
   - Hiệu ứng kính mờ (Glassmorphism), gradient mượt mà và animation chuyển động sống động.

---

## 🏗️ Cấu Trúc Thư Mục
# SIUUUUU
```text
sd/
├── .github/
│   └── workflows/
│       └── ci.yml             # Workflow GitHub Actions 5 bước CI/CD
├── src/
│   ├── utils/
│   │   └── helpers.js         # Các tiện ích định dạng và tính toán thống kê
│   ├── main.js                # Logic ứng dụng chính (Pomodoro + Task Manager)
│   └── style.css              # Hệ thống giao diện Vanilla CSS hiện đại
├── tests/
│   └── helpers.test.js        # Bộ kiểm thử Unit Test với Vitest
├── index.html                 # Cấu trúc HTML chính
├── package.json               # Cấu hình dự án và scripts
└── README.md                  # Tài liệu hướng dẫn
```

---

## 🚀 Quy Trình GitHub Actions CI/CD (5 Bước)

Dự án được cấu hình quy trình CI/CD tự động trong file [.github/workflows/ci.yml](file:///.github/workflows/ci.yml) với **đúng 5 bước cốt lõi** để đảm bảo chất lượng mã nguồn mỗi khi có thay đổi đẩy lên (`push` hoặc `pull_request`):

| Bước | Tên Bước | Công Cụ / Lệnh | Mô Tả |
| :---: | :--- | :--- | :--- |
| **Bước 1** | **📦 Checkout Mã Nguó̂n** | `actions/checkout@v4` | Tải mã nguồn từ kho lưu trữ GitHub về môi trường ảo (runner `ubuntu-latest`). |
| **Bước 2** | **⚙️ Thiết Lập Node.js & Cache** | `actions/setup-node@v4` | Cài đặt Node.js phiên bản 20 và kích hoạt bộ nhớ đệm (cache `npm`) giúp tăng tốc độ cài đặt cho các lần chạy sau. |
| **Bước 3** | **📥 Cài Đặt Dependencies** | `npm ci` | Cài đặt chính xác các gói phụ thuộc dựa trên `package-lock.json` một cách nhanh chóng và an toàn trong môi trường CI. |
| **Bước 4** | **🧪 Kiểm Tra Mã & Unit Test** | `npm run lint && npm run test` | Kiểm tra cú pháp (linting) và chạy toàn bộ bộ kiểm thử tự động Unit Test (`vitest`) nhằm phát hiện lỗi sớm trước khi đóng gói. |
| **Bước 5** | **🏗️ Đóng Gói & Upload Artifact** | `npm run build` + `actions/upload-artifact@v4` | Biên dịch bản dựng tối ưu cho Production (`dist/`) và tải gói Artifact lên GitHub để lưu trữ hoặc sẵn sàng cho bước Deploy tiếp theo. |

---

## 💻 Hướng Dẫn Cài Đặt & Chạy Cục Bộ

### 1. Yêu cầu hệ thống
- **Node.js**: `v18.0.0` hoặc mới hơn.
- **npm**: đi kèm với Node.js.

### 2. Cài đặt và Khởi chạy
```bash
# 1. Cài đặt các thư viện cần thiết
npm install

# 2. Chạy server phát triển (Dev Server)
npm run dev

# 3. Chạy kiểm thử Unit Test tự động
npm run test

# 4. Đóng gói cho Production
npm run build
```

---
*Đồ án được thiết kế tinh gọn, chuẩn kỹ thuật phần mềm với đầy đủ Unit Test và CI/CD tự động.*
