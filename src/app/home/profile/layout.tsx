import React from "react";
import { LayoutProps } from "../../../../.next/types/app/layout";

function layout({ children }: LayoutProps) {
  return <div>{children}</div>;
}

export default layout;
