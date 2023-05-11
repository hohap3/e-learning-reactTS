import clsx from "clsx";
import React from "react";

interface Props {
  name?: string;
  description?: string;
  avatar?: string;
  isActive: boolean;
}

function StudentTestimonialItem({
  name,
  description,
  avatar,
  isActive,
}: Props) {
  return (
    <div className="flex items-center flex-col justify-center gap-0 overflow-hidden">
      <div className="mb-6 overflow-hidden p-2 rounded-full border-2">
        <img
          src={avatar}
          alt={name}
          className="w-[60px] h-[60px] rounded-full"
        />
      </div>
      <div className="mb-4">
        <h2 className="capitalize font-medium text-[1.2rem]">{name}</h2>
        <p className="capitalize">{description}</p>
      </div>
      <div
        className={clsx(`p-6  rounded transition-all duration-600`, {
          ["bg-[#06bbcc] text-white"]: isActive,
          ["bg-[#f0fbfc] text-black"]: !isActive,
        })}
      >
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione in
          odio architecto exercitationem? Eveniet facilis aliquid necessitatibus
          inventore commodi atque!
        </p>
      </div>
    </div>
  );
}

export default StudentTestimonialItem;
