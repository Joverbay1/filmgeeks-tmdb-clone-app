import React from "react";
import "./CircularRating.css";

const CircularRating = ({ rating }) => {
  const radius = 40;
  const strokeWidth = 8;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (rating / 100) * circumference;

  return (
    <div className="circular-rating-wrapper">
      <div className="circular-rating">
        <svg height={radius * 2} width={radius * 2}>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "limegreen", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "green", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>
          <circle
            className="progress-circle-bg"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <circle
            className="progress-circle-fg"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${circumference}`}
            style={{ strokeDashoffset }}
            stroke="url(#gradient)"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div className="progress-text">{(rating / 10).toFixed(1)}</div>
      </div>
      <div className="rating-label">Rating</div>
    </div>
  );
};

export default CircularRating;
