# Hướng dẫn tạo thiệp cho mỗi cặp đôi

Toàn bộ thông tin cần thay đổi cho từng cặp nằm trong **1 file duy nhất: `config.js`**.

## Chuẩn bị 1 lần (dùng chung mọi cặp đôi)
1. Tạo 1 Google Sheet trống.
2. Vào **Extensions → Apps Script**, dán nội dung file `RSVP-GoogleAppsScript.gs`.
3. **Deploy → New deployment → Web app**: *Execute as: Me*, *Who has access: Anyone*.
4. Copy link dạng `https://script.google.com/macros/s/.../exec`.
   → Đây là `rsvpEndpoint`, dùng cho **mọi** thiệp.

> Mỗi lần sửa file `.gs` phải **Deploy → Manage deployments → New version** thì link mới chạy code mới.

## Thông tin cần khách cung cấp (thu thập TRƯỚC khi làm)
Gửi danh sách này cho cặp đôi và yêu cầu cung cấp đủ rồi mới bắt tay vào tạo thiệp:

- [ ] **Tên cô dâu & chú rể** (ghi rõ ai dâu, ai rể; có biệt danh không).
- [ ] **Ngày giờ cưới** — dương lịch + âm lịch (nếu cần hiện âm lịch).
- [ ] **Địa điểm tiệc** — tên nhà hàng/địa chỉ + **link Google Maps**.
- [ ] **Ảnh cưới** — vài tấm đẹp (ảnh bìa, ảnh trong album). Gửi file gốc, rõ nét.
- [ ] **Ảnh tên thư pháp** (nếu muốn đổi) — vì tên trong mẫu là ẢNH, không phải chữ.
- [ ] **Mã QR chuyển khoản** + tên ngân hàng / số tài khoản / tên chủ TK (nếu có mục mừng cưới).
- [ ] **Lời mời / lời ngỏ riêng** (nếu muốn thay nội dung mặc định).
- [ ] **Thời gian thiệp hoạt động** — ngày bắt đầu & ngày kết thúc (mặc định cho thuê 3 tuần).
- [ ] **Tiêu đề + ảnh khi share Facebook/Zalo** — tên hiển thị lúc gửi link cho khách.

> Mẹo: lưu mỗi đơn vào 1 thư mục riêng trên máy/Drive kèm đủ ảnh + thông tin trên, để sau này sửa lại dễ.

## Tạo thiệp cho 1 cặp đôi mới
1. **Copy cả thư mục** thiệp ra một thư mục mới.
2. Mở `config.js`, sửa:
   - `coupleId`: mã không dấu, vd `minhlan-dinhdiep` (dùng để lọc RSVP của cặp này trong Sheet).
   - `rsvpEndpoint`: dán link Apps Script ở trên.
   - `activeFrom` / `activeUntil`: khoảng thời gian thiệp hoạt động (giờ VN, `"YYYY-MM-DD HH:mm"`).
     Cho thuê 3 tuần → `activeUntil` = `activeFrom` + 21 ngày.
   - `pageTitle`: tiêu đề tab trình duyệt, vd `"Thiệp Cưới Minh Lan & Đình Diệp"`.
   - `textOverrides`: (nếu cần) đổi chữ theo ID phần tử (ngày âm lịch, tiêu đề...).
3. **Thay ảnh** trong thư mục `assets/` (ảnh cô dâu/chú rể, ảnh tên thư pháp, mã QR chuyển khoản...).
4. **Sửa thẻ share Facebook/Zalo** trong `index.html` (tìm dòng đánh dấu `<!-- CHIA SẺ FACEBOOK/ZALO -->`):
   `og:title` (tên cặp đôi), `og:description` (lời mời), `og:image` (ảnh đại diện).
   → Bắt buộc sửa ở đây vì Facebook **không chạy JavaScript**, `config.js` không đổi được phần này.
5. **Đăng lên Netlify**: kéo-thả thư mục vào https://app.netlify.com → đặt tên site theo tên cặp đôi
   → ra link `tencap-doi.netlify.app`.
6. Gửi link cho khách. Ghi lại vào bảng quản lý đơn (tên, ngày cưới, link, ngày hết hạn, `coupleId`, đã thu tiền).

## Cơ chế khóa mềm
- Trước `activeFrom`: hiện màn "Thiệp chưa mở".
- Sau `activeUntil`: hiện màn "Thiệp đã ngừng hoạt động".
- Khóa dựa trên đồng hồ máy người xem (đủ dùng cho khách thường, không chống được người rành kỹ thuật).

## Dữ liệu khách (RSVP & lời chúc)
- Tất cả đổ về **1 Google Sheet chung**, tách bằng cột **Mã cặp đôi**:
  - Tab `RSVP`: xác nhận tham dự.
  - Tab `Wishes`: lời chúc.
- Lọc theo `coupleId` để xem riêng từng cặp (Data → Create a filter).

## Đã xử lý sẵn (không cần làm gì)
- Đã chặn rò rỉ dữ liệu khách về server `happyweddingday.vn`.
- Đã tắt phần hiển thị lời chúc kéo từ server nhà cung cấp (trước đây hiện nhầm dữ liệu của cặp đôi khác).
