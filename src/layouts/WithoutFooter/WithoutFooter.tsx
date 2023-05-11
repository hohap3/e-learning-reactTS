import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

function WithoutFooter({ children }: Props) {
  return <div>{children}</div>;
}

export default WithoutFooter;
