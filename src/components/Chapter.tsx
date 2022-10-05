import clsx from "clsx";
import React from "react";

const Chapter = (props: {
  id: number;
  idx: number;
  isSelected: boolean;
  onClick: (id: number) => void;
}) => {
  const { id, idx, isSelected, onClick } = props;
  return (
    <button
      className={clsx(
        "bt rounded border border-black px-2",
        isSelected ? "bg-teal-800 text-white" : "bg-zinc-100"
      )}
      onClick={() => onClick(id)}
    >
      {idx + 1}
    </button>
  );
};

export default React.memo(Chapter);
