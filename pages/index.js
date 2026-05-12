import React, { useEffect, useState } from "react";

import { client, hasSanityConfig } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, heroBanner, footerBanner, bannerData }) => {
  const [hero, setHero] = useState(heroBanner);
  const [footer, setFooter] = useState(footerBanner);

  useEffect(() => {
    if (!Array.isArray(bannerData) || bannerData.length <= 1) return;
    setHero(bannerData[Math.floor(Math.random() * bannerData.length)]);
    setFooter(bannerData[Math.floor(Math.random() * bannerData.length)]);
  }, [bannerData]);

  return (
    <div>
      <HeroBanner heroBanner={hero} />
      <div className="products-heading">
        <h2>Best Seller Products</h2>
        <p>Sound with us sounds better</p>
      </div>

      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>

      <FooterBanner footerBanner={footer} />
    </div>
  );
};

export const getServerSideProps = async () => {
  if (!hasSanityConfig) {
    return {
      props: { products: [], bannerData: [], heroBanner: null, footerBanner: null },
    };
  }

  const products = await client.fetch('*[_type == "product"]');
  const bannerData = await client.fetch('*[_type == "banner"]');

  const heroBanner = bannerData.length ? bannerData[0] : null;
  const footerBanner = bannerData.length ? bannerData[bannerData.length - 1] : null;

  return {
    props: { products, bannerData, heroBanner, footerBanner },
  };
};

export default Home;
