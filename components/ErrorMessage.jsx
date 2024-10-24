import React from "react";

export default function ErrorMessage({ error }) {
  return <>{error && <small className="text-rose-500">{error.msg}</small>}</>;
}
