import React, { useState, useEffect } from "react";
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
  }, []);

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
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Canceled;
