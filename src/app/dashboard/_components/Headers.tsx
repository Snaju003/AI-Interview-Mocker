import Image from "next/image";
import React from "react";

const Headers = () => {
  return (
    <div>
      <Image src={"./logo.svg"} height={160} width={100} alt='logo' />
    </div>
  );
};

export default Headers;
