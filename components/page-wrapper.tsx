import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageWrapper: FC<Props> = ({ children }) => (
  <div className="w-full flex justify-center">
    <div className="w-full">{children}</div>
  </div>
);
