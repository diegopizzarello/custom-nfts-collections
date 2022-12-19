import React from "react";

import remove from "../assets/remove.png";
import { Token } from "../types";

interface TokenCardProps {
  token: Token;
  removeToken: (token: Token) => void;
}

const TokenCard = ({ token, removeToken }: TokenCardProps) => {
  const { tokenId, image } = token;
  return (
    <div className="flex flex-col bg-neutral-300 rounded-xl relative w-32 h-40">
      <img
        src={image}
        alt={`#${tokenId} NFT`}
        className="object-cover h-32 w-32 rounded-xl"
      />
      <div className="flex justify-between items-center pt-2 px-2">
        <span className="text-sm font-semibold self-center">#{tokenId}</span>
        <img
          className="w-5 h-5 cursor-pointer"
          src={remove}
          onClick={() => removeToken(token)}
        />
      </div>
    </div>
  );
};

export default TokenCard;
