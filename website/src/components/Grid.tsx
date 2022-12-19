import React from "react";
import { useDrop } from "react-dnd";
import { Token } from "../types";
import { getKey } from "../utils/token";
import TokenCard from "./TokenCard";

interface GridProps {
  tokens: Token[];
  removeToken: (token: Token) => void;
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

  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      className="h-full w-full border-l border-slate-300 p-8 overflow-y-scroll"
    >
      {!tokens.length ? (
        <div
          className={`h-full border-2 border-dashed rounded-md flex items-center justify-center ${
            isActive ? "bg-slate-100" : "bg-white"
          }`}
        >
          <span className="text-gray-700">
            {isActive
              ? "Release to add token"
              : "Drag & Drop tokens from the left menu"}
          </span>
        </div>
      ) : (
        <div className="h-fit grid grid-cols-2 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7">
          {tokens.map((token) => (
            <TokenCard
              key={getKey(token)}
              token={token}
              removeToken={removeToken}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Grid;
