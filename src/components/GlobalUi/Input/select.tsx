import React from "react";
import { useDispatch } from "react-redux";
import {
  sortItemsByPriceHighToLow,
  sortItemsByPriceLowToHigh,
} from "../../../features/product/productSlice";

const SortSelect = () => {
  const dispatch = useDispatch();

  const handleSortByPriceHighToLow = () => {
    dispatch(sortItemsByPriceHighToLow());
  };

  const handleSortByPriceLowToHigh = () => {
    dispatch(sortItemsByPriceLowToHigh());
  };

  return (
    <select
      onChange={(event) => {
        if (event.target.value === "price_high_to_low") {
          handleSortByPriceHighToLow();
        } else if (event.target.value === "price_low_to_high") {
          handleSortByPriceLowToHigh();
        }
      }}
      className="focus:outline-none text-md text-gray-600"
    >
      <option value=" " hidden>
        Sort Price: Low to High
      </option>
      <option value="price_low_to_high">Sort Price: Low to High</option>
      <option value="price_high_to_low">Sort Price: High to Low</option>
    </select>
  );
};

export default SortSelect;
