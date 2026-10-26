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