import React, { useState } from "react";

const Tooltip = ({ text, position = "top", children }) => {
  const [visible, setVisible] = useState(false);

  const getTooltipStyle = () => {
    switch (position) {
      case "top":
        return { bottom: "100%", left: "50%", transform: "translateX(-50%)" };
      case "bottom":
        return { top: "100%", left: "50%", transform: "translateX(-50%)" };
      case "left":
        return { right: "100%", top: "50%", transform: "translateY(-50%)" };
      case "right":
        return { left: "100%", top: "50%", transform: "translateY(-50%)" };
      default:
        return { bottom: "100%", left: "50%", transform: "translateX(-50%)" };
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>
      {visible && (
        <div
          style={{
            ...getTooltipStyle(),
          }}
          className="bg-gray-800 text-white p-1 rounded whitespace-nowrap absolute m-1 text-xs"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
