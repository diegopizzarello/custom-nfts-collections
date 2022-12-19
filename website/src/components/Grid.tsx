import React from "react";
import { useDrop } from "react-dnd";
import { Token } from "../types";
import TokenCard from "./TokenCard";

interface GridProps {
  tokens: Token[];
  removeToken: (name: string) => void;
}

const Grid = ({ tokens, removeToken }: GridProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "token",
    drop: () => ({ name: "Grid" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <div
      ref={drop}
      className="h-full w-full bg-slate-100 border-l border-slate-300 p-8 overflow-y-scroll"
    >
      <div className="h-fit grid grid-cols-2 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
        {tokens.map((token) => (
          <TokenCard key={token.name} removeToken={removeToken} {...token} />
        ))}
      </div>
    </div>
  );
};

export default Grid;
