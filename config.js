/* ============================================================
 *  CẤU HÌNH THIỆP CƯỚI  —  CHỈ SỬA FILE NÀY CHO MỖI CẶP ĐÔI
 *  Đây là nơi DUY NHẤT cần chỉnh khi tạo thiệp cho khách mới.
 * ============================================================ */
window.THIEP = {

  /* Mã định danh cặp đôi: KHÔNG dấu, KHÔNG khoảng trắng (dùng dấu gạch).
     Dùng để tách dữ liệu RSVP của từng cặp trong cùng 1 Google Sheet. */
  coupleId: "minhlan-dinhdiep",

  /* Link Google Apps Script (Web App) nhận RSVP & lời chúc.
     Dùng CHUNG cho mọi cặp đôi — chỉ cần tạo 1 lần. */
  rsvpEndpoint: "https://script.google.com/macros/s/AKfycbyCXo5PQS19dVwDwBZAhZ7E4gCMtHfHUICAX-ZGfEon4PDdAWPNjr5Ytktrm0ROhRj-/exec",

  /* ===== KHÓA MỀM THEO THỜI GIAN (giờ Việt Nam) =====
     Định dạng: "YYYY-MM-DD HH:mm". Để trống "" nếu không giới hạn.
     - Trước activeFrom  -> hiện màn "Thiệp chưa mở".
     - Sau  activeUntil  -> hiện màn "Thiệp đã ngừng hoạt động".
     Ví dụ cho thuê 3 tuần: activeFrom = ngày bàn giao, activeUntil = +21 ngày.
     (Đang để TRỐNG = không giới hạn, để bạn xem thử. Khi giao khách hãy điền ngày.)
     Ví dụ:  activeFrom: "2026-01-01 00:00",  activeUntil: "2026-01-22 23:59", */
  activeFrom:  "",
  activeUntil: "",

  notYetMessage:  "Thiệp mời sẽ được mở vào ngày {date}.\nHẹn gặp lại bạn nhé! ❤",
  expiredMessage: "Thiệp mời này đã hết thời gian hiển thị.\nCảm ơn bạn đã ghé thăm! ❤",

  /* Tiêu đề trên TAB trình duyệt, vd "Thiệp Cưới Minh Lan & Đình Diệp".
     LƯU Ý: cái này chỉ đổi tab trình duyệt. Tiêu đề/ảnh khi SHARE lên Facebook/Zalo
     phải sửa thẳng các thẻ <meta property="og:..."> trong index.html (Facebook không chạy JS). */
  pageTitle: "Thiệp Cưới",

  /* ===== ĐỔI CHỮ THEO ID (tùy chọn) =====
     Đổi nội dung chữ của phần tử bất kỳ theo ID của nó.
     Cách lấy ID: bấm chuột phải vào chữ trên trang > Inspect > xem id="...".
     LƯU Ý: tên cô dâu/chú rể trong mẫu này là ẢNH thư pháp -> đổi tên = thay ảnh
     trong thư mục assets, không sửa ở đây.
     Ví dụ đổi ngày âm lịch / tiêu đề: */
  textOverrides: {
    // "PARAGRAPH115": "(Tức ngày 10 tháng 01 năm Bính Ngọ)",
    // "HEADLINE192": "TRÂN TRỌNG KÍNH MỜI",
  },
};
