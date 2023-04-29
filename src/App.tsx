import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./app.css";

// components
import Header from "./components/Header";
import Card from "./components/Card";
import Pagination from "./components/GlobalUi/Pagination";
import CartDrawer from "./components/Drawer";
import Search from "./components/GlobalUi/Input/search";
import Modal from "./components/GlobalUi/Modal";
import SortSelect from "./components/GlobalUi/Input/select";

// redux
import { RootState } from "./store";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";
import { getItems, selectCategory } from "./features/product/productSlice";
import { openDrawer } from "./features/drawer/drawerSlice";
import { openModal } from "./features/modal/modalSlice";

// assets
import Check from "./asset/svg/check";

// utils
import { categoryList, ITEMS_PER_PAGE } from "./utils/constant";

function App() {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const { totalItems, cartItems } = useSelector(
    (store: RootState) => store.cart
  );
  const { items, filteredItems } = useSelector(
    (store: RootState) => store.product
  );
  console.log("filteredItems", filteredItems);
  const { isOpen } = useSelector((store: RootState) => store.modal);

  useEffect(() => {
    dispatch(calculateTotals() as any);
  }, [cartItems, dispatch]);

  useEffect(() => {
    dispatch(getCartItems() as any);
  }, [dispatch]);
  useEffect(() => {
    dispatch(getItems() as any);
  }, [dispatch]);

  const handlefSearchItems = useMemo(() => {
    return items?.filter((item) => {
      return item.productName.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [items, searchTerm]);

  const onSearch = (event: { target: { value: string } }) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedItems = handlefSearchItems.slice(startIndex, endIndex);

  const handleOnClose = () => {
    dispatch(openDrawer());
  };
  const handleCloseModal = () => {
    dispatch(openModal());
  };

  const handleCategoryFilter = async (value: string | null) => {
    setCategory(value);
    if (value === "") {
      await dispatch(getItems() as any);

      return false;
    }
    await dispatch(getItems() as any);
    dispatch(selectCategory(value));
  };

  return (
    <div className="font-sans">
      <Header cartItemCount={totalItems} />

      <div className="container mx-auto px-4 pt-6 py-28">
        <div className="my-5 lg:flex w-full items-center justify-between gap-3 lg:gap-20">
          <div className="w-full">
            <Search onChange={onSearch} />
          </div>
          <div className="mt-3 lg:mt-0">
            <SortSelect />
          </div>
        </div>
        <div className="w-full px-3 py-3 hidden lg:block">
          <ul className="flex items-center flex-row w-full ">
            {categoryList.map((category) => (
              <li
                key={category.title}
                className="w-full cursor-pointer "
                onClick={() => handleCategoryFilter(category.value)}
              >
                <p className="text-gray-500 hover:text-gray-900">
                  {category.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <h1 className="text-xl lg:text-3xl font-bold text-gray-800 mb-8">
          {displayedItems.length > 0 ? `Available` : `No Available`} Items
        </h1>
        {category && (
          <h5 className="text-md  text-gray-800 mb-8">
            Category:{" "}
            <span className="text-lg font-semibold capitalize">{category}</span>
          </h5>
        )}

        {displayedItems.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedItems.map((item) => (
                <div key={item.id}>
                  <Card {...item} />
                </div>
              ))}
            </div>

            <Pagination
              totalItems={items.length}
              itemsPerPage={ITEMS_PER_PAGE}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <CartDrawer onClose={handleOnClose} />
      <Modal
        isOpen={isOpen}
        onClose={handleCloseModal}
        onOpen={handleCloseModal}
      >
        <div className="p-8 flex items-center flex-col gap-2">
          <Check className="text-green-500 w-24" />
          <p className="text-green-500 text-2xl text-center">
            Thank you for purchasing
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default App;
