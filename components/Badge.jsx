import React from "react";

export default function Badge({
  variant = "indigo",
  size = "lg",
  square = false,
  title,
  icon,
  backIcon,
  children,
  className,
  onClick,
}) {
  const variantClass = () => {
    switch (variant) {
      case "green":
        return "text-green-500 bg-green-100/60 border-green-500";
      case "solidGreen":
        return "text-white bg-green-600 border-green-600";
      case "complete":
        return "text-green-500 bg-green-100/60 border-green-500";
      case "indigo":
        return "text-indigo-600 bg-indigo-100/60 border-indigo-500";
      case "solidIndigo":
        return "text-white bg-indigo-600 border-indigo-600";
      case "blue":
        return "text-blue-500 bg-blue-100/60 border-blue-500";
      case "gray":
        return "text-gray-700 bg-gray-100/60 border-gray-500";
      case "pink":
        return "text-pink-500 bg-pink-100/60 border-pink-500";
      case "solidPink":
        return "text-white bg-pink-600 border-pink-600";
      case "yellow":
        return "text-yellow-500 bg-yellow-100/60 border-yellow-500";
      case "purple":
        return "text-purple-500 bg-purple-100/60 border-purple-500";
      case "billing":
        return "text-purple-500 bg-purple-100/60 border-purple-500";
      case "red":
        return "text-red-500 bg-red-100/60 border-red-500";
      case "solidRed":
        return "text-white bg-red-500 border-red-600";
      case "amber":
        return "text-amber-500 bg-amber-100/60 border-amber-500";
      case "solidAmber":
        return "text-white bg-amber-600 border-amber-600";
      case "solidLime":
        return "text-white bg-lime-600 border-lime-600";
      case "lime":
        return "text-lime-500 bg-lime-100/60 border-lime-500";
      case "pending":
        return "text-amber-600 bg-amber-100/60 border-amber-600";
      case "active":
        return "text-sky-500 bg-sky-100/60 border-sky-500";
      case "sky":
        return "text-sky-500 bg-sky-100/60 border-sky-500";
      case "rose":
        return "text-rose-500 bg-rose-100/60 border-rose-500";
      case "cancel":
        return "text-rose-500 bg-rose-100/60 border-rose-500";
      case "white":
        return "text-grey-700 bg-white border border-gray-100";
      default:
        return "";
    }
  };

  const sizeClass = () => {
    switch (size) {
      case "sm":
        return "px-2 py-0";
      case "xl":
        return "px-5 py-2";
      default:
        return "px-3 py-1";
    }
  };

  const squareClass = square ? "rounded-md" : "rounded-full";

  return (
    <div
      className={`inline-flex items-center gap-x-2 border ${variantClass()} ${sizeClass()} ${squareClass} ${className}`}
      onClick={onClick}
    >
      {icon && <i className={icon} />}
      {title && <h2 className="text-sm font-normal">{title}</h2>}
      {backIcon && <i className={backIcon} />}
      {children}
    </div>
  );
}
