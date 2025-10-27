import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <>
      <div className="flex items-end justify-center space-x-1">
        <Image src={"/logo/logoDark.png"} alt={"test"} width={60} height={60} />
        <div className="font-bold text-4xl font-inter text-primaryCol leading-9">
          Entri
        </div>
      </div>
    </>
  );
};

export default Logo;
