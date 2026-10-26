// Xếp loại học lực theo điểm (số từ 0 đến 10): thoát sớm nếu điểm sai, xét từ ngưỡng cao xuống thấp
function classifyScore(score) {
    if (typeof score !== "number" || Number.isNaN(score) || score < 0 || score > 10) {
        return "Điểm không hợp lệ";
    } else if (score >= 8) {
        return "Giỏi";
    } else if (score >= 6.5) {
        return "Khá";
    } else if (score >= 5) {
        return "Trung bình";
    } else {
        return "Yếu";
    }
}

// Đổi mã trạng thái khóa học sang nhãn hiển thị tiếng Việt bằng switch-case có break
function getCourseStatusLabel(status) {
    let label;
    switch (status) {
        case "not_started":
            label = "Chưa bắt đầu";
            break;
        case "in_progress":
            label = "Đang học";
            break;
        case "completed":
            label = "Hoàn thành";
            break;
        default:
            label = "Trạng thái không xác định";
    }
    return label;
}

// Kiểm tra đạt khóa học theo điểm chuẩn (mặc định là 5 nếu chưa đặt, giữ nguyên nếu điểm chuẩn là 0)
function isPassed(score, passScore) {
    const required = passScore ?? 5;
    return score >= required;
}

// Tính giá sau khi áp mã giảm giá: trả về null nếu giá âm hoặc không phải số, chuẩn hóa mã và thêm break
function getFinalPrice(price, couponCode) {
    if (typeof price !== "number" || Number.isNaN(price) || price < 0) {
        return null;
    }

    const normalizedCode = typeof couponCode === "string" ? couponCode.trim().toUpperCase() : "";

    let discountPercent = 0;

    switch (normalizedCode) {
        case "WELCOME10":
            discountPercent = 10;
            break;
        case "STUDENT20":
            discountPercent = 20;
            break;
        default:
            discountPercent = 0;
    }

    return price - (price * discountPercent) / 100;
}

// Xét điều kiện cấp chứng chỉ theo tiến độ (0-100) và điểm trung bình (0-10) bằng chuỗi điều kiện phẳng
function getCertificateResult(progress, average) {
  if (
    typeof progress !== "number" ||
    Number.isNaN(progress) ||
    progress < 0 ||
    progress > 100 ||
    typeof average !== "number" ||
    Number.isNaN(average) ||
    average < 0 ||
    average > 10
  ) {
    return "Dữ liệu không hợp lệ";
  } else if (progress < 80) {
    return "Chưa đủ tiến độ";
  } else if (average < 5) {
    return "Chưa đủ điểm";
  } else {
    return "Đủ điều kiện cấp chứng chỉ";
  }
}



// ================  TEST  ===================
function runTest(testName, actual, expected) {
    if (actual === expected) {
        console.log(`[PASS] ${testName}`);
    } else {
        console.error(`[FAIL] ${testName} | Thực tế: ${actual} | Kỳ vọng: ${expected}`);
    }
}

console.log("----- 1. TEST classifyScore -----");
runTest("Điểm 9 -> Giỏi", classifyScore(9), "Giỏi");
runTest("Điểm chạm mốc 8 -> Giỏi", classifyScore(8), "Giỏi");
runTest("Điểm 7 -> Khá", classifyScore(7), "Khá");
runTest("Điểm chạm mốc 6.5 -> Khá", classifyScore(6.5), "Khá");
runTest("Điểm chạm mốc 5 -> Trung bình", classifyScore(5), "Trung bình");
runTest("Điểm 4.5 -> Yếu", classifyScore(4.5), "Yếu");
runTest("Điểm 0 -> Yếu", classifyScore(0), "Yếu");
runTest("Điểm âm (-1) -> Lỗi", classifyScore(-1), "Điểm không hợp lệ");
runTest("Điểm quá 10 (11) -> Lỗi", classifyScore(11), "Điểm không hợp lệ");
runTest("Nhập chuỗi ('8') -> Lỗi", classifyScore("8"), "Điểm không hợp lệ");

console.log("\n----- 2. TEST getCourseStatusLabel -----");
runTest("not_started -> Chưa bắt đầu", getCourseStatusLabel("not_started"), "Chưa bắt đầu");
runTest("in_progress -> Đang học", getCourseStatusLabel("in_progress"), "Đang học");
runTest("completed -> Hoàn thành", getCourseStatusLabel("completed"), "Hoàn thành");
runTest("Mã lạ -> Trạng thái không xác định", getCourseStatusLabel("unknown"), "Trạng thái không xác định");

console.log("\n----- 3. TEST isPassed -----");
runTest("Điểm 6, chuẩn 5 -> true", isPassed(6, 5), true);
runTest("Điểm 5, chuẩn 5 (vừa đủ) -> true", isPassed(5, 5), true);
runTest("Điểm 4, chuẩn 5 -> false", isPassed(4, 5), false);
runTest("Điểm 2, chuẩn 0 (bài đặc biệt) -> true", isPassed(2, 0), true);
runTest("Không truyền điểm chuẩn, điểm 5 -> true", isPassed(5), true);
runTest("Không truyền điểm chuẩn, điểm 4.9 -> false", isPassed(4.9), false);

console.log("\n----- 4. TEST getFinalPrice -----");
runTest("Giá 100.000đ, WELCOME10 -> 90.000đ", getFinalPrice(100000, "WELCOME10"), 90000);
runTest("Mã có khoảng trắng và chữ thường ' welcome10 ' -> 90.000đ", getFinalPrice(100000, " welcome10 "), 90000);
runTest("Giá 100.000đ, STUDENT20 -> 80.000đ", getFinalPrice(100000, "STUDENT20"), 80000);
runTest("Mã không hợp lệ -> Giữ nguyên giá 100.000đ", getFinalPrice(100000, "INVALID"), 100000);
runTest("Giá âm (-50.000) -> null", getFinalPrice(-50000, "WELCOME10"), null);
runTest("Giá không phải số -> null", getFinalPrice("100000", "WELCOME10"), null);

console.log("\n----- 5. TEST getCertificateResult -----");
runTest("Tiến độ 80%, điểm 5 (vừa đủ cả 2) -> Đủ điều kiện", getCertificateResult(80, 5), "Đủ điều kiện cấp chứng chỉ");
runTest("Tiến độ 100%, điểm 10 -> Đủ điều kiện", getCertificateResult(100, 10), "Đủ điều kiện cấp chứng chỉ");
runTest("Tiến độ 79%, điểm 9 -> Chưa đủ tiến độ", getCertificateResult(79, 9), "Chưa đủ tiến độ");
runTest("Tiến độ 90%, điểm 4.9 -> Chưa đủ điểm", getCertificateResult(90, 4.9), "Chưa đủ điểm");
runTest("Tiến độ 105% -> Dữ liệu không hợp lệ", getCertificateResult(105, 8), "Dữ liệu không hợp lệ");
runTest("Điểm -1 -> Dữ liệu không hợp lệ", getCertificateResult(85, -1), "Dữ liệu không hợp lệ");