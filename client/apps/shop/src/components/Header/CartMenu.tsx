import { selectCart } from '@/redux/cartSplice';
import { useAppSelector } from '@/redux/hook';
import { toCurrencyFormat } from '@client/libs/shared/src/lib/Utils';

export default function CartMenu() {
  const cart = useAppSelector(selectCart);
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="badge badge-sm indicator-item">{cart.length}</span>
        </div>
      </label>
      <div
        tabIndex={0}
        className="mt-0 z-[1] card  card-compact dropdown-content w-96 bg-base-100 shadow"
      >
        <div className="card-body">
          <span className="font-bold text-xl">
            Giỏ hàng ({cart.length} sản phẩm)
          </span>
          {/* <span className="text-info">
            {toCurrencyFormat(
              cart.reduce(
                (total, item) => total + item.quantity * item.book.price,
                0
              )
            )}
          </span> */}
          <div className="flex flex-col gap-y-1 ">
            {cart.map((item) => (
              <div className="flex gap-x-3 " key={item.book.id}>
                <img
                  src={item.book.thumbnailUrl}
                  alt={item.book.name}
                  className="w-24 aspect-[3/4] rounded-md"
                />
                <div className="flex-1 flex flex-col">
                  <span className="font-bold">{item.book.title}</span>
                  <div className="grid grid-cols-2">
                    <span className="font-semibold">Số lượng:</span>
                    <span>x{item.quantity}</span>
                    <span className="font-semibold">Giá:</span>
                    <span>{toCurrencyFormat(item.book.price)}</span>
                    <span className="font-semibold">Tổng:</span>
                    <span>
                      {toCurrencyFormat(item.quantity * item.book.price)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card-actions">
            <button className="btn btn-primary btn-block font-bold ">
              View cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
