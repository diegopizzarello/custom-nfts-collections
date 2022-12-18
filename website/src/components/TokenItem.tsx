import React from "react";
import { useDrag } from "react-dnd";
import { Token } from "../types";

interface TokenItemProps {
  tokenId: string;
  image: string;
  name: string;
  addToken: (token: Token) => void;
}

interface DropResult {
  name: string;
}

const TokenItem = ({ tokenId, image, name, addToken }: TokenItemProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "token",
    item: { tokenId, image, name },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        addToken({ tokenId: item.tokenId, image: item.image, name: item.name });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <div ref={drag} className="flex flex-row items-center py-2 px-2">
      <img className="w-12 h-12 mr-2" src={image} />
      <span className="text-sm">#{tokenId}</span>
    </div>
  );
};

export default TokenItem;
