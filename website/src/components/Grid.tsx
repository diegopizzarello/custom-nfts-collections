import React from "react";
import { useDrop } from "react-dnd";
import { Token } from "../types";
import TokenCard from "./TokenCard";

interface GridProps {
  tokens: Token[];
}

const Grid = ({ tokens }: GridProps) => {
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
      className="flex h-full w-full bg-slate-400 border-l border-slate-300 p-8"
    >
      {tokens.map((token) => (
        <TokenCard key={token.name} {...token} />
      ))}
    </div>
  );
};

export default Grid;
