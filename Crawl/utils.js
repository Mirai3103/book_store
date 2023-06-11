const getKey = {
    "Tên Nhà Cung Cấp": "provider",
    NXB: "publisher",
    "Tác giả": "author",
    "Năm XB": "publishYear",
    "Trọng lượng (gr)": "weight",
    "Kích Thước Bao Bì": "size",
    "Số trang": "numberOfPages",
    "Hình thức": "bookCoverType",
    "Độ Tuổi": "ageGroup",
    "Người Dịch": "translatorName",
    "Ngôn Ngữ": "language",
    "Cấp Độ/ Lớp": "level",
    "Cấp Học": "grade",
    Genre: "genre",
};

const getInvertKey = {
    provider: "Tên Nhà Cung Cấp",
    publisher: "NXB",
    author: "Tác giả",
    publishYear: "Năm XB",
    weight: "Trọng lượng (gr)",
    size: "Kích Thước Bao Bì",
    numberOfPages: "Số trang",
    bookCoverType: "Hình thức",
    ageGroup: "Độ Tuổi",
    translatorName: "Người Dịch",
    language: "Ngôn Ngữ",
    level: "Cấp Độ/ Lớp",
    grade: "Cấp Học",
    genre: "Genre",
};
function stringToSlug(str) {
    // remove accents
    var from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
        to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
    for (var i = 0, l = from.length; i < l; i++) {
        str = str.replace(RegExp(from[i], "gi"), to[i]);
    }

    str = str
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\-]/g, "-")
        .replace(/-+/g, "-");
    if (str[str.length - 1] === "-") {
        str = str.slice(0, -1);
    }
    // remove - from start & end of string
    str = str.replace(/^-+|-+$/g, "");

    return str;
}

module.exports = { getKey, getInvertKey, stringToSlug };
