/**
 * RSVP -> Google Sheet
 * Dán toàn bộ file này vào Apps Script (Extensions > Apps Script) của Google Sheet.
 * Sau đó Deploy > New deployment > Web app > Execute as: Me, Who has access: Anyone.
 * Copy đường link Web app (dạng https://script.google.com/macros/s/..../exec)
 * và dán vào biến RSVP_ENDPOINT trong file index.html.
 */
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('RSVP')
             || SpreadsheetApp.getActiveSpreadsheet().insertSheet('RSVP');

    // Tạo dòng tiêu đề nếu sheet còn trống
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Thời gian', 'Họ và tên', 'Tham dự', 'Nơi tham dự', 'Số lượng', 'Lời chúc']);
    }

    var p = (e && e.parameter) ? e.parameter : {};
    sheet.appendRow([
      new Date(),
      p.name || '',
      p.attending || '',
      p.party || '',
      p.guests || '',
      p.message || ''
    ]);

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
