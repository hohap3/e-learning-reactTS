import React from "react";
import styles from "./categoryItem.module.scss";
import { useNavigate } from "react-router-dom";
import { Category } from "../../models";

interface Props {
  category: Category;
}

function CategoryItem({ category }: Props) {
  const navigate = useNavigate();
  if (!category) return <div></div>;
  const { tenDanhMuc, maDanhMuc, image } = category;

  function handleChangePage() {
    navigate(`/category/${maDanhMuc}`);
  }

  return (
    <div
      className={`${styles["category-item"]} cursor-pointer w-full relative border border-2`}
      onClick={handleChangePage}
    >
      <img src={image} className="w-full object-cover h-[171px]" />

      <div className="absolute right-1 bottom-1 bg-white py-[8px] px-[16px] shadow rounded-md">
        <h2 className="capitalize text-xl">{tenDanhMuc}</h2>
      </div>
    </div>
  );
}

export default CategoryItem;
