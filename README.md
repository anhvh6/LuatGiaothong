# Đường Thông — hệ thống ôn thi lý thuyết giao thông

Ứng dụng web tiếng Việt chạy trên localhost, không cần tài khoản, cơ sở dữ liệu hoặc npm package. Dữ liệu đã tải có thể học và thi không cần mạng; font chữ có font hệ thống dự phòng.

## Chạy ứng dụng

Cần Node.js 22 trở lên. Nhấp đúp **START.bat** trên Windows hoặc mở terminal trong thư mục dự án:

```powershell
npm start
```

Mở **http://localhost:3000**. Giữ tiến trình máy chủ đang chạy. Nếu cổng bận:

```powershell
$env:PORT=3001
npm start
```

Máy chủ chỉ lắng nghe trên 127.0.0.1. Đây là ứng dụng cục bộ, chưa cấu hình để triển khai Internet công cộng nhiều người dùng.

## Tính năng

Giao diện tự chuyển sang bố cục điện thoại và máy tính bảng dọc khi chiều rộng từ 900px trở xuống: thanh điều hướng đáy, menu trượt, vùng chạm tối thiểu 44px và ô nhập chữ 16px. Màn hình thi có đồng hồ cố định khi cuộn, bảng số câu có thể mở/thu gọn và tự đưa câu vừa chọn vào vùng đọc. Giao diện có khoảng đệm cho vùng tai thỏ/thanh Home và hỗ trợ giảm chuyển động theo cài đặt thiết bị.

- **Lý thuyết:** phân biệt 5 nhóm biển báo; 46 biển phổ biến có hình SVG dựng lại, ý nghĩa, lưu ý dễ nhầm và đánh dấu đã học. Ngân hàng 600 câu chia 6 chương, có hình minh họa gốc, tìm kiếm và luyện từng câu.
- **Hướng dẫn và mẹo:** lộ trình học và 12 bài hướng dẫn ghi nhớ dựa trên quy tắc.
- **Thi trắc nghiệm:** tùy chỉnh 1–600 câu, 1–300 phút, chọn chương hoặc chỉ câu điểm liệt. Thi xem đáp án sau khi nộp, hoặc luyện từng câu rồi kiểm tra đáp án. Tự nộp khi hết giờ, đánh dấu xem lại, bảng điều hướng câu, khôi phục khi tải lại trang nếu phiên máy chủ còn chạy.
- **Đề mẫu hạng B:** theo cấu trúc 2025, 30 câu, 20 phút, đạt 27 câu và đúng câu điểm liệt. Có đúng 1 câu điểm liệt, 8 câu quy tắc thông thường, 1 văn hóa, 1 kỹ thuật, 1 cấu tạo, 9 báo hiệu và 9 sa hình. Chưa tạo đề riêng theo danh sách 250 câu A1/A hoặc 300 câu B1.
- **Kết quả:** tổng điểm, câu sai/bỏ trống, câu điểm liệt và đáp án từng câu; liên kết đến trang PDF gốc để đối chiếu.
- **Lịch sử, câu sai:** lưu 30 bài gần nhất trong localStorage; câu trả lời đúng ở lần ôn sau được bỏ khỏi danh sách cần ôn. Dữ liệu này gắn với trình duyệt và địa chỉ truy cập, không đồng bộ giữa thiết bị.

## Nguồn dữ liệu và phạm vi

Bộ sách **600 câu hỏi dùng cho sát hạch lái xe cơ giới đường bộ**, Cục CSGT, Hà Nội 2025, bản lưu công khai:

