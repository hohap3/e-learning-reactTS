import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function GenericLayout({ children }: Props) {
  return <div>GenericLayout</div>;
}

export default GenericLayout;
