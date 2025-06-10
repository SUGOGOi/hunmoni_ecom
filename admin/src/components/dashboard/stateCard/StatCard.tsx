import React from "react";
import "./StatCard.scss";

interface StatCardProps {
  title: string;
  value: string;
  delta: string;
  icon?: React.ReactNode;
  trend?: "up" | "down";
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  delta,
  icon,
  trend,
}) => {
  return (
    <div className="stat-card">
      <div className="stat-card__header">
        <h3 className="stat-card__title">{title}</h3>
        <div className={`stat-card__icon ${trend}`}>{icon}</div>
      </div>
      <div className="stat-card__content">
        <div className="stat-card__value">{value}</div>
        <div className={`stat-card__delta ${trend}`}>{delta}</div>
      </div>
    </div>
  );
};

export default StatCard;
