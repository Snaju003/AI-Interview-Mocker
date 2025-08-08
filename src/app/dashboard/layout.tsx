import React from "react";
import Headers from "../../components/Headers";

const DashboardLayout: React.FC<React.PropsWithChildren<{}>> = ({
	children,
}) => {
	return (
		<div>
			{/* <Headers /> */}
			<div className="mx-5 md:mx-20 lg:mx-36">{children}</div>
		</div>
	);
};

export default DashboardLayout;
