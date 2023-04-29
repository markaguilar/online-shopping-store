import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// redux
import { RootState } from "../../store";
import {
  clearCart,
  decreaseQuantity,
  incrementItemQuantity,
  removeItem,
} from "../../features/cart/cartSlice";
import { openModal } from "../../features/modal/modalSlice";

// assets
import Plus from "../../asset/svg/plus";
import Minus from "../../asset/svg/minus";
import Trash from "../../asset/svg/trash";
import { openDrawer } from "../../features/drawer/drawerSlice";

type CartItemData = {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  category: string;
  quantity: number;
};

interface Props {
  onClose: () => void;
}

const CartDrawer = ({ onClose }: Props) => {
  const dispatch = useDispatch();

  const { isOpen } = useSelector((store: RootState) => store.drawer);
  const { totalItems, cartItems, totalAmount } = useSelector(
    (store: RootState) => store.cart
  );

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id));
  };

  const handleIncrease = (id: string, increment = 1) => {
    dispatch(incrementItemQuantity({ id, increment }));
  };

  const handleDecrease = (id: string) => {
    dispatch(decreaseQuantity({ id }));
  };

  const handleCheckOut = async () => {
    await dispatch(openDrawer());
    await dispatch(openModal());
    handleClearCart();
  };

  return (
    <div
      className={
        isOpen
          ? `block `
          : // eslint-disable-next-line no-useless-concat
            `hidden ` + "fixed z-50 inset-0 bg-black bg-opacity-50 top-0"
      }
    >
      <div
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity mt-20"
        aria-hidden="true"
        onClick={onClose}
      ></div>
      <div className="fixed inset-y-0 right-0 lg:pl-10 max-w-full flex mt-28 lg:mt-20">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
            <div className="px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <h2
                  className="text-lg font-medium text-gray-900"
                  id="slide-over-title"
                >
                  Your Cart
                </h2>
                <div className="ml-3 h-7 flex items-center">
                  <button
                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                    onClick={onClose}
                  >
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 relative flex-1 px-4 sm:px-6">
              {cartItems?.length === 0 ? (
                <div className="text-center text-gray-500">
                  Your cart is empty
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <button
                      className="relative right-0 text-gray-800 hover:underline hover:text-red-400"
                      onClick={handleClearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                  {cartItems?.map((item: CartItemData) => (
                    <div
                      key={item.id}
                      className="flex items-start justify-between py-4 border-b border-gray-200"
                    >
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full bg-cover bg-center"
                          src={item.imageUrl}
                          alt={item.productName}
                        />
                      </div>
                      <div className="ml-3 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.productName}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.quantity} x {item.unitPrice.toLocaleString()}
                          {` `}$
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center">
                            <button
                              className="
                                  bg-gray-100 rounded-md text-gray-400
                                  hover:text-gray-500 focus:outline-none
                                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                "
                              onClick={() => handleDecrease(item.id)}
                            >
                              <span className="sr-only">
                                Reduce quantity by 1
                              </span>
                              <Minus className="w-6 h-6" />
                            </button>
                            <span className="mx-2 text-gray-700">
                              {item.quantity.toLocaleString()}
                            </span>
                            <button
                              className="
                                  bg-gray-100 rounded-md text-gray-400
                                  hover:text-gray-500 focus:outline-none
                                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                                "
                              onClick={() => handleIncrease(item.id)}
                            >
                              <span className="sr-only">
                                Increase quantity by 1
                              </span>
                              <Plus className="w-6 h-6" />
                            </button>
                          </div>
                          <div className="flex-shrink-0 font-medium text-gray-900">
                            {(item.unitPrice * item.quantity).toLocaleString()}
                            {` `}$
                          </div>
                          <div>
                            <Trash
                              className="w-6 h-6 text-red-400 cursor-pointer"
                              onClick={() => handleRemoveItem(item.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-700">
                        Total Items
                      </h3>
                      <p className="text-md text-gray-800">{totalItems}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">
                        Total Amount
                      </h3>
                      <p className="text-lg text-gray-900 font-bold">
                        ${` `}
                        {totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        className="w-full bg-green-600 border border-transparent rounded-md py-3 px-4 text-base font-medium text-white hover:bg-green-700 focus:outline-none"
                        onClick={handleCheckOut}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
