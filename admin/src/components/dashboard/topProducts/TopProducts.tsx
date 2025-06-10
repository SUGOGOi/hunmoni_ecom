import React from "react";
import { FaTrophy, FaMedal, FaAward } from "react-icons/fa";
import "./TopProducts.scss";

const TopProducts = () => {
  const products = [
    { name: "Wireless Headphones", sales: 234, revenue: "$34,560", rank: 1 },
    { name: "Smartphone Case", sales: 189, revenue: "$4,725", rank: 2 },
    { name: "Bluetooth Speaker", sales: 156, revenue: "$23,400", rank: 3 },
    { name: "Gaming Mouse", sales: 134, revenue: "$10,720", rank: 4 },
    { name: "USB Cable", sales: 98, revenue: "$980", rank: 5 },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <FaTrophy className="gold" />;
      case 2:
        return <FaMedal className="silver" />;
      case 3:
        return <FaAward className="bronze" />;
      default:
        return <span className="rank-number">{rank}</span>;
    }
  };

  return (
    <div className="top-products">
      <div className="top-products__header">
        <h3>Top Products</h3>
        <span className="period">This Month</span>
      </div>
      <div className="top-products__list">
        {products.map((product) => (
          <div key={product.rank} className="product-item">
            <div className="product-rank">{getRankIcon(product.rank)}</div>
            <div className="product-info">
              <h4>{product.name}</h4>
              <div className="product-stats">
                <span className="sales">{product.sales} sales</span>
                <span className="revenue">{product.revenue}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
