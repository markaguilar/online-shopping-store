import React, { useState } from "react";
import { useDispatch } from "react-redux";

// redux
import { addToCart } from "../../features/cart/cartSlice";

interface Item {
  id: string;
  productName: string;
  description: string;
  unitPrice: number;
  category: string;
  imageUrl: string;
}

interface CardProps extends Item {
  addToCart?: (itemId: string) => void;
}
const Card = (props: CardProps) => {
  const { imageUrl, productName, category, unitPrice, description } = props;

  const dispatch = useDispatch();

  const handleAddToCart = ({ ...props }: CardProps) => {
    dispatch(addToCart({ ...props, quantity: 1 }));
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden hover:shadow-lg">
      <div className=" w-full h-32 lg:h-56 flex item-center justify-center">
        <img
          src={imageUrl}
          alt={productName}
          className="h-full bg-center bg-cover bg-no-repeat"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{productName}</h2>
        <p className="text-gray-600 text-sm uppercase tracking-wider mb-4">
          {category}
        </p>
        <p className="text-gray-800 text-lg font-bold mb-2">
          ${unitPrice.toLocaleString()}
        </p>
        <p className="h-44 lg:h-28 text-gray-600 text-sm leading-snug mb-6 text-ellipsis">
          {description}
        </p>
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 mt-3 py-2 rounded-md transition-colors duration-300 ease-in-out"
          onClick={() => handleAddToCart(props)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
