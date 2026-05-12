import React, { useEffect } from "react";
import Link from "next/link";
import { VscError } from "react-icons/vsc";

import { useStateContext } from "../context/StateContext";

const Canceled = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="cancel-wrapper">
      <div className="cancel">
        <p className="icon">
          <VscError />
        </p>
        <h2>Something went wrong</h2>
        <p className="description">
          If you need any support, please email
          <a className="email" href="mailto:support@ansasi.com">
            support@ansasi.com
          </a>
        </p>
        <Link href="/" className="btn">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Canceled;
