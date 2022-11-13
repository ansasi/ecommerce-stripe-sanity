import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner
      heroBanner={bannerData.length && bannerData[Math.floor(Math.random() * bannerData.length)]}
    />
    <div className="products-heading">
      <h2>Best Seller Products</h2>
      <p>Sound with us sounds better</p>
    </div>

    <div className="products-container">
      {products?.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>

    <FooterBanner
      footerBanner={bannerData && bannerData[Math.floor(Math.random() * bannerData.length)]}
    />
  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
