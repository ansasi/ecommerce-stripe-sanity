import React, { useEffect, useState } from "react";

import Link from "next/link";

import { urlFor } from "../lib/client";

const FooterBanner = ({ footerBanner }) => {
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const update = () => setIsWide(window.innerWidth > 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (!footerBanner) return null;

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{footerBanner.discount}</p>
          {isWide && <h3>{footerBanner.largeText1}</h3>}
          {isWide ? (
            <h3>{footerBanner.largeText2}</h3>
          ) : (
            <h2>{footerBanner.smallText}</h2>
          )}
          <p>{footerBanner.saleTime}</p>
        </div>
        <div className="right">
          {isWide && <p>{footerBanner.smallText}</p>}
          <h3>{footerBanner.midText}</h3>
          {isWide && <p>{footerBanner.description}</p>}
          <Link href={`/product/${footerBanner.product}`}>
            <button type="button">{footerBanner.buttonText}</button>
          </Link>
        </div>

        {footerBanner.image && (
          <img
            src={urlFor(footerBanner.image).url()}
            alt={footerBanner.midText ?? "Banner"}
            className="footer-banner-image"
          />
        )}
      </div>
    </div>
  );
};

export default FooterBanner;
