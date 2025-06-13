import isString from "lodash/isString";
import React from "react";
import Label from "../Label";

function Foo({ children }) {
  if (!isString(children) || children.trim() === "") {
    return <Label>No content provided!</Label>;
  }

  return <Label>{children}</Label>;
}

export default Foo;
