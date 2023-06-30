import React from 'react';
import { BookPreviewDto } from '@shared/types/bookPreviewDto';
interface Props {
  book: BookPreviewDto;
}

export default function HeroItem({ book }: Props) {
  return (
    <div className="hero min-h-[80vh]  relative  bg-base-100 px-8">
      <div className="absolute z-50 flex justify-between transform -translate-y-1/2  left-5 right-5 top-1/2"></div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src={book.thumbnailUrl}
          className="max-h-[450px] w-auto h-full rounded-lg shadow-2xl aspect-[2/3]  object-cover"
          alt="cover"
        />
        <div className="min-w-[100px]"></div>
        <div>
          <h2 className="text-5xl font-bold">{book.name + ' '}</h2>
          <p className="py-6">
            {`
34 tuổi có nghiệt ngã sắp trung niên
24 tuổi có băn khoăn về xã hội
14 tuổi có bối rối trước đường đời
Mà 4 tuổi cũng có nỗi niềm riêng của thơ bé
Nỗi niềm của Kun 4 tuổi mang tên Mirai, đứa em gái bỗng dưng xuất hiện và cướp đi khỏi cậu mọi ưu tiên và vị trí tâm điểm gia đình. Làm thế nào để giành lại tình yêu bị tranh đoạt này? Đây là một câu hỏi rất phiêu lưu. Cuộc đời con người ta xoay quanh chữ “tình cảm”, mà giai đoạn chủ động đầu tiên của đời người về mặt tình cảm có lẽ chính là cách xử lý các mối quan hệ với anh chị em trong nhà.
Thông qua sự tiếp xúc giữa Kun và Mirai, giữa Kun và thế giới kì vĩ được họa hình qua khoảnh vườn xinh xẻo trong nhà, MIRAI ĐẾN TỪ TƯƠNG LAI cho thấy tình cảm thật ra không biến mất, mà chỉ chuyển từ dạng thức này sang dạng thức khác, hoặc mượn lời của chính Hosoda, “tình yêu đã chọn hình thức khác để tồn tại”.
Đây là phiên bản tiểu thuyết của anime cùng tên, từng được đề cử giải Quả cầu vàng (2018) và Oscar (2019) cho Phim hoạt hình hay nhất.`.slice(
              0,
              400
            ) + '...'}
          </p>
          <button className="btn btn-primary">Mua ngay</button>
        </div>
      </div>
    </div>
  );
}
