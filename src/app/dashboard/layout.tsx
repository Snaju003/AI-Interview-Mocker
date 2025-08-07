import React from "react";
import Headers from "./_components/Headers";

const DashboardLayout: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div>
      <Headers />
      {children}
    </div>
  );
};

export default DashboardLayout;
