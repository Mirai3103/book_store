export function toVietnameseCurrency(number: number) {
    return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}
