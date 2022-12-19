import { Token } from "../types";

export const getKey = (token: Token) => {
  return `${token.contract}-${token.tokenId}`;
};

export const isSameToken = (tokenA: Token, tokenB: Token) => {
  return (
    tokenA.contract === tokenB.contract && tokenA.tokenId === tokenB.tokenId
  );
};
