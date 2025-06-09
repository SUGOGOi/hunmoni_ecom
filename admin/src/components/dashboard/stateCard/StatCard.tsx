import React from "react";
import "./statcard.scss";

interface StatCardProps {
  title: string;
  value: string;
  delta: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, delta }) => (
  <div className="statcard">
    <div className="statcard__title">{title}</div>
    <div className="statcard__value">{value}</div>
    <div
      className={`statcard__delta ${
        delta.startsWith("+") ? "statcard__delta--up" : "statcard__delta--down"
      }`}
    >
      {delta}
    </div>
  </div>
);

export default StatCard;
