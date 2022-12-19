import React from "react";
import { useDrag } from "react-dnd";
import { Token } from "../types";

interface TokenItemProps {
  token: Token;
  isDisabled?: boolean;
  addToken: (token: Token) => void;
}

interface DropResult {
  name: string;
}

const TokenItem = ({ token, addToken, isDisabled }: TokenItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "token",
    item: token,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        addToken(token);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div
      ref={isDisabled ? null : drag}
      className={`flex flex-row items-center py-2 px-2 ${
        isDisabled || isDragging ? "opacity-40" : "cursor-move"
      }`}
    >
      <img draggable={false} className="w-12 h-12 mr-2" src={token.image} />
      <span className="text-sm">#{token.tokenId}</span>
    </div>
  );
};

export default TokenItem;