- [PDF 600 câu hỏi trên HoaTieu](https://f.hoatieu.vn/data/pdf/2025/05/14/cau-hoi-thi-giay-phep-lai-xe.pdf).
- [Công an Hải Phòng công bố bộ 600 câu](https://congan.haiphong.gov.vn/Tin-hoat-dong-cua-CATP/Cai-cach-hanh-chinh/Bo-de-600-cau-hoi-dung-cho-sat-hach-lai-xe-co-gioi-duong-bo-moi-nhat-2025-ap-dung-tu-ngay-016-va-dap-an-172314.html).
- [Hướng dẫn 2262/CSGT-P5 và danh sách 60 câu điểm liệt](https://lab.csgt.vn/upload/services/2071319603_H%C6%B0%E1%BB%9Bng%20d%E1%BA%ABn%20s%E1%BB%AD%20d%E1%BB%A5ng%20b%E1%BB%99%20c%C3%A2u%20h%E1%BB%8Fi%20s%C3%A1t%20h%E1%BA%A1ch%20GPLX%20%28CV%202262.07.5.2025%29.pdf).
- [QCVN 41:2024/BGTVT về báo hiệu đường bộ](https://thuvienphapluat.vn/tcvn/giao-thong/qcvn-41-2024-bgtvt-bao-hieu-duong-bo-921296.aspx).

`scripts/extract_pdf.py` trích câu hỏi và hình từ PDF bằng pdfplumber, xác định đáp án bằng gạch chân. Không dùng đáp án phỏng đoán. Thứ tự và ngắt dòng được chuẩn hóa. Giữ số câu và trang PDF để đối chiếu.

46 biển trong thư viện là các biển phổ biến, không phải danh mục toàn bộ biển và biến thể trong QCVN. Hình SVG chỉ minh họa để nhận diện, không phải bản vẽ kỹ thuật tiêu chuẩn. Ngân hàng có đầy đủ 185 câu về báo hiệu và 115 câu sa hình của tài liệu. Giải thích biển và mẹo là nội dung biên tập; phần đáp án câu thi hiển thị đáp án gốc và liên kết đối chiếu, không có giải thích pháp lý riêng cho toàn bộ 600 câu.

Đây là công cụ ôn tập. Cấu trúc đề mẫu đang theo tài liệu năm 2025, không phải cam kết áp dụng mọi thay đổi về sát hạch sau đó. Đối chiếu quy định tại ngày dự thi.

## Cập nhật qua mạng

Bấm **Cập nhật dữ liệu** trong ứng dụng. Máy chủ tải lại nguồn PDF trong `data/sources.json`, tính SHA-256 và báo rõ có thay đổi hay không. Khi thay đổi, chỉ thay ngân hàng sau khi bộ trích xuất kiểm tra đủ 600 câu, thứ tự lựa chọn và một đáp án gạch chân duy nhất. Có bản sao `data/bank.backup.json`; nếu tải hoặc trích xuất lỗi thì giữ ngân hàng cũ. Không cập nhật các bài thi đang diễn ra; bài mới dùng dữ liệu mới.

Nếu PDF thay đổi, cần Python và pdfplumber để trích xuất:

```powershell
python -m pip install -r scripts/requirements.txt
```

Máy hiện tại tự tìm Python trong runtime Codex; có thể cấu hình đường dẫn Python khác bằng biến môi trường `PYTHON_BIN`. Trường hợp PDF chưa thay đổi thì không cần Python.

Nút cập nhật **không tự tìm tài liệu bất kỳ trên toàn Internet**. Khi cơ quan chức năng phát hành URL mới, sửa `questionPdf` trong `data/sources.json`. Một phiên bản mới có thể yêu cầu sửa bộ trích xuất, danh sách điểm liệt, cơ cấu đề, bài lý thuyết và mẹo. Cơ chế kiểm tra cú pháp không thay thế việc kiểm chứng nội dung; đề mẫu và thư viện không tự nhận quy định pháp luật mới.

Chạy cập nhật từ terminal: `npm run update`.

## Kiểm tra

```powershell
npm test
```

Kiểm tra toàn vẹn 600 câu/đáp án/hình, danh sách điểm liệt, chia chương, cấu trúc đề hạng B, chọn không trùng, chấm điểm và câu điểm liệt bị bỏ trống. Đáp án thi được giữ ở máy chủ, chỉ trả về sau khi kiểm tra câu ở chế độ luyện hoặc khi nộp bài. Bộ đếm thời gian và việc chốt đáp án được kiểm soát phía máy chủ.

## Cấu trúc dự án

- `server.mjs`: máy chủ HTTP, API, phiên làm bài.
- `lib/exam.mjs`: tạo đề và chấm bài.
- `lib/updater.mjs`: tải, kiểm tra và thay ngân hàng an toàn.
- `data/bank.json`: bộ dữ liệu đã trích xuất, dùng ngay.
- `data/official-600.pdf`: tài liệu tải về để đối chiếu, cần giữ cùng ứng dụng.
- `data/sources.json`: cấu hình nguồn.
- `public/`: giao diện, hình câu hỏi, lý thuyết và mẹo.
- `scripts/extract_pdf.py`: bộ trích xuất dữ liệu tái chạy được.

Lưu ý: phiên làm bài nằm trong RAM máy chủ. Khởi động lại máy chủ sẽ mất bài đang làm; lịch sử đã nộp vẫn còn trong trình duyệt.

## Triển khai lên Vercel từ GitHub

Đây là ứng dụng **Node.js**, không phải Python. Tệp Python chỉ dùng để trích xuất câu hỏi ở localhost; phụ thuộc của công cụ này nằm trong `scripts/requirements.txt` để tránh nhận diện nhầm runtime.

Khi import kho GitHub, chọn:

- **Framework Preset: Other**, không chọn Python.
- **Root Directory:** thư mục gốc kho, để trống hoặc `.`.
- **Build Command:** `npm run build:vercel` (đã khai báo trong `vercel.json`).
- **Output Directory:** `public` (đã khai báo trong `vercel.json`).
- **Node.js:** 22.x theo `package.json`.
- **Production Branch:** `master`. Triển khai commit mới nhất; không Redeploy lại riêng commit `667a848` đang lỗi.

`api/handler.mjs` xuất HTTP handler cho Vercel Functions. `vercel.json` đặt `framework: null`, cấu hình build, đóng gói ngân hàng câu hỏi và chuyển các đường dẫn `/api/*` tới handler. Giao diện, hình ảnh và PDF gốc được phục vụ dưới dạng tệp tĩnh; API trả chuyển hướng cho PDF để tránh trả toàn bộ PDF qua Function.

Vercel không dùng Map trong RAM để giữ phiên: trạng thái bài làm được mã hóa AES-256-GCM, trả về trình duyệt dưới dạng token và gửi lại qua body của các yêu cầu API. Đáp án đúng vẫn được giữ ở máy chủ cho tới khi kiểm tra hoặc nộp bài. Nhờ đó, bài làm có thể tiếp tục khi yêu cầu tiếp theo chạy ở instance khác. Đây là công cụ luyện tập, không phải nền tảng sát hạch chống gian lận.

Build sinh khóa riêng trong `.build/session-key`; khóa này chỉ nằm trong gói Function, không nằm trong `public` hoặc Git. Không cần điền biến môi trường để bắt đầu. Nếu muốn giữ phiên qua nhiều lần redeploy, có thể tự cấu hình **SESSION_SECRET** ngẫu nhiên dài ít nhất 32 ký tự trong Vercel Environment Variables. Nếu không cấu hình, mỗi bản triển khai có khóa mới và bài đang làm có thể cần tạo lại. Lịch sử đã nộp vẫn nằm trong localStorage của cùng địa chỉ web.

**Cập nhật dữ liệu trên Vercel:** nút đổi thành *Kiểm tra dữ liệu*: tải PDF nguồn, đối chiếu SHA-256 và thông báo có thay đổi hay không, không ghi tệp hoặc chạy Python trên Function. Khi có tài liệu mới, chạy `npm run update` ở localhost, kiểm chứng nội dung, commit và push dữ liệu mới lên GitHub để Vercel triển khai lại. Luồng cập nhật đầy đủ ở localhost được giữ nguyên.

Kiểm tra chuẩn bị bản triển khai tại máy: `npm run build:vercel`. Kiểm tra tự động gồm cả phiên bài làm giữa các instance độc lập, token bị sửa, hết giờ, PDF tĩnh và cập nhật chỉ kiểm tra nguồn.
