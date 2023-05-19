import React from "react";
import { useDispatch } from "react-redux";

// asset
import CartIcon from "../../asset/svg/cart";

// redux
import { openDrawer } from "../../features/drawer/drawerSlice";

interface Props {
  cartItemCount: number;
}

const Header = ({ cartItemCount }: Props) => {
  const dispatch = useDispatch();

  const handleOnClose = () => {
    dispatch(openDrawer());
  };

  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row justify-between items-center">
        <h1 className="text-lg font-semibold text-gray-800 tracking-wider">
          Online Shopping Store
        </h1>
        <nav className="text-gray-600">
          <ul className="flex space-x-4 items-center">
            <li>
              <a href="/" className="hover:text-gray-800">
                Home
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-800">
                Shop
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-800">
                About
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-gray-800">
                Contact
              </a>
            </li>
            <li>
              <CartIcon cartItemCount={cartItemCount} onClick={handleOnClose} />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
