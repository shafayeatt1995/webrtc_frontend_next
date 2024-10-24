import { print } from "@/utils";
import React from "react";

export default function Print({ data }) {
  return (
    <pre className=" whitespace-pre-wrap " style={{ wordWrap: "break-word" }}>
      {print(data)}
    </pre>
  );
}
