import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const PageWrapper: FC<Props> = ({ children }) => (
  <div className="w-full flex justify-center mt-20 px-4 pb-10">
    <div className="w-full max-w-6xl">{children}</div>
  </div>
);
