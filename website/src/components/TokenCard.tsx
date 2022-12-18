import React from "react";

interface TokenCardProps {
  tokenId: string;
  name: string;
  image: string;
}

const TokenCard = ({ tokenId, name, image }: TokenCardProps) => {
  return (
    <div className="flex flex-col bg-neutral-300 rounded-xl relative w-32 h-40">
      <img
        src={image}
        alt={`${name} NFT`}
        className="object-cover h-32 w-32 rounded-xl"
      />
      <span className="text-sm font-semibold pt-2 self-center">#{tokenId}</span>
    </div>
  );
};

export default TokenCard;
