/**
 * RSVP & Lời chúc -> Google Sheet (DÙNG CHUNG cho mọi cặp đôi)
 * Mỗi dòng có cột "Mã cặp đôi" (couple_id) để tách dữ liệu của từng cặp.
 *
 * Cách dùng: Extensions > Apps Script, dán file này vào, rồi
 * Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone.
 * Copy link Web app (https://script.google.com/macros/s/..../exec) và dán vào
 * trường rsvpEndpoint trong file config.js của thiệp.
 *
 * Sau khi sửa file, BẤM "Deploy > Manage deployments > (bút chì) > Version: New"
 * để cập nhật, nếu không link cũ vẫn chạy code cũ.
 */
function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var type = String(p.type || 'rsvp').toLowerCase();
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (type === 'wish') {
      var ws = ss.getSheetByName('Wishes') || ss.insertSheet('Wishes');
      if (ws.getLastRow() === 0) {
        ws.appendRow(['Thời gian', 'Mã cặp đôi', 'Họ và tên', 'Mối quan hệ', 'Lời chúc']);
      }
      ws.appendRow([
        new Date(),
        p.couple_id || '',
        p.name || '',
        p.relation || '',
        p.wish_message || p.message || ''
      ]);
    } else {
      var sheet = ss.getSheetByName('RSVP') || ss.insertSheet('RSVP');
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(['Thời gian', 'Mã cặp đôi', 'Họ và tên', 'Tham dự', 'Nơi tham dự', 'Số lượng', 'Lời chúc']);
      }
      sheet.appendRow([
        new Date(),
        p.couple_id || '',
        p.name || '',
        p.attending || p.is_attending || '',
        p.party || p.party_side || '',
        p.guests || p.guest_count || '',
        p.message || ''
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Cho phép mở link bằng trình duyệt để kiểm tra (tùy chọn)
function doGet() {
  return ContentService.createTextOutput('RSVP endpoint OK');
}
