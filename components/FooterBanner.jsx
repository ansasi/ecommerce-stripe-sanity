import React, { useEffect, useState } from "react";

import Link from "next/link";

import { urlFor } from "../lib/client";

const FooterBanner = ({ footerBanner }) => {
  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    // This executes in client side
    setWindowSize(window.innerWidth);
    console.log("window", window.innerWidth);
  }, []);

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{footerBanner.discount}</p>
          {windowSize > 768 && <h3>{footerBanner.largeText1}</h3>}
          {windowSize > 768 ? (
            <h3>{footerBanner.largeText2}</h3>
          ) : (
            <h2>{footerBanner.smallText}</h2>
          )}
          <p>{footerBanner.saleTime}</p>
        </div>
        <div className="right">
          {windowSize > 768 && <p>{footerBanner.smallText}</p>}
          <h3>{footerBanner.midText}</h3>
          {windowSize > 768 && <p>{footerBanner.description}</p>}
          <Link href={`/product/${footerBanner.product}`}>
            <button type="button">{footerBanner.buttonText}</button>
          </Link>
        </div>

        <img src={urlFor(footerBanner.image)} className="footer-banner-image" />
      </div>
    </div>
  );
};

export default FooterBanner;
