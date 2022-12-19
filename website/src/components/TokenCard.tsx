import React from "react";

import remove from "../assets/remove.png";

interface TokenCardProps {
  tokenId: string;
  name: string;
  image: string;
  removeToken: (name: string) => void;
}

const TokenCard = ({ tokenId, name, image, removeToken }: TokenCardProps) => {
  return (
    <div className="flex flex-col bg-neutral-300 rounded-xl relative w-32 h-40">
      <img
        src={image}
        alt={`${name} NFT`}
        className="object-cover h-32 w-32 rounded-xl"
      />
      <div className="flex justify-between items-center pt-2 px-2">
        <span className="text-sm font-semibold self-center">#{tokenId}</span>
        <img
          className="w-5 h-5 cursor-pointer"
          src={remove}
          onClick={() => removeToken(name)}
        />
      </div>
    </div>
  );
};

export default TokenCard;
