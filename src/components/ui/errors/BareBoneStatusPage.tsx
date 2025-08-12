import type { PropsWithChildren } from "react";

const BareBoneStatusPage: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="flex h-screen items-center justify-center bg-gray-900">
    <div className="m-0 rounded-lg px-6 py-4">{children}</div>
  </div>
);

export default BareBoneStatusPage;
