import React from "react";

interface TokenItemProps {
  tokenId: string;
  image: string;
}

const TokenItem = ({ tokenId, image }: TokenItemProps) => {
  return (
    <div className="flex flex-row items-center py-2 px-2">
      <img className="w-12 h-12 mr-2" src={image} />
      <span className="text-sm">#{tokenId}</span>
    </div>
  );
};

export default TokenItem;
