import clsx from "clsx";
import React from "react";

const Book = (props: {
  id: number;
  title: string;
  isSelected: boolean;
  onClick: (id: number) => void;
}) => {
  const { id, title, isSelected, onClick } = props;
  return (
    <button
      className={clsx(
        "btn rounded  border px-2",
        isSelected
          ? "border-2 border-amber-500 bg-teal-800 text-white"
          : "border-black bg-zinc-100"
      )}
      onClick={() => onClick(id)}
    >
      {title}
    </button>
  );
};

export default React.memo(Book);
