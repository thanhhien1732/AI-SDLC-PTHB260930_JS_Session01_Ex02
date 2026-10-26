# Báo cáo sửa lỗi mô-đun Rikkei Learn

## 1. Bảng báo cáo lỗi

| STT | Dữ liệu đầu vào | Kết quả thực tế bị lỗi | Kết quả kỳ vọng đúng | Dòng code gây lỗi | Giải thích nguyên nhân |
| --- | --- | --- | --- | --- | --- |
| 1 | `getCourseStatusLabel("in_progress")` | `Trạng thái không xác định` | `Đang học` | `label = "Đang học";` | Sau khi gán, chương trình chạy tiếp qua các `case` bên dưới đến `default` và ghi đè nhãn vì thiếu `break;` |
| 2 | `classifyScore(9)` | `Trung bình` | `Giỏi` | `if (score > 5)` | Đặt điều kiện rộng (`> 5`) lên trước điều kiện hẹp (`>= 8`), khiến điểm 9 khớp ngay nhánh đầu tiên và bỏ qua các nhánh sau |
| 3 | `isPassed(2, 0)` | `false` | `true` | `const required = passScore \|\| 5;` | Toán tử `\|\|` coi số `0` là giá trị falsy nên tự động thay điểm chuẩn `0` thành `5` |
| 4 | `getFinalPrice(990000, " welcome10 ")` | `990000` (hoặc `792000` khi nhập `"WELCOME10"`) | `891000` | `switch (couponCode)` và `discountPercent = 10;` | Chưa chuẩn hóa chuỗi bằng `.trim().toUpperCase()` và thiếu `break;` ở `case "WELCOME10"` làm trôi xuống mức giảm 20% |
| 5 | `getCertificateResult(80, 5)` | `Chưa đủ tiến độ` | `Đủ điều kiện cấp chứng chỉ` | `if (progress > 80)` và `if (average > 5)` | Dùng phép so sánh `>` thay vì xét từ mốc `80` và `5` trở lên, đồng thời lồng `if` và chưa kiểm tra dữ liệu đầu vào hợp lệ |

## 2. Tổng kết nội dung đã thực hiện

Trong bài tập này, em đã rà soát và sửa lại toàn bộ 5 hàm trong `script.js` để khắc phục các lỗi logic về câu lệnh điều kiện và toán tử mặc định. Cụ thể, ở hai hàm `classifyScore` và `getCertificateResult`, em áp dụng kỹ thuật thoát sớm (early return) để lọc dữ liệu không hợp lệ ngay ở nhánh đầu tiên, sau đó trải phẳng chuỗi `if / else if / else` theo đúng thứ tự ngưỡng điểm và dùng toán tử `>=`, `<` chuẩn xác. Đối với `getCourseStatusLabel` và `getFinalPrice`, em bổ sung lệnh `break` cho từng nhánh `case` trong `switch` để tránh lỗi trôi lệnh (fall-through) và kết hợp `.trim().toUpperCase()` để chuẩn hóa mã giảm giá. Cuối cùng, ở hàm `isPassed`, em thay toán tử `||` bằng `??` nhằm bảo toàn giá trị `0` khi khóa học đặt điểm chuẩn bằng `0`.