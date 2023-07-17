//  {
//         "name": "Mirai Đến Từ Tương Lai",
//         "image": "https://res.cloudinary.com/dkvga054t/image/upload/v1687871079/bookstore/rau8pmnv7e3bm6wjtnih.jpg",
//         "price": 85,
//         "description": "Mirai Đến Từ Tương Lai\n34 tuổi có nghiệt ngã sắp trung niên\n24 tuổi có băn khoăn về xã hội\n14 tuổi có bối rối trước đường đời\nMà 4 tuổi cũng có nỗi niềm riêng của thơ bé\nNỗi niềm của Kun 4 tuổi mang tên Mirai, đứa em gái bỗng dưng xuất hiện và cướp đi khỏi cậu mọi ưu tiên và vị trí tâm điểm gia đình. Làm thế nào để giành lại tình yêu bị tranh đoạt này? Đây là một câu hỏi rất phiêu lưu. Cuộc đời con người ta xoay quanh chữ “tình cảm”, mà giai đoạn chủ động đầu tiên của đời người về mặt tình cảm có lẽ chính là cách xử lý các mối quan hệ với anh chị em trong nhà.\nThông qua sự tiếp xúc giữa Kun và Mirai, giữa Kun và thế giới kì vĩ được họa hình qua khoảnh vườn xinh xẻo trong nhà, MIRAI ĐẾN TỪ TƯƠNG LAI cho thấy tình cảm thật ra không biến mất, mà chỉ chuyển từ dạng thức này sang dạng thức khác, hoặc mượn lời của chính Hosoda, “tình yêu đã chọn hình thức khác để tồn tại”.\nĐây là phiên bản tiểu thuyết của anime cùng tên, từng được đề cử giải Quả cầu vàng (2018) và Oscar (2019) cho Phim hoạt hình hay nhất.",
//         "stock": 29,
//         "attributes": {
//             "Tập": null,
//             "Ngôn ngữ": "Tiếng Việt",
//             "Dịch giả": "Đỗ Nguyên",
//             "Kích thước": "18 x 13 cm",
//             "Năm xuất bản": "2021",
//             "Tác giả": "Mamoru Hosoda",
//             "Tổng số trang": "225",
//             "Trọng lượng": "300g"
//         }
//     },

const fs = require("fs");

const data = JSON.parse(fs.readFileSync("temp.json", "utf-8"));

rs = [];
// --accountId laffy.testnet
for (const js of data) {
    let str = `near call dev-1689354179430-79495688832247 createProduct '${JSON.stringify(js).replace(
        /'/g,
        ""
    )}' --accountId laffy.testnet`;
    rs.push(str);
}
fs.writeFileSync("tonearcall.bat", rs.join("\n"), "utf-8");
